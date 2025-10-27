# 🚀 Deployment Guide

Deploy your vacation rental website in 30 minutes.

---

## Prerequisites

- [ ] Site working locally (`npm run dev`)
- [ ] GitHub account
- [ ] All environment variables in `.env.local`

---

## Step 1: Push to GitHub (5 min)

```bash
cd /Users/atreyu/Desktop/ute-pass-vacation-rentals

# Initialize git (if needed)
git init
git add .
git commit -m "Ready for deployment"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/ute-pass-vacation-rentals.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Vercel (10 min)

### 2.1 Sign Up
1. Go to: **https://vercel.com/signup**
2. Sign in with GitHub (recommended)
3. Free tier is perfect

### 2.2 Import Project
1. Click **"Add New"** → **"Project"**
2. Select your GitHub repository
3. Vercel auto-detects Next.js ✅
4. Click **"Deploy"** (will fail without env vars - that's OK!)

### 2.3 Add Environment Variables
After deploy (it will show errors):

1. Go to: **Settings** → **Environment Variables**
2. Add these (copy from your `.env.local`):

```bash
DATABASE_URL=your_neon_database_url
RESEND_API_KEY=your_resend_key
ADMIN_EMAIL=atreyusutton@proton.me
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

**Important:**
- Add to **Production**, **Preview**, and **Development**
- Click **Save** after each

### 2.4 Redeploy
1. Go to **Deployments**
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes

### 🎉 Your site is LIVE!
Visit: `https://your-project.vercel.app`

---

## Step 3: Custom Domain (Optional - 15 min)

### 3.1 Buy Domain
**Recommended:** `utepassvacationrentals.com`

**Where to buy:** (~$12/year)
- Namecheap: https://www.namecheap.com
- Cloudflare: https://www.cloudflare.com/products/registrar
- Google Domains: https://domains.google

### 3.2 Add to Vercel
1. **Settings** → **Domains**
2. Add: `utepassvacationrentals.com`
3. Add: `www.utepassvacationrentals.com`

### 3.3 Configure DNS
In your domain registrar (Namecheap, Cloudflare, etc.):

**Record 1 - Root Domain:**
```
Type: A
Host: @
Value: 76.76.21.21
```

**Record 2 - WWW:**
```
Type: CNAME
Host: www
Value: cname.vercel-dns.com
```

### 3.4 Wait for DNS
- Takes 10-60 minutes
- Check at: https://www.whatsmydns.net/
- Vercel shows "Valid" when ready

### 3.5 Update Environment
1. Go to **Environment Variables**
2. Update: `NEXT_PUBLIC_SITE_URL=https://utepassvacationrentals.com`
3. **Redeploy**

---

## Step 4: Secure Google Maps (5 min)

### 4.1 Add Domain Restrictions
1. Go to: https://console.cloud.google.com/apis/credentials
2. Click your API key
3. **Application restrictions** → **HTTP referrers**
4. Add:
```
https://utepassvacationrentals.com/*
https://www.utepassvacationrentals.com/*
https://*.vercel.app/*
http://localhost:3000/*
```

### 4.2 Enable Billing
1. Go to: https://console.cloud.google.com/billing
2. Add payment method
3. You get $200/month FREE credit
4. Set budget alert at $50 (optional)

**Cost:** Likely $0/month (within free tier)

---

## Step 5: Test Live Site (10 min)

Visit your site and verify:

- [ ] Homepage loads
- [ ] All property pages work
- [ ] Maps display (scroll to bottom of properties)
- [ ] Calendar works
- [ ] Can select dates and see pricing
- [ ] Booking form submits
- [ ] Emails send
- [ ] Admin dashboard works (`/admin`)
- [ ] Can view/manage bookings
- [ ] Mobile responsive

**Test booking flow:**
1. Go to any property
2. Select dates
3. Fill booking form
4. Submit
5. Check email received
6. Check booking in `/admin`
7. Try approving/rejecting

---

## Post-Deployment

### Update Resend Domain (Optional - Professional emails)

**Currently:** Using Resend test domain  
**Better:** Your own domain

1. **In Resend:** Add domain `utepassvacationrentals.com`
2. Add DNS records (Resend shows you what to add)
3. Verify domain
4. Update: `RESEND_FROM_EMAIL=bookings@utepassvacationrentals.com`
5. Redeploy

### Set Up Custom Email (Optional)

**Free Option - Zoho Mail:**
- 5 users free
- Go to: https://www.zoho.com/mail/
- Add domain, configure DNS
- Create: `bookings@`, `christy@`, etc.

**Paid Option - Google Workspace:**
- $6/user/month
- Full Gmail with custom domain
- Go to: https://workspace.google.com/

---

## Monitoring

### Vercel Dashboard
- **Deployments:** See build logs
- **Functions:** See runtime logs
- **Analytics:** View traffic (if enabled)

### Database (Neon)
- https://console.neon.tech/
- Check connections, queries, storage

### Email (Resend)
- https://resend.com/emails
- See sent emails, delivery status

---

## Automatic Deployments

**Now configured automatically:**
- Push to GitHub → Auto-deploys to Vercel
- Every commit to `main` branch deploys
- Pull requests create preview deployments

```bash
# To deploy changes:
git add .
git commit -m "Updated contact info"
git push

# Vercel automatically deploys!
```

---

## Costs

### Free Tier (What You're Using):
- **Vercel:** Free
- **Neon:** Free (512 MB)
- **Resend:** Free (3,000 emails/month)
- **Google Maps:** Free ($200 credit/month)

### **Total: $0/month** 🎉

### Optional Costs:
- Domain: ~$12/year
- Custom email: $0 (Zoho) or $6/month (Google)

---

## Troubleshooting

### Build Failed
**Check:** Vercel build logs  
**Common issues:**
- Missing environment variables
- TypeScript errors
- Missing dependencies

**Fix:** Add all env vars, test locally with `npm run build`

### 500 Error
**Check:** Vercel function logs  
**Common issues:**
- Database connection
- Missing environment variable

**Fix:** Verify `DATABASE_URL` is correct

### Maps Not Loading
**Check:**
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set
- Domain in API key restrictions
- Billing enabled in Google Cloud

### Emails Not Sending
**Check:**
- `RESEND_API_KEY` is correct
- Email verified in Resend
- Check Resend logs

---

## Deployment Checklist

### Pre-Deploy
- [ ] Test locally
- [ ] Commit to git
- [ ] Push to GitHub

### Vercel
- [ ] Account created
- [ ] Project imported
- [ ] Environment variables added
- [ ] Deployed successfully
- [ ] Site tested

### Domain (Optional)
- [ ] Domain purchased
- [ ] Added to Vercel
- [ ] DNS configured
- [ ] HTTPS working

### Security
- [ ] Google Maps restricted
- [ ] Billing enabled
- [ ] Admin password changed from default

---

## You're Live! 🚀

**Your site is now:**
- ✅ Hosted on Vercel (free)
- ✅ SSL/HTTPS enabled (automatic)
- ✅ Global CDN (fast worldwide)
- ✅ Auto-deploys on git push
- ✅ Production-ready

**Next steps:**
- Share your site!
- Add VRBO sync when ready (see [VRBO_SYNC.md](VRBO_SYNC.md))
- Monitor bookings in admin dashboard

---

**Need help?** Check Vercel docs: https://vercel.com/docs

