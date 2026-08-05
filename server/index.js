import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { quizzes, quizCount, totalQuestionCount, getQuizById } from '../src/config/quizzes/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = Number(process.env.PORT || 3001);
app.use(cors({ origin: process.env.APP_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '100kb' }));

const copy = {
  en: { certificate: 'CERTIFICATE', achievement: 'OF ACHIEVEMENT', certifies: 'This certifies that', completed: 'has successfully completed the', assessment: 'Information Security Essentials Assessment', issued: 'ISSUED', score: 'SCORE', id: 'CERTIFICATE ID', signature: 'Programme Director' },
  bg: { certificate: 'СЕРТИФИКАТ', achievement: 'ЗА ПОСТИЖЕНИЕ', certifies: 'С настоящото удостоверяваме, че', completed: 'успешно завърши', assessment: 'Тест „Основи на информационната сигурност“', issued: 'ИЗДАДЕН НА', score: 'РЕЗУЛТАТ', id: 'НОМЕР НА СЕРТИФИКАТ', signature: 'Програмен директор' },
};

const fontCandidates = [
  '/System/Library/Fonts/Supplemental/Arial.ttf',
  '/System/Library/Fonts/Supplemental/Arial Bold.ttf',
  '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
];
const fontPath = fontCandidates.find(fs.existsSync);

// Certificate background watermark palette: athletics track, hurdle, javelin,
// discus and jumping disciplines are drawn as lightweight PDF vectors.
function drawAthleticsWatermarks(doc, W, H) {
  const line = (color, width, points) => {
    doc.strokeColor(color).lineWidth(width).moveTo(points[0][0], points[0][1]);
    points.slice(1).forEach(([x, y]) => doc.lineTo(x, y));
    doc.stroke();
  };
  const head = (color, x, y, radius) => doc.fillColor(color).circle(x, y, radius).fill();

  doc.save().opacity(0.085).lineCap('round').lineJoin('round');

  // Sprinter leaving the blocks.
  const sprint = '#2563eb';
  head(sprint, 100, 83, 10);
  line(sprint, 9, [[94, 96], [118, 118], [146, 113]]);
  line(sprint, 8, [[111, 108], [82, 120], [65, 105]]);
  line(sprint, 10, [[118, 118], [90, 143], [58, 146]]);
  line(sprint, 10, [[119, 119], [150, 141], [179, 132]]);
  line('#60a5fa', 3, [[45, 153], [185, 153]]);

  // Hurdler clearing a visible hurdle.
  const hurdle = '#0ea5e9';
  head(hurdle, 118, H - 190, 9);
  line(hurdle, 9, [[126, H - 181], [148, H - 157], [179, H - 151]]);
  line(hurdle, 8, [[143, H - 165], [166, H - 190], [185, H - 195]]);
  line(hurdle, 10, [[148, H - 157], [188, H - 140], [226, H - 141]]);
  line(hurdle, 10, [[149, H - 156], [132, H - 128], [102, H - 119]]);
  line('#38bdf8', 5, [[188, H - 132], [188, H - 68], [253, H - 68], [253, H - 132]]);

  // Javelin thrower with the implement clearly visible.
  const javelin = '#3b82f6';
  head(javelin, W - 122, 105, 10);
  line(javelin, 10, [[W - 128, 117], [W - 150, 151], [W - 139, 184]]);
  line(javelin, 8, [[W - 143, 136], [W - 184, 112], [W - 215, 100]]);
  line(javelin, 8, [[W - 142, 136], [W - 103, 124], [W - 82, 105]]);
  line(javelin, 10, [[W - 139, 184], [W - 172, 219], [W - 198, 220]]);
  line(javelin, 10, [[W - 139, 184], [W - 107, 218], [W - 78, 224]]);
  line('#60a5fa', 4, [[W - 230, 91], [W - 55, 72]]);
  doc.fillColor('#60a5fa').polygon([W - 47, 71], [W - 62, 64], [W - 60, 79]).fill();

  // Discus thrower in a rotational stance.
  const discus = '#6366f1';
  head(discus, W - 108, H / 2 + 70, 10);
  line(discus, 10, [[W - 113, H / 2 + 83], [W - 132, H / 2 + 119], [W - 119, H / 2 + 151]]);
  line(discus, 8, [[W - 126, H / 2 + 101], [W - 167, H / 2 + 86], [W - 190, H / 2 + 62]]);
  line(discus, 8, [[W - 126, H / 2 + 100], [W - 91, H / 2 + 80], [W - 67, H / 2 + 66]]);
  line(discus, 10, [[W - 119, H / 2 + 151], [W - 158, H / 2 + 174], [W - 185, H / 2 + 169]]);
  line(discus, 10, [[W - 119, H / 2 + 151], [W - 83, H / 2 + 174], [W - 54, H / 2 + 166]]);
  doc.lineWidth(5).strokeColor('#818cf8').circle(W - 202, H / 2 + 54, 16).stroke();

  // High jumper arcing over the bar.
  const jump = '#38bdf8';
  head(jump, W / 2 - 42, H - 109, 9);
  doc.strokeColor(jump).lineWidth(10).moveTo(W / 2 - 32, H - 113)
    .bezierCurveTo(W / 2 - 5, H - 152, W / 2 + 44, H - 145, W / 2 + 63, H - 111).stroke();
  line(jump, 8, [[W / 2 + 8, H - 139], [W / 2 - 13, H - 168], [W / 2 - 39, H - 170]]);
  line(jump, 9, [[W / 2 + 55, H - 118], [W / 2 + 91, H - 133], [W / 2 + 111, H - 119]]);
  line('#7dd3fc', 4, [[W / 2 - 132, H - 96], [W / 2 + 138, H - 96]]);

  // Track lanes tie the individual disciplines together.
  ['#2563eb', '#0ea5e9', '#6366f1'].forEach((color, index) => {
    doc.lineWidth(4).ellipse(58, H - 25, 152 + index * 18, 60 + index * 10).stroke(color);
  });
  doc.restore().opacity(1);
}

