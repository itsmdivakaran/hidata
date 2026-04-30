# GitHub Deployment Configuration

This file contains setup instructions for deploying HiData to GitHub and connecting it to Vercel/Netlify.

## GitHub Setup

### 1. Initialize Git Repository

```bash
cd /Users/maheshdivakaran/Documents/CLAUDE/webs
git init
git add .
git commit -m "Initial commit: HiData platform MVP"
```

### 2. Create GitHub Repository

1. Go to https://github.com/new
2. Create new repository named `hidata` (or your preferred name)
3. Choose description: "Your gateway to Data Science, AI & career opportunities in India"
4. Make it public (for free GitHub Pages hosting)
5. Do NOT initialize with README (we already have one)

### 3. Add Remote and Push

```bash
git remote add origin https://github.com/yourusername/hidata.git
git branch -M main
git push -u origin main
```

## Vercel Deployment (Recommended)

### 1. Deploy via Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Select "Import Git Repository"
4. Choose your GitHub repository
5. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** ./ (default)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

### 2. Set Environment Variables

1. In Vercel dashboard, go to Settings → Environment Variables
2. Add:
   - Name: `NEXT_PUBLIC_NEWS_API_KEY`
   - Value: `your_newsapi_key_here`
   - Name: `NEXT_PUBLIC_SITE_URL`
   - Value: `https://hidata.co.in`

### 3. Custom Domain Setup

1. Go to Settings → Domains
2. Click "Add Domain"
3. Enter: `hidata.co.in`
4. Vercel will provide DNS instructions
5. Add DNS records to your domain registrar (Namecheap, GoDaddy, etc.)

## Netlify Alternative

### 1. Deploy via Netlify

1. Go to https://app.netlify.com
2. Click "New site from Git"
3. Connect GitHub
4. Select your repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `out` (for static export) or `.next`

### 2. Set Environment Variables

1. Go to Site settings → Build & deploy → Environment
2. Add:
   - `NEXT_PUBLIC_NEWS_API_KEY`
   - `NEXT_PUBLIC_SITE_URL`

### 3. Add Custom Domain

1. Go to Settings → Domain management
2. Add your custom domain: `hidata.co.in`
3. Configure DNS records

## GitHub Pages (Static Export)

For free hosting on GitHub Pages:

### 1. Update next.config.ts

```typescript
const nextConfig = {
  output: 'export',
  // ...
};
```

### 2. Build and Deploy

```bash
npm run build
git add .
git commit -m "Build for GitHub Pages"
git push
```

### 3. Configure GitHub Pages

1. Go to repository Settings → Pages
2. Select Source: Deploy from a branch
3. Branch: `main` / Directory: `./out`
4. Add custom domain: `hidata.co.in`

## Weekly News Updates

### Setting Up Automated Updates

Option 1: Vercel Cron Jobs

```javascript
// api/news/route.ts
export const revalidate = 86400; // 24 hours
```

Option 2: GitHub Actions

Create `.github/workflows/update-news.yml`:

```yaml
name: Update News

on:
  schedule:
    - cron: '0 9 * * 0' # Every Sunday at 9 AM UTC

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Update news feed
        run: |
          npm install
          npm run build
```

## Domain Registration

1. Go to domain registrar (Namecheap, GoDaddy, etc.)
2. Register `hidata.co.in`
3. Update DNS records to point to Vercel/Netlify
4. Propagation typically takes 24-48 hours

## SSL Certificate

Both Vercel and Netlify provide free SSL certificates automatically.

## GitHub Collab Setup

To allow team members:

1. Go to Settings → Collaborators
2. Click "Add people"
3. Search for GitHub username
4. Grant permissions (Push access recommended)

## Monitoring & Analytics

### Add Vercel Analytics

Vercel provides free Web Vitals tracking.

### Add Custom Analytics (Optional)

```bash
npm install @vercel/analytics
```

## CI/CD Pipeline

Both Vercel and Netlify automatically:
- Deploy on every push to main
- Create preview builds for pull requests
- Run tests (if configured)

## Troubleshooting

### News API Not Working
- Verify API key in `.env.local`
- Check News API rate limits (50 req/day free tier)
- Test endpoint: `/api/news`

### Build Failures
```bash
npm run build # Test locally first
```

### Custom Domain Issues
- Wait for DNS propagation (up to 48 hours)
- Clear browser cache
- Verify DNS records in registrar

## Further Reading

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [GitHub Pages](https://pages.github.com)

---

**Next Steps:**
1. Create GitHub repository
2. Deploy to Vercel/Netlify
3. Add custom domain
4. Share with community!
