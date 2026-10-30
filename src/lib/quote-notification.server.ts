import { EmailSendError, sendTemplateEmail } from './email-templates/send-email'

interface QuoteNotificationData {
  businessName: string
  contactName: string
  email: string
  phone: string
  service: string
  budget: string
  timeframe: string
  description: string
}

// A saved quote stays successful even when email cannot currently be sent.
export async function notifyQuoteOwner(id: string, data: QuoteNotificationData) {
  try {
    const result = await sendTemplateEmail('quote-notification', 'joelr@j1towingautorepair.com', {
      templateData: {
        businessName: data.businessName, contactName: data.contactName,
        email: data.email, phone: data.phone, service: data.service,
        budget: data.budget, timeframe: data.timeframe, description: data.description,
      },
      idempotencyKey: `quote-notification-${id}`,
      replyTo: data.email,
    })
    if (!result.sent) console.warn('Quote notification skipped: recipient suppressed')
    return result
  } catch (error) {
    // Do not log customer details, SDK request bodies, or credentials.
    console.warn('Quote saved; notification unavailable', error instanceof EmailSendError ? error.code : 'send_failed')
    return { sent: false, reason: 'send_failed' } as const
  }
}