function createCertificate({ name, language, score, total, id, assessment }) {
  const t = copy[language] || copy.en;
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 0, info: { Title: `WTSB Digital Modules Certificate — ${name}`, Author: 'WTSB Digital Modules' } });
    const chunks = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
    if (fontPath) doc.registerFont('Custom', fontPath).font('Custom');
    const W = doc.page.width, H = doc.page.height;
    doc.rect(0, 0, W, H).fill('#f8fbff');
    drawAthleticsWatermarks(doc, W, H);
    doc.rect(18, 18, W - 36, H - 36).lineWidth(3).stroke('#173f73');
    doc.rect(27, 27, W - 54, H - 54).lineWidth(0.8).stroke('#60a5fa');
    doc.rect(34, 34, W - 68, H - 68).lineWidth(0.35).stroke('#93c5fd');
    doc.circle(W / 2, 69, 27).fill('#173f73');
    doc.circle(W / 2, 69, 20).lineWidth(1).stroke('#ffffff');
    doc.fillColor('#ffffff').fontSize(11).text('WTSB', W / 2 - 22, 63, { width: 44, align: 'center', characterSpacing: 1 });
    doc.fillColor('#173f73').fontSize(13).text('WTSB DIGITAL MODULES', 0, 103, { width: W, align: 'center', characterSpacing: 2.2 });
    doc.fillColor('#0f2e54').fontSize(43).text(t.certificate, 0, 134, { width: W, align: 'center', characterSpacing: 3 });
    doc.fontSize(11).fillColor('#3b6b9e').text(t.achievement, 0, 186, { width: W, align: 'center', characterSpacing: 3.5 });
    doc.moveTo(W / 2 - 88, 210).lineTo(W / 2 + 88, 210).lineWidth(1.2).stroke('#60a5fa');
    doc.fontSize(11).fillColor('#536b83').text(t.certifies, 0, 229, { width: W, align: 'center' });
    doc.fontSize(name.length > 34 ? 29 : 37).fillColor('#102a43').text(name, 115, 255, { width: W - 230, align: 'center' });
    doc.moveTo(205, 304).lineTo(W - 205, 304).lineWidth(0.8).stroke('#173f73');
    doc.fontSize(11).fillColor('#536b83').text(t.completed, 0, 322, { width: W, align: 'center' });
    doc.fontSize(20).fillColor('#1d5c99').text(assessment || t.assessment, 105, 347, { width: W - 210, align: 'center' });
    const date = new Intl.DateTimeFormat(language === 'bg' ? 'bg-BG' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date());
    const columns = [{ label: t.issued, value: date }, { label: t.score, value: `${score}/${total}` }, { label: t.id, value: id }];
    columns.forEach((item, i) => {
      const x = 88 + i * 255;
      doc.roundedRect(x, 414, 200, 57, 5).fillOpacity(0.9).fill('#ffffff').fillOpacity(1);
      doc.roundedRect(x, 414, 200, 57, 5).lineWidth(0.6).stroke('#bfdbfe');
      doc.fontSize(7).fillColor('#4e749c').text(item.label, x + 8, 426, { width: 184, align: 'center', characterSpacing: 1.2 });
      doc.fontSize(10).fillColor('#153b66').text(item.value, x + 8, 446, { width: 184, align: 'center' });
    });
    doc.moveTo(W / 2 - 88, 506).lineTo(W / 2 + 88, 506).lineWidth(0.8).stroke('#375f88');
    doc.fontSize(8).fillColor('#536b83').text(t.signature, W / 2 - 110, 515, { width: 220, align: 'center' });
    doc.fontSize(8).fillColor('#3b6b9e').text('Working Together – Succeeding Better', 0, H - 48, { width: W, align: 'center', characterSpacing: 1.4 });
    doc.end();
  });
}

