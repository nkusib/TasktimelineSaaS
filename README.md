# Task Timeline Board — Static Site

This folder contains a single-page web app you can host for free (GitHub Pages, Netlify, Vercel) and embed into **Google Sites**.

## Files
- `index.html` — the entire app (React + Tailwind via CDN).

## Option A — GitHub Pages (free)
1. Create a **public** repo on GitHub (e.g., `task-timeline`).
2. Upload `index.html` to the repo root (or drag & drop).
3. In the repo: **Settings → Pages → Build and deployment**  
   - Source: **Deploy from a branch**  
   - Branch: **main** / **root**  
4. Your site will be available at `https://<your-username>.github.io/<repo>/`.

## Option B — Netlify (easiest)
1. Go to https://app.netlify.com/drop and **drag & drop** the folder.
2. Netlify gives you a site URL like `https://<random-name>.netlify.app`.
3. You can rename the site in Netlify.

## Option C — Vercel
1. Create a new project and import the repo/folder.
2. Deploy. You’ll get a URL like `https://<project>.vercel.app`.

## Embed in Google Sites
1. Open your **Google Site** → click **Insert → Embed**.
2. Choose **By URL** and paste your deployed site URL (from GitHub Pages/Netlify/Vercel).
3. Resize the frame to your liking. Done ✅

## Shareable Link feature
- Click **Copy Share Link** in the app to generate a URL with your current tasks **encoded into the query string**.  
- Anyone opening that URL will see the same tasks (no server needed).

## Backup / Restore
- Use **Export JSON** to download your task list.  
- Use **Import JSON** to load a task list from a file.
