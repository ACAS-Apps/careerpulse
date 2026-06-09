# CareerPulse — Launch checklist

App **2 of 4** in the **Axis Intelligence Platform**.

## ✅ Shipped today

- [x] Registered in `apps-backend` registry (`/v1/apps/careerpulse`)
- [x] 5 GDPR consent scopes wired end-to-end: `salary_check`, `cv_upload`, `job_alert`, `skills_search`, `analytics_aggregate`
- [x] Expo (React Native + TS) MVP with 6 screens: Home, Consent, Salary, CV, Jobs, Skills
- [x] On-device CV scorer (raw text never leaves the phone)
- [x] Indicative UK salary benchmarks (10 roles × 8 locations × 4 clearance levels)
- [x] Static landing page + draft privacy notice with clearance-specific clause
- [x] CI workflow (typecheck + lint) + GitHub Pages workflow
- [x] Public repo created (`ACAS-Apps/careerpulse`) — both workflows green on `master`
- [x] GitHub Pages enabled — landing live at <https://acas-apps.github.io/careerpulse/>

## 🚧 This week

- [ ] Point `EXPO_PUBLIC_API_BASE` at the deployed backend
- [ ] Wire landing-page waitlist to a real `/v1/waitlist` endpoint
- [ ] Add real app icon + splash (`assets/icon.png`, `assets/splash.png`)
- [ ] Recruit **5 beta testers**: 2 SC/DV-cleared engineers, 1 graduate, 1 hiring manager, 1 recruiter

## 📅 This month

- [ ] **Legal — non-negotiable.** Lawyer review of:
  - Privacy notice (clearance handling clause especially)
  - Cookie policy
  - DPIA — required for behavioural + clearance data
- [ ] Engage a UK salary-data partner (Reed / Indeed / Levels.fyi API) to replace the placeholder figures
- [ ] Connect to a live jobs feed (Reed API, Adzuna, or partner directly with Jobsite / TipTopJob for defence vacancies)
- [ ] Replace mock skills-gap data with a real source (ONS skills shortage data + LinkedIn Workforce reports)

## 💷 Commercial track

- [ ] Pick 10 target buyers: defence primes (BAE, Babcock, Leonardo, MBDA, QinetiQ, Thales), specialist recruiters (Morson, Matchtech, Sanderson), training providers
- [ ] Draft 1-page sample "Defence Hiring Quarterly" report
- [ ] Book 5 discovery calls — validate £500–£5k per report price point
- [ ] Pricing page: Basic Report £500 · Quarterly Subscription £1.5k · Custom Analytics £5k+

## 🔭 v0.2 (next 60 days)

- [ ] Replace on-device CV scorer with a backend AI model (only score signals stored, original text encrypted at rest)
- [ ] Push notifications for job-alert matches
- [ ] Withdraw-consent UI in profile screen
- [ ] LinkedIn import for one-click CV

## Useful links

- App repo: <https://github.com/ACAS-Apps/careerpulse>
- Backend repo: <https://github.com/ACAS-Apps/apps-backend>
- Landing (live): <https://acas-apps.github.io/careerpulse/>
- ICO clearance/sensitive data guidance: <https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/special-category-data/>
