#!/bin/bash

# Test email system by sending a test email

echo "📧 Testing Resend Email System"
echo "================================"
echo ""

# Check if server is running
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Dev server not running!"
    echo "Run: npm run dev"
    exit 1
fi

echo "Sending test email..."
echo ""

# Send test contact form email
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "type": "contact",
    "fullName": "Test User",
    "email": "test@example.com",
    "phone": "555-1234",
    "inquiryType": "General",
    "subject": "Test Email from CLI",
    "message": "This is a test email sent via the CLI script to verify Resend is working!"
  }'

echo ""
echo ""
echo "✅ Email sent!"
echo "📬 Check: atreyusutton@proton.me"
echo ""
echo "If you received the email, Resend is working! 🎉"

