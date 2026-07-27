// Copy this file, rename it, and import the new module in ./index.js.
// This file is intentionally NOT imported, so it does not appear in the application.

export const moduleTemplate = {
  id: 'unique-module-id',
  order: 6,
  estimatedMinutes: 8,

  title: {
    en: 'English module title',
    bg: 'Заглавие на модула на български',
  },

  description: {
    en: 'Short English module description.',
    bg: 'Кратко описание на модула на български.',
  },

  questions: [
    {
      id: 1,
      text: {
        en: 'A question with one correct answer?',
        bg: 'Въпрос с един верен отговор?',
      },
      options: {
        en: ['First answer', 'Second answer', 'Third answer', 'Fourth answer'],
        bg: ['Първи отговор', 'Втори отговор', 'Трети отговор', 'Четвърти отговор'],
      },
      // Zero-based index: 1 means the SECOND answer is correct.
      correct: 1,
      explanation: {
        en: 'Explanation shown after answering.',
        bg: 'Обяснение, което се показва след отговор.',
      },
      wrongAnswerGuidance: {
        en: 'A useful hint shown after an incorrect attempt.',
        bg: 'Полезна насока, която се показва след грешен опит.',
      },
    },
    {
      id: 2,
      text: {
        en: 'A question with multiple correct answers? (Select all that apply)',
        bg: 'Въпрос с няколко верни отговора? (Изберете всички верни)',
      },
      options: {
        en: ['Correct A', 'Correct B', 'Incorrect C', 'Correct D'],
        bg: ['Верен A', 'Верен B', 'Грешен C', 'Верен D'],
      },
      // Zero-based indexes: the FIRST, SECOND, and FOURTH answers are correct.
      correct: [0, 1, 3],
      explanation: {
        en: 'Explanation of the complete correct answer set.',
        bg: 'Обяснение на пълния набор от верни отговори.',
      },
      wrongAnswerGuidance: {
        en: 'The learner must select the exact correct set.',
        bg: 'Участникът трябва да избере точния набор от верни отговори.',
      },
    },
  ],
};
