import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend only if API key exists
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null

// HTML Email Templates (simple and reliable)
function generateBookingAdminEmail(data: any) {
  return `
    <h2>🏔️ New Booking Request</h2>
    <h3>Property</h3>
    <p><strong>${data.propertyName}</strong></p>
    <hr />
    <h3>Guest Information</h3>
    <p>
      <strong>Name:</strong> ${data.guestName}<br />
      <strong>Email:</strong> ${data.guestEmail}<br />
      <strong>Phone:</strong> ${data.guestPhone}
    </p>
    <hr />
    <h3>Booking Details</h3>
    <p>
      <strong>Check-In:</strong> ${data.checkIn}<br />
      <strong>Check-Out:</strong> ${data.checkOut}<br />
      <strong>Nights:</strong> ${data.nights}<br />
      <strong>Subtotal:</strong> $${data.subtotal.toLocaleString()}
    </p>
    <p style="color: #666; font-size: 14px;">Plus taxes and cleaning fees</p>
    ${data.message ? `<hr /><h3>Guest Message</h3><p>${data.message}</p>` : ''}
    <hr />
    <p style="color: #666; font-size: 14px;">Log in to your admin dashboard to approve or manage this booking.</p>
  `
}

function generateGuestConfirmationEmail(data: any) {
  return `
    <h2 style="color: #2e7d32;">Thank You for Your Booking Request!</h2>
    <p>Hi ${data.guestName},</p>
    <p>We've received your booking request for <strong>${data.propertyName}</strong>. Our team will review your request and get back to you shortly.</p>
    <hr />
    <h3>Your Booking Details</h3>
    <p>
      <strong>Property:</strong> ${data.propertyName}<br />
      <strong>Check-In:</strong> ${data.checkIn}<br />
      <strong>Check-Out:</strong> ${data.checkOut}<br />
      <strong>Nights:</strong> ${data.nights}<br />
      <strong>Subtotal:</strong> $${data.subtotal.toLocaleString()}
    </p>
    <p style="color: #666; font-size: 14px;">Plus taxes and cleaning fees</p>
    <hr />
    <h3>What Happens Next?</h3>
    <p>
      1. We'll review your request within 24 hours<br />
      2. You'll receive a confirmation email once approved<br />
      3. We'll send you check-in instructions and details
    </p>
    <hr />
    <h3>Questions?</h3>
    <p>
      Feel free to contact us:<br />
      <strong>Cell:</strong> 720-987-5385<br />
      <strong>Office:</strong> 719-687-1476<br />
      <strong>Email:</strong> christy@utepassvacationrentals.com
    </p>
    <hr />
    <p style="color: #666; font-size: 14px;">
      Ute Pass Vacation Rentals<br />
      Family-owned rental management with a personal touch since 2008
    </p>
  `
}

function generateApprovalEmail(data: any) {
  return `
    <h2 style="color: #2e7d32;">🎉 Your Booking is Confirmed!</h2>
    <p>Great news, ${data.guestName}!</p>
    <p>Your reservation for <strong>${data.propertyName}</strong> has been approved. We're excited to host you!</p>
    <hr />
    <h3>Your Confirmed Reservation</h3>
    <p>
      <strong>Property:</strong> ${data.propertyName}<br />
      <strong>Check-In:</strong> ${data.checkIn} (after 4:00 PM)<br />
      <strong>Check-Out:</strong> ${data.checkOut} (before 10:00 AM)<br />
      <strong>Nights:</strong> ${data.nights}<br />
      <strong>Subtotal:</strong> $${data.subtotal.toLocaleString()}
    </p>
    <p style="color: #666; font-size: 14px;">Plus taxes and cleaning fees</p>
    <hr />
    <h3>Next Steps</h3>
    <p>We'll send you detailed check-in instructions closer to your arrival date, including:</p>
    <p>
      • Property access codes and keys<br />
      • WiFi information<br />
      • Local recommendations<br />
      • Emergency contact information
    </p>
    <hr />
    <h3>Contact Us</h3>
    <p>
      Have questions? We're here to help!<br />
      <strong>Cell:</strong> 720-987-5385<br />
      <strong>Office:</strong> 719-687-1476<br />
      <strong>Email:</strong> christy@utepassvacationrentals.com
    </p>
    <hr />
    <p style="color: #666; font-size: 14px;">
      We look forward to welcoming you!<br /><br />
      The Sutton Family<br />
      Ute Pass Vacation Rentals
    </p>
  `
}

