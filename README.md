# FitLog — Workout Library

A dark, focused workout companion built from the FitLog Figma reference. Users can browse workouts, inspect details, build a five-lift daily plan, save workouts for later, and log completed lifts.

## Technologies

- Next.js App Router
- TypeScript
- Tailwind CSS
- React
- Lucide React
- React Hot Toast
- FitLog REST API
- localStorage

## Key Features

1. Responsive dark workout library with 12 API-driven workout cards.
2. Workout details page with specs, instructions, and actions.
3. Today's Plan with a five-workout cap and live metrics.
4. Saved workouts tab with sorting by duration, calories, or rating.
5. Mark as Done and remove actions with toast feedback.
6. Plan and Saved navbar counters update live.
7. localStorage persistence survives browser reloads.
8. Responsive mobile, tablet, and desktop layouts.
9. Custom 404 page and loading states.
10. Anchor-based Browse Workouts CTA.

## API

All workouts:
`https://api.abcz.workers.dev/api/fitlog`

Single workout:
`https://api.abcz.workers.dev/api/fitlog/:id`

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Suggested Git commits

```text
1. setup nextjs typescript tailwind project
2. added fitlog api and workout types
3. built responsive navbar and footer
4. added home hero and workout library
5. added workout details page and actions
6. added my plan and saved tabs
7. added local storage toast sort and done state
8. added responsive polish 404 and readme
