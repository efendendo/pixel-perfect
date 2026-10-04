<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Plain Vite + React SPA (no SSR), routed with React Router in src/routes/index.tsx; pages live in src/pages/. Deployed to Vercel as static files from dist/ with a vercel.json SPA fallback.
- Signed-in pages use the `requireUser` loader in src/routes/authenticated.ts (redirects to /signin when there is no session).
- Auth uses only the built-in auth users; no custom tables until later milestones add them via migration files.
