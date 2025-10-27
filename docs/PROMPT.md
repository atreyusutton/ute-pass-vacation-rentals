# Ute Pass Vacation Rentals — Website Build Prompt (Tailwind, Mobile-Friendly)

**Goal:** Generate a complete, mobile‑responsive website for **Ute Pass Vacation Rentals** (family‑owned vacation rental + property management).  
**Stack Preference:** Tailwind CSS, responsive layout.  
**Deliverables:** Production-ready frontend (Home, Property Management, Vacation Rentals, Contact, individual Listing pages) and a simple backend spec that supports bookings, admin moderation, and calendar sync with VRBO.

**Additional Requirements:**
- Optimize for SEO

---

## Tech Stack

**Frontend:**
- Next.js 14+ (App Router) + TypeScript + Tailwind CSS
- shadcn/ui + Radix UI for components
- React Hook Form + Zod for form validation

**Backend:**
- Next.js API Routes + Server Actions
- Neon (PostgreSQL) - serverless database
- Prisma ORM for database access

**Authentication:**
- Clerk - admin authentication with beautiful pre-built UI

**Services:**
- Hosting: Vercel (with Cloudflare DNS)
- Email: Resend
- Maps: Google Maps API
- Bot Protection: Cloudflare Turnstile
- Calendar: react-big-calendar + date-fns
- VRBO Sync: iCal feeds

**Key Packages:**
- `@clerk/nextjs` - Authentication
- `@prisma/client` - Database ORM
- `react-hook-form` + `zod` - Form handling & validation
- `date-fns` - Date manipulation for pricing
- `resend` + `@react-email/components` - Email service
- `react-big-calendar` - Availability calendar UI
- `@googlemaps/js-api-loader` - Maps integration

---

## Business & Brand

**Business Name:** Ute Pass Vacation Rentals  
**Tagline:** Vacation Property Management in the Beautiful Ute Pass Region

**Primary Contacts:**
- **Cell:** 720-987-5385  
- **Office:** 719-687-1476  
- **Personal Email:** christy@utepassvacationrentals.com  
- **Bookings Email:** bookings@utepassvacationrentals.com  
- **Office Hours:** Mon–Fri 8AM–6PM; Weekend 9AM–5PM

**Design Requirements:**
- Mobile-first, Tailwind CSS
- Clean, modern layout with generous spacing, large hero, and clear CTAs
- Accessible components (focus states, contrast, semantic HTML)
- Make sure all buttons are visible in all states

---

## Site Map

1. **Home**
2. **Property Management**
3. **Vacation Rentals** (grid of property cards)
4. **Listing Detail** (for each property)
5. **Contact**

---

## Assets

- **Favicon:** `assets/images/favicon.png`
- **Logo:** `assets/images/logo.png`

---

## Page Specifications

### 1) Home Page

**Hero Section:**
- Full-bleed hero image (`assets/images/hero.jpg`)
- Headline + short supporting text
- Two primary buttons: **Explore Rentals** and **Get in Touch**

**Services Section (Cards):**
- **Vacation Rentals** — short supporting text
- **Property Management** — short supporting text
- **Contact & Support** — short supporting text

**About Our Family Business:**
- **Blurb:** *Family-owned rental management with a personal touch since 2008.*
- **Story:**
  > Our story began in 2008 when Judy agreed to help a friend manage their vacation rental. What started as a simple favor quickly grew into something special as word spread about our exceptional service and personal attention to detail.  
  > From that single property, we've grown into a trusted family operation serving the beautiful Ute Pass and Colorado Springs area. Our team includes family members who each bring their unique strengths — from maintenance and financial management to guest relations and daily operations.  
  > Today, we continue the tradition Judy started: treating every property owner like family and every guest like a valued friend. We handle everything from guest communication to property maintenance, ensuring your investment thrives while you enjoy peace of mind.

**What Sets Us Apart (Cards):**
- Family owned since 2008
- Personal relationships
- Proven track record
- Comprehensive care

**Final CTA Section:**
- **Heading:** *Ready to experience the family difference?*
- **Buttons:** **View Properties** and **Contact Our Family**

---

### 2) Property Management Page

