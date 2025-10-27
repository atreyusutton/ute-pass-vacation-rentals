# Ute Pass Vacation Rentals Website

Family-owned vacation rental website built with Next.js, TypeScript, and Tailwind CSS.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
http://localhost:3000
```

**Full guide:** [docs/QUICKSTART.md](docs/QUICKSTART.md)

---

## 📚 Documentation

| Guide | Description | Time |
|-------|-------------|------|
| **[QUICKSTART.md](docs/QUICKSTART.md)** | Run site, make changes, basic tasks | 5 min |
| **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** | Deploy to Vercel, custom domain | 15 min |
| **[GOOGLE_MAPS.md](docs/GOOGLE_MAPS.md)** | Maps setup and troubleshooting | 5 min |
| **[VRBO_SYNC.md](docs/VRBO_SYNC.md)** | VRBO calendar integration (future) | Info |

**Start here:** [docs/README.md](docs/README.md)

---

## ✅ What's Built

- **9 Property Listings** - Full details, images, pricing
- **Booking System** - Calendar, form, email notifications
- **Admin Dashboard** - Manage reservations at `/admin`
- **Google Maps** - Location maps on each property
- **Contact Form** - Email integration
- **Mobile Responsive** - Works on all devices

---

## 🔌 Services

- **Database:** Neon PostgreSQL (free tier)
- **Email:** Resend (free tier - 3,000/month)
- **Maps:** Google Maps API (free $200/month)
- **Hosting:** Ready for Vercel (free tier)

**Monthly Cost:** $0 ✅

---

## 📁 Project Structure

```
├── app/                    # Pages and routes
│   ├── page.tsx           # Homepage
│   ├── vacation-rentals/  # Property listings
│   ├── contact/           # Contact page
│   └── admin/             # Admin dashboard
├── components/            # Reusable components
├── lib/                   # Utilities and helpers
├── public/                # Static assets
├── prisma/                # Database schema
└── docs/                  # Documentation
```

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Email:** Resend + React Email
- **Maps:** Google Maps JavaScript API

---

## 📝 Environment Variables

Required in `.env.local`:

```bash
DATABASE_URL=                        # Neon PostgreSQL
RESEND_API_KEY=                     # Email service
ADMIN_EMAIL=                        # Notification email
NEXT_PUBLIC_ADMIN_PASSWORD=         # Admin login
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=    # Google Maps
NEXT_PUBLIC_SITE_URL=               # Your domain
```

---

## 🚀 Deployment

### Quick Deploy (30 min):

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

**Full guide:** [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

---

## 💰 Costs

### Free Tier (Current):
- Vercel: Free
- Neon: Free (512 MB)
- Resend: Free (3,000 emails/month)
- Google Maps: Free ($200 credit/month)

### **Total: $0/month** 🎉

### Optional:
- Domain: ~$12/year
- Custom email: $0 (Zoho) or $6/month (Google)

---

## 📞 Support

- **Vercel:** https://vercel.com/docs
- **Next.js:** https://nextjs.org/docs
- **Neon:** https://console.neon.tech/
- **Resend:** https://resend.com/

---

## 📋 Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Database
npm run db:push          # Push schema changes
npm run db:studio        # Open database GUI

# Linting
npm run lint             # Check for errors
```

---

## 🎯 Next Steps

1. ✅ Site is built and working
2. ✅ Database and email configured
3. ✅ Google Maps integrated
4. 📍 **You are here**
5. 🚀 Deploy to production ([DEPLOYMENT.md](docs/DEPLOYMENT.md))
6. 🔄 Add VRBO sync when ready ([VRBO_SYNC.md](docs/VRBO_SYNC.md))

---

**Need help?** Check [docs/README.md](docs/README.md) for full documentation.

**Ready to deploy?** See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