const gmailOAuthConfigured = () => [
  process.env.GMAIL_USER,
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REFRESH_TOKEN,
].every(Boolean);

async function gmailAccessToken() {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GMAIL_CLIENT_ID,
      client_secret: process.env.GMAIL_CLIENT_SECRET,
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });
  const payload = await response.json();
  if (!response.ok || !payload.access_token) {
    throw new Error(`Gmail OAuth token request failed (${response.status}): ${payload.error || 'unknown_error'}`);
  }
  return payload.access_token;
}

async function sendGmailMessage(messageOptions) {
  const mimeTransport = nodemailer.createTransport({
    streamTransport: true,
    buffer: true,
    newline: 'unix',
  });
  const { message } = await mimeTransport.sendMail(messageOptions);
  const accessToken = await gmailAccessToken();
  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ raw: Buffer.from(message).toString('base64url') }),
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(`Gmail API send failed (${response.status}): ${payload.error?.message || 'unknown_error'}`);
  }
  return response.json();
}

const modulePresentation = {
  'security-essentials': { icon: 'Whistle', color: 'bg-blue-500' },
  'phishing-awareness': { icon: 'Scale', color: 'bg-purple-500' },
  'data-protection': { icon: 'Heart', color: 'bg-red-500' },
  'device-security': { icon: 'Briefcase', color: 'bg-green-500' },
  'incident-response': { icon: 'ChartNoAxesCombined', color: 'bg-amber-500' },
};

const sportsModules = {
  athlete: { title: { en: 'e-Athlete', bg: 'е-Атлет' }, questionCount: 10 },
  coach: { title: { en: 'e-Coach', bg: 'е-Треньор' }, questionCount: 10 },
  referee: { title: { en: 'e-Referee', bg: 'е-Съдия' }, questionCount: 10 },
  volunteer: { title: { en: 'e-Volunteer', bg: 'е-Доброволец' }, questionCount: 10 },
  administrator: { title: { en: 'e-Administrator', bg: 'е-Администратор' }, questionCount: 10 },
};

