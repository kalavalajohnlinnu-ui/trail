# 🚀 EffiSol Solar Proposal Web App — Vercel Trial Deployment

This is the **Secure Trial Version** of the EffiSol Solar Proposal Generator.

### 🔒 Security Guarantee:
- The front-end UI (`public/index.html`) contains **NO template PDF**, **NO financial calculation formulas**, and **NO PDF generation code**.
- All sensitive logic lives safely inside the serverless function (`api/generate-pdf.js`).
- Your client can view the webpage and test PDF generation freely, but **can never steal your code or template**.

---

## ⚡ How to Deploy to Vercel (Free in 2 Minutes)

### Option A: Via GitHub (Recommended)
1. Upload this entire `vercel_trial_app` folder to a new **private** or **public** repository on GitHub.
2. Go to [Vercel.com](https://vercel.com) and log in.
3. Click **"Add New Project"** ➔ Select your GitHub repository.
4. Click **"Deploy"**.
5. Done! Vercel gives you a live link like:  
   `https://effisol-proposal-trial.vercel.app`

### Option B: Via Vercel CLI (Direct Command Line)
1. Open PowerShell / Command Prompt inside `vercel_trial_app` folder:
   ```bash
   npm install -g vercel
   vercel
   ```
2. Follow the prompts and your link will be live in 30 seconds!

---

## 🔑 Subdomain / WordPress Setup (After Payment)
When your client completes the payment, you can deploy the original standalone `index.html` file to their WordPress site or custom subdomain (e.g. `proposal.clientdomain.com`).
