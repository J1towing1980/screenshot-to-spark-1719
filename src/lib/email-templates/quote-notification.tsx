import { Body, Button, Container, Head, Heading, Html, Preview, Text } from '@react-email/components'
import { site } from '@/content/site'
import type { TemplateEntry } from './registry'

interface Props {
  businessName?: string
  contactName?: string
  email?: string
  phone?: string
  service?: string
  budget?: string
  timeframe?: string
  description?: string
}

function QuoteNotification(data: Props) {
  const rows = [
    ['Business', data.businessName], ['Contact', data.contactName],
    ['Email', data.email], ['Phone', data.phone], ['Service', data.service],
    ['Budget', data.budget], ['Timeframe', data.timeframe],
  ]
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>A new quote request is ready to review.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={brand}>{site.name}</Text>
          <Heading>New quote request</Heading>
          {rows.map(([label, value]) => <Text key={label}><strong>{label}:</strong> {value || 'Not provided'}</Text>)}
          <Heading as="h2">Project description</Heading>
          <Text style={{ whiteSpace: 'pre-wrap' }}>{data.description || 'Not provided'}</Text>
          <Button href="https://caldrentech.com/admin" style={button}>View quote requests</Button>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: QuoteNotification,
  subject: 'New quote request — Caldren Technologies',
  displayName: 'New quote request',
  to: 'joelr@j1towingautorepair.com',
  previewData: { businessName: 'Example business', contactName: 'Example customer', service: 'New business website', description: 'A website project ready for review.' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', color: '#293544', fontFamily: 'Arial, sans-serif' }
const container = { padding: '32px 24px', maxWidth: '600px' }
const brand = { fontWeight: 700, color: '#aa5634' }
const button = { backgroundColor: '#aa5634', color: '#ffffff', padding: '12px 20px', borderRadius: '6px' }