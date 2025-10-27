# ⚡ Quick Start Guide

## Run the Site (2 minutes)

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Open in browser
http://localhost:3000
```

That's it! The site is running. ✅

---

## Make Changes

### Edit Content
- **Homepage:** `app/page.tsx`
- **Property Data:** `public/assets/data/vacation-rentals/*.json`
- **Contact Info:** `app/contact/page.tsx`

### After Editing
- Save the file
- Browser auto-refreshes
- Changes appear instantly

---

## Test Features

### Test Bookings
1. Go to any property page
2. Select dates on calendar
3. Fill out booking form
4. Submit
5. Check email for confirmation
6. Check `/admin` to see booking

### Test Admin Dashboard
1. Go to: `http://localhost:3000/admin`
2. Password: (check `.env.local` for `NEXT_PUBLIC_ADMIN_PASSWORD`)
3. View/manage all bookings
4. Test approving/rejecting/deleting

### Test Maps
1. Go to any property page
2. Scroll to bottom
3. Map should display property location

---

## Environment Setup

### If Starting Fresh

1. **Copy environment template:**
```bash
# .env.local should contain:
DATABASE_URL="your_neon_url"
RESEND_API_KEY="your_resend_key"
ADMIN_EMAIL="atreyusutton@proton.me"
NEXT_PUBLIC_ADMIN_PASSWORD="admin123"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your_maps_key"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

2. **Set up database:**
```bash
npm run db:push
```

3. **Done!**

---

## Deploy to Production

### Quick Deploy (30 min)

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready to deploy"
git push
```

2. **Deploy to Vercel**
- Go to: https://vercel.com
- Import your GitHub repo
- Add environment variables
- Deploy

3. **Live!**
Your site is at: `https://yourproject.vercel.app`

**Full deployment guide:** See [DEPLOYMENT.md](DEPLOYMENT.md)

---

## Common Tasks

### Add a New Property
1. Create JSON file: `public/assets/data/vacation-rentals/property-name.json`
2. Add images to: `public/assets/images/vacation-rentals/property-name/`
3. Copy structure from existing property JSON
4. Restart dev server

### Change Admin Password
1. Edit `.env.local`
2. Update: `NEXT_PUBLIC_ADMIN_PASSWORD=yournewpassword`
3. Restart dev server
4. (In production) Update in Vercel environment variables

### Update Contact Info
1. Edit: `app/contact/page.tsx`
2. Find contact information section
3. Update phone, email, address
4. Save (auto-refreshes)

### Add More Images to Property
1. Add images to: `public/assets/images/vacation-rentals/property-name/`
2. Edit property JSON file
3. Add image paths to `images.gallery` array
4. Refresh browser

---

## Troubleshooting

### Site Won't Start
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Database Errors
```bash
# Reset database schema
npm run db:push

# View database
npm run db:studio
```

### Maps Not Loading
- Check `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in `.env.local`
- Verify APIs are enabled in Google Cloud Console
- Restart dev server

### Emails Not Sending
- Check `RESEND_API_KEY` in `.env.local`
- Verify API key is active in Resend dashboard
- Check spam folder

---

## Next Steps

- ✅ Site is running
- ✅ You can make edits
- ✅ Ready to deploy

**To deploy:** Read [DEPLOYMENT.md](DEPLOYMENT.md)

**For maps setup:** Read [GOOGLE_MAPS.md](GOOGLE_MAPS.md)

**For VRBO sync:** Read [VRBO_SYNC.md](VRBO_SYNC.md) when ready
