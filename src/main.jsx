import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, Check, ChevronRight, Download, Globe2, LockKeyhole, Mail, Menu, ShieldCheck, X } from 'lucide-react';
import { quizzes, quizCount, totalQuestionCount } from './config/quizzes/index.js';
import { content } from './config/content';
import './styles.css';

const safeScroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

function App() {
  const [lang, setLang] = useState('bg');
  const [activeQuizId, setActiveQuizId] = useState(quizzes[0].id);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [certificate, setCertificate] = useState(null);
  const [form, setForm] = useState({ name: '', email: '' });
  const [formError, setFormError] = useState('');
  const [sending, setSending] = useState(false);
  const [deliveryWarning, setDeliveryWarning] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const quizRef = useRef(null);
  const t = content[lang];
  const activeQuiz = quizzes.find((quiz) => quiz.id === activeQuizId) || quizzes[0];
  const questions = activeQuiz.questions;
  const q = questions[index];
  const remaining = questions.length - index - 1;
  const progress = started ? ((index + (answered ? 1 : 0)) / questions.length) * 100 : 0;

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const startQuiz = (quizId = activeQuizId) => {
    setActiveQuizId(quizId);
    setStarted(true); setCompleted(false); setIndex(0); setSelected([]); setAnswered(false); setCertificate(null);
    setTimeout(() => quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  const checkAnswer = () => {
    if (selected.length === 0) return;
    const expected = (Array.isArray(q.correct) ? q.correct : [q.correct]).slice().sort((a, b) => a - b);
    const submitted = selected.slice().sort((a, b) => a - b);
    if (expected.length === submitted.length && expected.every((value, position) => value === submitted[position])) { setAnswered(true); setFeedback('correct'); }
    else { setFeedback('wrong'); }
  };

  const retry = () => { setFeedback(null); setSelected([]); };
  const next = () => {
    setFeedback(null);
    if (index === questions.length - 1) { setCompleted(true); return; }
    setIndex((i) => i + 1); setSelected([]); setAnswered(false);
  };

  const submitCertificate = async (event) => {
    event.preventDefault();
    if (form.name.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(form.email)) { setFormError(t.required); return; }
    setFormError(''); setSending(true); setDeliveryWarning('');
    try {
      const response = await fetch('/api/certificates', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, quizId: activeQuiz.id, language: lang, score: questions.length, total: questions.length }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Request failed');
      setCertificate(data);
      if (!data.emailSent) setDeliveryWarning(t.serverError);
    } catch (error) { setFormError(error.message); }
    finally { setSending(false); }
  };

  const switchLanguage = () => setLang((l) => l === 'bg' ? 'en' : 'bg');
  const nav = (id) => { setMenuOpen(false); safeScroll(id); };

  return <div className="app">
    <header className="nav-wrap">
      <nav className="nav shell" aria-label="Main navigation">
        <button className="brand" onClick={() => nav('home')}><span className="brand-mark"><ShieldCheck size={20}/></span><span>{t.brand}</span></button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <button onClick={() => nav('about')}>{t.about}</button>
          <button onClick={() => { startQuiz(); setMenuOpen(false); }}>{t.quiz}</button>
          <button onClick={() => nav('contact')}>{t.contact}</button>
          <button className="lang-mobile" onClick={switchLanguage}>{lang === 'bg' ? 'EN' : 'БГ'}</button>
        </div>
        <div className="nav-actions">
          <button className="language" onClick={switchLanguage} aria-label={t.changeLanguage}><Globe2 size={17}/><span>{lang === 'bg' ? 'БГ' : 'EN'}</span></button>
          <button className="nav-cta" onClick={() => startQuiz()}>{t.start}<ArrowRight size={16}/></button>
          <button className="menu" aria-label={t.menu} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
        </div>
      </nav>
    </header>

    <main>
      <section id="home" className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow"><span></span>{t.eyebrow}</div>
          <h1>{t.title.split('\n').map((line, i) => <React.Fragment key={line}>{line}{i === 0 && <br/>}</React.Fragment>)}</h1>
          <p>{t.subtitle}</p>
          <button className="primary large" onClick={() => startQuiz()}>{t.start}<ArrowRight size={19}/></button>
          <div className="trust"><div className="avatars"><i>EL</i><i>MK</i><i>AS</i></div><span><strong>4.9 / 5</strong><br/>{lang === 'bg' ? 'от над 1 200 участници' : 'from 1,200+ learners'}</span></div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="orb orb-one"></div><div className="orb orb-two"></div>
          <div className="hero-card card-back"><span>{quizCount}</span><small>{lang === 'bg' ? 'УЧЕБНИ МОДУЛА' : 'LEARNING MODULES'}</small></div>
          <div className="hero-card card-front"><ShieldCheck size={44}/><strong>{lang === 'bg' ? 'Знание, което остава.' : 'Knowledge that sticks.'}</strong><p>{lang === 'bg' ? 'Учи чрез действие, не чрез наизустяване.' : 'Learn by doing, not memorising.'}</p><div className="mini-progress"><span></span></div></div>
          <div className="float-badge"><Check size={18}/><span>{lang === 'bg' ? 'Сертификат включен' : 'Certificate included'}</span></div>
        </div>
      </section>

      <section id="quiz" ref={quizRef} className={`quiz-section ${started ? 'active' : ''}`}>
        <div className="shell">
          {!started && <div className="module-catalog">
            <div className="catalog-heading"><div><div className="eyebrow light"><span></span>{lang === 'bg' ? `${quizCount} модула` : `${quizCount} modules`}</div><h2>{lang === 'bg' ? 'Изберете въпросник' : 'Choose an assessment'}</h2></div><p>{lang === 'bg' ? `${totalQuestionCount} въпроса общо — броят се извежда автоматично от конфигурациите.` : `${totalQuestionCount} questions in total — calculated automatically from the configurations.`}</p></div>
            <div className="module-grid">{quizzes.map((quiz) => <button className="module-card" key={quiz.id} onClick={() => startQuiz(quiz.id)}><span className="module-order">{String(quiz.order).padStart(2, '0')}</span><h3>{quiz.title[lang]}</h3><p>{quiz.description[lang]}</p><div><span>{quiz.questions.length} {lang === 'bg' ? 'въпроса' : 'questions'}</span><span>~{quiz.estimatedMinutes} min</span><ArrowRight size={18}/></div></button>)}</div>
          </div>}
          {started && !completed && <div className="quiz-layout">
            <aside className="quiz-meta">
              <div className="meta-number">{String(index + 1).padStart(2, '0')}<span>/{String(questions.length).padStart(2, '0')}</span></div>
              <p>{t.question} {index + 1} {t.of} {questions.length}</p>
              <div className="vertical-progress"><span style={{ height: `${progress}%` }}></span></div>
              <p className="remaining"><strong>{remaining}</strong> {t.remaining}</p>
            </aside>
            <article className="question-card" key={q.id}>
              <div className="question-top"><span>{activeQuiz.title[lang]} · {Array.isArray(q.correct) ? (lang === 'bg' ? 'Изберете всички верни отговори' : 'Select all correct answers') : t.choose}</span><div className="mobile-count">{index + 1}/{questions.length}</div></div>
              <h2>{q.text[lang]}</h2>
              <div className="options" role="radiogroup">
                {q.options[lang].map((option, optionIndex) => { const isSelected = selected.includes(optionIndex); const isMultiple = Array.isArray(q.correct); return <button key={option} role={isMultiple ? 'checkbox' : 'radio'} aria-checked={isSelected} disabled={answered} className={`option ${isSelected ? 'selected' : ''} ${answered && isSelected ? 'correct-option' : ''}`} onClick={() => setSelected((current) => isMultiple ? (current.includes(optionIndex) ? current.filter((value) => value !== optionIndex) : [...current, optionIndex]) : [optionIndex])}><span className="letter">{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span>{answered && isSelected && <Check className="option-check" size={19}/>}</button>; })}
              </div>
              <div className="question-actions">
                {!answered ? <button className="primary" disabled={selected.length === 0} onClick={checkAnswer}>{t.check}<ChevronRight size={18}/></button> : <><div className="success-inline"><Check size={17}/><span>{t.correct}</span></div><button className="primary" onClick={next}>{index === questions.length - 1 ? t.finish : t.next}<ArrowRight size={18}/></button></>}
              </div>
              <div className="mobile-progress"><span style={{ width: `${progress}%` }}></span></div>
            </article>
          </div>}

          {started && completed && <div className="completion">
            <div className="completion-copy"><div className="seal"><ShieldCheck size={32}/></div><div className="eyebrow"><span></span>{activeQuiz.title[lang]}</div><h2>{t.completeTitle}</h2><p>{t.completeText}</p><div className="result-stat"><strong>{questions.length}/{questions.length}</strong><span>{lang === 'bg' ? 'правилни отговора' : 'correct answers'}</span></div></div>
            <div className="certificate-form-card">
              {!certificate ? <form onSubmit={submitCertificate} noValidate>
                <label>{t.name}<input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder={t.namePlaceholder} autoComplete="name"/></label>
                <label>{t.email}<input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder={t.emailPlaceholder} autoComplete="email"/></label>
                {formError && <p className="form-error">{formError}</p>}
                <button className="primary full" disabled={sending}>{sending ? t.sending : t.send}<Mail size={18}/></button><p className="privacy"><LockKeyhole size={13}/>{t.privacy}</p>
              </form> : <div className="certificate-ready"><div className="ready-icon"><Check size={28}/></div><h3>{t.sentTitle}</h3><p>{t.sentText} <strong>{form.name}</strong>.</p>{deliveryWarning && <p className="warning">{deliveryWarning}</p>}<a className="primary full" href={certificate.downloadUrl}><Download size={18}/>{t.download}</a><button className="text-button" onClick={() => startQuiz()}>{t.restart}</button></div>}
            </div>
          </div>}
        </div>
      </section>

      <section id="about" className="about shell"><div><div className="eyebrow"><span></span>{t.about}</div><h2>{t.aboutTitle}</h2></div><div><p>{t.aboutText}</p><div className="pill-row"><span>{quizCount} {lang === 'bg' ? 'модула' : 'modules'}</span><span>{totalQuestionCount} {lang === 'bg' ? 'въпроса' : 'questions'}</span><span>2 {lang === 'bg' ? 'езика' : 'languages'}</span></div></div></section>
      <section id="contact" className="contact"><div className="shell contact-inner"><div><div className="eyebrow light"><span></span>{t.contact}</div><h2>{t.contactTitle}</h2><p>{t.contactText}</p></div><a href={`mailto:${t.contactEmail}`}>{t.contactEmail}<ArrowRight size={19}/></a></div></section>
    </main>

    <footer><div className="shell footer-inner"><div className="brand footer-brand"><span className="brand-mark"><ShieldCheck size={19}/></span><span>{t.brand}</span></div><div><button onClick={() => alert(t.terms)}>{t.terms}</button><span>{t.copyright}</span></div></div></footer>

    {feedback && <div className="modal-layer" role="dialog" aria-modal="true">
      <div className={`feedback-modal ${feedback}`}>
        <div className="feedback-icon">{feedback === 'wrong' ? <X/> : <Check/>}</div>
        <span className="modal-kicker">{feedback === 'wrong' ? t.notQuite : t.correct}</span>
        {feedback === 'wrong' && <><h3>{q.text[lang]}</h3><div className="answer-review"><small>{t.yourAnswer}</small><p>{selected.map((answerIndex) => q.options[lang][answerIndex]).join(', ')}</p></div><div className="explanation"><small>{t.explanation}</small><p>{q.wrongAnswerGuidance?.[lang] || q.explanation[lang]}</p></div><button className="primary full" onClick={retry}>{t.understand}<ArrowRight size={18}/></button></>}
        {feedback === 'correct' && <><h3>{t.correctText}</h3><button className="primary full" onClick={() => setFeedback(null)}>{t.close}</button></>}
      </div>
    </div>}
  </div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
