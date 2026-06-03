# AURIS DPR Analyzer Pro

**AURIS PRIVATE LIMITED** | CIN: U70200HR2026PTC141922 | [www.auris8.com](https://www.auris8.com)

AI-powered SaaS platform for compliance analysis of Highway Detailed Project Reports (DPRs) against IRC Codes and MoRTH 5th Revision specifications.

---

## 1. Project Overview & Architecture

### What It Does
Consultancy firms purchase access tokens with a fixed number of analyses. They upload DPR PDFs via the web interface and receive AI-generated compliance reports identifying deficiencies against IRC and MoRTH codes.

### Architecture

```
Browser (login.html / index.html / admin.html)
  │  - Token stored in sessionStorage ONLY
  │  - PDF converted to base64 in browser
  │  - Results displayed from JSON returned by server
  │
  ▼
Netlify Functions (serverless Node.js)
  ├── auth.js       — Token validation
  ├── analyze.js    — AI analysis (Anthropic API + IRC data)
  ├── usage.js      — Credit checks and audit logging
  └── admin.js      — Firm management (protected by admin secret)
  │
  ▼
Supabase (PostgreSQL)
  ├── firms         — Licensed firm accounts and quotas
  └── usage_log     — Full audit trail of all analyses

irc-data/ folder (server-side only, never publicly served)
  └── IRC and MoRTH reference .md files (added manually post-deploy)
```

### Security Model
- Anthropic API key lives only in Netlify environment variables
- System prompt and IRC reference content are loaded inside `analyze.js` — never exposed to frontend
- All token validation is server-side on every function call
- `irc-data/*.md` files are in `.gitignore` to protect IP
- Frontend only: receives JSON results, renders UI, generates PDF locally with jsPDF

---

## 2. Prerequisites

- Node.js 18+
- [Netlify CLI](https://docs.netlify.com/cli/get-started/): `npm install -g netlify-cli`
- Supabase account (free tier works)
- Anthropic API account with access to `claude-haiku-4-5-20251001`
- GitHub account (for Netlify deployment)

---

## 3. Supabase Setup

### Step 1 — Create a Supabase project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your **Project URL** and **service_role key** (Settings → API)

### Step 2 — Run the SQL setup
1. Open the Supabase dashboard → SQL Editor
2. Paste the full contents of `supabase-setup.sql`
3. Click **Run**

This creates:
- `firms` table — licensed firms and their quotas
- `usage_log` table — full audit trail
- Row Level Security (RLS) policies — only service_role key (used by Netlify functions) has access
- Test firm with token `AURIS-TEST-001` and 10 analyses

### Step 3 — Verify
After running, you should see a row in the `firms` table for "Test Consultancy Firm" with token `AURIS-TEST-001`.

---

## 4. Netlify Environment Variables Setup

In your Netlify dashboard → Site → Environment Variables, add:

| Variable | Value | Notes |
|---|---|---|
| `ANTHROPIC_API_KEY` | `sk-ant-...` | From console.anthropic.com |
| `SUPABASE_URL` | `https://xxx.supabase.co` | From Supabase Settings → API |
| `SUPABASE_SERVICE_KEY` | `eyJ...` | **Service role key** (not anon key) |
| `ADMIN_SECRET` | `your-strong-password` | Choose a strong unique password |

> **Warning:** Use the `service_role` key for `SUPABASE_SERVICE_KEY`, not the `anon` key. The service role key bypasses RLS and is required for the functions to write to the database.

---

## 5. Deploy to Netlify from GitHub

### Step 1 — Push to GitHub
```bash
git add .
git commit -m "Initial AURIS DPR Analyzer deployment"
git push -u origin main
```

### Step 2 — Connect to Netlify
1. Go to [netlify.com](https://netlify.com) → Add new site → Import from Git
2. Select your GitHub repository
3. Build settings are auto-detected from `netlify.toml`:
   - **Publish directory:** `public`
   - **Functions directory:** `netlify/functions`
4. Add the 4 environment variables from Step 4 above
5. Click **Deploy Site**

### Step 3 — Test
- Visit `https://your-site.netlify.app/login.html`
- Enter token `AURIS-TEST-001`
- You should be logged in and see 10 credits

---

## 6. Add a New Licensed Firm

### Via Admin Panel (recommended)
1. Go to `https://your-site.netlify.app/admin.html`
2. Enter your `ADMIN_SECRET`
3. Fill in the **Add New Licensed Firm** form:
   - Firm name, contact details
   - Number of starting analyses
   - Expiry date
   - License type
4. Click **Create Firm & Generate Token**
5. Copy the generated token (format: `AURIS-FIRMNAME-XXXX`) and send to the client

### Via Supabase SQL (alternative)
```sql
INSERT INTO firms (firm_name, contact_person, email, access_token, analyses_total, license_type, expiry_date)
VALUES ('Your Firm Name', 'Contact Name', 'email@firm.com', 'AURIS-CUSTOM-TOKEN', 25, 'starter', '2027-01-01');
```

---

## 7. Top Up Credits for a Firm

### Via Admin Panel
1. Go to `admin.html` → find the firm in the table
2. Click **Top Up** → enter the number of analyses to add
3. Click **Add Credits**

### Via Supabase SQL
```sql
UPDATE firms
SET analyses_total = analyses_total + 25
WHERE access_token = 'AURIS-FIRM-TOKEN';
```

---

## 8. License Packages

| Package | Analyses | Price (Rs) |
|---|---|---|
| **Starter** | 25 analyses | Rs 25,000 |
| **Standard** | 75 analyses | Rs 60,000 |
| **Enterprise** | Unlimited annual contract | Price on request |

Contact: [auris8.office@gmail.com](mailto:auris8.office@gmail.com)

---

## 9. Adding IRC Reference Files

The `irc-data/` folder is intentionally empty in the repository (the `.md` files are in `.gitignore` to protect intellectual property).

After deploying to Netlify, you need to add the IRC reference files. Since Netlify Functions run from the deployed bundle, the recommended approach is:

### Option A — Include in deployment (recommended for Netlify)
1. Temporarily remove `irc-data/*.md` from `.gitignore`
2. Add your IRC `.md` files to `irc-data/`
3. Commit and push (this will include them in the Netlify bundle)
4. After deployment, add them back to `.gitignore` (or keep them excluded and use Option B)

### Option B — Use Netlify Blobs or external storage
Store the IRC files in Netlify Blobs or an S3 bucket and modify `analyze.js` to fetch them at runtime.

### Required files:
```
irc-data/
├── IRC_37_2018_Extracted.md
├── IRC_52_2019_Extraction.md
├── IRC_SP19_DPR_Analyzer_Extraction.md
├── IRC_SP48_2023_DPR_Analyzer_Extraction.md
├── MoRTH_DPR_Reference_Extract.md
├── IRC_73_1980_Extraction.md
├── IRC_SP13_DPR_Analyzer_Extraction.md
└── IRC_SP42_2014_DPR_Analyzer_Extraction.md
```

> The system works without these files — it will fall back to the AI model's general knowledge. But adding the files significantly improves citation accuracy.

---

## 10. Security Architecture

| Layer | Protection |
|---|---|
| **API Keys** | Anthropic key only in Netlify env vars, never in frontend |
| **AI Prompt** | System prompt embedded in `analyze.js`, never in browser |
| **IRC Data** | `.md` files in `irc-data/`, excluded from Git, never publicly served |
| **Token Validation** | Server-side on every single function call |
| **Database** | Supabase RLS + service_role key (not anon key) |
| **Session** | `sessionStorage` only (cleared on tab close), never `localStorage` |
| **Rate Limiting** | Max 10 analyses/hour per token (enforced in `analyze.js`) |
| **Admin** | Separate `ADMIN_SECRET` header required for all admin operations |
| **CORS** | Explicit CORS headers on every function response |

---

## 11. Troubleshooting

### "Invalid access token" on login
- Check the token matches exactly in the `firms` table (case-sensitive)
- Verify `is_active = true` and `expiry_date` is in the future
- Confirm `analyses_remaining > 0`

### Analysis fails with "AI returned an invalid response"
- Check `ANTHROPIC_API_KEY` is set correctly in Netlify env vars
- The model `claude-haiku-4-5-20251001` must be available on your Anthropic account
- Check Netlify function logs (Netlify Dashboard → Functions → analyze)

### Supabase connection errors
- Verify `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` are correct
- Ensure you're using the **service_role** key, not the **anon** key
- Check that RLS policies were created by the SQL script

### PDF upload fails or times out
- Netlify Functions have a 10-second timeout by default (26s on Pro plan)
- Very large PDFs (>5MB) may exceed the timeout — split the PDF
- Check the Netlify function logs for the specific error

### Admin panel shows "Unauthorized"
- Verify `ADMIN_SECRET` env var matches what you're entering
- The header `x-admin-secret` must be sent — this happens automatically from `admin.html`

### Logo not showing
- Place `auris-logo.png` in `public/assets/`
- The login and app pages have fallback text if the logo file is missing

---

## 12. Support

**AURIS PRIVATE LIMITED**
- Website: [www.auris8.com](https://www.auris8.com)
- Email: [auris8.office@gmail.com](mailto:auris8.office@gmail.com)
- CIN: U70200HR2026PTC141922

---

## Local Development

```bash
# Install dependencies
npm install

# Set up local env
cp .env.example .env
# Edit .env with your actual keys

# Run locally with Netlify Dev
netlify dev
```

The app will be available at `http://localhost:8888`.
