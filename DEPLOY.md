# TestSeries — Vercel deployment

This build is deliberately configured so Vercel does **not** run `tsc -b`. The previous deployment failed because Vercel could not see the `/src` input directory while TypeScript project references required it.

## GitHub
Upload the contents of this folder to the repository root. The important files are `index.html`, `main.jsx`, `App.jsx`, `data.js`, `styles.css`, `package.json`, `vite.config.ts`, and `vercel.json`.

## Vercel
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

The build command is `vite build`, so the old `TS18003: No inputs were found in config file ... tsconfig.app.json` error is no longer part of deployment.

The npm `allow-scripts` lines are warnings, not the build failure.
