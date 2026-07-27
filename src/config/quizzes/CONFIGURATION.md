# Quiz module configuration

Each active questionnaire has its own JavaScript file in this directory. The active files are imported by `index.js`; the number of imported modules becomes the module count shown by the frontend and returned by the API.

## Correct answers

Answer positions are zero-based:

```text
0 = first answer
1 = second answer
2 = third answer
3 = fourth answer
```

For one correct answer:

```js
correct: 1
```

This marks the second answer as correct.

For multiple correct answers:

```js
correct: [0, 1, 3]
```

This marks the first, second, and fourth answers as correct. The learner must select the exact set.

## Adding a question

Copy one of the question objects in the relevant module file, give it a unique `id`, and edit both language versions. Question totals and progress are calculated automatically.

## Adding a module

1. Copy `module-template.js` to a new filename.
2. Rename the exported variable and fill in the content.
3. Import it in `index.js`.
4. Add it to the `quizzes` array in `index.js`.

The catalog validator runs immediately when the configuration is imported and reports malformed content with the exact module/question path.
