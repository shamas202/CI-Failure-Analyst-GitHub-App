# 🧭 Complete Setup Guide - FREE Version

**Your code is deployed!** Now follow these exact steps.

> 💡 This uses **OpenRouter FREE tier** - no credit card needed!

---

## 📁 Files I Created For You

| File | Purpose |
|------|---------|
| `.github/workflows/test-failure.yml` | Test workflow that fails on purpose |
| `QUICK_START.md` | 3-step summary |
| `SETUP_CHECKLIST.md` | Detailed checklist |
| `SETUP_GUIDE.md` | This guide |

---

## 🔑 Step 1: Get OpenRouter API Key (FREE - 2 minutes)

### 1.1 Go to OpenRouter
```
https://openrouter.ai
```

### 1.2 Sign Up
- Click **"Sign In"** (top right)
- Sign in with Google or GitHub
- **No credit card needed!**

### 1.3 Create API Key
- Click **"Keys"** in the sidebar
- Click **"Create Key"**
- Name it: `CI Failure Analyst`
- Click **"Create"**
- **COPY THE KEY** (starts with `sk-or-...`)

> 💾 Save in Notepad!

---

## 🐙 Step 2: Create GitHub App

### 2.1 Go to Apps Page
```
https://github.com/settings/apps
```

### 2.2 Click "New GitHub App"

### 2.3 Fill the Form

```
Name: CI Failure Analyst

Description: Analyzes CI failures using AI (free tier)

Homepage URL: https://github.com/shamas202/CI-Failure-Analyst-GitHub-App

Webhook URL: https://YOUR-VERCEL-URL.vercel.app/api/webhook/github
             ↑ Replace YOUR-VERCEL-URL with your actual Vercel domain

Webhook Secret: MySecretPassword123456789
                ↑ Make up any password, save it!
```

### 2.4 Uncheck This
```
❌ Expire user authorization tokens (UNCHECK THIS)
```

### 2.5 Set Permissions

| Permission | Select |
|------------|--------|
| Checks | Read & Write |
| Contents | Read |
| Pull requests | Read & Write |
| Actions | Read |

### 2.6 Subscribe to Events
```
✅ Check runs
```

### 2.7 Click "Create GitHub App"

---

## 📋 Step 3: Copy 4 Credentials

After creating, you'll see the app settings page.

### 3.1 App ID
```
App ID: 123456
        ↑ Click "Copy" → Save in Notepad
```

### 3.2 Client ID
```
Client ID: Iv1.abcdef123456
           ↑ Click "Copy" → Save in Notepad
```

### 3.3 Private Key
```
Private keys section:
→ Click "Generate a private key"
→ File downloads: your-app.2024-04-25.pem
→ DON'T LOSE THIS FILE!
```

### 3.4 Client Secret
```
Client secrets section:
→ Click "Generate a new client secret"
→ Popup shows the secret
→ Click "Copy" → Save in Notepad
```

---

## 🔧 Step 4: Format Private Key

The `.pem` file has multiple lines. Vercel needs ONE line.

### Option A: Use My Script (Recommended)

```bash
cd C:\project
node scripts/format-private-key.js
```

When prompted:
1. Open your `.pem` file in Notepad
2. Copy ALL content (including BEGIN and END lines)
3. Paste in terminal
4. Press Enter
5. Copy the output (one line with `\n`)

### Option B: Manual

1. Open `.pem` file in Notepad
2. Copy all content
3. Go to: https://text-compare.com/
4. Paste in left box
5. Find: `\n` (backslash + n)
6. Replace with: `\\n` (two backslashes + n)
7. Copy result

**Result looks like:**
```
-----BEGIN RSA PRIVATE KEY-----\nMIIE...\n-----END RSA PRIVATE KEY-----
```

---

## ⚙️ Step 5: Add Variables to Vercel

### 5.1 Go to Vercel
```
https://vercel.com/dashboard
```

### 5.2 Open Your Project
- Click your project: `CI-Failure-Analyst-GitHub-App`

### 5.3 Go to Environment Variables
- Click **"Settings"** tab
- Click **"Environment Variables"** (left)

### 5.4 Add All 6 Variables

Click **"New Variable"** for each:

