# 🚗 License Saathi
### A smarter, trilingual companion for the driving licence journey

> **A guided civic web app that helps applicants understand licence procedures, prepare for tests, organise documents, and navigate common licence-related problems—with less confusion and greater transparency.**

[🌐 **Live Website**](https://licence-saathi-v2.onrender.com) · [💻 **GitHub Repository**](https://github.com/xAvirajx/Licence-Saathi)

**Demo tracking IDs:** `DL-443920` · `LL-948201` · `LL-112233`

*These are demonstration presets; tracking statuses and postal details shown by the demo should not be treated as verified live government data.*

**Project focus:** Civic technology · Accessibility · Driving-licence guidance · AI assistance

---

## 📌 The Problem

Applying for or replacing a driving licence can involve multiple steps, forms, document requirements, test preparation, and information sources. First-time applicants may be unsure about eligibility, what to carry, how to prepare for the learner’s test, or what to do if a licence is lost or damaged. Unclear processes can lead to avoidable confusion, repeated effort, and reliance on intermediaries.

License Saathi aims to make this journey easier to understand by bringing practical guidance and learning tools together in one place. Its Lost Licence SOS experience also explains recovery steps and helps users prepare a police-intimation letter and document checklist, encouraging applicants to use official channels and understand stated fees.

**Our mission:** make licence-related information more accessible, understandable, and transparent—while helping users recognise when they must confirm details through an authorised government source.

> **Evidence note:** We do not present estimates such as “₹3,500+ crore in civic losses,” “70% applicant exploitation,” or annual application totals as established facts without a credible, cited source. Add verified figures and citations here if your team has them.

---

## ✨ Core Features

### 🧭 Personalised Licence Journey

- **Four-choice intake:** Start from the user's current stage—just starting, learner’s licence, test booked, or application submitted.
- **Six-stage stepper:** Eligibility, application rehearsal, learner’s test preparation, waiting period, practical test, and dispatch/tracking.
- **Saved progress:** Remembers the selected journey stage locally and links users to relevant tools.

### 🆘 Lost Licence SOS

- **Situation guidance:** Separates lost/stolen licence scenarios from damaged or faded cards.
- **DL-number recovery tips:** Suggests possible places to check, such as insurance documents, e-challan records, DigiLocker, and Parivahan services.
- **Letter generator:** Prepares a police-intimation letter in English, Hindi, or Gujarati.
- **Checklist and fee guidance:** Helps users organise supporting documents and understand the stated duplicate-licence cost; verify current fees on official portals.

### 📝 Test Preparation & Learning

- **STALL-style mock test:** Timed multiple-choice practice with score feedback.
- **Road-sign flashcards:** Learning resources organised by sign category.
- **Test-day checklist:** Tick off documents and review the expected sequence of test-day activities.
- **Practical manoeuvre guide:** Visual explanations of car and two-wheeler test manoeuvres and common mistakes.

### 🗺️ Driving-Test Track Locator

- **Interactive map:** Uses Leaflet with OpenStreetMap mapping data.
- **Location filters:** Browse listed exam centres and practice grounds by purpose, city, or vehicle category.
- **Directions:** Open map links for navigation; users should confirm location details and availability before travelling.

### 📄 Documents & Application Rehearsal

- **Document advisor:** Produces a checklist based on selected applicant and vehicle details.
- **Form rehearsal:** Lets users practise understanding application fields without needing to submit personal information through the rehearsal itself.

### 📍 Application Tracking Demo

- **Five milestones:** Submitted, scrutiny, biometrics/slot, test passed, and card dispatched.
- **Preset scenarios:** `DL-443920`, `LL-948201`, and `LL-112233` demonstrate different example states.
- **Schema inspector:** Displays a formatted API Setu-style JSON schema for inspection. Demo records and schema examples are not proof of a live government connection.

### 🤖 Multilingual AI Assistant

- **Three languages:** English, Hindi, and Gujarati support.
- **Fallback handling:** The backend can attempt `gemini-2.5-flash` and fall back to `gemini-1.5-flash` for selected rate-limit or availability errors.
- **Privacy-minded prompts:** Instructs the assistant not to request identity numbers, phone numbers, or OTPs. Do not enter sensitive personal information into a demo assistant.

### ♿ Accessibility & PWA

- **Display controls:** Light/dark themes, adjustable font sizes, and high-contrast mode.
- **Read aloud:** Uses the browser Web Speech API where supported.
- **Install guidance:** Provides device-specific instructions for adding the app to a home screen or installing it.
- **Local preferences:** Stores journey/checklist state in browser storage and displays available cache diagnostics.

---

## 🏗️ System Architecture

The app separates the browser experience from backend-assisted features. The frontend serves the journey, learning tools, maps, settings, and demo tracking views. An Express backend handles supported API routes, including AI chat and the API Setu-style verification schema endpoint.

```text
┌──────────────────────────────────────────────┐
│ Browser / Installable PWA                     │
│ Journey · SOS · Mock Test · Maps · Settings   │
└──────────────────────┬───────────────────────┘
                       │ HTTPS / API requests
                       ▼
┌──────────────────────────────────────────────┐
│ Node.js + Express backend                     │
│ /api/chat · /api/apisetu/dl-verification      │
└───────────────┬───────────────────┬──────────┘
                │                   │
                ▼                   ▼
┌────────────────────────┐  ┌──────────────────────┐
│ Gemini model fallback  │  │ API Setu-style schema│
│ 2.5 Flash → 1.5 Flash  │  │ inspection / demo    │
└────────────────────────┘  └──────────────────────┘

External data/services:
Leaflet + OpenStreetMap · official government portals
```

**Important integration boundary:** The schema endpoint and demo tracking scenarios must not be described as live MoRTH/DigiLocker verification unless working credentials, authorised access, and end-to-end responses have been confirmed. The map displays mapped locations; it does not itself guarantee that a site is an official test centre or currently operational.

---

## 🧾 Civic Data & Rules

License Saathi references public civic resources and presents educational guidance. Always confirm the latest requirements with the relevant government authority.

| Reference | How it relates to the project |
|---|---|
| **CMVR Rule 11** | Referenced in learner’s-licence test guidance. Verify the current rule text and passing requirements before relying on displayed summaries. |
| **CMVR Rule 14** | Referenced in guidance about retests. Confirm the applicable waiting period and fee with the relevant authority. |
| **CMVR Rule 32** | Used as a reference point for licence-related fees. Fees can depend on service and current rules; verify before payment. |
| **CMVR Rule 139** | Referenced in guidance about producing digital documents. Confirm current legal applicability and accepted document sources. |
| **IRC:67-2012** | Referenced for road-sign learning material. |
| **data.gov.in** | Open Government Data Portal; consult the original dataset and its terms for any reused data. |
| **API Setu** | Referenced for the structure of a government API/schema workflow; schema compatibility does not by itself establish a live integration. |
| **Leaflet / OpenStreetMap** | Interactive mapping and community map data; follow their attribution and usage requirements. |

This README describes the project’s stated references, not legal advice or a certification of statutory compliance. Confirm rule wording, fees, and data licensing against primary sources before presenting them as verified.

---

## 🚀 Local Setup

> These commands assume the repository contains a Node.js project with a `package.json`. Check the actual scripts and environment variable names in the repository before running.

### 1. Clone the repository

```bash
git clone https://github.com/xAvirajx/Licence-Saathi.git
cd Licence-Saathi
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file only if required by the project. Add your own Gemini API key using the exact variable name expected by `server.js`.

**Never commit `.env` files, API keys, tokens, or personal data.**

### 4. Start the project

Check `package.json` for the available scripts. If the project defines a `dev` script, run:

```bash
npm run dev
```

If the frontend and backend use separate commands, start them in separate terminals using the scripts documented in the repository.

---

## 🏁 Evaluator Rubric Mapping

Use this matrix to help reviewers find evidence for common hackathon criteria. Adapt the criterion names to match the official event rubric.

| Common judging area | License Saathi evidence |
|---|---|
| **Problem relevance** | Addresses confusion around licence steps, documentation, test preparation, and lost-licence recovery. |
| **Innovation & product design** | Combines a personalised journey, SOS wizard, mock test, road-sign learning, document advisor, and multilingual assistant. |
| **Technical implementation** | Express API routes, Gemini fallback handling, local journey state, interactive Leaflet maps, PWA support, and schema-inspection UI. |
| **Impact & accessibility** | English/Hindi/Gujarati support, adjustable text, high contrast, read-aloud support, and guidance intended to help users navigate official processes. |
| **Feasibility & reliability** | Clear separation of demo tracking from verified live services, fallback handling for selected AI errors, and future scope for authorised integrations. |

**What to demonstrate live:** Choose a journey stage, open Lost Licence SOS, generate a sample letter, try a mock test, filter the map, inspect one tracking preset, and toggle an accessibility setting. Clearly label any simulated status or data during the demo.

---

## 🔒 Privacy & Disclaimer

License Saathi is an independent civic-information and learning project, not an official government website. Do not enter Aadhaar numbers, licence numbers, OTPs, or other sensitive information into demos unless a verified, secure, authorised workflow explicitly requires it.

Local storage is used for selected preferences and progress; clear browser data when using a shared device. Simulated tracking information is for demonstration only.

Verify eligibility, fees, test rules, police-reporting requirements, and application status through the appropriate official portals before taking action.

---

## 👥 Team — Code to Last Longer

- **Avirajsinh Parmar** — Build
- **Aarya Sharma** — Testing & Debugging
- **Yashvi Modh** — Pitch & Video

## 🔗 Project Links

- 🌐 **Live website:** https://licence-saathi-v2.onrender.com
- 💻 **GitHub repository:** https://github.com/xAvirajx/Licence-Saathi

---

*License Saathi — From confusion to confidence, every step of the way.*
