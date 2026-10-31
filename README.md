# Wayfer — Account & Data Deletion Portal

An end-to-end, high-performance web portal built with **React**, **Vite**, and a **Strict Black & White (Noir)** minimalist design system for **Wayfer**. Designed to fulfill Google Play Store & Apple App Store account deletion policy requirements.

---

## 🖤 Design & Aesthetic
- **Strict Black & White Noir Theme**: Zero chromatic colors. High-contrast obsidian blacks, pure whites, silver tones, and subtle monochrome grid backdrop matching the Wayfer logo.
- **Wayfer Logo Integration**: Integrated in header, favicon, hero, and admin control center.
- **Typography**: Google Fonts (*Space Grotesk*, *Plus Jakarta Sans*, and *JetBrains Mono*).

---

## ⚡ Features (End-to-End)

### 1. Public Deletion Portal (`/`)
- **Verified Request Form**:
  - Full Name, Registered Email, Phone Number, Optional Wayfer User ID.
  - Granular Erasure Scope (Complete Account, Location/Trip Telemetry Only, Marketing Only).
  - Reason categorization & feedback text.
  - Statutory legal acknowledgements & consent checkboxes.
- **Unique Audit Tracking**:
  - Automatically generates a cryptographically styled Reference Code (e.g., `WAY-DEL-89241`).
  - Pre-calculates mandatory 14-day grace period hold.
- **Live Status Tracker (`/track` or Tab)**:
  - Users can enter their Reference Code or registered Email.
  - Step-by-step progress timeline: *Submitted* → *Identity Review* → *14-Day Hold* → *Permanent Scrub*.
  - Account holders can cancel pending requests during the grace period.
- **Compliance Policy & FAQ (`/policy` or Tab)**:
  - Detailed explanations of what data is permanently scrubbed vs. statutory tax retention.
  - Apple App Store Guideline 5.1.1(v) & Google Play compliance.

---

### 2. Admin Panel (`/admin`)
- **Restricted Access Login**:
  - **Login ID**: `admin@gmail.com`
  - **Password**: `shor@123`
  - One-click auto-fill helper button for testing.
  - Persistent admin authentication state.
- **Admin Command Dashboard**:
  - **Live KPI Metrics**: Total Requests, In 14-Day Grace, Pending Review, Completed/Purged, Cancelled/Rejected.
  - **Real-Time Search & Status Filtering**: Instant search across name, email, phone, and reference code.
  - **Request Table**:
    - Detailed record inspection modal.
    - Status changer (`Pending Verification`, `In Review`, `In Grace Period`, `Completed`, `Cancelled by User`, `Rejected`).
    - Internal security & audit notes editor.
    - Quick "Purge" action and record deletion.
  - **Data Export**: Generates and downloads a real formatted `.csv` audit file.
  - **Manual Request Logger**: Support desk entry form for telephone/email requests.
  - **Reset Demo Data**: Easily restore original sample dataset anytime.

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Visit [http://localhost:5173/](http://localhost:5173/) for the public portal or [http://localhost:5173/admin](http://localhost:5173/admin) for the admin login.

---

## 🌐 Deploying to Vercel

The repository already includes `vercel.json` configured with SPA rewrites so that `/admin` and subpaths work without 404 errors.

### Option A: Using Vercel CLI
```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy directly from terminal
vercel
```

### Option B: Using Git / Vercel Dashboard
1. Push this directory to your GitHub/GitLab repository.
2. In the Vercel Dashboard, click **Add New Project** and import your repository.
3. Keep the default settings (Framework Preset: **Vite**, Root Directory: `./`).
4. Click **Deploy**.