**Images to Use:**
- `assets/images/property-managment/property-managment-1.jpg`
- `assets/images/property-managment/property-managment-2.jpg`
- `assets/images/property-managment/property-managment-3.jpg`

**Title & Intro:**
- **Title:** *Property Management Services*
- **Subhead:** *Maximize your investment potential with our comprehensive short-term rental management solutions.*

**Why Choose Ute Pass Vacation Rentals?**
- **Copy:**
  > Transform your Colorado property into a profitable vacation rental with our full-service management approach. We combine local market expertise with proven strategies to maximize your revenue while maintaining the highest standards of guest satisfaction and property care.  
  > Our comprehensive management services allow you to enjoy the benefits of rental income without the daily responsibilities. From marketing and bookings to cleaning and maintenance, we handle every aspect of your short-term rental business.

**CTA:** **Get Started Today**

**Our Management Services (Cards):**
- **Complete Property Setup** — Professional photography, compelling property descriptions, and competitive pricing strategy to maximize your property's appeal and revenue potential.
- **Guest Management** — End-to-end guest communication, from inquiry to check-out, ensuring exceptional experiences that lead to positive reviews and repeat bookings.
- **Cleaning & Maintenance** — Professional cleaning after each stay + proactive maintenance to protect your investment.
- **Revenue Optimization** — Dynamic pricing, market analysis, and booking optimization for all seasons.

**Benefits Section (Checklist):**
- ✓ Hands-off property management — we handle everything  
- ✓ Professional marketing across multiple platforms  
- ✓ Competitive management fees with transparent pricing  
- ✓ Local expertise in Ute Pass and Colorado Springs markets  
- ✓ 24/7 emergency response and guest support  
- ✓ Regular property inspections and maintenance coordination

**How It Works (Steps):**
1. **Property Assessment** — Evaluate the property and recommend improvements.  
2. **Setup & Marketing** — Photography, listing creation, and distribution across major booking platforms.  
3. **Guest Management** — Handle communications, bookings, check-ins, and support.  
4. **Ongoing Operations** — Cleaning, maintenance, reporting, continuous optimization.

**Final CTA Block:**
- **Heading:** *Ready to Maximize Your Property's Potential?*  
- **Subtext:** *Let us help you turn your Colorado property into a successful vacation rental. Contact us today for a free consultation and property assessment.*  
- **Buttons:** **Get Free Consultation** and **View Our Portfolio**

---

### 3) Vacation Rentals Page

**Layout:**
- Responsive grid of property **cards**
- Each card shows: **Hero Image, Name, Sq. Ft., Beds, Baths, Sleeps**  
- Card click opens the **Listing Detail** page

**Data Source:**
- Use the JSON files in `assets/data/vacation-rentals/` for property data (includes all listing fields and special-rate dates)  

---

### 4) Listing Detail Page (per property)

**Data Source:**
- Use each JSON file in `assets/data/vacation-rentals/` for individual property details

**Features:**
- **Calendar** — Display availability calendar using prices and peak dates from JSON
- **Price Calculator** — Calculate total price based on selected dates, respecting minimum stay requirements from JSON
- **Booking Form** — Contact/email form for submitting selected dates
- **Map Integration** — Google Maps API embed showing property address location

---

### 5) Contact Page

**Header Image:**
- Include photo of the Suttons: `assets/images/suttons.jpg`

**Contact Cards:**
- Display primary contacts (use information from Business & Brand section above)

**Form: Send Us a Message**
- **Full Name** *  
- **Email Address** *  
- **Phone Number**  
- **Inquiry Type** (dropdown: General, Reservations, Owner Inquiry, Support)  
- **Subject** *  
- **Message** *  
- **Behavior:** Send email to **christy@utepassrentals.com** and show confirmation

**Find Us:**
- **Copy:** *Located in the heart of the beautiful Ute Pass and Colorado Springs area.*  
- **Google Maps embed** centered on service area

**About Our Location:**
- **Copy:**
  > We're strategically located in the Ute Pass area, providing easy access to Colorado Springs' most popular attractions including Pikes Peak, Garden of the Gods, and numerous hiking trails. Our properties offer the perfect blend of mountain tranquility and city convenience.

