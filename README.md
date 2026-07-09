# Intro to AI — Exam Study Quiz

A static, framework-free web app for practicing "Intro to AI" exam questions across three topics (Data Sources & Quality, Reasoning & Knowledge, Types of AI / Agents), plus a weighted full practice test mode. Styled as a terminal/code-editor UI with light and dark themes, instant pass/fail feedback for single-topic quizzes, deferred (exam-style) feedback for the full practice test, and score history stored locally in your browser.

## Features

- **110 questions** across three topics, plus a weighted full practice test (20% types-of-ai / 40% reasoning-knowledge / 40% data-sources, 50 questions by default)
- **Instant feedback** for single-topic quizzes, styled as test-runner output (`✓ PASS` / `✗ FAIL`)
- **Deferred feedback** for the Full Practice Test — no right/wrong shown until you finish, like a real exam
- **Exit-quiz warning** — leaving a quiz partway through asks for confirmation and never partially saves an attempt
- **Retry missed questions** from any results page
- **Light/dark theme toggle**, persisted in localStorage, defaulting to your system preference
- **Score history** (last 10 attempts) stored in localStorage — no backend, no accounts

## Running locally

Because `quiz.html` fetches `data/questions.json`, you need to serve the folder over HTTP — opening `index.html` directly via `file://` will fail due to browser fetch restrictions. From this folder, run:

```
python3 -m http.server
```

or

```
npx serve
```

then open `http://localhost:8000` (or whatever port is printed) in your browser.

Note: fonts (IBM Plex Mono, Inter) are loaded from Google Fonts via `<link>` tags, so an internet connection is needed on first load. Everything else — questions, scoring, quiz logic — runs entirely locally with no external API calls.

## Adding more questions

Add entries to `data/questions.json` following this schema:

```json
{
  "id": "ds-021",
  "topic": "data-sources",
  "difficulty": "medium",
  "question": "string",
  "choices": ["...", "...", "...", "..."],
  "correctIndex": 0,
  "explanation": "string"
}
```

- `topic` must be one of: `data-sources`, `reasoning-knowledge`, `types-of-ai`
- `difficulty` must be one of: `easy`, `medium`, `hard`
- `correctIndex` is the zero-based index into `choices`
- IDs should be unique; the existing convention is `ds-`, `rk-`, and `toa-` prefixes per topic

## Project structure

```
introAI_Study/
├── index.html          topic picker + recent scores
├── quiz.html           quiz-taking screen
├── results.html        score + missed-question review
├── css/style.css        design tokens (light/dark), layout, components
├── js/quiz-engine.js    fetch/filter/shuffle/weighted-sampling/scoring
├── js/storage.js        localStorage wrapper for score history
├── js/theme.js          light/dark theme toggle + persistence
├── data/questions.json  question bank
└── README.md
```

## Deployment

Deployed via GitHub Pages: _(add live link here once published)_

## License

MIT — see [LICENSE](LICENSE).