const selectedLanguage = (value) => ['en', 'bg'].includes(value) ? value : null;
const localized = (value, language) => language && value && typeof value === 'object' ? value[language] : value;
const correctIndexes = (question) => Array.isArray(question.correct) ? question.correct : [question.correct];
const answerId = (index) => `a${index + 1}`;

const quizSummary = (quiz, language = null) => ({
  id: quiz.id,
  order: quiz.order,
  title: localized(quiz.title, language),
  titleKey: quiz.id.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()),
  description: localized(quiz.description, language),
  descriptionKey: `${quiz.id.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())}Desc`,
  icon: modulePresentation[quiz.id]?.icon || 'Award',
  color: modulePresentation[quiz.id]?.color || 'bg-blue-500',
  estimatedMinutes: quiz.estimatedMinutes,
  questionCount: quiz.questions.length,
});

const publicQuiz = (quiz, language = null) => ({
  ...quizSummary(quiz, language),
  questions: quiz.questions.map((question) => ({
    id: String(question.id).startsWith('q') ? String(question.id) : `q${question.id}`,
    question: localized(question.text, language),
    multipleCorrect: correctIndexes(question).length > 1,
    answers: (language ? question.options[language] : question.options.en.map((_, index) => ({ en: question.options.en[index], bg: question.options.bg[index] })))
      .map((text, index) => ({ id: answerId(index), text })),
  })),
});

app.get('/api/health', (_req, res) => res.json({ ok: true, mailConfigured: gmailOAuthConfigured(), moduleCount: quizCount }));

app.get('/api/quizzes', (req, res) => {
  const language = selectedLanguage(req.query.language);
  res.json({
  moduleCount: quizCount,
  totalQuestionCount,
  quizzes: quizzes.map((quiz) => quizSummary(quiz, language)),
  });
});

app.get('/api/quizzes/:quizId', (req, res) => {
  const quiz = getQuizById(req.params.quizId);
  if (!quiz) return res.status(404).json({ message: 'Quiz not found.' });
  res.json(publicQuiz(quiz, selectedLanguage(req.query.language)));
});

app.post('/api/quizzes/:quizId/answers', (req, res) => {
  const quiz = getQuizById(req.params.quizId);
  if (!quiz) return res.status(404).json({ message: 'Quiz not found.' });
  const { questionId, answerId: legacyAnswerId, answerIndex, answerIds, language = 'en' } = req.body || {};
  const normalizedQuestionId = String(questionId || '').replace(/^q/, '');
  const question = quiz.questions.find((item) => String(item.id) === normalizedQuestionId || String(item.id) === String(questionId));
  const submittedIds = Array.isArray(answerIds) ? answerIds : legacyAnswerId ? [legacyAnswerId] : Number.isInteger(answerIndex) ? [answerId(answerIndex)] : [];
  if (!question || submittedIds.length === 0 || !submittedIds.every((id) => /^a[1-9]\d*$/.test(id)) || !['en', 'bg'].includes(language)) return res.status(400).json({ message: 'Invalid answer details.' });
  const expectedIds = correctIndexes(question).map(answerId).sort();
  const normalizedSubmitted = [...new Set(submittedIds)].sort();
  const correct = expectedIds.length === normalizedSubmitted.length && expectedIds.every((id, index) => id === normalizedSubmitted[index]);
  res.json({
    correct,
    explanation: question.explanation[language],
    wrongAnswerGuidance: correct ? null : question.wrongAnswerGuidance?.[language] || question.explanation[language],
  });
});

// Figma Make-friendly aliases using the terminology from its Module model.
app.get('/api/modules', (req, res) => {
  const language = selectedLanguage(req.query.language);
  res.json({ moduleCount: quizCount, totalQuestionCount, modules: quizzes.map((quiz) => quizSummary(quiz, language)) });
});

app.get('/api/modules/:moduleId', (req, res) => {
  const quiz = getQuizById(req.params.moduleId);
  if (!quiz) return res.status(404).json({ message: 'Module not found.' });
  res.json(publicQuiz(quiz, selectedLanguage(req.query.language)));
});

