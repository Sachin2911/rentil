# Rentil — webapp

Marketing site for **Rentil**, the AI admin layer for property management.
_Handled, or on your desk._

Built with [Next.js 16](https://nextjs.org) (App Router), [Tailwind CSS v4](https://tailwindcss.com),
[@paper-design/shaders-react](https://github.com/paper-design/shaders) for the animated
gradient backdrops, [motion](https://motion.dev) for scroll reveals and
[lucide-react](https://lucide.dev) icons.

## Brand

| Token   | Hex       | Use                        |
| ------- | --------- | -------------------------- |
| `teal`  | `#0d4f55` | Primary / dark panels      |
| `cream` | `#f2e6d3` | Accent surfaces / buttons  |
| `paper` | `#f6f3ee` | Page background            |

All page copy lives in [`src/lib/content.ts`](src/lib/content.ts).

## Development

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | What it does                  |
| ------------------- | ----------------------------- |
| `npm run dev`       | Dev server                    |
| `npm run build`     | Production build              |
| `npm start`         | Serve the production build    |
| `npm run lint`      | ESLint                        |
| `npm run typecheck` | TypeScript, no emit           |
| `npm test`          | Vitest unit tests (jsdom)     |

## Branches & CI/CD

- **`main`** → Railway **production** environment
- **`dev`** → Railway **dev** environment

Work lands on `dev` (directly or via PR), then merges to `main` via PR.
Every push and PR to either branch runs the [CI workflow](.github/workflows/ci.yml):
lint → typecheck → unit tests → build.

Railway deploys each branch to its environment on push. `dev` deploys
immediately (CI runs in parallel — a red commit can briefly reach the dev
environment). `main` is protected by a required status check
(“Lint, typecheck, test, build”), so production only ever builds commits
that passed CI.

## Lead capture

The CTA section embeds a demo-request form, and a dismissible version pops up
once per visitor after 30 seconds ([`LeadModal`](src/components/lead/LeadModal.tsx)).
Submissions POST to [`/api/leads`](src/app/api/leads/route.ts):

- **With `DATABASE_URL`** (Railway Postgres, wired per environment): rows land
  in a `leads` table (auto-created on first insert).
- **Without it** (local dev): appended to `.data/leads.jsonl` (gitignored), or
  wherever `LEADS_FILE` points.

Spam is filtered by a honeypot field; email format is validated server-side.

To read captured leads: `railway connect` to the environment's Postgres and
`SELECT * FROM leads ORDER BY ts DESC;`

## Tests

Vitest + Testing Library, jsdom environment. WebGL shader components are stubbed in
[`vitest.setup.tsx`](vitest.setup.tsx) since jsdom has no WebGL context.

<!-- CD smoke: 2026-08-13T07:42:08Z -->
