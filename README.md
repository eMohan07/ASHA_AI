# ASHA AI - Frontline Health Assistant

ASHA AI is an offline-first, AI-powered web application designed specifically for rural frontline health workers (ASHAs). It assists workers in managing patient records, performing intelligent symptom triage, and sending immediate critical alerts to doctors via WhatsApp.

Built for the 2025 Hackathon, this tool operates flawlessly even in low-connectivity rural environments.

## 🚀 Key Features

* **Offline-First Architecture**: Built with IndexedDB. Add, view, and manage patients completely offline. Data automatically syncs to the cloud when an internet connection is restored.
* **AI Symptom Triage**: Powered by **Google Gemini 2.5 Flash**, the AI analyzes patient symptoms (in English, Hindi, or Tamil) and categorizes severity (Low, Medium, High, Critical), providing immediate medical next steps.
* **WhatsApp Doctor Alerts**: Seamlessly integrated with **Twilio**. Health workers can instantly forward critical patient data and AI assessments to a doctor's WhatsApp number with a single click.
* **Mobile-Optimized UI**: Fast, responsive, and intuitive interface designed for low-end smartphones used in the field.

## 🛠️ Tech Stack

* **Frontend**: Next.js 14, React, Tailwind CSS
* **Backend**: Next.js API Routes
* **Database**: Supabase (PostgreSQL) + IndexedDB (`idb` for offline storage)
* **AI Engine**: Vercel AI SDK + Google Gemini API
* **Notifications**: Twilio REST API

## ⚙️ Local Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/eMohan07/ASHA_AI.git
cd ASHA_AI
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and add the following keys. (You will need to create free accounts on Supabase, Google AI Studio, and Twilio to get these keys).

```env
# Google Gemini (AI Triage)
GOOGLE_GENERATIVE_AI_API_KEY="your_google_gemini_api_key"

# Supabase (Cloud Database)
NEXT_PUBLIC_SUPABASE_URL="your_supabase_project_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"

# Twilio (WhatsApp Alerts Sandbox)
TWILIO_ACCOUNT_SID="your_twilio_account_sid"
TWILIO_AUTH_TOKEN="your_twilio_auth_token"
TWILIO_WHATSAPP_FROM="whatsapp:+14155238886" # Your Twilio Sandbox Number
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📱 How to Use

1. **Dashboard / Patients**: View your list of patients. Notice the "Sync" button at the top—if you add patients while offline, click this when you get back online to push records to Supabase.
2. **Add a Patient**: Click "+ Add Patient" to register a new person. This works instantly even without Wi-Fi.
3. **AI Symptom Checker**: Go to a patient's profile and click "Symptom Check". Describe their symptoms (e.g., "Fever for 3 days and severe headache"). The AI will assess the risk level.
4. **Send WhatsApp Alert**: If the AI determines a High or Critical risk, a red alert banner will appear. Enter the PHC doctor's phone number to send an automated WhatsApp message containing the patient's vitals and AI assessment.
5. **Quick Notifications**: Hover over "Notifications" in the top navigation bar from anywhere in the app to send a manual WhatsApp alert to any doctor.

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements.
