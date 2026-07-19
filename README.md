# Knowledge Pass

Knowledge Pass is a bilingual assessment and certification platform. It presents a configurable multiple-choice test, gives immediate educational feedback, requires the learner to retry incorrectly answered questions, and generates a personalized PDF certificate after every question has been answered correctly.

The application starts in Bulgarian and can be switched to English at any time. The selected language applies to the website interface, questions, answers, feedback, completion form, and generated certificate.

## Features

- Responsive React user interface for desktop and mobile devices
- Bulgarian and English localization
- Questions and answers loaded from a configuration file
- Interface text loaded from a separate localization configuration file
- Dynamic progress calculated from the current question list
- Current, total, and remaining question counters
- Explanatory modal after an incorrect answer
- Mandatory retry until the correct answer is selected
- Next-question button unlocked only after a correct answer
- Successful-completion form for the learner's full name and email address
- Personalized one-page PDF certificate
- Certificate download endpoint
- Optional SMTP email delivery through Nodemailer
- Demo mode when SMTP is not configured
- About, Assessment, Contact, Terms & Conditions, and copyright sections

## Technology Stack

### Frontend

- React
- Vite
- Lucide React icons
- Plain responsive CSS

### Backend

- Node.js
- Express
- PDFKit for certificate generation
- Nodemailer for email delivery
- dotenv for environment configuration
- CORS middleware

React is used for the frontend. The backend is a Node.js/Express service because React itself is a browser UI library and does not provide an HTTP server or mail delivery runtime.

## Project Structure

```text
knowledge-pass/
├── .env.example
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vite.config.js
├── server/
│   └── index.js
├── src/
│   ├── main.jsx
│   ├── styles.css
│   └── config/
│       ├── content.js
│       └── questions.js
├── outputs/
│   └── certificates/
├── dist/                  # Created by npm run build
└── node_modules/          # Created by npm install
```

## File Reference

### `package.json`

Defines the project metadata, npm commands, and runtime dependencies.

Available commands:

- `npm run dev` starts the Vite frontend and Express API together.
- `npm run client` starts only the Vite frontend.
- `npm run server` starts only the Express API.
- `npm run build` creates a production frontend build in `dist/`.
- `npm run preview` previews the built frontend through Vite.

### `package-lock.json`

Locks the exact installed npm dependency versions for repeatable installations.

### `index.html`

The Vite HTML entry point. It contains the root DOM element and loads `src/main.jsx`.

### `vite.config.js`

Configures Vite and the React plugin. The development server runs on `127.0.0.1:5173` and proxies these paths to the backend on port `3001`:

- `/api/*`
- `/certificates/*`

The certificate proxy is important because generated files are served by Express, not Vite.

### `src/main.jsx`

Contains the React application and the complete browser-side assessment flow:

- Global language selection
- Header navigation and mobile menu
- Hero, About, Assessment, Contact, and footer sections
- Assessment state and current question tracking
- Answer selection and validation
- Incorrect-answer explanation modal
- Correct-answer state and next-question navigation
- Dynamic question counters and progress bars
- Completion form validation
- Request to the certificate API
- Certificate success, warning, and download states

The browser sends the certificate request from the `submitCertificate` function in this file.

### `src/styles.css`

Contains all visual styling, layout rules, colors, typography, animations, modal styles, progress indicators, certificate form styles, and responsive breakpoints.

The design tokens are declared as CSS custom properties at the beginning of the file.

### `src/config/questions.js`

Exports the `questions` array used by the assessment. The application derives the total question count, remaining count, and progress directly from this array, so no separate total needs to be updated.

Each question follows this structure:

```js
{
  id: 1,
  text: {
    en: 'English question',
    bg: 'Bulgarian question'
  },
  options: {
    en: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
    bg: ['Отговор A', 'Отговор B', 'Отговор C', 'Отговор D']
  },
  correct: 1,
  explanation: {
    en: 'English explanation',
    bg: 'Bulgarian explanation'
  }
}
```

`correct` is the zero-based index of the correct option. In the example above, `1` means the second option.

To add a question, append another object with a unique `id`. To remove a question, remove its object. The UI updates its counters and progress automatically.

### `src/config/content.js`

Exports the `content` localization object. It contains the Bulgarian and English interface copy, including:

- Navigation labels
- Hero and section text
- Assessment controls
- Feedback modal labels
- Completion form labels
- Validation and server messages
- Certificate wording
- Footer and legal labels

Both language objects should contain the same keys. New interface text should be added to both `content.en` and `content.bg`.

### `server/index.js`

Contains the complete backend service:

- Express application setup
- JSON request parsing
- CORS configuration
- Static certificate hosting
- Health endpoint
- Certificate request validation
- Unique certificate ID generation
- Bilingual PDF certificate generation
- SMTP transport configuration
- Optional certificate email delivery
- Production frontend hosting from `dist/`

Generated certificates are stored in `outputs/certificates/`.

### `.env.example`

Documents all supported environment variables. Copy it to `.env` before configuring email delivery. The real `.env` file should not be committed because it may contain SMTP credentials.

### `outputs/certificates/`

Runtime output directory for generated PDF certificates. Each file uses its unique certificate ID as its filename.

Example:

