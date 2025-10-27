#!/bin/bash

# Update Resend API key in .env.local

RESEND_KEY="re_FADmfqVa_9K3kTrSLDZ2Zd6Ffj1NmLDUN"

if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local not found!"
    exit 1
fi

# Update the RESEND_API_KEY line
sed -i '' 's/RESEND_API_KEY=.*/RESEND_API_KEY="'"$RESEND_KEY"'"/' .env.local

echo "✅ Updated RESEND_API_KEY in .env.local"
echo ""
echo "📧 Resend is now configured!"
echo ""
echo "🎯 Next steps:"
echo "1. Restart dev server: npm run dev"
echo "2. Test booking: http://localhost:3000/vacation-rentals/antlers"
echo "3. Check email: atreyusutton@proton.me"
echo ""
echo "🎉 Email system is ready!"

