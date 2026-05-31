# CI/CD Pipeline Failure Root-Cause Analyst

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/shamas202/CI-Failure-Analyst-GitHub-App)

**FREE** GitHub App that automatically analyzes CI/CD pipeline failures using AI and posts helpful comments on pull requests.

> 💡 Uses **OpenRouter free tier** - no credit card required!

---

## ✨ Features

- **Automatic Failure Detection** - Listens to GitHub check run events
- **AI-Powered Analysis** - Uses Meta Llama 3.1 (free via OpenRouter)
- **Smart Classification** - Categorizes failures as:
  - 🐛 Code regression
  - 🎲 Flaky test
  - ⏱️ Infrastructure timeout
  - 📦 Dependency issue
  - 🔍 Unknown (with details)
- **PR Comments** - Posts formatted analysis directly on pull requests
- **100% Free** - No database, no paid APIs, deploys free on Vercel

---

## 🚀 Quick Start

**See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed step-by-step instructions.**

### 1. Deploy to Vercel
```bash
# Already deployed? Skip to step 2
vercel
```

### 2. Get OpenRouter API Key (FREE)
1. Go to: https://openrouter.ai/keys
2. Sign up (free, no credit card)
3. Create API Key
4. Copy it

### 3. Configure Vercel Environment Variables
- `OPENROUTER_API_KEY` - Your OpenRouter key
- `GITHUB_APP_ID` - Your GitHub App ID
- `GITHUB_APP_PRIVATE_KEY` - Your GitHub App private key
- `GITHUB_APP_CLIENT_ID` - Your GitHub App client ID
- `GITHUB_APP_CLIENT_SECRET` - Your GitHub App client secret
- `WEBHOOK_SECRET` - Your webhook secret

### 4. Create GitHub App
- Webhook URL: `https://your-app.vercel.app/api/webhook/github`
- Permissions: Checks (R/W), Contents (R), Pull requests (R/W), Actions (R)
- Subscribe to: Check runs

---

## 📁 Project Structure

```
.
├── app/
│   └── api/webhook/github/route.ts    # Webhook handler
├── lib/
│   ├── analyzer/
│   │   ├── classifier.ts              # AI failure analysis (OpenRouter)
│   │   └── prompt.ts                  # Prompt templates
│   ├── github/
│   │   ├── client.ts                  # GitHub App auth
│   │   └── logs.ts                    # Log fetching
│   ├── utils/
│   │   └── truncate.ts                # Text utilities
│   ├── webhook/
│   │   └── verification.ts            # Signature verification
│   └── types.ts                       # TypeScript types
├── SETUP_GUIDE.md                     # Detailed setup guide
├── QUICK_START.md                     # Quick reference
└── vercel.json                        # Vercel config (60s timeout)
```

---

## 🔧 Environment Variables

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `OPENROUTER_API_KEY` | OpenRouter API key (FREE) | https://openrouter.ai/keys |
| `GITHUB_APP_ID` | Your GitHub App ID | GitHub App settings |
| `GITHUB_APP_PRIVATE_KEY` | Private key (single line with `\n`) | GitHub App settings |
| `GITHUB_APP_CLIENT_ID` | OAuth client ID | GitHub App settings |
| `GITHUB_APP_CLIENT_SECRET` | OAuth client secret | GitHub App settings |
| `WEBHOOK_SECRET` | Webhook signing secret | You create this |

---

## 📝 How It Works

1. **Webhook** - GitHub sends `check_run` event when CI completes
2. **Verify** - App verifies signature with shared secret
3. **Filter** - Only processes failures (`conclusion: failure/timed_out`)
4. **Fetch** - Downloads CI logs and PR diff
5. **Analyze** - Sends to OpenRouter (Llama 3.1 free model)
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

| Service | Cost |
|---------|------|
| **Vercel** | Free (Hobby tier) |
| **OpenRouter AI** | Free (Llama 3.1 free tier) |
| **GitHub** | Free for public repos |

**Total: $0** 🎉

---

## 🔒 Security

- Webhook signatures verified with HMAC-SHA256
- GitHub App tokens cached in memory only
- No data stored (stateless design)
- Rate limiting handled automatically

---

## 🛠️ Development

```bash
# Install dependencies
npm install

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
..
---

## 🙏 Credits

Built with:
- [OpenRouter](https://openrouter.ai) - Free AI API
- [Octokit](https://octokit.github.io/) - GitHub API client
- [Next.js](https://nextjs.org/) - Web framework
- [Vercel](https://vercel.com/) - Hosting
# Refinement 7: Improving code documentation
# Refinement 9: Adding internal developer notes
# Refinement 26: Cleaning up whitespace and indentations
# Refinement 108: Standardizing code style and formatting
# Refinement 116: Adding internal developer notes
# Refinement 130: Improving code documentation
# Refinement 137: Adding descriptive comments for better maintainability
# Refinement 141: Adding descriptive comments for better maintainability
# Refinement 168: Improving consistency across the module
# Refinement 182: Optimizing logic in small sections
# Refinement 183: Updating documentation for future reference
# Refinement 186: Optimizing logic in small sections
# Refinement 228: Cleaning up whitespace and indentations
# Refinement 251: Improving code documentation
# Refinement 313: Improving consistency across the module
# Refinement 334: Cleaning up whitespace and indentations
