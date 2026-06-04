# PhysioQ NBME Practice App

Static first-year medical physiology question bank app with NBME-style practice blocks, tutor review, normal values, PDF export, highlighting, and answer strikeout tools.

The question bank panel supports exact ID lookup and keyword/abbreviation search. Term searches return up to 20 matching questions at a time; repeating the same search advances to the next available set of results.

## Online Use

After GitHub Pages is enabled for this repository, the app should be available at:

https://legroj.github.io/PhysioQs/

## Included Question Bank

The static `question-bank.json` file contains 5,200 generated physiology questions. The app loads this file first when hosted online and falls back to the built-in generator if the file is unavailable.

## Question Bank Audit

The June 4, 2026 stem cleanup keeps `Renal / Body Volume` and removes generic explanatory comments from stems and Review explanations. Body-volume items now present clinical events plus sodium, osmolality, hematocrit, and plasma protein data so the compartment change must be inferred rather than stated in the question. Repeated stems and repeated objective-answer variants were removed; projected difficulty values range from 0.80 to 0.95.
