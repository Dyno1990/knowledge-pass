import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import CertificatePage from "./pages/CertificatePage";
import TermsPage from "./pages/TermsPage";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";
import RootLayout from "./components/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "quiz/:moduleId", element: <QuizPage /> },
      { path: "certificate/:moduleId", element: <CertificatePage /> },
      { path: "terms", element: <TermsPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contacts", element: <ContactsPage /> },
    ],
  },
]);