function generateRejectionEmail(data: any) {
  return `
    <h2 style="color: #d32f2f;">Booking Request Update</h2>
    <p>Hi ${data.guestName},</p>
    <p>Thank you for your interest in <strong>${data.propertyName}</strong>. Unfortunately, the property is not available for your requested dates:</p>
    <p>
      <strong>Requested Dates:</strong><br />
      Check-In: ${data.checkIn}<br />
      Check-Out: ${data.checkOut}
    </p>
    <hr />
    <h3>We'd Love to Help!</h3>
    <p>We have other beautiful properties that might be available for your dates, or we can suggest alternative dates for this property.</p>
    <p>Please contact us and we'll work with you to find the perfect accommodation.</p>
    <hr />
    <h3>Contact Us</h3>
    <p>
      <strong>Cell:</strong> 720-987-5385<br />
      <strong>Office:</strong> 719-687-1476<br />
      <strong>Email:</strong> bookings@utepassvacationrentals.com
    </p>
    <p><a href="https://utepassvacationrentals.com/vacation-rentals">Browse All Available Rentals</a></p>
    <hr />
    <p style="color: #666; font-size: 14px;">
      We appreciate your interest and hope to host you soon!<br /><br />
      The Sutton Family<br />
      Ute Pass Vacation Rentals
    </p>
  `
}

function generateCancellationEmail(data: any) {
  return `
    <h2>Booking Cancelled</h2>
    <p>Hi ${data.guestName},</p>
    <p>Your booking request for <strong>${data.propertyName}</strong> has been cancelled.</p>
    <p>
      <strong>Cancelled Reservation:</strong><br />
      Property: ${data.propertyName}<br />
      Check-In: ${data.checkIn}<br />
      Check-Out: ${data.checkOut}
    </p>
    <hr />
    <h3>Still Interested?</h3>
    <p>We'd love to help you find another property or different dates. Please feel free to browse our other beautiful vacation rentals or contact us directly.</p>
    <hr />
    <h3>Contact Us</h3>
    <p>
      <strong>Cell:</strong> 720-987-5385<br />
      <strong>Office:</strong> 719-687-1476<br />
      <strong>Email:</strong> bookings@utepassvacationrentals.com
    </p>
    <p><a href="https://utepassvacationrentals.com/vacation-rentals">Browse Our Vacation Rentals</a></p>
    <hr />
    <p style="color: #666; font-size: 14px;">
      Thank you for considering Ute Pass Vacation Rentals.<br /><br />
      The Sutton Family
    </p>
  `
}

function generateContactEmail(data: any) {
  return `
    <h2>📧 Contact Form Submission</h2>
    <h3>Contact Information</h3>
    <p>
      <strong>Name:</strong> ${data.fullName}<br />
      <strong>Email:</strong> ${data.email}<br />
      ${data.phone ? `<strong>Phone:</strong> ${data.phone}<br />` : ''}
      <strong>Inquiry Type:</strong> ${data.inquiryType}
    </p>
    <hr />
    <h3>Subject</h3>
    <p>${data.subject}</p>
    <hr />
    <h3>Message</h3>
    <p>${data.message}</p>
    <hr />
    <p style="color: #666; font-size: 14px;">Sent from Ute Pass Vacation Rentals contact form</p>
  `
}

export async function POST(request: Request) {
  try {
    if (!resend) {
      return NextResponse.json(
        { error: 'Email service not configured. Please add RESEND_API_KEY to environment variables.' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { type, to: customTo, ...data } = body

    let htmlContent = ''
    let subject = ''
    let to = customTo || process.env.ADMIN_EMAIL || 'atreyusutton@proton.me'

    // Admin notification: New booking request
    if (type === 'booking-admin') {
      htmlContent = generateBookingAdminEmail(data)
      subject = `New Booking Request: ${data.propertyName}`
      to = process.env.ADMIN_EMAIL || 'atreyusutton@proton.me'
    } 
    
    // Guest: Booking request received
    else if (type === 'booking-guest-confirmation') {
      htmlContent = generateGuestConfirmationEmail(data)
      subject = `Booking Request Received - ${data.propertyName}`
    }
    
    // Guest: Booking approved
    else if (type === 'booking-approved') {
      htmlContent = generateApprovalEmail(data)
      subject = `Booking Confirmed! ${data.propertyName}`
    }
    
    // Guest: Booking rejected
    else if (type === 'booking-rejected') {
      htmlContent = generateRejectionEmail(data)
      subject = `Booking Update - ${data.propertyName}`
    }
    
    // Guest: Booking cancelled/deleted
    else if (type === 'booking-cancelled') {
      htmlContent = generateCancellationEmail(data)
      subject = `Booking Cancellation - ${data.propertyName}`
    }
    
    // Contact form
    else if (type === 'contact') {
      htmlContent = generateContactEmail(data)
      subject = `Contact Form: ${data.subject}`
      to = process.env.ADMIN_EMAIL || 'atreyusutton@proton.me'
    } 
    
    else {
      return NextResponse.json({ error: 'Invalid email type' }, { status: 400 })
    }

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Ute Pass Vacation Rentals <onboarding@resend.dev>',
      to,
      subject,
      html: htmlContent,
    })

    if (emailError) {
      console.error('Resend error:', emailError)
      throw emailError
    }

    return NextResponse.json({ success: true, data: emailData })
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}

