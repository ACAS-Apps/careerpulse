# CareerPulse

App **2 of 4** in the **Axis Intelligence Platform**.

A career intelligence app for **defence, aerospace and engineering professionals** — salary benchmarks, CV scoring, job alerts, and skills-gap analysis. Generates consented, anonymised hiring-market intelligence for recruiters, defence primes and training providers.

## Status

**v0.1 MVP** — private beta. Repo: `ACAS-Apps/careerpulse`. Backend: `ACAS-Apps/apps-backend`.

| Layer | Tech | Where |
| --- | --- | --- |
| Mobile | Expo (React Native + TypeScript) | `app/`, `services/` |
| Landing | Static HTML + Tailwind CDN | `landing/` → GitHub Pages |
| Backend | FastAPI (shared with all 4 apps) | `ACAS-Apps/apps-backend` |

## Run

```bash
npm install
npm run start              # scan QR with Expo Go
```

Set `EXPO_PUBLIC_API_BASE` in `.env` (default `http://localhost:8000`).

## Consent scopes

| Scope | What it covers |
| --- | --- |
| `salary_check` | Role / location / experience used to look up salary benchmarks |
| `cv_upload` | CV text submitted for scoring (stored encrypted, never sold raw) |
| `job_alert` | Skills / locations / sectors you ask to be alerted about |
| `skills_search` | Skills you research for the skills-gap tool |
| `analytics_aggregate` | Opt-in: your activity may contribute to aggregated hiring-market reports |

Every event the app sends to the backend is rejected with 403 unless the matching scope is active.

## Why defence/aerospace first?

The ChatGPT plan picks this vertical to leverage ACAS's existing positioning. Cleared engineers are a high-value, hard-to-find segment — meaning hiring-intelligence reports command premium pricing (£500–£5k per the platform plan).

## License

Proprietary — © ACAS-Apps. All rights reserved.
