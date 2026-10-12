import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as Progress from "@radix-ui/react-progress";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, Clock3, ListChecks, LoaderCircle, RotateCcw, ShieldCheck, Target, Trophy, XCircle } from "lucide-react";
import { localize, modules } from "../data/modules";
import { useTranslation } from "../hooks/useTranslation";

export default function QuizPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { language, t } = useTranslation();
  const module = modules.find((item) => item.id === moduleId);
  const [hasStarted, setHasStarted] = useState(false);
  const [introStep, setIntroStep] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!module) navigate("/");
  }, [module, navigate]);

  if (!module) return null;

  const question = module.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / module.questions.length) * 100;
  const remaining = module.questions.length - currentQuestionIndex - 1;

  const copy = language === "bg" ? {
    remaining: "Оставащи", selectAll: "Изберете всички приложими отговори",
    notQuite: "Не съвсем", review: "Прегледайте обяснението и опитайте отново.",
    explanation: "Подробно обяснение:", guidance: "Ключово послание:", next: "Следващ въпрос",
    certificate: "Към сертификата", tryAgain: "Опитайте отново",
    formTitle: "Издаване на сертификат", formText: "Въведете името за сертификата и имейла, на който да бъде изпратен.",
    name: "Име и фамилия", email: "Имейл адрес", create: "Създай сертификат",
    invalid: "Моля, въведете валидни име и имейл.", failed: "Сертификатът не можа да бъде създаден. Опитайте отново.",
  } : language === "pl" ? {
    remaining: "Pozostało", selectAll: "Zaznacz wszystkie poprawne odpowiedzi",
    notQuite: "Niezupełnie", review: "Zapoznaj się z wyjaśnieniem i spróbuj ponownie.",
    explanation: "Szczegółowe wyjaśnienie:", guidance: "Najważniejsza wskazówka:", next: "Następne pytanie",
    certificate: "Przejdź do certyfikatu", tryAgain: "Spróbuj ponownie",
    formTitle: "Wystaw certyfikat", formText: "Wpisz imię i nazwisko, które znajdzie się na certyfikacie, oraz adres e-mail, na który ma zostać wysłany.",
    name: "Imię i nazwisko", email: "Adres e-mail", create: "Utwórz certyfikat",
    invalid: "Wpisz prawidłowe imię i nazwisko oraz adres e-mail.", failed: "Nie udało się utworzyć certyfikatu. Spróbuj ponownie.",
  } : language === "de" ? {
    remaining: "Verbleibend", selectAll: "Wählen Sie alle zutreffenden Antworten aus",
    notQuite: "Nicht ganz", review: "Lesen Sie die Erklärung und versuchen Sie es erneut.",
    explanation: "Ausführliche Erklärung:", guidance: "Kernaussage:", next: "Nächste Frage",
    certificate: "Weiter zum Zertifikat", tryAgain: "Erneut versuchen",
    formTitle: "Zertifikat ausstellen", formText: "Geben Sie den Namen für das Zertifikat und die E-Mail-Adresse ein, an die es gesendet werden soll.",
    name: "Vor- und Nachname", email: "E-Mail-Adresse", create: "Zertifikat erstellen",
    invalid: "Bitte geben Sie einen gültigen Namen und eine gültige E-Mail-Adresse ein.", failed: "Das Zertifikat konnte nicht erstellt werden. Bitte versuchen Sie es erneut.",
  } : language === "bs" ? {
    remaining: "Preostalo", selectAll: "Odaberite sve tačne odgovore",
    notQuite: "Nije tačno", review: "Pročitajte objašnjenje i pokušajte ponovo.",
    explanation: "Detaljno objašnjenje:", guidance: "Ključna poruka:", next: "Sljedeće pitanje",
    certificate: "Nastavi do certifikata", tryAgain: "Pokušaj ponovo",
    formTitle: "Izdavanje certifikata", formText: "Unesite ime koje će biti navedeno na certifikatu i e-mail adresu na koju ga treba poslati.",
    name: "Ime i prezime", email: "E-mail adresa", create: "Kreiraj certifikat",
    invalid: "Unesite ispravno ime i e-mail adresu.", failed: "Certifikat nije mogao biti kreiran. Pokušajte ponovo.",
  } : language === "sq" ? {
    remaining: "Të mbetura", selectAll: "Zgjidhni të gjitha përgjigjet e sakta",
    notQuite: "Jo tamam", review: "Lexoni shpjegimin dhe provoni përsëri.",
    explanation: "Shpjegim i hollësishëm:", guidance: "Mesazhi kryesor:", next: "Pyetja tjetër",
    certificate: "Vazhdo te certifikata", tryAgain: "Provo përsëri",
    formTitle: "Lëshimi i certifikatës", formText: "Shkruani emrin që do të shfaqet në certifikatë dhe adresën e e-mailit ku duhet të dërgohet.",
    name: "Emri dhe mbiemri", email: "Adresa e e-mailit", create: "Krijo certifikatën",
    invalid: "Shkruani një emër dhe adresë e-maili të vlefshme.", failed: "Certifikata nuk mund të krijohej. Provoni përsëri.",
  } : {
    remaining: "Remaining", selectAll: "Select all answers that apply",
    notQuite: "Not Quite", review: "Review the explanation and try again.",
    explanation: "Detailed explanation:", guidance: "Key message:", next: "Next Question",
    certificate: "Continue to Certificate", tryAgain: "Try Again",
    formTitle: "Issue your certificate", formText: "Enter the name for the certificate and the email address where it should be sent.",
    name: "Full name", email: "Email address", create: "Create certificate",
    invalid: "Please enter a valid name and email address.", failed: "The certificate could not be created. Please try again.",
  };

  if (!hasStarted) {
    const introCopy = language === "bg"
      ? { objectives: "Какво ще научите", works: "Как работи модулът", before: "Преди да започнете", outcome: "Очакван резултат", next: "Напред", previous: "Назад", start: "Започни теста", questions: "въпроса", step: "Стъпка" }
      : language === "pl"
        ? { objectives: "Czego się nauczysz", works: "Jak działa moduł", before: "Zanim zaczniesz", outcome: "Efekty uczenia się", next: "Dalej", previous: "Wstecz", start: "Rozpocznij quiz", questions: "pytań", step: "Krok" }
        : language === "de"
          ? { objectives: "Was Sie lernen", works: "So funktioniert das Modul", before: "Bevor Sie beginnen", outcome: "Lernergebnis", next: "Weiter", previous: "Zurück", start: "Quiz starten", questions: "Fragen", step: "Schritt" }
          : language === "bs"
            ? { objectives: "Šta ćete naučiti", works: "Kako modul funkcioniše", before: "Prije nego što počnete", outcome: "Ishod učenja", next: "Dalje", previous: "Nazad", start: "Pokreni kviz", questions: "pitanja", step: "Korak" }
            : language === "sq"
              ? { objectives: "Çfarë do të mësoni", works: "Si funksionon moduli", before: "Para se të filloni", outcome: "Rezultati e të nxënit", next: "Tjetra", previous: "Prapa", start: "Fillo kuizin", questions: "pyetje", step: "Hapi" }
        : { objectives: "What you will learn", works: "How this module works", before: "Before you begin", outcome: "Learning Outcome", next: "Next", previous: "Previous", start: "Start the quiz", questions: "questions", step: "Step" };
    const introPages = [
      {
        title: introCopy.objectives,
        icon: Target,
        content: <ul className="space-y-3 text-gray-700 list-disc pl-5">{module.content.learningObjectives.map((item, index) => <li key={index}>{localize(item, language)}</li>)}</ul>,
      },
      {
        title: introCopy.works,
        icon: ListChecks,
        content: <ul className="space-y-3 text-gray-700 list-decimal pl-5">{module.content.howItWorks.map((item, index) => <li key={index}>{localize(item, language)}</li>)}</ul>,
      },
      {
        title: introCopy.before,
        icon: ShieldCheck,
        content: <ul className="space-y-3 text-gray-700 list-disc pl-5">{module.content.beforeYouBegin.map((item, index) => <li key={index}>{localize(item, language)}</li>)}</ul>,
      },
      {
        title: introCopy.outcome,
        icon: Trophy,
        content: <p className="text-lg leading-8 text-gray-700">{localize(module.content.learningOutcome, language)}</p>,
      },
    ];
    const activeIntroPage = introPages[introStep];
    const IntroIcon = activeIntroPage.icon;
    const goForward = () => {
      if (introStep < introPages.length - 1) {
        setIntroStep((step) => step + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setHasStarted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 text-white" style={{ backgroundColor: module.color }}>
              <p className="font-semibold mb-2 opacity-90">{language === "bg" ? "Обучителен модул" : language === "pl" ? "Moduł edukacyjny" : language === "de" ? "Lernmodul" : language === "bs" ? "Obrazovni modul" : language === "sq" ? "Moduli arsimor" : "Learning module"} {module.order}</p>
              <h1 className="text-4xl font-extrabold mb-4">{localize(module.title, language)}</h1>
              <p className="text-lg opacity-95">{localize(module.content.introduction, language)}</p>
              <div className="flex gap-5 mt-6 text-sm font-medium">
                <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" />{module.questions.length} {introCopy.questions}</span>
                <span className="flex items-center gap-2"><Clock3 className="w-4 h-4" />~{module.estimatedMinutes} min</span>
              </div>
            </div>
            <div className="px-8 pt-7">
              <div className="flex items-center justify-between text-sm font-semibold text-gray-500 mb-3">
                <span>{introCopy.step} {introStep + 1} / {introPages.length}</span>
                <span>{activeIntroPage.title}</span>
              </div>
              <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full transition-all duration-300" style={{ width: `${((introStep + 1) / introPages.length) * 100}%`, backgroundColor: module.color }} />
              </div>
            </div>
            <section className="p-8 min-h-[300px]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: module.color }}>
                  <IntroIcon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{activeIntroPage.title}</h2>
              </div>
              {activeIntroPage.content}
            </section>
            <div className="px-8 pb-8 flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
              <button type="button" onClick={() => setIntroStep((step) => Math.max(0, step - 1))} disabled={introStep === 0}
                className="py-3 px-6 rounded-lg font-bold flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed">
                <ArrowLeft className="w-5 h-5" />{introCopy.previous}
              </button>
              <button type="button" onClick={goForward} className="text-white py-3 px-8 rounded-lg font-bold flex items-center justify-center gap-2" style={{ backgroundColor: module.color }}>
                {introStep === introPages.length - 1 ? introCopy.start : introCopy.next}<ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const toggleAnswer = (answerId: string) => {
    if (showFeedback) return;
    if (question.multipleCorrect) {
      setSelectedAnswers((previous) => previous.includes(answerId)
        ? previous.filter((id) => id !== answerId)
        : [...previous, answerId]);
    } else {
      setSelectedAnswers([answerId]);
    }
  };

  const checkAnswer = () => {
    if (!selectedAnswers.length) return;
    const correctIds = question.answers.filter((answer) => answer.isCorrect).map((answer) => answer.id);
    const correct = selectedAnswers.length === correctIds.length
      && selectedAnswers.every((id) => correctIds.includes(id));
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < module.questions.length - 1) {
      setCurrentQuestionIndex((index) => index + 1);
      setSelectedAnswers([]);
      setShowFeedback(false);
      setIsCorrect(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setShowFeedback(false);
      setShowCertificateForm(true);
    }
  };

  const tryAgain = () => {
    setSelectedAnswers([]);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  const createCertificate = async (event: FormEvent) => {
    event.preventDefault();
    setFormError("");
    if (name.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(email)) {
      setFormError(copy.invalid);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(), email: email.trim(), quizId: module.id, language,
          score: module.questions.length, total: module.questions.length,
        }),
      });
      if (!response.ok) throw new Error("certificate request failed");
      const certificate = await response.json();
      navigate(`/certificate/${module.id}`, {
        state: { name: name.trim(), email: email.trim(), ...certificate },
      });
    } catch {
      setFormError(copy.failed);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-6">
            <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{localize(module.title, language)}</h1>
              <div className="text-sm text-gray-600">
                {t("questionOf")} {currentQuestionIndex + 1} / {module.questions.length}
                <span className="ml-3">• {copy.remaining}: {remaining}</span>
              </div>
            </div>
            <Progress.Root className="relative overflow-hidden bg-gray-200 rounded-full w-full h-3" value={progress}>
              <Progress.Indicator className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </Progress.Root>
          </div>

          <p className="text-sm font-bold uppercase tracking-wide text-blue-600 mb-2">{localize(question.title, language)}</p>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">{localize(question.scenario, language)}</h2>
          {question.multipleCorrect && <p className="text-sm text-gray-600 mb-4 italic">{copy.selectAll}</p>}
          <div className="space-y-3 mb-8">
            {question.answers.map((answer) => {
              const selected = selectedAnswers.includes(answer.id);
              return (
                <button key={answer.id} type="button" onClick={() => toggleAnswer(answer.id)} disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selected ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
                  } ${!showFeedback ? "hover:border-blue-400 cursor-pointer" : "cursor-not-allowed"}`}>
                  <span className="flex items-center gap-3">
                    <span className={`w-5 h-5 ${question.multipleCorrect ? "rounded" : "rounded-full"} border-2 flex items-center justify-center ${selected ? "border-blue-600 bg-blue-600" : "border-gray-400"}`}>
                      {selected && <span className="w-2 h-2 bg-white rounded-full" />}
                    </span>
                    <span className="font-bold text-gray-500">{answer.label}.</span>
                    <span className="text-gray-900">{localize(answer.text, language)}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <button type="button" onClick={checkAnswer} disabled={!selectedAnswers.length || showFeedback}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
            {t("submitAnswer")}
          </button>
        </div>
      </div>

      {showFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8">
            <div className="flex items-center gap-4 mb-6">
              {isCorrect ? <CheckCircle className="w-12 h-12 text-green-500" /> : <XCircle className="w-12 h-12 text-red-500" />}
              <div>
                <h3 className={`text-2xl font-bold ${isCorrect ? "text-green-700" : "text-red-700"}`}>{isCorrect ? t("correct") : copy.notQuite}</h3>
                <p className="text-gray-600">{isCorrect ? t("correctMessage") : copy.review}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">{copy.explanation}</h4>
              <p className="text-gray-700">{localize(question.explanation, language)}</p>
              <h4 className="font-semibold text-gray-900 mt-4 mb-2">{copy.guidance}</h4>
              <p className="text-gray-700">{localize(question.keyMessage, language)}</p>
            </div>
            <button type="button" onClick={isCorrect ? nextQuestion : tryAgain}
              className={`w-full text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 ${isCorrect ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}>
              {isCorrect ? (currentQuestionIndex < module.questions.length - 1 ? copy.next : copy.certificate) : copy.tryAgain}
              {isCorrect ? <ArrowRight className="w-5 h-5" /> : <RotateCcw className="w-5 h-5" />}
            </button>
          </div>
        </div>
      )}

      {showCertificateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <form onSubmit={createCertificate} className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{copy.formTitle}</h3>
            <p className="text-gray-600 mb-6">{copy.formText}</p>
            <label className="block font-medium text-gray-800 mb-2" htmlFor="certificate-name">{copy.name}</label>
            <input id="certificate-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 mb-4 focus:border-blue-500 outline-none" />
            <label className="block font-medium text-gray-800 mb-2" htmlFor="certificate-email">{copy.email}</label>
            <input id="certificate-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 mb-4 focus:border-blue-500 outline-none" />
            {formError && <p className="text-red-600 mb-4">{formError}</p>}
            <button type="submit" disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2">
              {isSubmitting && <LoaderCircle className="w-5 h-5 animate-spin" />}
              {copy.create}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
