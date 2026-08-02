import { Link } from "react-router";
import { localize, modules } from "../data/modules";
import * as Icons from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Dumbbell: Icons.Dumbbell,
  Whistle: Icons.ClipboardCheck,
  ClipboardCheck: Icons.ClipboardCheck,
  Flag: Icons.Flag,
  Heart: Icons.Heart,
  Briefcase: Icons.Briefcase,
  BarChart3: Icons.BarChart3,
};

export default function HomePage() {
  const { language, t } = useTranslation();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            {t('homeTitle')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('homeSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {modules.map((module) => {
            const Icon = iconMap[module.icon] ?? Icons.Award;
            return (
              <Link
                key={module.id}
                to={`/quiz/${module.id}`}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                style={{ backgroundColor: "#ffffff" }}
              >
                <div
                  className="h-32 flex items-center justify-center"
                  style={{ backgroundColor: module.color, color: "#ffffff" }}
                >
                  <Icon className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{localize(module.title, language)}</h3>
                  <p className="text-gray-600 mb-4">{localize(module.description, language)}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {module.questions.length} {t('questions')}
                    </span>
                    <span className="text-blue-600 group-hover:text-blue-700 font-semibold">
                      {t('startQuiz')} →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">{t('howItWorks')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('step1Title')}</h3>
              <p className="text-gray-600">
                {t('step1Desc')}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('step2Title')}</h3>
              <p className="text-gray-600">
                {t('step2Desc')}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('step3Title')}</h3>
              <p className="text-gray-600">
                {t('step3Desc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
