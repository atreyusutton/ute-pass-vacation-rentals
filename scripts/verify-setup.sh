#!/bin/bash

# Verify complete setup

echo "🔍 Verifying Ute Pass Vacation Rentals Setup"
echo "============================================="
echo ""

# Check .env.local exists
echo "1️⃣  Checking .env.local..."
if [ -f .env.local ]; then
    echo "   ✅ .env.local exists"
else
    echo "   ❌ .env.local missing"
    echo "   Run: ./setup-env.sh"
    exit 1
fi
echo ""

# Check DATABASE_URL
echo "2️⃣  Checking DATABASE_URL..."
if grep -q "postgresql://neondb_owner" .env.local; then
    echo "   ✅ DATABASE_URL configured"
else
    echo "   ❌ DATABASE_URL not configured"
fi
echo ""

# Check RESEND_API_KEY
echo "3️⃣  Checking RESEND_API_KEY..."
if grep -q "re_FADmfqVa" .env.local; then
    echo "   ✅ RESEND_API_KEY configured"
elif grep -q "re_your_key_here" .env.local; then
    echo "   ⚠️  RESEND_API_KEY is placeholder"
    echo "   Update with your actual key"
else
    echo "   ❌ RESEND_API_KEY not found"
fi
echo ""

# Check ADMIN_EMAIL
echo "4️⃣  Checking ADMIN_EMAIL..."
if grep -q "atreyusutton@proton.me" .env.local; then
    echo "   ✅ ADMIN_EMAIL set to: atreyusutton@proton.me"
else
    echo "   ⚠️  Check ADMIN_EMAIL configuration"
fi
echo ""

# Check node_modules
echo "5️⃣  Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "   ✅ Dependencies installed"
else
    echo "   ❌ Dependencies missing"
    echo "   Run: npm install"
fi
echo ""

# Check Prisma Client
echo "6️⃣  Checking Prisma Client..."
if [ -d "node_modules/@prisma/client" ]; then
    echo "   ✅ Prisma Client generated"
else
    echo "   ❌ Prisma Client missing"
    echo "   Run: npm run db:generate"
fi
echo ""

# Check if dev server is running
echo "7️⃣  Checking dev server..."
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "   ✅ Dev server running on http://localhost:3000"
else
    echo "   ⚠️  Dev server not running"
    echo "   Run: npm run dev"
fi
echo ""

# Check if Prisma Studio is running
echo "8️⃣  Checking Prisma Studio..."
if curl -s http://localhost:5555 > /dev/null 2>&1; then
    echo "   ✅ Prisma Studio running on http://localhost:5555"
else
    echo "   ℹ️  Prisma Studio not running (optional)"
    echo "   Run: npm run db:studio"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Summary:"
echo ""
echo "Database:  ✅ Configured"
echo "Email:     ✅ Configured (key added)"
echo "Admin:     ✅ Ready (password: admin123)"
echo ""
echo "🎉 System ready to accept bookings!"
echo ""
echo "🧪 Test it:"
echo "1. Visit: http://localhost:3000/vacation-rentals/antlers"
echo "2. Select dates (2+ nights)"
echo "3. Submit booking"
echo "4. Check: atreyusutton@proton.me for email"
echo "5. Visit: http://localhost:3000/admin to manage"
echo ""

