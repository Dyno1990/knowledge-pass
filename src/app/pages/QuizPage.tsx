import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as Progress from "@radix-ui/react-progress";
import { ArrowRight, BookOpen, CheckCircle, Clock3, LoaderCircle, RotateCcw, Target, XCircle } from "lucide-react";
import { localize, modules } from "../data/modules";
import { useTranslation } from "../hooks/useTranslation";

export default function QuizPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { language, t } = useTranslation();
  const module = modules.find((item) => item.id === moduleId);
  const [hasStarted, setHasStarted] = useState(false);
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
      ? { objectives: "Какво ще научите", works: "Как работи модулът", before: "Преди да започнете", outcome: "Очакван резултат", start: "Започни теста", questions: "въпроса" }
      : { objectives: "What you will learn", works: "How this module works", before: "Before you begin", outcome: "Learning outcome", start: "Start the quiz", questions: "questions" };
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 text-white" style={{ backgroundColor: module.color }}>
              <p className="font-semibold mb-2 opacity-90">{language === "bg" ? "Обучителен модул" : "Learning module"} {module.order}</p>
              <h1 className="text-4xl font-extrabold mb-4">{localize(module.title, language)}</h1>
              <p className="text-lg opacity-95">{localize(module.content.introduction, language)}</p>
              <div className="flex gap-5 mt-6 text-sm font-medium">
                <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" />{module.questions.length} {introCopy.questions}</span>
                <span className="flex items-center gap-2"><Clock3 className="w-4 h-4" />~{module.estimatedMinutes} min</span>
              </div>
            </div>
            <div className="p-8 grid md:grid-cols-2 gap-8">
              <section>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3"><Target className="w-5 h-5 text-blue-600" />{introCopy.objectives}</h2>
                <ul className="space-y-2 text-gray-700 list-disc pl-5">{module.content.learningObjectives.map((item, index) => <li key={index}>{localize(item, language)}</li>)}</ul>
              </section>
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">{introCopy.works}</h2>
                <ul className="space-y-2 text-gray-700 list-disc pl-5">{module.content.howItWorks.map((item, index) => <li key={index}>{localize(item, language)}</li>)}</ul>
              </section>
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">{introCopy.before}</h2>
                <ul className="space-y-2 text-gray-700 list-disc pl-5">{module.content.beforeYouBegin.map((item, index) => <li key={index}>{localize(item, language)}</li>)}</ul>
              </section>
              <section className="bg-blue-50 rounded-xl p-5">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{introCopy.outcome}</h2>
                <p className="text-gray-700">{localize(module.content.learningOutcome, language)}</p>
              </section>
            </div>
            <div className="px-8 pb-8">
              <button type="button" onClick={() => setHasStarted(true)} className="w-full text-white py-4 px-6 rounded-lg font-bold flex items-center justify-center gap-2" style={{ backgroundColor: module.color }}>
                {introCopy.start}<ArrowRight className="w-5 h-5" />
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
