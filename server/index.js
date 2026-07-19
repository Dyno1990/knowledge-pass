import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outputDir = path.join(root, 'outputs', 'certificates');
fs.mkdirSync(outputDir, { recursive: true });

const app = express();
const port = Number(process.env.PORT || 3001);
app.use(cors({ origin: process.env.APP_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '100kb' }));
app.use('/certificates', express.static(outputDir));

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

function createCertificate({ name, language, score, total, id, outputPath }) {
  const t = copy[language] || copy.en;
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 0, info: { Title: `Certificate — ${name}`, Author: 'Knowledge Pass' } });
    const stream = fs.createWriteStream(outputPath);
    stream.on('finish', resolve); stream.on('error', reject); doc.on('error', reject); doc.pipe(stream);
    if (fontPath) doc.registerFont('Custom', fontPath).font('Custom');
    const W = doc.page.width, H = doc.page.height;
    doc.rect(0, 0, W, H).fill('#f6f4ee');
    doc.circle(W - 25, 25, 175).fill('#d8f05d');
    doc.circle(20, H - 15, 120).fill('#cbe9d8');
    doc.rect(22, 22, W - 44, H - 44).lineWidth(1).stroke('#174b3a');
    doc.rect(31, 31, W - 62, H - 62).lineWidth(.4).stroke('#7c988d');
    doc.circle(78, 76, 27).fill('#174b3a');
    doc.moveTo(66, 76).lineTo(74, 84).lineTo(91, 66).lineWidth(3).lineCap('round').lineJoin('round').stroke('#ffffff');
    doc.fillColor('#17241e').fontSize(14).text('KNOWLEDGE PASS', 112, 66, { characterSpacing: 1.5 });
    doc.fillColor('#174b3a').fontSize(46).text(t.certificate, 0, 122, { width: W, align: 'center', characterSpacing: 2 });
    doc.fontSize(12).fillColor('#66716b').text(t.achievement, 0, 178, { width: W, align: 'center', characterSpacing: 4 });
    doc.fontSize(12).fillColor('#66716b').text(t.certifies, 0, 222, { width: W, align: 'center' });
    doc.fontSize(name.length > 34 ? 32 : 40).fillColor('#17241e').text(name, 110, 248, { width: W - 220, align: 'center' });
    doc.moveTo(220, 303).lineTo(W - 220, 303).lineWidth(.7).stroke('#174b3a');
    doc.fontSize(12).fillColor('#66716b').text(t.completed, 0, 326, { width: W, align: 'center' });
    doc.fontSize(21).fillColor('#174b3a').text(t.assessment, 80, 351, { width: W - 160, align: 'center' });
    const date = new Intl.DateTimeFormat(language === 'bg' ? 'bg-BG' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date());
    const columns = [{ label: t.issued, value: date }, { label: t.score, value: `${score}/${total}` }, { label: t.id, value: id }];
    columns.forEach((item, i) => { const x = 96 + i * 250; doc.fontSize(8).fillColor('#75817b').text(item.label, x, 435, { width: 180, align: 'center', characterSpacing: 1.3 }); doc.fontSize(11).fillColor('#17241e').text(item.value, x, 454, { width: 180, align: 'center' }); });
    doc.moveTo(W / 2 - 80, 512).lineTo(W / 2 + 80, 512).stroke('#66716b');
    doc.fontSize(9).fillColor('#66716b').text(t.signature, W / 2 - 100, 520, { width: 200, align: 'center' });
    doc.end();
  });
}

function mailTransport() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  return nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === 'true', auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });
}

app.get('/api/health', (_req, res) => res.json({ ok: true, mailConfigured: Boolean(mailTransport()) }));

app.post('/api/certificates', async (req, res) => {
  const { name, email, language = 'en', score, total } = req.body || {};
  if (typeof name !== 'string' || name.trim().length < 2 || name.length > 100 || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email) || !['en', 'bg'].includes(language) || !Number.isInteger(score) || !Number.isInteger(total) || score !== total || total < 1) return res.status(400).json({ message: 'Invalid certificate details.' });
  const id = `KP-${new Date().getFullYear()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
  const filename = `${id}.pdf`; const outputPath = path.join(outputDir, filename);
  try {
    await createCertificate({ name: name.trim(), language, score, total, id, outputPath });
    const transport = mailTransport(); let emailSent = false;
    if (transport) {
      const subject = language === 'bg' ? 'Вашият сертификат от Knowledge Pass' : 'Your Knowledge Pass certificate';
      const message = language === 'bg' ? `Здравейте, ${name.trim()},\n\nПоздравления за успешно завършения тест. Сертификатът ви е прикачен към този имейл.` : `Hello ${name.trim()},\n\nCongratulations on completing the assessment. Your certificate is attached to this email.`;
      await transport.sendMail({ from: process.env.MAIL_FROM || process.env.SMTP_USER, to: email, subject, text: message, attachments: [{ filename: 'knowledge-pass-certificate.pdf', path: outputPath }] });
      emailSent = true;
    }
    res.status(201).json({ certificateId: id, emailSent, downloadUrl: `/certificates/${filename}` });
  } catch (error) { console.error(error); res.status(500).json({ message: 'Could not create the certificate.' }); }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(root, 'dist')));
  app.use((_req, res) => res.sendFile(path.join(root, 'dist', 'index.html')));
}

app.listen(port, () => console.log(`Knowledge Pass API listening on http://localhost:${port}`));
