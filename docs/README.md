# 📚 Documentation - Ute Pass Vacation Rentals

## Quick Links

Choose what you need:

### 🚀 **Getting Started**
- **[QUICKSTART.md](QUICKSTART.md)** - Run the site, make edits, deploy (5 min read)

### 🌐 **Deployment**
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy to production, domain setup (15 min read)

### 🔧 **Features & Setup**
- **[GOOGLE_MAPS.md](GOOGLE_MAPS.md)** - Maps setup and troubleshooting
- **[VRBO_SYNC.md](VRBO_SYNC.md)** - VRBO calendar integration (when ready)

---

## What's in This Project

### ✅ Built and Working:
- Full vacation rental website
- 9 property listings with images
- Booking system with email notifications
- Admin dashboard for managing reservations
- Google Maps on each property
- Contact form
- Mobile responsive design

### 🔌 Services Connected:
- **Database:** Neon PostgreSQL (free tier)
- **Email:** Resend (free tier - 3,000 emails/month)
- **Maps:** Google Maps API (free $200/month credit)
- **Hosting:** Ready for Vercel (free tier)

### 💰 Monthly Cost: $0
Everything runs on free tiers!

---

## Quick Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database commands
npm run db:push      # Push schema changes
npm run db:studio    # Open database GUI
```

---

## File Structure

```
├── app/                    # Next.js pages and routes
│   ├── page.tsx           # Homepage
│   ├── vacation-rentals/  # Property listings
│   ├── contact/           # Contact page
│   └── admin/             # Admin dashboard
├── components/            # Reusable components
├── lib/                   # Utilities and helpers
├── public/                # Static assets (images, data)
├── prisma/                # Database schema
└── docs/                  # This documentation
```

---

## Environment Variables

Required in `.env.local`:

```bash
DATABASE_URL=                        # Neon database
RESEND_API_KEY=                     # Email service
ADMIN_EMAIL=                        # Where notifications go
NEXT_PUBLIC_ADMIN_PASSWORD=         # Admin dashboard login
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=    # Google Maps
NEXT_PUBLIC_SITE_URL=               # Your domain
```

---

## Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Neon Dashboard:** https://console.neon.tech/
- **Resend Dashboard:** https://resend.com/
- **Google Cloud Console:** https://console.cloud.google.com/

---

## Project Info

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Email:** Resend + React Email
- **Maps:** Google Maps JavaScript API

---

**Ready to get started? Open [QUICKSTART.md](QUICKSTART.md)**
