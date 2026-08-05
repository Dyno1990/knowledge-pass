# WTSB Digital Modules

A bilingual React and Express platform with five role-based learning modules, retry-until-correct quizzes, dynamic progress, PDF certificate generation, and optional certificate delivery by email.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. The API runs at `http://localhost:3001`.

## Content structure

All module and question content is stored in:

```text
src/app/data/modules.ts
```

The file contains five module objects: `athlete`, `coach`, `referee`, `volunteer`, and `administrator`. Each module contains:

- bilingual title and description;
- introduction;
- learning objectives;
- “How this module works” items;
- “Before you begin” items;
- learning outcome;
- estimated duration;
- a `questions` array.

The number of modules is calculated from the exported `modules` array. The number of questions, progress percentage, current-question counter, and remaining-question counter are calculated from each module's `questions` array.

## Adding questions manually

Copy an existing question object in `src/app/data/modules.ts`, then change its `id`, `number`, content, answers, correct-answer flags, explanation, and key message.

Each question has this shape:

```ts
{
  id: "q1",
  number: 1,
  title: { en: "Thematic title", bg: "Тематично заглавие" },
  scenario: { en: "Scenario or question", bg: "Сценарий или въпрос" },
  multipleCorrect: false,
  answers: [
    { id: "a1", label: "A", text: { en: "Answer", bg: "Отговор" }, isCorrect: true },
    { id: "a2", label: "B", text: { en: "Answer", bg: "Отговор" }, isCorrect: false },
    { id: "a3", label: "C", text: { en: "Answer", bg: "Отговор" }, isCorrect: false },
    { id: "a4", label: "D", text: { en: "Answer", bg: "Отговор" }, isCorrect: false }
  ],
  explanation: { en: "Detailed explanation", bg: "Подробно обяснение" },
  keyMessage: { en: "Key message", bg: "Ключово послание" }
}
```

Set `isCorrect: true` on every correct answer. If two or more answers are correct, also set `multipleCorrect: true`.

When Bulgarian content is empty, the UI falls back to the English text.

## UI behaviour

Before the quiz, the module page displays its introduction, learning objectives, instructions, preparation notes, and expected outcome. During the quiz it displays the thematic title, practical scenario, labelled A–D answers, progress, current question, and remaining questions.

An incorrect answer opens a popup with the detailed explanation and key message, then requires another attempt. A correct answer unlocks the next-question action. After the final answer, the learner enters a name and email address for the certificate.

## Important files

- `src/app/pages/HomePage.tsx` — module cards.
- `src/app/pages/QuizPage.tsx` — module introduction, questions, feedback, and certificate form.
- `src/app/pages/CertificatePage.tsx` — certificate success page.
- `src/app/i18n/translations.ts` — shared interface text.
- `src/app/components/Header.tsx` — navigation and language switcher.
- `server/index.js` — API, PDF generation, email delivery, and certificate validation.
- `.env.example` — SMTP configuration example.

## API

- `GET /api/health`
- `GET /api/quizzes`
- `GET /api/quizzes/:quizId`
- `POST /api/quizzes/:quizId/answers`
- `GET /api/modules`
- `GET /api/modules/:moduleId`
- `POST /api/modules/:moduleId/questions/:questionId/check`
- `POST /api/certificates`

The frontend currently validates the locally configured question answers. `POST /api/certificates` generates the final PDF in memory, returns it as a downloadable data URL, and sends it when SMTP is configured. No persistent server filesystem is required.

## Gmail OAuth2 email configuration

Copy `.env.example` to `.env` and provide:

```env
GMAIL_USER=certificates@your-domain.com
GMAIL_CLIENT_ID=your-google-oauth-client-id
GMAIL_CLIENT_SECRET=your-google-oauth-client-secret
GMAIL_REFRESH_TOKEN=your-google-oauth-refresh-token
MAIL_FROM="WTSB Digital Modules <certificates@your-domain.com>"
```

The Google Cloud project must have the Gmail API enabled and must authorize the `https://www.googleapis.com/auth/gmail.send` scope. Create an OAuth client and obtain the refresh token by authorizing the mailbox with offline access.

The backend sends through the Gmail API using the `https://www.googleapis.com/auth/gmail.send` scope. It uses `GMAIL_REFRESH_TOKEN`, `GMAIL_CLIENT_ID`, and `GMAIL_CLIENT_SECRET` to request a new short-lived access token automatically; an access token must not be stored in Vercel. A refresh token normally remains valid until it is revoked, the OAuth client is removed, or an applicable Google Workspace policy expires it. Keep an Internal Workspace app out of External Testing mode to avoid short-lived testing credentials.

The address in `MAIL_FROM` should match `GMAIL_USER` unless the Google Workspace account has an authorized sender alias. Do not commit the real `.env` file or any OAuth credential.

Without SMTP settings, certificate generation and download still work, but no email is sent.

## Build

```bash
npm run build
npm run preview
```

## Deploying to Vercel

The repository includes `api/index.js` as the Vercel Function entry point and `vercel.json` for API and single-page application routing.

Import the GitHub repository into Vercel and use:

```text
Framework Preset: Vite
Root Directory: ./
Install Command: npm install
Build Command: npm run build
Output Directory: dist
Node.js Version: 22.x
```

Add the following Production, Preview, and Development environment variables in **Project Settings → Environment Variables**:

```env
APP_URL=https://your-project.vercel.app
GMAIL_USER=certificates@your-domain.com
GMAIL_CLIENT_ID=your-google-oauth-client-id
GMAIL_CLIENT_SECRET=your-google-oauth-client-secret
GMAIL_REFRESH_TOKEN=your-google-oauth-refresh-token
MAIL_FROM="WTSB Digital Modules <certificates@your-domain.com>"
```

`PORT` is not needed on Vercel. Add the OAuth variables to each required Vercel environment (Production, Preview, and Development), then redeploy so the Function receives the new values.

Without SMTP variables, the PDF can still be generated and downloaded, but it will not be emailed.