| Key | Value |
|-----|-------|
| `OPENROUTER_API_KEY` | Key from Step 1.3 (starts with `sk-or-`) |
| `WEBHOOK_SECRET` | Your made-up password (Step 2.3) |
| `GITHUB_APP_ID` | App ID number (Step 3.1) |
| `GITHUB_APP_PRIVATE_KEY` | Formatted one-line key (Step 4) |
| `GITHUB_APP_CLIENT_ID` | Client ID (Step 3.2) |
| `GITHUB_APP_CLIENT_SECRET` | Client Secret (Step 3.4) |

For each variable:
1. Click "New Variable"
2. Paste Key and Value
3. ✅ Check all 3 environments
4. Click "Save"

---

## 🔄 Step 6: Redeploy

### 6.1 Go to Deployments
- Click **"Deployments"** tab

### 6.2 Redeploy
- Click **"..."** on latest deployment
- Click **"Redeploy"**
- Click **"Confirm"**
- Wait for ✅ (2-3 minutes)

---

## ✅ Step 7: Test Health Check

Open in browser:
```
https://YOUR-VERCEL-URL.vercel.app/api/webhook/github
```

**Expected:**
```json
{"status":"ok","timestamp":"2024-04-25T12:34:56.789Z"}
```

**If 404:** Wait 2 more minutes, refresh.

---

## 📦 Step 8: Install App

### 8.1 Go to Your App
```
https://github.com/settings/apps
```

### 8.2 Click Your App Name

### 8.3 Click "Install App" (left sidebar)

### 8.4 Click "Install"

### 8.5 Select Repositories
- **All repositories** OR
- **Only select** → Choose your repos

### 8.6 Click "Install"

---

## 🧪 Step 9: Test with Real PR

### 9.1 Create a Pull Request
- Go to your repo on GitHub
- Make any change
- Create PR

### 9.2 Watch for Bot Comment
- The test workflow will run
- It will fail intentionally
- Your bot should comment with analysis!

---

## 🛠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| Health check = 404 | Wait 2-3 minutes after redeploy |
| "Invalid signature" | WEBHOOK_SECRET must match exactly |
| "Auth failed" | PRIVATE_KEY must be one line with `\n` |
| No bot comment | Check Vercel logs, verify permissions |
| Build failed | Check all 6 variables are set |
| "OPENROUTER_API_KEY not configured" | Add the variable and redeploy |

---

## 📞 Stuck?

Tell me:
- Which step are you on?
- What error do you see?

---

## 🎉 Success!

When working, your bot comments look like:

```markdown
## 🤖 CI Failure Analysis

| Field | Value |
|-------|-------|
| **Failure Type** | ✅ 🐛 Code Regression |
| **Confidence** | high |

### Summary
Test failed due to assertion error...

### Suggested Fix
Check the changes to src/test.js...
```

---

## 💰 Cost Summary

| Service | Cost |
|---------|------|
| Vercel | FREE |
| OpenRouter (Llama 3.1) | FREE |
| GitHub | FREE |
| **TOTAL** | **$0** 🎉 |
# Refinement 34: Adding descriptive comments for better maintainability
# Refinement 40: Standardizing code style and formatting
# Refinement 100: Improving consistency across the module
# Refinement 113: Improving code documentation
# Refinement 139: Adding internal developer notes
# Refinement 172: Adding internal developer notes
# Refinement 238: Adding descriptive comments for better maintainability
# Refinement 249: Cleaning up whitespace and indentations
# Refinement 287: Adding internal developer notes
# Refinement 330: Optimizing logic in small sections
# Refinement 386: Updating documentation for future reference
# Refinement 388: Adding internal developer notes
# Refinement 393: Cleaning up whitespace and indentations
# Refinement 397: Cleaning up whitespace and indentations
# Refinement 420: Updating documentation for future reference
# Refinement 439: Standardizing code style and formatting
# Refinement 446: Cleaning up whitespace and indentations
# Refinement 449: Adding descriptive comments for better maintainability
# Refinement 459: Minor refactoring of function calls
# Refinement 25: Minor refactoring of function calls
# Refinement 26: Refining variable names for clarity
# Refinement 87: Minor refactoring of function calls
# Refinement 143: Adding internal developer notes
# Refinement 149: Minor refactoring of function calls
