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

interface ContactFormEmailProps {
  fullName: string
  email: string
  phone?: string
  inquiryType: string
  subject: string
  message: string
}

export default function ContactFormEmail({
  fullName,
  email,
  phone,
  inquiryType,
  subject,
  message,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Contact form: {subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>📧 Contact Form Submission</Heading>
          
          <Section style={section}>
            <Heading style={h2}>Contact Information</Heading>
            <Text style={text}>
              <strong>Name:</strong> {fullName}<br />
              <strong>Email:</strong> {email}<br />
              {phone && <><strong>Phone:</strong> {phone}<br /></>}
              <strong>Inquiry Type:</strong> {inquiryType}
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>Subject</Heading>
            <Text style={text}>{subject}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>Message</Heading>
            <Text style={text}>{message}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={textMuted}>
            Sent from Ute Pass Vacation Rentals contact form
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

