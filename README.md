# PhysioQ NBME Practice App

Static first-year medical physiology question bank app with NBME-style practice blocks, tutor review, normal values, PDF export, highlighting, and answer strikeout tools.

The question bank panel supports exact ID lookup and keyword/abbreviation search. Term searches return up to 20 matching questions at a time; repeating the same search advances to the next available set of results.

## Online Use

After GitHub Pages is enabled for this repository, the app should be available at:

https://legroj.github.io/PhysioQs/

## Included Question Bank

The static `question-bank.json` file contains 5,200 generated physiology questions. The app loads this file first when hosted online and falls back to the built-in generator if the file is unavailable.

## Question Bank Audit

The June 4, 2026 Independent NBME cleanup keeps `Renal / Body Volume` and improves the full bank structure. Generated stems now use clinical setting, time course, relevant history, examination findings, true but irrelevant distractors, and interpretive physiologic data. Lead-ins ask mechanism-style two-step questions, answer choices are five A-E options sorted alphabetically, and Review/PDF exports include option-by-option explanations for the keyed answer and each distractor. The v7 cleanup changes the browser storage key again, removes shared case-sequence grouping so each item is independent, and fixes the Action Potential axon-diameter item family so myelination and axon-diameter mechanisms are not mixed. Repeated objective-answer variants were removed; projected difficulty values range from 0.80 to 0.95.