app.post('/api/modules/:moduleId/questions/:questionId/check', (req, res, next) => {
  req.params.quizId = req.params.moduleId;
  req.body = { ...req.body, questionId: req.params.questionId };
  next();
}, (req, res) => {
  const quiz = getQuizById(req.params.quizId);
  if (!quiz) return res.status(404).json({ message: 'Module not found.' });
  const language = ['en', 'bg'].includes(req.body.language) ? req.body.language : 'en';
  const normalizedQuestionId = String(req.body.questionId || '').replace(/^q/, '');
  const question = quiz.questions.find((item) => String(item.id) === normalizedQuestionId || String(item.id) === String(req.body.questionId));
  const submittedIds = Array.isArray(req.body.answerIds) ? req.body.answerIds : [];
  if (!question || submittedIds.length === 0 || !submittedIds.every((id) => /^a[1-9]\d*$/.test(id))) return res.status(400).json({ message: 'Invalid answer details.' });
  const expectedIds = correctIndexes(question).map(answerId).sort();
  const normalizedSubmitted = [...new Set(submittedIds)].sort();
  const correct = expectedIds.length === normalizedSubmitted.length && expectedIds.every((id, index) => id === normalizedSubmitted[index]);
  res.json({ correct, explanation: question.explanation[language], wrongAnswerGuidance: correct ? null : question.wrongAnswerGuidance?.[language] || question.explanation[language] });
});

app.post('/api/certificates', async (req, res) => {
  const { name, email, quizId, language = 'en', score, total } = req.body || {};
  const quiz = getQuizById(quizId);
  const sportsModule = sportsModules[quizId];
  const questionCount = quiz?.questions.length || sportsModule?.questionCount;
  const moduleTitle = quiz?.title?.[language] || sportsModule?.title?.[language];
  const assessmentTitle = `${moduleTitle} Digital Module`;
  if ((!quiz && !sportsModule) || typeof name !== 'string' || name.trim().length < 2 || name.length > 100 || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email) || !['en', 'bg'].includes(language) || !Number.isInteger(score) || !Number.isInteger(total) || score !== questionCount || total !== questionCount) return res.status(400).json({ message: 'Invalid certificate details.' });
  const id = `KP-${new Date().getFullYear()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
  const filename = `${id}.pdf`;
  try {
    const pdfBuffer = await createCertificate({ name: name.trim(), language, score, total, id, assessment: assessmentTitle });
    let emailSent = false;
    if (gmailOAuthConfigured()) {
      const bgTitle = quiz?.title?.bg || sportsModule.title.bg;
      const enTitle = quiz?.title?.en || sportsModule.title.en;
      const subject = language === 'bg' ? `Вашият сертификат за „${bgTitle}“` : `Your ${enTitle} certificate`;
      const message = language === 'bg' ? `Здравейте, ${name.trim()},\n\nПоздравления за успешно завършения модул „${bgTitle}“. Сертификатът ви е прикачен към този имейл.` : `Hello ${name.trim()},\n\nCongratulations on completing “${enTitle}”. Your certificate is attached to this email.`;
      await sendGmailMessage({
        from: process.env.MAIL_FROM || process.env.GMAIL_USER,
        to: email,
        subject,
        text: message,
        attachments: [{ filename: `wtsb-${quizId}-certificate.pdf`, content: pdfBuffer, contentType: 'application/pdf' }],
      });
      emailSent = true;
    }
    res.status(201).json({
      certificateId: id,
      quizId,
      emailSent,
      filename,
      mimeType: 'application/pdf',
      downloadUrl: `data:application/pdf;base64,${pdfBuffer.toString('base64')}`,
    });
  } catch (error) { console.error(error); res.status(500).json({ message: 'Could not create the certificate.' }); }
});

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  app.listen(port, () => console.log(`WTSB Digital Modules API listening on http://localhost:${port}`));
}

export default app;