**FAQ (Cards):**
- **How far in advance should I book?** — We recommend booking 2–3 months in advance for peak season (summer and winter holidays) and 1–2 months for other times.  
- **What's included in the rental?** — Linens, towels, kitchen essentials, WiFi, and parking. Specific amenities vary by property.  
- **Is there a minimum stay requirement?** — Most properties have a 2–3 night minimum; extended minimums during peak seasons/holidays.  
- **How does property management work?** — We handle listing creation, guest communication, cleaning, and maintenance — you collect the profits.

---

## Components & Tailwind Notes

**Shared UI:**
- **Header** — Logo + navigation (Home, Vacation Rentals, Property Management, Contact)
- **Footer** — Contact info, quick links
- **Buttons** — Primary/secondary with consistent sizing and focus states
- **Card Components** — For services, rentals, FAQ
- **Form Components** — With validation + accessible labels

**Tailwind Guidance:**
- **Container:** `max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8`  
- **Spacing scale for sections:** `py-12 sm:py-16 lg:py-24`  
- **Cards:** `rounded-2xl`, shadow, `p-6`+  
- **Typography:** Responsive headings, `leading-tight`, `prose` for long text blocks

---

## Backend & Integration Requirements (MVP)

**Calendar Sync**
- Import/export availability with **VRBO** (help build this add the import link section to the jsons)
- Site bookings must not overwrite VRBO data; VRBO remains source of truth
- Think of edge cases like when a listing is deleted on vrbo after already getting uploaded on the site.
- Add a cost add up that is the rate per nights - show that number and say plus taxes and cleaning fees.
- Make sure the minimum nights doesnt allow you to select less than. Give a night for cleaning between allowing to select each rental.

**Admin** *(Build this second)*
- One secure login
- Unified **Reservations Dashboard** for all listings (site + VRBO)  
- Ability to **delete** site-generated bookings (read-only for VRBO imports)  
- Trigger and template **auto-emails** upon site booking requests

**Email** *(Build this second)*
- Booking form → **bookings@utepassvacationrentals.com** 
- Contact form → **christy@utepassvacationrentals.com**
- Owner inquiries → **christy@utepassvacationrentals.com**

**Maps** *(Build this second)*
- Google Maps API per listing (show pin at address) + service-area map on Contact page

**Data for Listings:**
- Location: `assets/data/vacation-rentals/`
- Each **Listing Detail** page renders all provided JSON fields + rate calendar  
- Include support for "increased rate" dates/weekends in pricing display

**Security & Privacy:**
- Do not store sensitive data in the client  
- Rate-limit forms; add CAPTCHA or bot protection

---

## Acceptance Criteria (Checklist)

- [ ] Mobile-first responsive across modern browsers  
- [ ] Home page hero + CTAs, services cards, family story, “What sets us apart”, final CTA  
- [ ] Property Management page with service cards, benefits, steps, and CTAs  
- [ ] Vacation Rentals grid with property cards (image, name, sq ft, beds, baths, sleeps)  
- [ ] Listing Detail renders **all** JSON fields, map, rules, calendars, contact widget  
- [ ] Contact page with cards, validated form, map embed, FAQ cards  
- [ ] Admin dashboard for reservations (site: CRUD*, VRBO: read-only)  
- [ ] Booking request auto-email + confirmation UX  
- [ ] VRBO calendar import/export  
- [ ] Google Maps embeds functioning on Contact + Listing pages  
- [ ] Tailwind classes used consistently; accessible semantics and focus states

---

## Content Notes (Do Not Omit)

- Business contacts are **real** and should not be exposed in code repos if public; use environment variables for routing where applicable  
- Use the JSON files in `assets/data/vacation-rentals/` for listings and calendars  
- Include **house rules**, **rooms**, **bathrooms**, **living spaces**, and **rate** structures per listing  
- Keep CTAs consistent: *Explore Rentals, Get in Touch, Get Started Today, Get Free Consultation, View Our Portfolio, View Properties, Contact Our Family*

---

*Prepared for generative build workflows. Use this prompt as the single source of truth for structure, content, and component hierarchy.*
