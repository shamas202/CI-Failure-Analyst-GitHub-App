# CI/CD Pipeline Failure Root-Cause Analyst

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/ci-failure-analyst)

A GitHub App that automatically analyzes CI/CD pipeline failures using AI and posts helpful comments on pull requests.

## ✨ Features

- **Automatic Failure Detection** - Listens to GitHub check run events
- **AI-Powered Analysis** - Uses Anthropic's Claude 3 Haiku for fast, cheap analysis
- **Smart Classification** - Categorizes failures as:
  - 🐛 Code regression
  - 🎲 Flaky test
  - ⏱️ Infrastructure timeout
  - 📦 Dependency issue
  - 🔍 Unknown (with details)
- **PR Comments** - Posts formatted analysis directly on pull requests
- **Stateless** - No database, deploys in minutes to Vercel

---

## 🚀 Quick Start

**See [SETUP.md](SETUP.md) for detailed step-by-step instructions.**

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

### 3. Deploy to Vercel
```bash
npm install -g vercel
vercel login
vercel
```

### 4. Set Environment Variables
```bash
vercel env add WEBHOOK_SECRET production
vercel env add GITHUB_APP_ID production
vercel env add GITHUB_APP_PRIVATE_KEY production
vercel env add GITHUB_APP_CLIENT_ID production
vercel env add GITHUB_APP_CLIENT_SECRET production
vercel env add ANTHROPIC_API_KEY production
```

### 5. Configure GitHub App
- Webhook URL: `https://your-app.vercel.app/api/webhook/github`
- Subscribe to: Check runs
- Permissions: Checks (R/W), Contents (R), Pull requests (R/W), Actions (R)

---

## 📁 Project Structure

```
.
├── app/
│   └── api/webhook/github/route.ts    # Webhook handler
├── lib/
│   ├── analyzer/
│   │   ├── classifier.ts              # AI failure analysis
│   │   └── prompt.ts                  # Prompt templates
│   ├── github/
│   │   ├── client.ts                  # GitHub App auth
│   │   └── logs.ts                    # Log fetching
│   ├── utils/
│   │   └── truncate.ts                # Text utilities
│   ├── webhook/
│   │   └── verification.ts            # Signature verification
│   └── types.ts                       # TypeScript types
├── SETUP.md                           # Detailed setup guide
└── vercel.json                        # Vercel config (60s timeout)
```

---

## 🔧 Environment Variables

| Variable | Description |
|----------|-------------|
| `GITHUB_APP_ID` | Your GitHub App ID |
| `GITHUB_APP_PRIVATE_KEY` | Private key (single line with `\n`) |
| `GITHUB_APP_CLIENT_ID` | OAuth client ID |
| `GITHUB_APP_CLIENT_SECRET` | OAuth client secret |
| `WEBHOOK_SECRET` | Webhook signing secret |
| `ANTHROPIC_API_KEY` | Anthropic API key |

---

## 📝 How It Works

1. **Webhook** - GitHub sends `check_run` event when CI completes
2. **Verify** - App verifies signature with shared secret
3. **Filter** - Only processes failures (`conclusion: failure/timed_out`)
4. **Fetch** - Downloads CI logs and PR diff
5. **Analyze** - Sends to Claude 3 Haiku for classification
6. **Comment** - Posts formatted analysis on the PR

---

## 🎯 Example Output

When a test fails, your bot comments:

```markdown
## 🤖 CI Failure Analysis

| Field | Value |
|-------|-------|
| **Failure Type** | ✅ 🐛 Code Regression |
| **Confidence** | high |
| **Check Run** | [`test`](https://...) |

### Summary

Test `test_user_login` failed due to assertion error...

### Suggested Fix

Check the recent changes to `src/auth.ts`...
```

---

## 💰 Costs

- **Vercel**: Free (Hobby tier)
- **Anthropic**: ~$0.01-0.25 per analysis (Claude Haiku)
- **GitHub**: Free for public repos

---

## 🔒 Security

- Webhook signatures verified with HMAC-SHA256
- GitHub App tokens cached in memory only
- No data stored (stateless design)
- Rate limiting handled automatically

---

## 🛠️ Development

```bash
# Run locally
npm run dev

# Type check
npm run typecheck

# Build for production
npm run build
```

---

## 📄 License

MIT
