# Intro to AI — Exam Study Quiz

A simple, static, framework-free web app for practicing "Intro to AI" exam questions across three topics (Data Sources & Quality, Reasoning & Knowledge, Types of AI / Agents), with a weighted full practice test mode, instant per-question feedback, and score history stored locally in your browser.

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

## Deployment

Deployed via GitHub Pages: _(add live link here once published)_
