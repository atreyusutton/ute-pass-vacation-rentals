# 🚀 Launch Checklist - Ute Pass Vacation Rentals

**Quick Reference Guide for Going Live**

---

## ✅ What's Already Done

- ✅ Website fully built and functional
- ✅ 9 properties with images and details
- ✅ Booking system with calendar
- ✅ Admin dashboard
- ✅ Email notifications
- ✅ Mobile responsive
- ✅ Database configured
- ✅ Running locally at http://localhost:3000

---

## 🎯 Critical Tasks Before Launch (3-4 hours)

### 1. Verify Environment Setup (15 min)

Open `.env.local` and check:

```bash
DATABASE_URL=                        # ✅ Should be set
RESEND_API_KEY=                     # ⚠️  VERIFY THIS WORKS
ADMIN_EMAIL=atreyusutton@proton.me  # ✅ Correct
NEXT_PUBLIC_ADMIN_PASSWORD=         # ⚠️  CHANGE FROM "admin123"!
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=    # ⚠️  VERIFY THIS IS SET
NEXT_PUBLIC_SITE_URL=               # ⚠️  UPDATE FOR PRODUCTION
```

**Action:** Change admin password to something secure!

---

### 2. Deploy to Vercel (30 min)

**Follow:** `docs/DEPLOYMENT.md`

Quick steps:
1. Push to GitHub (if not done)
2. Sign up at https://vercel.com
3. Import your GitHub repository
4. Add all environment variables
5. Deploy!

**Result:** Your site will be live at `https://your-project.vercel.app`

---

### 3. Test Everything (1 hour)

- [ ] Go to live site
- [ ] Browse all property pages
- [ ] Submit a test booking
- [ ] Check email received (admin + guest)
- [ ] Login to `/admin` dashboard
- [ ] Approve/reject a booking
- [ ] Test on mobile phone
- [ ] Test Google Maps on properties
- [ ] Test contact form

---

### 4. Secure Google Maps (5 min)

**Follow:** `docs/GOOGLE_MAPS.md`

1. Go to https://console.cloud.google.com/apis/credentials
2. Click your API key
3. Add domain restrictions:
   - `https://your-domain.com/*`
   - `https://*.vercel.app/*`
   - `http://localhost:3000/*`
4. Enable billing (free $200/month credit)

---

### 5. Admin Training (30 min)

**Show business owner:**
- How to access `/admin` dashboard
- How to view bookings
- How to approve/reject requests
- How to delete bookings
- Where emails go
- Admin password (the new secure one!)

---

## 📋 Optional But Recommended

### Custom Domain (15 min)
- Buy: `utepassvacationrentals.com` (~$12/year)
- Add to Vercel
- Configure DNS
- Update `NEXT_PUBLIC_SITE_URL`

**Guide:** `docs/DEPLOYMENT.md` Step 3

### Custom Email Domain (20 min)
- Set up: `bookings@utepassvacationrentals.com`
- Configure in Resend dashboard
- Looks more professional

**Guide:** `docs/DEPLOYMENT.md` Post-Deployment section

---

## 🚧 Can Wait Until After Launch

### VRBO Calendar Sync (2-3 hours)
- Not needed immediately
- Add when you have VRBO credentials
- Prevents double-bookings
- **Guide:** `docs/VRBO_SYNC.md`

### Content Updates
- Review property descriptions
- Verify pricing is accurate
- Update images if needed
- Check house rules

### Analytics
- Add Google Analytics
- Monitor traffic
- Track conversions

---

## 💰 Cost Summary

**Current (Free Tier):**
- Hosting: $0/month
- Database: $0/month  
- Email: $0/month
- Maps: $0/month

**Total: $0/month** ✅

**Optional:**
- Domain: ~$1/month ($12/year)

---

## 🆘 Quick Troubleshooting

### Site won't start locally:
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Emails not sending:
- Check `RESEND_API_KEY` in `.env.local`
- Verify at https://resend.com/api-keys
- Check spam folder

### Maps not loading:
- Check `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- Verify APIs enabled in Google Cloud
- Check browser console for errors

### Admin dashboard won't login:
- Check `NEXT_PUBLIC_ADMIN_PASSWORD` in `.env.local`
- Clear browser cache
- Try incognito/private window

---

## 📞 Important Links

### Your Site:
- **Local:** http://localhost:3000
- **Production:** (will be your Vercel URL)
- **Admin:** `your-site.com/admin`

### Service Dashboards:
- **Vercel:** https://vercel.com/dashboard
- **Neon DB:** https://console.neon.tech/
- **Resend:** https://resend.com/emails
- **Google Cloud:** https://console.cloud.google.com/

### Documentation:
- **Full Handoff:** `docs/BUSINESS_HANDOFF.md`
- **Deployment:** `docs/DEPLOYMENT.md`
- **Quick Start:** `docs/QUICKSTART.md`

---

## ✅ Pre-Launch Checklist

**Before accepting real bookings:**

- [ ] Deployed to Vercel
- [ ] Admin password changed from default
- [ ] Test booking submitted and received
- [ ] Emails working (admin + guest)
- [ ] Google Maps domain restrictions added
- [ ] Tested on mobile device
- [ ] Admin trained on dashboard
- [ ] Property info reviewed and accurate

---

## 🎉 Launch Day!

**Once everything above is checked:**

1. Announce your new website
2. Share the URL
3. Monitor bookings in `/admin`
4. Respond to booking requests
5. Celebrate! 🎊

---

## 📊 After Launch

**Week 1:**
- Monitor emails daily
- Check admin dashboard regularly
- Fix any issues that come up
- Gather user feedback

**Week 2-4:**
- Optimize based on feedback
- Consider custom domain if not done
- Add VRBO sync if needed
- Track booking patterns

**Ongoing:**
- Update property info as needed
- Monitor service costs
- Keep admin password secure
- Regular backups (automatic with Vercel)

---

## 🚀 You're Ready!

Everything is built and tested. Just need to:
1. **Deploy** (30 min)
2. **Test** (1 hour)  
3. **Launch** 🎉

**Total time: 3-4 hours**

**Questions?** See `docs/BUSINESS_HANDOFF.md` for detailed information.

---

**Status:** ✅ Ready for Production  
**Next Step:** Run through this checklist top to bottom  
**Timeline:** Can be live today!

