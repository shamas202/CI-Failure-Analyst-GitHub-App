# 🚀 Quick Start - 3 Essential Steps

Your project is deployed! Just do these 3 things::

---

## 1️⃣ Get Anthropic Key

1. https://console.anthropic.com → Create account
2. Get API Key → Copy it

---

## 2️⃣ Create GitHub App

1. https://github.com/settings/apps → **"New GitHub App"**

| Field | Value |
|-------|-------|
| Name | `CI Failure Analyst` |
| Homepage | Your GitHub repo URL |
| Webhook URL | `https://YOUR-VERCEL-URL.vercel.app/api/webhook/github` |
| Webhook Secret | Make up a password |

**Permissions:**
- Checks: R/W
- Contents: R
- Pull requests: R/W  
- Actions: R

**Events:** Check "Check runs" ✅

**After creating, copy:**
- App ID
- Client ID
- Generate Private Key (downloads file)
- Generate Client Secret

---

## 3️⃣ Add to Vercel

Vercel Dashboard → Your Project → Settings → Environment Variables:

Add these 6:

```
WEBHOOK_SECRET = (your made-up password)
GITHUB_APP_ID = (App ID number)
GITHUB_APP_PRIVATE_KEY = (format .pem file to one line)
GITHUB_APP_CLIENT_ID = (Client ID)
GITHUB_APP_CLIENT_SECRET = (Client Secret)
ANTHROPIC_API_KEY = (from Anthropic console)
```

**Redeploy** after adding variables.

---

## ✅ Test

1. Install app on your repo
2. Create a PR
3. Watch for bot comment!

---

**For detailed steps, see SETUP_CHECKLIST.md**
# Refinement 25: Improving consistency across the module
# Refinement 31: Updating documentation for future reference
# Refinement 33: Improving code documentation
# Refinement 136: Adding internal developer notes
# Refinement 169: Minor refactoring of function calls
# Refinement 173: Refining variable names for clarity
# Refinement 177: Updating documentation for future reference
# Refinement 185: Adding internal developer notes
# Refinement 193: Refining variable names for clarity
# Refinement 215: Improving code documentation
# Refinement 224: Refining variable names for clarity
# Refinement 236: Improving consistency across the module
# Refinement 247: Adding descriptive comments for better maintainability
# Refinement 255: Refining variable names for clarity
# Refinement 263: Improving consistency across the module
# Refinement 283: Updating documentation for future reference
# Refinement 285: Refining variable names for clarity
# Refinement 309: Standardizing code style and formatting
# Refinement 320: Standardizing code style and formatting
# Refinement 387: Improving consistency across the module
# Refinement 430: Improving consistency across the module
# Refinement 436: Adding internal developer notes
# Refinement 6: Adding internal developer notes
# Refinement 28: Adding internal developer notes
# Refinement 53: Cleaning up whitespace and indentations
