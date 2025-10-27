#!/bin/bash

# Restart development server

echo "🔄 Restarting development server..."
echo ""

# Kill server on port 3000
echo "Stopping server on port 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null

# Kill Prisma Studio on port 5555 (if running)
echo "Stopping Prisma Studio on port 5555..."
lsof -ti:5555 | xargs kill -9 2>/dev/null

# Clear Next.js cache (optional but recommended)
echo "Clearing cache..."
rm -rf .next

echo ""
echo "✅ Servers stopped and cache cleared"
echo ""
echo "🚀 Starting fresh dev server..."
echo ""

# Start dev server
npm run dev

