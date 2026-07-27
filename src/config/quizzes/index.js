import { securityEssentials } from './security-essentials.js';
import { phishingAwareness } from './phishing-awareness.js';
import { dataProtection } from './data-protection.js';
import { deviceSecurity } from './device-security.js';
import { incidentResponse } from './incident-response.js';
import { validateQuizCatalog } from './validate.js';

export const quizzes = validateQuizCatalog(
  [securityEssentials, phishingAwareness, dataProtection, deviceSecurity, incidentResponse]
    .sort((a, b) => a.order - b.order),
);

export const quizCount = quizzes.length;
export const totalQuestionCount = quizzes.reduce((total, quiz) => total + quiz.questions.length, 0);
export const getQuizById = (quizId) => quizzes.find((quiz) => quiz.id === quizId);
