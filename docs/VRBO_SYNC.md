# 🔄 VRBO Calendar Sync

Sync VRBO bookings to prevent double-bookings. Add this when you have VRBO login credentials.

---

## Overview

**What it does:**
- Imports VRBO bookings automatically
- Blocks those dates on your site's calendar
- Prevents guests from booking already-reserved dates
- VRBO remains the source of truth

**How it works:**
- Uses iCal feeds (standard calendar format)
- Syncs every 6 hours automatically
- VRBO bookings show as read-only in admin

---

## Prerequisites

- [ ] VRBO account with property listings
- [ ] Access to VRBO property dashboard
- [ ] 2-3 hours for implementation

---

## Step 1: Get VRBO iCal URLs

**For each property on VRBO:**

1. Log into VRBO property dashboard
2. Go to **Calendar** → **Sync Calendar** (or **Export Calendar**)
3. Click **"Export to other sites"** or **"Get iCal Link"**
4. Copy the `.ics` URL (looks like):
   ```
   https://www.vrbo.com/icalendar/abc123def456.ics
   ```
5. Save this URL - you'll need it

**Repeat for all 9 properties (or however many you have on VRBO)**

---

## Step 2: Add URLs to Property Data

**Edit each property JSON file:**

`public/assets/data/vacation-rentals/antlers.json`:
```json
{
  "id": "antlers",
  "vrbo_link": "https://www.vrbo.com/1234567",
  "vrbo_ical_url": "https://www.vrbo.com/icalendar/abc123.ics",
  ...
}
```

**Add `vrbo_ical_url` field to all properties that are on VRBO.**

---

## Step 3: Implementation

### Install Dependencies
```bash
npm install node-ical
```

### Create Sync Library
Create `/lib/vrbo-sync.ts` - **I'll provide this code when you're ready**

### Create API Endpoint
Create `/app/api/vrbo/sync/route.ts` - **I'll provide this code**

### Update Database Schema
Add `vrboId` field to track VRBO bookings - **I'll guide you**

### Add Admin UI
Add "Sync VRBO" button to admin dashboard - **I'll create this**

---

## Step 4: Test Sync

1. Add one property's iCal URL to test
2. Go to `/admin`
3. Click **"Sync VRBO Calendars"**
4. Check results:
   - VRBO bookings appear in database
   - Source shows "VRBO"
   - Read-only (can't delete)
   - Dates blocked on calendar

---

## Step 5: Automate (Optional)

**Set up cron job to sync every 6 hours:**
- Add `vercel.json` config
- Syncs automatically
- No manual intervention needed

---

## Features After Implementation

### In Calendar:
- ✅ VRBO bookings show as blocked
- ✅ Guests can't select those dates
- ✅ Visual indication of unavailable dates

### In Admin Dashboard:
- ✅ See all bookings (VRBO + Website)
- ✅ VRBO bookings labeled clearly
- ✅ Can't delete VRBO bookings (read-only)
- ✅ Can delete website bookings

### Sync Behavior:
- ✅ Imports new VRBO bookings
- ✅ Updates existing bookings
- ✅ Removes cancelled VRBO bookings
- ✅ Doesn't touch website bookings

---

## Implementation Approaches

### Option A: Simple Manual Sync ⭐ Recommended First
- Add sync button to admin
- Click to sync manually
- Good for testing
- **Time:** 2-3 hours

### Option B: Automatic Sync (Add Later)
- Same as Option A + cron job
- Syncs every 6 hours automatically
- Set and forget
- **Time:** +30 minutes

---

## Edge Cases Handled

### If VRBO booking cancelled:
- Removed from your database
- Dates become available again
- Automatically handled by sync

### If VRBO listing deleted:
- That property's bookings remain
- Stop syncing that property (remove iCal URL)
- No errors

### If website booking overlaps with VRBO:
- Both exist in database
- Admin sees conflict
- Can manually resolve

---

## Testing Checklist

After implementation:

- [ ] Get VRBO iCal URL for one property
- [ ] Add to property JSON
- [ ] Click "Sync VRBO" in admin
- [ ] Verify VRBO bookings appear
- [ ] Check source shows "VRBO"
- [ ] Try deleting (should be blocked)
- [ ] Check calendar blocks those dates
- [ ] Try booking blocked date (should fail)
- [ ] Cancel booking in VRBO
- [ ] Sync again
- [ ] Verify booking removed

---

## Costs

**iCal sync:** FREE ✅  
**No API fees:** Uses standard iCal format  
**VRBO:** No additional charges

---

## Security

- Sync endpoint protected with secret key
- Only admin can trigger manual sync
- VRBO bookings are read-only
- Can't be modified or deleted through your site

---

## When to Implement

**Wait if:**
- Don't have VRBO credentials yet ✅ (Your situation)
- Not using VRBO currently
- Want to test site first

**Implement when:**
- Have VRBO login
- Have properties listed on VRBO
- Want to prevent double-bookings
- Ready for 2-3 hours of work

---

## Need Help?

**When you're ready to implement:**

1. Get all VRBO iCal URLs
2. Let me know
3. I'll provide all the code
4. Guide you through setup
5. Help you test

**Estimated time:** 2-3 hours total

---

## Summary

**What you need:**
- VRBO login credentials
- Access to property dashboards
- iCal URLs for each property

**What you get:**
- Automatic VRBO booking imports
- No double-bookings
- Unified calendar view
- Read-only VRBO data protection

**When to do it:**
- After site is live
- When you have VRBO access
- Before accepting bookings

---

**Not ready yet? That's fine!** The site works perfectly without VRBO sync. Add it when you're ready.

**Back to:** [README.md](README.md)