```text
KP-2026-FF678E3B.pdf
```

### `dist/`

Production frontend output created by `npm run build`. In production mode, Express serves this directory and returns `dist/index.html` for frontend routes.

## API Reference

The local API base URL is:

```text
http://localhost:3001
```

During frontend development, requests should use relative paths such as `/api/certificates`; Vite forwards them to the API server.

### Create Certificate

Creates a personalized PDF certificate and sends it by email when SMTP is configured.

```http
POST /api/certificates
```

Full local URL:

```text
http://localhost:3001/api/certificates
```

Request headers:

```http
Content-Type: application/json
```

Request body:

```json
{
  "name": "Ivan Petrov",
  "email": "ivan@example.com",
  "language": "en",
  "score": 10,
  "total": 10
}
```

Request fields:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | Yes | Learner name printed on the certificate; 2-100 characters. |
| `email` | string | Yes | Recipient address used for certificate delivery. |
| `language` | string | Yes | Certificate language: `en` or `bg`. |
| `score` | integer | Yes | Number of correctly completed questions. |
| `total` | integer | Yes | Total number of questions. `score` must equal `total`. |

Successful response: `201 Created`

```json
{
  "certificateId": "KP-2026-FF678E3B",
  "emailSent": false,
  "downloadUrl": "/certificates/KP-2026-FF678E3B.pdf"
}
```

Response fields:

- `certificateId` is the unique certificate reference.
- `emailSent` is `true` when SMTP delivery succeeds and `false` in demo mode.
- `downloadUrl` is the relative URL for downloading the generated PDF.

Possible errors:

- `400 Bad Request` when the request data is invalid or the score is incomplete.
- `500 Internal Server Error` when PDF creation or configured email delivery fails.

### Health Check

Reports whether the API is running and whether SMTP delivery is configured.

```http
GET /api/health
```

Full local URL:

```text
http://localhost:3001/api/health
```

Example response:

```json
{
  "ok": true,
  "mailConfigured": false
}
```

### Download Certificate

Generated certificate files are served from the static certificate path.

```http
GET /certificates/:filename
```

Example:

```text
http://localhost:3001/certificates/KP-2026-FF678E3B.pdf
```

## Environment Variables

Create the local environment file:

```bash
cp .env.example .env
```

Supported variables:

| Variable | Default | Description |
| --- | --- | --- |
| `PORT` | `3001` | Express API port. |
| `APP_URL` | `http://localhost:5173` | Allowed frontend origin for CORS. |
| `SMTP_HOST` | None | SMTP server hostname. |
| `SMTP_PORT` | `587` | SMTP server port. |
| `SMTP_SECURE` | `false` | Use `true` for implicit TLS, commonly on port 465. |
| `SMTP_USER` | None | SMTP authentication username. |
| `SMTP_PASS` | None | SMTP authentication password or app password. |
| `MAIL_FROM` | SMTP user | Sender displayed in certificate emails. |
| `NODE_ENV` | Development | Set to `production` to serve the built React application from Express. |

SMTP delivery is enabled only when `SMTP_HOST`, `SMTP_USER`, and `SMTP_PASS` are all present. Without them, the API still creates the PDF and returns its download URL with `emailSent: false`.

## Local Development

Requirements:

- Node.js 20 or newer
- npm

Install dependencies:

```bash
npm install
```

Create an environment file:

```bash
cp .env.example .env
```

Start the frontend and backend:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

The API is available at:

```text
http://localhost:3001
```

## Production Build and Start

Build the React application:

```bash
npm run build
```

Start Express in production mode:

```bash
NODE_ENV=production npm run server
```

The Express server then provides the API, generated certificates, static frontend assets, and frontend route fallback from the same port.

For a real deployment, configure persistent storage for `outputs/certificates/`, HTTPS, a production SMTP provider, request rate limiting, and an appropriate retention policy for generated certificates and recipient data.

## Assessment Flow

1. The learner starts the assessment.
2. React reads the active question from `src/config/questions.js`.
3. The learner selects an answer and submits it.
4. An incorrect answer opens an explanation modal and resets the question for another attempt.
5. A correct answer unlocks the next-question action.
6. Progress and remaining counts are recalculated from the question array.
7. After the final correct answer, the completion form requests a name and email.
8. The frontend calls `POST /api/certificates`.
9. Express validates the completion data and generates a PDF certificate.
10. If SMTP is configured, the PDF is attached to an email. The download URL is returned in all successful cases.

## Customization

- Edit assessment content in `src/config/questions.js`.
- Edit website translations in `src/config/content.js`.
- Edit layout and application behavior in `src/main.jsx`.
- Edit colors, typography, and responsive design in `src/styles.css`.
- Edit certificate rendering and email behavior in `server/index.js`.
- Edit local ports and frontend proxies in `vite.config.js` and `.env`.

## Current Limitations

- Assessment state is held in the browser and is not persisted across reloads.
- There is no administrative interface for editing questions.
- Certificates are written to the local filesystem.
- The Terms & Conditions control currently displays a placeholder browser alert.
- Email delivery requires external SMTP credentials.
- The server validates completion totals but does not currently use a signed server-side assessment session.

These items should be considered before using the platform for regulated, high-stakes, or publicly verifiable certification.
