# TAJ777 Static UI Preview

`index.html` is a fully static, script-free snapshot of the TAJ777 site UI.
All `<script>` tags, JS-based navigation, and inline `javascript:` links from
the original `sport.html` capture were removed, so **no click, animation, or
interaction can throw an error or crash the page** — there is nothing left
that can execute.

## What's included
- `index.html` — static markup + CSS only (no JS, no backend calls).
- `sport_files/` — all CSS and image/font assets the page depends on
  (`style.css`, `responsive.css`, `bootstrap.min.css`, images, etc.). Keep
  this folder alongside `index.html` — the interconnections (relative
  `./sport_files/...` links) are preserved as-is.
- Internal links that used to point to `https://taj777.net/...` (routes that
  need the live backend/SPA) were converted to `#` so clicking them just
  stays on the page instead of crashing or leaving the demo.
- Responsive behavior comes from the original `responsive.css` /
  `animation-mobile.css` that ship with the page — resize the browser or
  test on a phone to confirm layout adapts.

## Run locally
Any static file server works, e.g.:

```powershell
npx serve .
```

Then open the printed local URL (defaults to `http://localhost:3000` or
similar) — it serves `index.html` automatically.

## Recommended deployment: static container (Docker + Nginx)
A `Dockerfile` is included that serves the two required items
(`index.html` + `sport_files/`) via Nginx — no build step, no backend:

```powershell
docker build -t taj777-static .
docker run -p 8080:80 taj777-static
```

Open `http://localhost:8080`.

### Alternative one-click static hosts (no Docker needed)
Since this is plain HTML/CSS/images with zero build step, any static host
works just as well — drag-and-drop the folder (containing `index.html` and
`sport_files/`) to:
- Netlify Drop (netlify.com/drop)
- GitHub Pages (push the folder to a repo, enable Pages)
- Cloudflare Pages / Vercel (static project, no framework/build command)
