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
  Link,
} from '@react-email/components'

interface GuestBookingConfirmationProps {
  guestName: string
  propertyName: string
  checkIn: string
  checkOut: string
  nights: number
  subtotal: number
}

export default function GuestBookingConfirmation({
  guestName,
  propertyName,
  checkIn,
  checkOut,
  nights,
  subtotal,
}: GuestBookingConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Booking request received for {propertyName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank You for Your Booking Request!</Heading>
          
          <Text style={text}>
            Hi {guestName},
          </Text>

          <Text style={text}>
            We&apos;ve received your booking request for <strong>{propertyName}</strong>. 
            Our team will review your request and get back to you shortly.
          </Text>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>Your Booking Details</Heading>
            <Text style={text}>
              <strong>Property:</strong> {propertyName}<br />
              <strong>Check-In:</strong> {checkIn}<br />
              <strong>Check-Out:</strong> {checkOut}<br />
              <strong>Nights:</strong> {nights}<br />
              <strong>Subtotal:</strong> ${subtotal.toLocaleString()}
            </Text>
            <Text style={textMuted}>Plus taxes and cleaning fees</Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>What Happens Next?</Heading>
            <Text style={text}>
              1. We&apos;ll review your request within 24 hours<br />
              2. You&apos;ll receive a confirmation email once approved<br />
              3. We&apos;ll send you check-in instructions and details
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>Questions?</Heading>
            <Text style={text}>
              Feel free to contact us:<br />
              <strong>Cell:</strong> 720-987-5385<br />
              <strong>Office:</strong> 719-687-1476<br />
              <strong>Email:</strong> <Link href="mailto:christy@utepassvacationrentals.com">christy@utepassvacationrentals.com</Link>
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={textMuted}>
            Ute Pass Vacation Rentals<br />
            Family-owned rental management with a personal touch since 2008
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
  color: '#2e7d32',
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

