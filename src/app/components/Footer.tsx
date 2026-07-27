import { Award, FileText, Info, Mail, Home } from "lucide-react";
import { Link } from "react-router";
import { useTranslation } from "../hooks/useTranslation";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-blue-400" />
              <span className="font-bold text-lg text-white">{t('platformName')}</span>
            </div>
            <p className="text-sm text-gray-400">
              {t('footerTagline')}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="flex items-center gap-2 text-sm hover:text-blue-400 transition-colors">
                  <Home className="w-4 h-4" />
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center gap-2 text-sm hover:text-blue-400 transition-colors">
                  <Info className="w-4 h-4" />
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="flex items-center gap-2 text-sm hover:text-blue-400 transition-colors">
                  <FileText className="w-4 h-4" />
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="flex items-center gap-2 text-sm hover:text-blue-400 transition-colors">
                  <Mail className="w-4 h-4" />
                  {t('contacts')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t('certificationPrograms')}</h3>
            <ul className="space-y-2 text-sm">
              <li>{t('sportsCoach')}</li>
              <li>{t('sportsReferee')}</li>
              <li>{t('athleticTrainer')}</li>
              <li>{t('sportsManager')}</li>
              <li>{t('sportsAnalyst')}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {t('platformName')}. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}
