# TaskTimeline Pro — SaaS Project Management Tool

> Visual Gantt-style project timelines with Stripe subscriptions, team collaboration, and auth. Built to generate $10,000+/month in recurring revenue.

**Live landing page:** https://nkusib.github.io/rwandatask-timeline/

---

## ⚡ 5-Step Revenue Activation (< 30 minutes total)

### Step 1: Enable GitHub Pages (2 min)
1. Go to **Settings → Pages** in this repo
2. Source: **GitHub Actions**
3. Save → the workflow runs and your landing page is live at `https://nkusib.github.io/rwandatask-timeline/`

### Step 2: Create Stripe products (10 min)
1. Sign up at https://stripe.com (free)
2. **Products → Create product** × 3:
   - **TaskTimeline Pro** — $19/month recurring
   - **TaskTimeline Team** — $49/month recurring
   - **TaskTimeline Business** — $199/month recurring
3. **Payment Links** → create one per product → copy each URL

### Step 3: Add Payment Links to landing.html (2 min)
Replace the 3 placeholders in `landing.html`:
```
REPLACE_WITH_STRIPE_PAYMENT_LINK_PRO
REPLACE_WITH_STRIPE_PAYMENT_LINK_TEAM
REPLACE_WITH_STRIPE_PAYMENT_LINK_BUSINESS
```
Push to main → auto-redeploys.

### Step 4: Deploy the full backend to Vercel (15 min)
Add these secrets: **Settings → Secrets → Actions**
```
VERCEL_TOKEN                       vercel.com/account/tokens
JWT_SECRET                         openssl rand -base64 32
STRIPE_SECRET_KEY                  sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY pk_live_...
STRIPE_WEBHOOK_SECRET              whsec_... (Stripe → Developers → Webhooks)
STRIPE_PRO_MONTHLY_PRICE_ID        price_...
STRIPE_TEAM_MONTHLY_PRICE_ID       price_...
STRIPE_BUSINESS_MONTHLY_PRICE_ID   price_...
NEXT_PUBLIC_APP_URL                https://your-app.vercel.app
```
Push to main → `.github/workflows/deploy.yml` runs automatically.

### Step 5: Drive your first paying users (day 1)
1. **Product Hunt** — post at 12:01am PST Tuesday
2. **Reddit** — r/projectmanagement, r/entrepreneur, r/SaaS
3. **Cold outreach** — LinkedIn search “project manager”, message 50 people with free trial
4. **Directories** — AlternativeTo, SaaSHub, Capterra (all free)

---

## Revenue Model

| Plan | Price | Target subscribers |
|------|-------|--------------------|
| Pro  | $19/mo | 250 |
| Team | $49/mo | 60 |
| Business | $199/mo | 25 |
| **Total** | | **$12,665 MRR** |

---

## Tech Stack
- **Next.js 16** — React + App Router
- **SQLite** via better-sqlite3 — zero-config, VPS-friendly
- **Stripe** — subscriptions, webhooks, customer portal
- **JWT** — 30-day auth sessions
- **TypeScript + Tailwind CSS**

## Local Dev
```bash
npm install
cp .env.example .env.local  # set JWT_SECRET at minimum
npm run dev                  # http://localhost:3000
```
