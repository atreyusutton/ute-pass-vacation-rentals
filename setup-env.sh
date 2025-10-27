#!/bin/bash

# Ute Pass Vacation Rentals - Environment Setup Script
# This creates your .env.local file with the correct configuration

echo "🏔️  Ute Pass Vacation Rentals - Environment Setup"
echo "=================================================="
echo ""

# Create .env.local file
cat > .env.local << 'EOF'
# Ute Pass Vacation Rentals - Environment Variables
# DO NOT COMMIT THIS FILE

# ============================================
# DATABASE (Neon PostgreSQL)
# ============================================
DATABASE_URL="postgresql://neondb_owner:npg_obv0VAz8sDUY@ep-old-hill-aemxz2jy-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require"

# ============================================
# EMAIL (Resend)
# ============================================
# Get your API key from: https://resend.com/api-keys
# IMPORTANT: Replace "re_your_key_here" with your actual Resend API key!
RESEND_API_KEY="re_your_key_here_when_ready"

# Where booking notifications are sent
ADMIN_EMAIL="atreyusutton@proton.me"

# ============================================
# ADMIN DASHBOARD
# ============================================
# Password for /admin access (change this to something secure!)
NEXT_PUBLIC_ADMIN_PASSWORD="admin123"

# ============================================
# SITE CONFIGURATION
# ============================================
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
EOF

echo "✅ Created .env.local file"
echo ""
echo "📝 Next steps:"
echo "1. Open .env.local and add your Resend API key (when ready)"
echo "2. Run: npm run db:push"
echo "3. Run: npm run dev"
echo ""
echo "🎉 Database is already configured!"
echo "📧 Get Resend API key from: https://resend.com/api-keys"

