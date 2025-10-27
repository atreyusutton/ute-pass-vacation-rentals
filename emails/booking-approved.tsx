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

interface BookingApprovedProps {
  guestName: string
  propertyName: string
  checkIn: string
  checkOut: string
  nights: number
  subtotal: number
}

export default function BookingApproved({
  guestName,
  propertyName,
  checkIn,
  checkOut,
  nights,
  subtotal,
}: BookingApprovedProps) {
  return (
    <Html>
      <Head />
      <Preview>Your booking for {propertyName} has been approved!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>🎉 Your Booking is Confirmed!</Heading>
          
          <Text style={text}>
            Great news, {guestName}!
          </Text>

          <Text style={text}>
            Your reservation for <strong>{propertyName}</strong> has been approved. 
            We&apos;re excited to host you!
          </Text>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>Your Confirmed Reservation</Heading>
            <Text style={text}>
              <strong>Property:</strong> {propertyName}<br />
              <strong>Check-In:</strong> {checkIn} (after 4:00 PM)<br />
              <strong>Check-Out:</strong> {checkOut} (before 10:00 AM)<br />
              <strong>Nights:</strong> {nights}<br />
              <strong>Subtotal:</strong> ${subtotal.toLocaleString()}
            </Text>
            <Text style={textMuted}>Plus taxes and cleaning fees</Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>Next Steps</Heading>
            <Text style={text}>
              We&apos;ll send you detailed check-in instructions closer to your arrival date, including:
            </Text>
            <Text style={text}>
              • Property access codes and keys<br />
              • WiFi information<br />
              • Local recommendations<br />
              • Emergency contact information
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>Contact Us</Heading>
            <Text style={text}>
              Have questions? We&apos;re here to help!<br />
              <strong>Cell:</strong> 720-987-5385<br />
              <strong>Office:</strong> 719-687-1476<br />
              <strong>Email:</strong> <Link href="mailto:christy@utepassvacationrentals.com">christy@utepassvacationrentals.com</Link>
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={textMuted}>
            We look forward to welcoming you!<br />
            <br />
            The Sutton Family<br />
            Ute Pass Vacation Rentals
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

