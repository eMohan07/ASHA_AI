# CareLink Pro — Field Unit 04 🏥

**CareLink Pro** (formerly ASHA AI) is a premium, offline-first clinical decision support platform designed specifically for frontline community health workers and doctors in rural and semi-urban environments. It transforms raw field observations into structured clinical intelligence, enabling rapid triage and emergency referral even in the most remote areas.

---

## 🚀 Key Features

### 🧠 Intelligent Symptom AI (Fatality-Aware)
Powered by **Google Gemini 2.5 Flash**, our advanced triage engine classifies conditions by both **Severity** and **Fatality Risk**.
* **Real-time Assessment**: Processes symptoms in natural language (English, Hindi, Tamil).
* **Fatality Monitoring**: Categorizes cases as `FATAL`, `POTENTIALLY FATAL`, or `NON-FATAL` with clear plain-language explanations.
* **Clinical Roadmap**: Provides possible conditions, warning signs, and actionable next steps for frontline workers.

### 📶 Offline-First Infrastructure
Designed for "zero-connectivity" zones using **IndexedDB**.
* **Local Persistence**: Add patients and record vitals completely offline.
* **Intelligent Sync**: One-touch background synchronization to **Supabase (PostgreSQL)** when back in network range.
* **Field Roster**: Full access to patient history without a Wi-Fi or Cellular requirement.

### 🌐 Digital Twin & Analytics
Advanced deep-data analytics for population health monitoring.
* **Population Wellness Trends**: Interactive dashboard with weekly/monthly toggles for trend visualization.
* **Risk Heatmaps**: Visualizes critical cases and triage efficiency across sector units.

### 🔐 Professional Identity & Security
Full-featured authentication system for clinical personnel.
* **Secure Enrollment**: Multi-step signup with email verification.
* **Clinical Profiles**: Management of professional credentials, security updates, and access logs.
* **Access Control**: Secure session management via Supabase Auth.

---

## 🛠️ Tech Stack

* **Core**: [Next.js 14](https://nextjs.org/) (App Router), React 18, TypeScript
* **Styling**: Tailwind CSS (CareLink Pro "Navy & Slate" Design System)
* **Intelligence**: [Google Gemini 2.5 Flash](https://aistudio.google.com/) via Vercel AI SDK
* **Persistence**: [Supabase](https://supabase.com/) (Cloud) + [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) (Local Cache)
* **Icons**: Lucide React

---

## ⚙️ Deployment & Setup

### 1. Environment Configuration
Create a `.env` file in the root directory:

```env
# AI Intelligence (Google Gemini)
GOOGLE_GENERATIVE_AI_API_KEY="your_api_key"

# Clinical Datastore (Supabase)
NEXT_PUBLIC_SUPABASE_URL="your_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_key"

# Service Credentials (OTP & Notifications)
GMAIL_USER="your_email@gmail.com"
GMAIL_PASS="your_app_password"
```

### 2. Initialization
```bash
npm install
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 📱 Clinical Workflow

1. **Patient Enrollment**: Register patients in the field (online or offline).
2. **Symptom Triage**: Enter observations into **Symptom AI**. Review the red/orange/green fatality banners for immediate risk assessment.
3. **Deep Data Review**: Navigate to the **Digital Twin** tab to analyze sector-wide wellness trends and efficiency metrics.
4. **Data Sync**: Tap "Sync Offline Data" in the Patient Registry when a network connection is established to secure field records to the cloud.

---

## 🤝 Clinical Contributions
Developed for the **2025 Health-Tech Hackathon**. CareLink Pro aims to bridge the gap between rural frontline care and modern clinical intelligence.

**CareLink Pro · Bridging the Last Mile of Clinical Intelligence.**
