#!/bin/bash

# Complete setup script - runs everything

echo "🏔️  Ute Pass Vacation Rentals - Complete Setup"
echo "=============================================="
echo ""

# Step 1: Check .env.local
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local..."
    ./setup-env.sh
    echo ""
fi

# Step 2: Install dependencies
echo "📦 Installing dependencies..."
npm install
echo ""

# Step 3: Generate Prisma Client
echo "🔧 Generating Prisma Client..."
export $(cat .env.local | grep -v '^#' | xargs)
npm run db:generate
echo ""

# Step 4: Push database schema
echo "🚀 Setting up database..."
npm run db:push --accept-data-loss
echo ""

# Step 5: Copy assets
echo "📸 Copying image assets..."
cp -r assets/images/* public/assets/images/
cp -r assets/data/* public/assets/data/
echo ""

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Add Resend API key to .env.local (optional for now)"
echo "2. Run: npm run dev"
echo "3. Visit: http://localhost:3000"
echo "4. Test booking: http://localhost:3000/vacation-rentals/antlers"
echo "5. Access admin: http://localhost:3000/admin (password: admin123)"
echo ""
echo "📚 Read: COMPLETE_WALKTHROUGH.md for full guide"

