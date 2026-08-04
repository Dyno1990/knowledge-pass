import { useParams, Link, useLocation } from "react-router";
import { localize, modules } from "../data/modules";
import { Award, Download, Home, Share2 } from "lucide-react";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation";

export default function CertificatePage() {
  const { moduleId } = useParams();
  const location = useLocation();
  const { language, t } = useTranslation();
  const module = modules.find((m) => m.id === moduleId);
  const certificate = (location.state || {}) as {
    name?: string;
    email?: string;
    downloadUrl?: string;
    emailSent?: boolean;
    certificateId?: string;
  };

  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#3b82f6", "#10b981", "#f59e0b"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#3b82f6", "#10b981", "#f59e0b"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Module not found</p>
          <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const currentDate = new Date().toLocaleDateString(language === "bg" ? "bg-BG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Award className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {language === "bg" ? "Поздравления!" : "Congratulations!"}
          </h1>
          <p className="text-xl text-gray-600">
            {language === "bg" ? "Успешно завършихте сертификационната програма" : "You've successfully completed the certification program"}
          </p>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-2xl p-12 mb-8 border-8 border-blue-900 outline outline-2 outline-offset-[-14px] outline-blue-300">
          <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full border-[18px] border-blue-200/30" />
          <div className="absolute -right-12 top-20 w-36 h-36 rounded-full border-[12px] border-indigo-200/25" />
          <div className="relative text-center">
            <div className="mb-8">
              <div className="w-16 h-16 rounded-full bg-blue-900 text-white flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="font-bold tracking-wider">WTSB</span>
              </div>
              <p className="text-sm font-bold tracking-[0.25em] text-blue-800 mb-3">WTSB DIGITAL MODULES</p>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                {t("certificateOfAchievement")}
              </h2>
              <div className="w-24 h-1 bg-blue-500 mx-auto" />
            </div>

            <div className="mb-8">
              <p className="text-lg text-gray-600 mb-4">{language === "bg" ? "С настоящото удостоверяваме, че" : "This certifies that"}</p>
              <div className="bg-white/80 border border-blue-100 rounded-lg py-4 px-8 inline-block mb-4 shadow-sm">
                <p className="text-3xl font-bold text-gray-900">{certificate.name || (language === "bg" ? "Спортен професионалист" : "Sports Professional")}</p>
              </div>
              <p className="text-lg text-gray-600 mb-4">
                {language === "bg" ? "успешно завърши" : "has successfully completed the"}
              </p>
              <p className="text-2xl font-bold text-blue-600 mb-6">{localize(module.title, language)} Digital Module</p>
              <p className="text-lg text-gray-600">{language === "bg" ? "Сертификационна програма" : "Certification Program"}</p>
            </div>

            <div className="flex justify-center items-center gap-12 mb-8">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">{language === "bg" ? "Дата на завършване" : "Date of Completion"}</p>
                <p className="text-lg font-semibold text-gray-900">{currentDate}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">{t("questionsCompleted")}</p>
                <p className="text-lg font-semibold text-gray-900">
                  {module.questions.length}/{module.questions.length}
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                WTSB Digital Modules
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={certificate.downloadUrl || "#"} download
            className={`flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-colors ${certificate.downloadUrl ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 pointer-events-none"}`}>
            <Download className="w-5 h-5" />
            {language === "bg" ? "Изтегли сертификата" : "Download Certificate"}
          </a>
          <button className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            <Share2 className="w-5 h-5" />
            {language === "bg" ? "Сподели постижението" : "Share Achievement"}
          </button>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            <Home className="w-5 h-5" />
            {language === "bg" ? "Към началото" : "Return Home"}
          </Link>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">What's Next?</h3>
          <p className="text-gray-600 mb-6">
            Continue your professional development by exploring other certification programs
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Explore More Programs
          </Link>
        </div>
      </div>
    </div>
  );
}
