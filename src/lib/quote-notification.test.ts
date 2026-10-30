import { beforeEach, describe, expect, it, vi } from 'vitest'
const { send } = vi.hoisted(() => ({ send: vi.fn() }))
vi.mock('./email-templates/send-email', () => ({ sendTemplateEmail: send, EmailSendError: class extends Error {} }))
import { notifyQuoteOwner } from './quote-notification.server'
import { template } from './email-templates/quote-notification'

const data = { businessName: 'Test business', contactName: 'Test customer', email: 'customer@example.com', phone: '', service: 'New business website', budget: '', timeframe: '', description: 'A new business website.' }
describe('quote owner notifications', () => {
  beforeEach(() => { send.mockReset(); vi.spyOn(console, 'warn').mockImplementation(() => {}) })
  it('sends only to the actual owner with the customer as reply-to', async () => {
    send.mockResolvedValue({ sent: true })
    await notifyQuoteOwner('request-123', data)
    expect(template.to).toBe('joelr@j1towingautorepair.com')
    expect(send).toHaveBeenCalledWith('quote-notification', 'joelr@j1towingautorepair.com', { templateData: data, idempotencyKey: 'quote-notification-request-123', replyTo: 'customer@example.com' })
  })
  it('does not retry a suppressed owner recipient', async () => {
    send.mockResolvedValue({ sent: false, reason: 'recipient_suppressed' })
    expect(await notifyQuoteOwner('request-123', data)).toEqual({ sent: false, reason: 'recipient_suppressed' })
    expect(send).toHaveBeenCalledTimes(1)
  })
  it('keeps saved requests successful when sending fails', async () => {
    send.mockRejectedValue(new Error('Unavailable'))
    expect(await notifyQuoteOwner('request-123', data)).toEqual({ sent: false, reason: 'send_failed' })
    expect(send).toHaveBeenCalledTimes(1)
  })
})