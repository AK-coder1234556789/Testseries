# TestSeries — GitHub + Vercel

1. Upload the contents of this folder to the root of a GitHub repository.
2. In Vercel, import that repository.
3. Framework preset: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy.

Do not upload `.env` or secret API keys. The browser build is intentionally configured so AI secrets are not exposed client-side.

Firebase values, when used, should be supplied through Vercel Environment Variables and the application configuration in `src/firebase.ts` should be updated to read those variables.
