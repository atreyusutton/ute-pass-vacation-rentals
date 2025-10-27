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

interface BookingRejectedProps {
  guestName: string
  propertyName: string
  checkIn: string
  checkOut: string
}

export default function BookingRejected({
  guestName,
  propertyName,
  checkIn,
  checkOut,
}: BookingRejectedProps) {
  return (
    <Html>
      <Head />
      <Preview>Update on your booking request for {propertyName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Booking Request Update</Heading>
          
          <Text style={text}>
            Hi {guestName},
          </Text>

          <Text style={text}>
            Thank you for your interest in <strong>{propertyName}</strong>. 
            Unfortunately, the property is not available for your requested dates:
          </Text>

          <Section style={section}>
            <Text style={text}>
              <strong>Requested Dates:</strong><br />
              Check-In: {checkIn}<br />
              Check-Out: {checkOut}
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>We&apos;d Love to Help!</Heading>
            <Text style={text}>
              We have other beautiful properties that might be available for your dates, 
              or we can suggest alternative dates for this property.
            </Text>
            <Text style={text}>
              Please contact us and we&apos;ll work with you to find the perfect accommodation:
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>Contact Us</Heading>
            <Text style={text}>
              <strong>Cell:</strong> 720-987-5385<br />
              <strong>Office:</strong> 719-687-1476<br />
              <strong>Email:</strong> <Link href="mailto:bookings@utepassvacationrentals.com">bookings@utepassvacationrentals.com</Link>
            </Text>
            <Text style={text}>
              <strong>Browse other properties:</strong><br />
              <Link href="https://utepassvacationrentals.com/vacation-rentals">
                View All Available Rentals
              </Link>
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={textMuted}>
            We appreciate your interest and hope to host you soon!<br />
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
  color: '#d32f2f',
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

