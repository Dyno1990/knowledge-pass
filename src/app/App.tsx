import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { LanguageProvider } from './contexts/LanguageContext';
import RootLayout from './components/RootLayout';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import CertificatePage from './pages/CertificatePage';
import TermsPage from './pages/TermsPage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="quiz/:moduleId" element={<QuizPage />} />
            <Route path="certificate/:moduleId" element={<CertificatePage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contacts" element={<ContactsPage />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}