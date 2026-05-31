# 🎯 Your Exact Setup - Copy & Paste Ready!

## Your Project Info

| Item | Value |
|------|-------|
| **Vercel URL** | `https://ci-failure-analyst-git-hub-app.vercel.app` |
| **Webhook URL** | `https://ci-failure-analyst-git-hub-app.vercel.app/api/webhook/github` |
| **GitHub Repo** | `https://github.com/shamas202/CI-Failure-Analyst-GitHub-App` |

---

## Step 1: Get OpenRouter API Key (FREE)

1. Go to: **https://openrouter.ai/keys**
2. Sign in with Google or GitHub
3. Click **"Create Key"**
4. Name: `CI Analyst`
5. **Copy the key** (starts with `sk-or-`)

---

## Step 2: Create GitHub App

1. Go to: **https://github.com/settings/apps**
2. Click **"New GitHub App"**

### Fill This Form:

| Field | Copy & Paste This |
|-------|-------------------|
| **Name** | `CI Failure Analyst` |
| **Description** | `Analyzes CI failures using AI (free tier)` |
| **Homepage URL** | `https://github.com/shamas202/CI-Failure-Analyst-GitHub-App` |
| **Webhook URL** | `https://ci-failure-analyst-git-hub-app.vercel.app/api/webhook/github` |
| **Webhook Secret** | `d471b9e6da1a01fcd78f7bf253bea3934eb0f464fa0b47f649cfca4a1f43d540` |

### Uncheck:
```
❌ Expire user authorization tokens
```

### Permissions:
```
Checks           → Read & Write
Contents         → Read
Pull requests    → Read & Write
Actions          → Read
```

### Events:
```
✅ Check runs
```

### Click "Create GitHub App"

---

## Step 3: Copy 4 Credentials

After creating, copy these:

1. **App ID** → (just a number like `123456`)
2. **Client ID** → (like `Iv1.xxxxx`)
3. **Private Key** → Click "Generate" → Downloads `.pem` file
4. **Client Secret** → Click "Generate" → Copy it

---

## Step 4: Format Private Key

```bash
cd C:\project
node scripts/format-private-key.js
```

Paste your `.pem` file content when prompted. Copy the output (one line).

---

## Step 5: Add 6 Variables to Vercel

1. Go to: **https://vercel.com/shamas202s-projects/ci-failure-analyst-git-hub-app/settings/environment-variables**
2. Click **"New Variable"** 6 times:

| Key | Value |
|-----|-------|
| `OPENROUTER_API_KEY` | Your OpenRouter key from Step 1 |
| `WEBHOOK_SECRET` | `d471b9e6da1a01fcd78f7bf253bea3934eb0f464fa0b47f649cfca4a1f43d540` |
| `GITHUB_APP_ID` | App ID from Step 3 |
| `GITHUB_APP_PRIVATE_KEY` | Formatted key from Step 4 |
| `GITHUB_APP_CLIENT_ID` | Client ID from Step 3 |
| `GITHUB_APP_CLIENT_SECRET` | Client Secret from Step 3 |

For each:
- Click "New Variable"
- Paste Key and Value
- ✅ Check all 3 environments
- Click "Save"

---

## Step 6: Redeploy

1. Go to: **https://vercel.com/shamas202s-projects/ci-failure-analyst-git-hub-app**
2. Click **"Deployments"** tab
3. Click **"..."** on latest deployment
4. Click **"Redeploy"** → **"Confirm"**

---

## Step 7: Test Health Check

Open in browser:
```
https://ci-failure-analyst-git-hub-app.vercel.app/api/webhook/github
```

You should see: `{"status":"ok","timestamp":"..."}`

---

## Step 8: Install App

1. Go to: **https://github.com/settings/apps**
2. Click your app name
3. Click **"Install App"** (left sidebar)
4. Click **"Install"**
5. Select your repositories
6. Click **"Install"**

---

## Step 9: Test!

Create a PR in your repo. The test workflow will fail and the bot should comment!

---

## Quick Links

| What | URL |
|------|-----|
| Vercel Dashboard | https://vercel.com/shamas202s-projects/ci-failure-analyst-git-hub-app |
| Vercel Env Vars | https://vercel.com/shamas202s-projects/ci-failure-analyst-git-hub-app/settings/environment-variables |
| GitHub Apps | https://github.com/settings/apps |
| OpenRouter Keys | https://openrouter.ai/keys |
| Health Check | https://ci-failure-analyst-git-hub-app.vercel.app/api/webhook/github |
# Refinement 45: Improving consistency across the module
# Refinement 49: Optimizing logic in small sections
# Refinement 76: Improving code documentation
# Refinement 124: Improving consistency across the module
# Refinement 131: Improving consistency across the module
# Refinement 164: Improving consistency across the module
# Refinement 175: Optimizing logic in small sections
# Refinement 176: Refining variable names for clarity
# Refinement 188: Standardizing code style and formatting
# Refinement 203: Improving consistency across the module
# Refinement 209: Improving code documentation
# Refinement 221: Improving consistency across the module
# Refinement 259: Refining variable names for clarity
# Refinement 323: Minor refactoring of function calls
# Refinement 331: Improving code documentation
# Refinement 353: Updating documentation for future reference
# Refinement 385: Improving consistency across the module
# Refinement 389: Updating documentation for future reference
# Refinement 401: Improving consistency across the module
# Refinement 423: Adding descriptive comments for better maintainability
# Refinement 426: Standardizing code style and formatting
# Refinement 427: Refining variable names for clarity
# Refinement 1: Refining variable names for clarity
# Refinement 27: Refining variable names for clarity
# Refinement 32: Adding internal developer notes
# Refinement 54: Cleaning up whitespace and indentations
# Refinement 58: Minor refactoring of function calls
# Refinement 66: Optimizing logic in small sections
# Refinement 67: Adding internal developer notes
# Refinement 95: Adding internal developer notes
# Refinement 109: Optimizing logic in small sections
# Refinement 114: Optimizing logic in small sections
# Refinement 198: Optimizing logic in small sections
# Refinement 219: Refining variable names for clarity
# Refinement 225: Minor refactoring of function calls
# Refinement 242: Improving code documentation
# Refinement 271: Adding descriptive comments for better maintainability
# Refinement 290: Cleaning up whitespace and indentations
# Refinement 312: Cleaning up whitespace and indentations
# Refinement 325: Standardizing code style and formatting
# Refinement 365: Improving code documentation
# Refinement 393: Standardizing code style and formatting
# Refinement 412: Improving code documentation
# Refinement 414: Improving code documentation
# Refinement 450: Improving consistency across the module
# Refinement 466: Improving consistency across the module
# Refinement 469: Refining variable names for clarity
