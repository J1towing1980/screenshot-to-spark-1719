import * as React from 'react'
import { render } from '@react-email/render'
import { TEMPLATES } from './registry'
import { site } from '@/content/site'

// Server-only: reads RESEND_API_KEY. Never import from client components.
//
// Emails are sent through Resend (https://resend.com).
// Required Cloudflare secret:  RESEND_API_KEY
// Optional Cloudflare variable: EMAIL_FROM, e.g. "Caldren Technologies <noreply@caldrentech.com>"
//   The domain in EMAIL_FROM must be verified in Resend. Until it is, you can set
//   EMAIL_FROM to "Caldren Technologies <onboarding@resend.dev>" — Resend then only
//   delivers to the email address you signed up to Resend with.
const DEFAULT_FROM = `${site.name} <noreply@caldrentech.com>`

export class EmailSendError extends Error {
  constructor(public code: string, public status?: number) {
    super(`Email send failed: ${code}`)
  }
}

export type SendTemplateEmailResult =
  | { sent: true }
  | { sent: false; reason: 'recipient_suppressed' }

export interface SendTemplateEmailOptions {
  templateData?: Record<string, any>
  /** Dedupes retries of the same logical send; defaults to a random UUID (no dedupe). */
  idempotencyKey?: string
  replyTo?: string
}

/**
 * Renders a registered template and sends it through Resend.
 * Any failure throws an EmailSendError with a short .code (no customer data).
 */
export async function sendTemplateEmail(
  templateName: string,
  to: string,
  options: SendTemplateEmailOptions = {}
): Promise<SendTemplateEmailResult> {
  const apiKey = process.env['RESEND_API_KEY']
  if (!apiKey) {
    throw new EmailSendError('missing_api_key')
  }

  const template = TEMPLATES[templateName]
  if (!template) {
    throw new Error(
      `Template '${templateName}' not found. Available: ${Object.keys(TEMPLATES).join(', ')}`
    )
  }

  // Template-level `to` takes precedence — notification templates always
  // send to their fixed address.
  const recipient = template.to || to
  if (!recipient) {
    throw new Error('Recipient is required (the template defines no fixed recipient)')
  }

  const templateData = options.templateData ?? {}
  const element = React.createElement(template.component, templateData)
  const html = await render(element)
  const text = await render(element, { plainText: true })
  const subject =
    typeof template.subject === 'function'
      ? template.subject(templateData)
      : template.subject

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': options.idempotencyKey || crypto.randomUUID(),
    },
    body: JSON.stringify({
      from: process.env['EMAIL_FROM'] || DEFAULT_FROM,
      to: [recipient],
      subject,
      html,
      text,
      ...(options.replyTo ? { reply_to: options.replyTo } : {}),
    }),
  })

  if (!res.ok) {
    let code = `http_${res.status}`
    try {
      const body = (await res.json()) as { name?: string }
      if (body?.name) code = body.name
    } catch {
      // ignore unreadable error bodies
    }
    throw new EmailSendError(code, res.status)
  }

  return { sent: true }
}
