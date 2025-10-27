# 🗺️ Google Maps Setup

Maps are already integrated and working! This guide covers setup and troubleshooting.

---

## Quick Setup (5 minutes)

### 1. Get API Key
1. Go to: https://console.cloud.google.com/
2. Sign in with: **atreyublackwellsutton@gmail.com**
3. Create project: "Ute Pass Vacation Rentals"
4. Enable these APIs:
   - Maps JavaScript API
   - Geocoding API
   - Places API
5. **Credentials** → **Create Credentials** → **API Key**
6. Copy your API key

### 2. Add to Project
Add to `.env.local`:
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### 3. Restart Server
```bash
npm run dev
```

### 4. Test
Visit: `http://localhost:3000/vacation-rentals/antlers`  
Scroll to bottom → Map should load!

---

## Production Setup

### Enable Billing (Required)
1. Go to: https://console.cloud.google.com/billing
2. Add payment method
3. You get **$200/month FREE credit**
4. Set budget alert at $50

**Your cost:** Likely $0/month (within free tier)

### Restrict API Key (Security)
1. Go to: https://console.cloud.google.com/apis/credentials
2. Click your API key
3. **Application restrictions:**
   - Select: **HTTP referrers**
   - Add your domains:
   ```
   https://yourdomain.com/*
   https://www.yourdomain.com/*
   https://*.vercel.app/*
   http://localhost:3000/*
   ```
4. **API restrictions:**
   - Select: **Restrict key**
   - Check: Maps JavaScript API, Geocoding API, Places API
5. **Save**

---

## How It Works

### On Each Property Page:
1. Component reads address from property JSON
2. Google Geocoding API converts address to coordinates
3. Map displays with marker at location
4. Interactive controls (zoom, street view, fullscreen)

### Current Addresses:
All properties have specific street addresses in the general area (not exact locations for privacy):
- Antlers: `10 Grandview Ave, Green Mountain Falls, CO 80819`
- Chez Les DuClos: `10 Turkey Cir, Woodland Park, CO 80863`
- Falls #1: `10800 Ute Pass Ave, Green Mountain Falls, CO 80819`
- Falls #2: `10850 Ute Pass Ave, Green Mountain Falls, CO 80819`
- Mountain Cabin: `10875 Belvidere Ave, Green Mountain Falls, CO 80819`
- Mountain Home: `10915 Iona Ave, Green Mountain Falls, CO 80819`
- Olathe: `15 Howard St, Green Mountain Falls, CO 80819`
- Otta-Walla: `20 El Paso Blvd, Green Mountain Falls, CO 80819`
- Sun Valley: `100 Sun Valley Dr, Woodland Park, CO 80863`

---

## Customization

### Change Map Height
Edit `/components/property-map.tsx`:
```typescript
// Find this line:
className="w-full h-[400px] rounded-lg"

// Change to:
className="w-full h-[500px] rounded-lg"  // Taller
```

### Change Zoom Level
Edit `/components/property-map.tsx`:
```typescript
// Find:
zoom: 14,

// Change to:
zoom: 12,  // Zoom out more
zoom: 16,  // Zoom in more
```

### Change Map Type
```typescript
// Find:
mapTypeId: "roadmap",

// Change to:
mapTypeId: "satellite",  // Satellite view
mapTypeId: "hybrid",     // Satellite with labels
mapTypeId: "terrain",    // Terrain view
```

---

## Troubleshooting

### Map Not Loading

**Check 1: API Key**
```bash
# Verify in .env.local
cat .env.local | grep GOOGLE_MAPS

# Should show:
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...
```

**Check 2: Restart Server**
```bash
# Stop server (Ctrl+C)
npm run dev
```

**Check 3: Browser Console**
- Open DevTools (F12 or Cmd+Option+I)
- Check for errors
- Look for Google Maps API messages

### "API Not Activated" Error

**Fix:** Enable APIs in Google Cloud Console
1. Go to: https://console.cloud.google.com/apis/library
2. Search: "Maps JavaScript API" → Enable
3. Search: "Geocoding API" → Enable
4. Search: "Places API" → Enable

### "This page can't load Google Maps correctly"

**Fix:** Enable billing
- Go to: https://console.cloud.google.com/billing
- Add payment method
- Free tier covers normal usage

### Wrong Location Showing

**Fix:** Update address in property JSON
1. Edit: `public/assets/data/vacation-rentals/property-name.json`
2. Update: `"address": "123 Street, City, CO 80819"`
3. Use more specific address
4. Refresh page

### "Do you own this website?" Message

**This is normal!** Google is asking for domain verification.

**For production:**
- Add domain to API key restrictions (see Production Setup above)
- Maps still work fine during development

---

## Migration to Business Account

**When ready to use a business Google account:**

1. Create API key in business account (same steps as setup)
2. Update `.env.local` with new key
3. Update Vercel environment variables (if deployed)
4. Done! No code changes needed

**Migration time:** 5 minutes  
**Downtime:** None

---

## Costs

### Free Tier (Monthly):
- $200 credit
- ~28,500 map loads
- ~950 visitors/day

### Typical Vacation Rental Site:
- 100-200 visitors/day
- ~3,000-6,000 map loads/month
- **Cost: $0/month** ✅

### Monitoring Usage:
- https://console.cloud.google.com/apis/dashboard
- View usage graphs
- Set billing alerts

---

## Support

- **Google Maps JS API Docs:** https://developers.google.com/maps/documentation/javascript
- **Google Cloud Console:** https://console.cloud.google.com/
- **Pricing Calculator:** https://mapsplatform.google.com/pricing/

---

**Maps working? Great! Back to [README.md](README.md)**

