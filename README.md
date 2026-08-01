# BOOKMYDINE_QR 🍽️📱

> **One Scan. Their Perfect Meal.**  
> A high-performance, done-for-you digital QR menu platform for cafes, fine dining, thali joints, bistros, food stalls, and pubs across India.

---

## 🌟 Key Features

- **6 Curated Design Themes**:
  - ☕ **Minimalist Cafe**: Soft warm tones for coffee shops & bakeries.
  - 🥂 **Executive Fine Dining**: Obsidian & metallic gold accents.
  - 🍲 **Heritage Indian**: Terracotta & warm amber aesthetic for authentic thalis.
  - 🌿 **Modern Bistro**: Forest green highlights for modern dining.
  - 🍔 **Street Food Express**: Bold red & yellow for QSR & food trucks.
  - 🍸 **Premium Dark Lounge**: WebGL animated dark mode for night bars & pubs.
- **Done-For-You Managed Service**:
  - Restaurant owners submit menu details via the onboarding intake form.
  - Operations team handles design formatting, hosting, and updates over WhatsApp.
- **Google Sheets & Drive Automation**:
  - Submissions are logged to Google Sheets with **Smart Row Reuse**.
  - Interactive **Status Dropdowns** (`New Lead`, `Contacted`, `Preview Sent`, `Approved`, `Cancelled`).
  - **1-Click WhatsApp Direct Chat** links pre-filled with customer greetings.
  - Logos, PDFs, and Dish Photos uploaded automatically to Google Drive with clickable links.
- **Flexible Billing Cycles**:
  - Support for both Monthly and Annual (12 Months - 2 Months FREE) plans.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI & Styling**: TailwindCSS, Lucide React Icons
- **Backend & Automation**: Next.js API Routes, Google Apps Script, Google Drive API
- **Deployment**: Vercel / Node.js

---

## 🚀 Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Tusharjain-19/BOOKMYDINE_QR.git
   cd BOOKMYDINE_QR
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Add your Google Apps Script Web App URL:
   ```env
   GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Security

All environment files (`.env`, `.env.local`) and local database files (`src/data/db.json`) are strictly ignored in `.gitignore` to prevent secret leaks and protect customer lead privacy.
