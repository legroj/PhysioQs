# PhysioQ NBME Practice App

Static first-year medical physiology question bank app with NBME-style practice blocks, tutor review, normal values, PDF export, highlighting, and answer strikeout tools.

The question bank panel supports exact ID lookup and keyword/abbreviation search. Term searches return up to 20 matching questions at a time; repeating the same search advances to the next available set of results.

## Online Use

After GitHub Pages is enabled for this repository, the app should be available at:

https://legroj.github.io/PhysioQs/

## Included Question Bank

The static `question-bank.json` file contains 5,200 generated physiology questions. The app loads this file first when hosted online and falls back to the built-in generator if the file is unavailable.

## Question Bank Audit

The June 3, 2026 body-volume update adds `Renal / Body Volume` with 100 NBME-style items covering isotonic, hypertonic, and hypotonic contraction/expansion; mannitol; burns; acute hemorrhage; and isotonic resuscitation. Each item links ECF/ICF volume, osmolality, hematocrit, and plasma protein concentration. Repeated stems and repeated objective-answer variants were removed; projected difficulty values range from 0.80 to 0.95.
