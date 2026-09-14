# TestSeries

A browser-based JEE PDF → CBT platform inspired by the supplied TestSeries/NewtCBT reference screens.

## UI rules implemented

- Dark, minimal technical shell for the website.
- TestSeries branding everywhere.
- Launch screen follows the supplied dark launch card.
- Generated CBT uses the supplied NTA-style white/blue exam interface.
- Instructions screen, question palette, status states, timer, section tabs, numerical entry area and submit flow are represented.
- Test Analysis is a web-only interactive area; there is intentionally no "Download PDF" control.
- Analysis navigation includes Overview, Subject Stats, Chapter Reports, Score Potential, Time Analysis, Insights, Score Progress, Question Journey, Subject Journey, Review Exam, Compare with Peers and Leaderboard.
- Solution visibility should be driven by source availability:
  * question PDF only: no solution
  * answer key only: answer available, no provided solution
  * solution PDF: provided solution shown
- Diagram policy: preserve/crop from the original PDF; do not ask AI to redraw diagrams.

## Run

```bash
npm install
npm run dev
```

## Production architecture

Vercel hosts the React frontend. A Python worker on Render/Cloud Run performs PDF rendering, transcription, answer extraction, diagram localization/cropping and AI calls. Firebase provides Google Auth, Firestore real-time persistence and Storage.

The current frontend uses demo data so the UI can be previewed immediately. Connect the backend job endpoint and Firestore listeners for production generation.
