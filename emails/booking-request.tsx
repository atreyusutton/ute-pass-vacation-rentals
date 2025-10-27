import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components'

interface BookingRequestEmailProps {
  propertyName: string
  guestName: string
  guestEmail: string
  guestPhone: string
  checkIn: string
  checkOut: string
  nights: number
  subtotal: number
  message?: string
}

export default function BookingRequestEmail({
  propertyName,
  guestName,
  guestEmail,
  guestPhone,
  checkIn,
  checkOut,
  nights,
  subtotal,
  message,
}: BookingRequestEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New booking request for {propertyName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>🏔️ New Booking Request</Heading>
          
          <Section style={section}>
            <Heading style={h2}>Property</Heading>
            <Text style={text}>{propertyName}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>Guest Information</Heading>
            <Text style={text}>
              <strong>Name:</strong> {guestName}<br />
              <strong>Email:</strong> {guestEmail}<br />
              <strong>Phone:</strong> {guestPhone}
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>Booking Details</Heading>
            <Text style={text}>
              <strong>Check-In:</strong> {checkIn}<br />
              <strong>Check-Out:</strong> {checkOut}<br />
              <strong>Nights:</strong> {nights}<br />
              <strong>Subtotal:</strong> ${subtotal.toLocaleString()}
            </Text>
            <Text style={textMuted}>Plus taxes and cleaning fees</Text>
          </Section>

          {message && (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Heading style={h2}>Guest Message</Heading>
                <Text style={text}>{message}</Text>
              </Section>
            </>
          )}

          <Hr style={hr} />

          <Text style={textMuted}>
            Log in to your admin dashboard to approve or manage this booking request.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const section = {
  padding: '0 48px',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0 48px',
}

const h2 = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '20px 0 10px',
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
}

const textMuted = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '24px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

