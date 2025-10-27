#!/bin/bash

# Test database connection

echo "🧪 Testing database connection..."
echo ""

export $(cat .env.local | grep -v '^#' | xargs)

npx prisma db execute --stdin <<SQL
SELECT 'Database connection successful!' as message;
SQL

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Database connected successfully!"
    echo "🎉 Your Neon database is working!"
else
    echo ""
    echo "❌ Database connection failed"
    echo "Check your DATABASE_URL in .env.local"
fi

