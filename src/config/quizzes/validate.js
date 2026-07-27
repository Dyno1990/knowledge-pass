const languages = ['en', 'bg'];

const assertLocalizedText = (value, path) => {
  if (!value || typeof value !== 'object') throw new Error(`${path} must contain en and bg translations.`);
  languages.forEach((language) => {
    if (typeof value[language] !== 'string' || !value[language].trim()) throw new Error(`${path}.${language} must be a non-empty string.`);
  });
};

export function validateQuizCatalog(quizzes) {
  if (!Array.isArray(quizzes) || quizzes.length === 0) throw new Error('At least one quiz module must be configured.');
  const moduleIds = new Set();

  quizzes.forEach((quiz, moduleIndex) => {
    const modulePath = `quizzes[${moduleIndex}]`;
    if (!quiz.id || typeof quiz.id !== 'string') throw new Error(`${modulePath}.id must be a non-empty string.`);
    if (moduleIds.has(quiz.id)) throw new Error(`Duplicate quiz id: ${quiz.id}.`);
    moduleIds.add(quiz.id);
    assertLocalizedText(quiz.title, `${modulePath}.title`);
    assertLocalizedText(quiz.description, `${modulePath}.description`);
    if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) throw new Error(`${modulePath}.questions must contain at least one question.`);

    const questionIds = new Set();
    quiz.questions.forEach((question, questionIndex) => {
      const questionPath = `${modulePath}.questions[${questionIndex}]`;
      if (question.id === undefined || question.id === null) throw new Error(`${questionPath}.id is required.`);
      if (questionIds.has(question.id)) throw new Error(`Duplicate question id ${question.id} in module ${quiz.id}.`);
      questionIds.add(question.id);
      assertLocalizedText(question.text, `${questionPath}.text`);
      assertLocalizedText(question.explanation, `${questionPath}.explanation`);

      if (!question.options || typeof question.options !== 'object') throw new Error(`${questionPath}.options must contain en and bg arrays.`);
      languages.forEach((language) => {
        if (!Array.isArray(question.options[language]) || question.options[language].length < 2) throw new Error(`${questionPath}.options.${language} must contain at least two answers.`);
        if (question.options[language].some((answer) => typeof answer !== 'string' || !answer.trim())) throw new Error(`${questionPath}.options.${language} contains an empty answer.`);
      });
      if (question.options.en.length !== question.options.bg.length) throw new Error(`${questionPath} must have the same number of English and Bulgarian answers.`);

      const correctIndexes = Array.isArray(question.correct) ? question.correct : [question.correct];
      if (correctIndexes.length === 0 || correctIndexes.some((index) => !Number.isInteger(index))) throw new Error(`${questionPath}.correct must be an index or a non-empty array of indexes.`);
      if (new Set(correctIndexes).size !== correctIndexes.length) throw new Error(`${questionPath}.correct contains duplicate indexes.`);
      if (correctIndexes.some((index) => index < 0 || index >= question.options.en.length)) throw new Error(`${questionPath}.correct contains an index outside the answer list.`);
    });
  });

  return quizzes;
}
