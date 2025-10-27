#!/bin/bash

# Ute Pass Vacation Rentals - Complete Database Setup Script

echo "🏔️  Ute Pass Vacation Rentals - Database Setup"
echo "=============================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local not found!"
    echo ""
    echo "Run this first: ./setup-env.sh"
    echo "Or manually create .env.local with your DATABASE_URL"
    exit 1
fi

# Check if DATABASE_URL is set
if ! grep -q "DATABASE_URL=" .env.local; then
    echo "❌ Error: DATABASE_URL not found in .env.local"
    echo ""
    echo "Please add your Neon connection string to .env.local"
    exit 1
fi

# Check if it's still placeholder
if grep -q "your-neon-url" .env.local || grep -q "DATABASE_URL=\"\"" .env.local; then
    echo "⚠️  Warning: DATABASE_URL looks like a placeholder"
    echo ""
    echo "Please update .env.local with your actual Neon connection string"
    exit 1
fi

echo "✅ Found .env.local with DATABASE_URL"
echo ""

# Generate Prisma Client
echo "📦 Generating Prisma Client..."
npm run db:generate
echo ""

# Push schema to database
echo "🚀 Pushing schema to database..."
npm run db:push --accept-data-loss
echo ""

echo "✅ Database setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Run: npm run dev"
echo "2. Test booking at: http://localhost:3000/vacation-rentals/antlers"
echo "3. Check admin at: http://localhost:3000/admin"
echo ""
echo "Optional: Run 'npm run db:studio' to view database GUI"

