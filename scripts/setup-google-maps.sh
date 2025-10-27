#!/bin/bash

# Google Maps API Setup Script
# This script helps you add the Google Maps API key to your environment

echo "================================================"
echo "Google Maps API Key Setup"
echo "================================================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "Creating .env.local file..."
    touch .env.local
fi

# Check if the key already exists
if grep -q "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY" .env.local; then
    echo "⚠️  Google Maps API key already exists in .env.local"
    echo ""
    read -p "Do you want to replace it? (y/n): " replace
    
    if [ "$replace" = "y" ] || [ "$replace" = "Y" ]; then
        # Remove existing key
        sed -i.bak '/NEXT_PUBLIC_GOOGLE_MAPS_API_KEY/d' .env.local
        echo "Existing key removed."
    else
        echo "Keeping existing key. Exiting."
        exit 0
    fi
fi

# Prompt for API key
echo ""
echo "Please enter your Google Maps API key:"
echo "(You can get this from: https://console.cloud.google.com/)"
echo ""
read -p "API Key: " api_key

# Validate input
if [ -z "$api_key" ]; then
    echo ""
    echo "❌ Error: API key cannot be empty"
    exit 1
fi

# Add to .env.local
echo "" >> .env.local
echo "# Google Maps API Configuration" >> .env.local
echo "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=$api_key" >> .env.local

echo ""
echo "✅ Success! Google Maps API key has been added to .env.local"
echo ""
echo "Next steps:"
echo "  1. Make sure you've enabled these APIs in Google Cloud Console:"
echo "     - Maps JavaScript API"
echo "     - Geocoding API"
echo "     - Places API"
echo ""
echo "  2. Restart your development server:"
echo "     npm run dev"
echo ""
echo "  3. Test by visiting a property page, e.g.:"
echo "     http://localhost:3000/vacation-rentals/antlers"
echo ""
echo "For detailed setup instructions, see:"
echo "  docs/GOOGLE_MAPS_SETUP.md"
echo ""
echo "================================================"


