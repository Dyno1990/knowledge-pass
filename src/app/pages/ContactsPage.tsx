import { Mail, Send } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";

export default function ContactsPage() {
  const { t, language } = useTranslation();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">{t("contactTitle")}</h1>
          </div>

          <p className="text-gray-700 text-lg mb-8">
            {t("contactIntro")}
          </p>

          <div className="max-w-md mx-auto mb-12">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("email")}</h3>
              <a
                href="mailto:wtsbdigitalmodules@gmail.com"
                className="text-gray-700 hover:text-blue-600 transition-colors break-all"
              >
                wtsbdigitalmodules@gmail.com
              </a>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("sendMessage")}</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("yourName")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("emailAddress")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("subject")}
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={language === "pl" ? "Pytanie dotyczące programu edukacyjnego" : language === "bg" ? "Запитване относно сертификационна програма" : "Inquiry about certification program"}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("message")}
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t("messagePlaceholder")}
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {t("sendButton")}
              </button>
            </form>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("faq")}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t("faq1Q")}
                </h3>
                <p className="text-gray-700">
                  {t("faq1A")}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t("faq2Q")}
                </h3>
                <p className="text-gray-700">
                  {t("faq2A")}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{t("faq3Q")}</h3>
                <p className="text-gray-700">
                  {t("faq3A")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
