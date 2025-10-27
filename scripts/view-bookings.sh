#!/bin/bash

# View all bookings in terminal

echo "📊 Viewing all bookings from database..."
echo ""

export $(cat .env.local | grep -v '^#' | xargs)

npx prisma db execute --stdin <<SQL
SELECT 
    "propertyName" as "Property",
    "guestName" as "Guest",
    TO_CHAR("checkIn", 'Mon DD') as "Check-In",
    TO_CHAR("checkOut", 'Mon DD') as "Check-Out",
    "numberOfNights" as "Nights",
    "status" as "Status"
FROM "Booking"
ORDER BY "checkIn" ASC;
SQL

echo ""
echo "💡 Tip: Run 'npm run db:studio' for a visual interface"

