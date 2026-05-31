# 🚀 Quick Setup Guide

Follow these steps exactly to get your CI Failure Analyst running.

---

## 📋 What You Need

1. **GitHub Account** (you have this)
2. **Anthropic API Key** (free to start)
3. **Vercel Account** (free)

---

## 🔑 Step 1: Get Anthropic API Key

1. Go to https://console.anthropic.com
2. Sign up or log in
3. Click **"Get API Keys"** in the left sidebar
4. Click **"Create Key"**
5. **Copy the key** (starts with `sk-ant-`) - you won't see it again!

---

## 🐙 Step 2: Create GitHub App

### 2.1 Go to GitHub Apps
1. Visit: https://github.com/settings/apps
2. Click **"New GitHub App"**

### 2.2 Fill in Basic Info
| Field | What to Enter |
|-------|---------------|
| Name | `CI Failure Analyst` |
| Homepage URL | `https://example.com` (temporary, change later) |

### 2.3 Uncheck This
- ❌ Uncheck "Expire user authorization tokens"

### 2.4 Set Permissions (Important!)
Scroll to **Repository permissions**:

| Permission | Setting |
|------------|---------|
| Checks | **Read & Write** |
| Contents | **Read** |
| Pull requests | **Read & Write** |
| Actions | **Read** |

### 2.5 Subscribe to Events
Scroll to **Subscribe to events**:
- ✅ Check **"Check runs"**

### 2.6 Create the App
1. Click **"Create GitHub App"** at the bottom

### 2.7 Save Your Credentials
On the next page, you'll see:
- **App ID** → Copy this (it's a number like `123456`)
- **Client ID** → Copy this (looks like `Iv1.abcdef123`)
- Click **"Generate a private key"** → Downloads a `.pem` file
- Click **"Show"** next to Client Secret → Copy it

> ⚠️ **Save all 4 values somewhere safe!** You need them later.

---

## 🔐 Step 3: Create Webhook Secret

Open Terminal (Mac/Linux) or Git Bash (Windows) and run:

```bash
openssl rand -hex 32
```

Copy the output (a long random string like `a1b2c3d4...`).

> No openssl? Use any random 64-character string.

---

## 🌐 Step 4: Deploy to Vercel

### 4.1 Install Vercel CLI
```bash
npm install -g vercel
```

### 4.2 Login to Vercel
```bash
vercel login
```

### 4.3 Deploy
```bash
vercel
```
- Press Enter for all prompts (accept defaults)
- Copy your URL (like `https://my-app-xyz.vercel.app`)

### 4.4 Add Environment Variables
Run these commands one by one, pasting your values when prompted:

```bash
vercel env add WEBHOOK_SECRET production
vercel env add GITHUB_APP_ID production
vercel env add GITHUB_APP_PRIVATE_KEY production
vercel env add GITHUB_APP_CLIENT_ID production
vercel env add GITHUB_APP_CLIENT_SECRET production
vercel env add ANTHROPIC_API_KEY production
```

### 4.5 Redeploy with Variables
```bash
vercel --prod
```

---

## 🔗 Step 5: Connect GitHub App to Vercel

### 5.1 Update Webhook URL
1. Go back to https://github.com/settings/apps
2. Click your app → **Edit**
3. Find **Webhook URL**
4. Replace with: `https://YOUR-VERCEL-URL.vercel.app/api/webhook/github`
5. Click **"Save Changes"**

### 5.2 Test It Works
Visit in your browser:
```
https://YOUR-VERCEL-URL.vercel.app/api/webhook/github
```

You should see:
```json
{"status":"ok","timestamp":"..."}
```

---

## 📦 Step 6: Install the App

1. Go to your app page: `https://github.com/apps/CI-Failure-Analyst` (or your app name)
2. Click **"Install"**
3. Select repositories you want to monitor
4. Click **"Install"**

---

## ✅ Step 7: Test It

1. Create a PR in one of your repositories
2. Make sure it has a GitHub Actions workflow
3. Cause a failure (like `exit 1` in a script)
4. Wait for the check to fail
5. Watch for a comment from your bot! 🤖

---

## 🛠️ Troubleshooting

### "Invalid signature" error
- Make sure `WEBHOOK_SECRET` in Vercel matches what you generated

### "Auth failed" or 401 errors
- Check `GITHUB_APP_PRIVATE_KEY` - it should be ONE line with `\n` (backslash-n), not actual newlines

### No comment appears
- Check the app has correct permissions
- Check the check run was actually a failure (not cancelled/skipped)

### 404 on health check
- Wait 1-2 minutes after deploy
- Vercel needs time to build

---

## 📝 Environment Variable Format

Here's what each should look like:

| Variable | Example |
|----------|---------|
| `WEBHOOK_SECRET` | `a1b2c3d4e5f6...` (64 chars) |
| `GITHUB_APP_ID` | `123456` (just the number) |
| `GITHUB_APP_PRIVATE_KEY` | `-----BEGIN RSA PRIVATE KEY-----\nMIIE...\n-----END RSA PRIVATE KEY-----` |
| `GITHUB_APP_CLIENT_ID` | `Iv1.abcdef123456` |
| `GITHUB_APP_CLIENT_SECRET` | `abc123def456...` |
| `ANTHROPIC_API_KEY` | `sk-ant-api03-...` |

---

## 💰 Costs

- **Vercel**: Free for hobby projects
- **Anthropic**: ~$0.25 per analysis (Claude Haiku is cheap!)
- **GitHub**: Free for public repos, included with private

Set a budget alert on Anthropic to stay safe!
# Refinement 54: Updating documentation for future reference
# Refinement 74: Optimizing logic in small sections
# Refinement 103: Adding descriptive comments for better maintainability
# Refinement 105: Cleaning up whitespace and indentations
# Refinement 110: Standardizing code style and formatting
# Refinement 112: Adding descriptive comments for better maintainability
# Refinement 133: Refining variable names for clarity
# Refinement 160: Optimizing logic in small sections
# Refinement 170: Cleaning up whitespace and indentations
# Refinement 187: Adding descriptive comments for better maintainability
# Refinement 190: Optimizing logic in small sections
# Refinement 208: Refining variable names for clarity
# Refinement 210: Adding descriptive comments for better maintainability
# Refinement 217: Optimizing logic in small sections
# Refinement 225: Adding descriptive comments for better maintainability
# Refinement 250: Adding internal developer notes
# Refinement 279: Cleaning up whitespace and indentations
# Refinement 304: Adding descriptive comments for better maintainability
# Refinement 355: Cleaning up whitespace and indentations
# Refinement 358: Adding descriptive comments for better maintainability
# Refinement 361: Improving code documentation
# Refinement 367: Cleaning up whitespace and indentations
# Refinement 369: Refining variable names for clarity
# Refinement 457: Refining variable names for clarity
# Refinement 470: Adding descriptive comments for better maintainability
# Refinement 33: Optimizing logic in small sections
# Refinement 43: Refining variable names for clarity
