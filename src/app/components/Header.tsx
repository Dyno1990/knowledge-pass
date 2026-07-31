import { Menu, X, Home, Award, FileText, Info, Mail, Globe } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { localize, modules } from "../data/modules";
import { useLanguage, Language } from "../contexts/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();
  const modulesRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  const isActive = (path: string) => location.pathname === path;

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'bg', name: 'Български', flag: '🇧🇬' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modulesRef.current && !modulesRef.current.contains(event.target as Node)) {
        setIsModulesOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsModulesOpen(false);
    setIsLangOpen(false);
  }, [location]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Award className="w-8 h-8 text-blue-600" />
            <span className="font-bold text-xl text-gray-900 hidden sm:inline">{t('platformName')}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                isActive("/") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Home className="w-4 h-4" />
              {t('home')}
            </Link>

            <div className="relative" ref={modulesRef}>
              <button
                onClick={() => setIsModulesOpen(!isModulesOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Award className="w-4 h-4" />
                {t('modules')}
              </button>
              {isModulesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {modules.map((module) => (
                    <Link
                      key={module.id}
                      to={`/quiz/${module.id}`}
                      onClick={() => setIsModulesOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {localize(module.title, language)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/terms"
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                isActive("/terms") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FileText className="w-4 h-4" />
              {t('terms')}
            </Link>

            <Link
              to="/about"
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                isActive("/about") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Info className="w-4 h-4" />
              {t('about')}
            </Link>

            <Link
              to="/contacts"
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                isActive("/contacts") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Mail className="w-4 h-4" />
              {t('contacts')}
            </Link>

            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-lg">{languages.find(l => l.code === language)?.flag}</span>
              </button>
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center gap-3 ${
                        language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                  isActive("/") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Home className="w-4 h-4" />
                {t('home')}
              </Link>

              <div className="px-3 py-2 text-sm font-medium text-gray-500">{t('modules')}</div>
              {modules.map((module) => (
                <Link
                  key={module.id}
                  to={`/quiz/${module.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="pl-6 pr-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {localize(module.title, language)}
                </Link>
              ))}

              <Link
                to="/terms"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                  isActive("/terms") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FileText className="w-4 h-4" />
                {t('terms')}
              </Link>

              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                  isActive("/about") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Info className="w-4 h-4" />
                {t('about')}
              </Link>

              <Link
                to="/contacts"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                  isActive("/contacts") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Mail className="w-4 h-4" />
                {t('contacts')}
              </Link>

              <div className="border-t border-gray-200 mt-2 pt-2">
                <div className="px-3 py-2 text-sm font-medium text-gray-500 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  {t('language' as any) || 'Language'}
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left pl-6 pr-3 py-2 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-3 ${
                      language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
