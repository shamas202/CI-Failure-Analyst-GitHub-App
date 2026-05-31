# ✅ Setup Checklist - Do These After Deploying

Your code is on GitHub. Now complete these steps to finish setup.

---

## 📋 What I Already Did ✅

- [x] Created all project files
- [x] Fixed TypeScript build errors
- [x] Pushed to GitHub
- [x] Deployed on Vercel
- [x] Created test workflow (`.github/workflows/test-failure.yml`)

---

## 🔧 What YOU Need to Do (5 steps)

### Step 1: Get Anthropic API Key (2 minutes)

1. Go to: **https://console.anthropic.com**
2. Sign up / log in
3. Click **"Get API Keys"**
4. Click **"Create Key"** → Name it `CI Analyst`
5. **Copy the key** (starts with `sk-ant-`)
6. Save it somewhere (Notepad)

---

### Step 2: Create GitHub App (10 minutes)

1. Go to: **https://github.com/settings/apps**
2. Click **"New GitHub App"**

Fill in this form:

| Field | Enter This |
|-------|------------|
| Name | `CI Failure Analyst` |
| Homepage URL | `https://github.com/shamas202/CI-Failure-Analyst-GitHub-App` |
| Webhook URL | `https://YOUR-VERCEL-URL.vercel.app/api/webhook/github` |
| Webhook Secret | Type any random password (e.g., `MySecret123456789Password`) |

**Uncheck:** "Expire user authorization tokens" ❌

**Set these permissions:**
- Checks → **Read & Write**
- Contents → **Read**
- Pull requests → **Read & Write**
- Actions → **Read**

**Subscribe to events:**
- ✅ Check "Check runs"

Click **"Create GitHub App"**

---

### Step 3: Copy 4 Credentials (2 minutes)

After creating the app, you'll see a settings page. Copy these:

1. **App ID** → Click "Copy" (it's a number)
2. **Client ID** → Click "Copy" (like `Iv1.xxxxx`)
3. **Private Key** → Click **"Generate a private key"** → Downloads `.pem` file
4. **Client Secret** → Click **"Generate a new client secret"** → Copy it

> ⚠️ Save all 4 in Notepad!

---

### Step 4: Format the Private Key (2 minutes)

The `.pem` file has multiple lines. Vercel needs it on ONE line.

**Easy method:**

1. Open terminal:
   ```bash
   cd C:\project
   node scripts/format-private-key.js
   ```

2. Open your `.pem` file in Notepad
3. Copy everything (including `-----BEGIN...` and `-----END...`)
4. Paste in terminal
5. Press Enter
6. Copy the output (one line with `\n`)

---

### Step 5: Add 6 Variables to Vercel (5 minutes)

1. Go to **Vercel Dashboard** → Your project
2. Click **Settings** → **Environment Variables**
3. Click **"New Variable"** 6 times:

| Key | Value |
|-----|-------|
| `WEBHOOK_SECRET` | The random password from Step 2 |
| `GITHUB_APP_ID` | App ID number from Step 3 |
| `GITHUB_APP_PRIVATE_KEY` | Formatted one-line key from Step 4 |
| `GITHUB_APP_CLIENT_ID` | Client ID from Step 3 |
| `GITHUB_APP_CLIENT_SECRET` | Client Secret from Step 3 |
| `ANTHROPIC_API_KEY` | Anthropic key from Step 1 |

For each:
- Click "New Variable"
- Paste Key and Value
- Check all 3 environments (Preview, Production, Development)
- Click "Save"

---

### Step 6: Redeploy on Vercel (2 minutes)

1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"** → **"Confirm"**
4. Wait for green checkmark ✅

---

### Step 7: Test Health Check (1 minute)

Open in browser:
```
https://YOUR-VERCEL-URL.vercel.app/api/webhook/github
```

You should see:
```json
{"status":"ok","timestamp":"2024-04-25T..."}
```

---

### Step 8: Install App on Repository (2 minutes)

1. Go to: **https://github.com/settings/apps**
2. Click your app name
3. Click **"Install App"** (left sidebar)
4. Click **"Install"**
5. Select your repository (or All repositories)
6. Click **"Install"**

---

### Step 9: Test with a PR (3 minutes)

1. Make a small change in your repo
2. Create a Pull Request
3. The test workflow will run and fail
4. Watch for a comment from your bot! 🤖

---

## 🎉 Done!

Your CI Failure Analyst is now working!

---

## ❓ Troubleshooting

| Problem | Fix |
|---------|-----|
| Health check shows 404 | Wait 2 minutes after redeploy |
| "Invalid signature" | WEBHOOK_SECRET must match exactly |
| "Auth failed" | PRIVATE_KEY must be one line with `\n` |
| No bot comment | Check app permissions, check Vercel logs |

---

## 📞 Need Help?

Tell me which step you're stuck on!
# Refinement 11: Minor refactoring of function calls
# Refinement 15: Updating documentation for future reference
# Refinement 16: Improving consistency across the module
# Refinement 47: Adding internal developer notes
# Refinement 79: Refining variable names for clarity
# Refinement 150: Adding internal developer notes
# Refinement 178: Standardizing code style and formatting
# Refinement 191: Minor refactoring of function calls
# Refinement 220: Adding internal developer notes
# Refinement 300: Improving code documentation
# Refinement 307: Standardizing code style and formatting
# Refinement 315: Improving code documentation
# Refinement 322: Optimizing logic in small sections
# Refinement 329: Optimizing logic in small sections
# Refinement 359: Updating documentation for future reference
# Refinement 365: Adding descriptive comments for better maintainability
# Refinement 368: Cleaning up whitespace and indentations
# Refinement 373: Adding internal developer notes
# Refinement 376: Adding internal developer notes
# Refinement 379: Adding descriptive comments for better maintainability
# Refinement 384: Adding internal developer notes
# Refinement 405: Minor refactoring of function calls
# Refinement 417: Improving consistency across the module
# Refinement 438: Adding descriptive comments for better maintainability
# Refinement 467: Refining variable names for clarity
# Refinement 4: Standardizing code style and formatting
# Refinement 18: Adding internal developer notes
# Refinement 59: Improving consistency across the module
# Refinement 75: Improving code documentation
# Refinement 110: Cleaning up whitespace and indentations
# Refinement 129: Cleaning up whitespace and indentations
# Refinement 141: Adding descriptive comments for better maintainability
# Refinement 168: Standardizing code style and formatting
# Refinement 174: Improving code documentation
# Refinement 216: Improving consistency across the module
# Refinement 241: Adding descriptive comments for better maintainability
# Refinement 250: Adding internal developer notes
# Refinement 265: Cleaning up whitespace and indentations
# Refinement 269: Updating documentation for future reference
# Refinement 272: Updating documentation for future reference
# Refinement 308: Refining variable names for clarity
