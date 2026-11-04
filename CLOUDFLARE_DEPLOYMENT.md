# Deploying DOVAAN Resort to Cloudflare Pages

This website is fully configured for deployment on **Cloudflare Pages** with automatic SPA routing, security headers, and asset caching.

---

## Method 1: Git Integration (Recommended - Continuous Deployment)

If your project is pushed to a GitHub or GitLab repository:

1. **Log in to Cloudflare Dashboard**:
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com/) and navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. **Select Repository**:
   - Select your repository (`dovaan-resort`).
3. **Build Configuration Settings**:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave blank or default)
4. **Environment Variables**:
   - Under **Build system version**, Cloudflare Pages uses Node 20 as configured in `.nvmrc` and `.node-version`.
   - If needed, you can set `NODE_VERSION` to `20` in the Cloudflare Pages environment variables.
5. **Click Save and Deploy**:
   - Cloudflare will build the site in ~30 seconds and provide an instant preview URL (e.g., `https://dovaan-resort.pages.dev`).

---

## Method 2: Direct CLI Deployment via Wrangler (No Git Required)

To deploy directly from your local terminal using Cloudflare's official Wrangler tool:

1. **Build the production bundle**:
   ```bash
   npm run build
   ```

2. **Deploy to Cloudflare Pages**:
   ```bash
   npx wrangler pages deploy dist --project-name=dovaan-resort
   ```
   *(If prompted, authorize Wrangler with your Cloudflare account)*

---

## Pre-Configured Files Included in this Project

- **`public/_headers`**: Enforces best-practice security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`) and sets 1-year immutable caching for static assets in `/assets/*`.
- **`.nvmrc` & `.node-version`**: Pins the Node.js version to 20 for Cloudflare's build runners.
- **`vercel.json`**: Retained so the project can deploy simultaneously to both Cloudflare and Vercel.

---

## Important: Cloudflare Pages vs Cloudflare Workers
- This is a frontend React SPA. It must be created under **Cloudflare Pages** (NOT Cloudflare Workers).
- In the Cloudflare Dashboard, always choose **Workers & Pages** > **Create application** > **Pages** tab.
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- If using CLI, always use `wrangler pages deploy dist` (not `wrangler deploy`).
