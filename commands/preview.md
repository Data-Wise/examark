---
name: preview
description: Show formatted question summary table from exam markdown
argument-hint: <file>
---

# /exam:preview — Formatted Question Summary

Display a readable summary table of all questions in an exam file, including type, points, and truncated stems. Useful for quick review before converting or uploading.

## Usage

```
/exam:preview <file.md>              # Show question summary table
/exam:preview <file.qmd>             # Auto-render Quarto, then preview
```

## When Invoked

Follow these steps in order:

### Step 1: Detect File Type

Examine the input file extension:
- `.md` → Markdown, ready for preview (go to Step 2)
- `.qmd` → Quarto source, needs rendering first (go to Step 1a)
- `.qti.zip` → Already packaged, suggest: "This is a QTI package. Use `/exam:check <file>` to validate it, or provide the source `.md` file for a preview."
- Other → Error: "Unsupported file type. Expected .md or .qmd"

### Step 1a: Render Quarto (if .qmd)

Check if a rendered `.md` version already exists (same name with `.md` extension, in `_output/` or project root). If found and newer than the `.qmd`, use it directly.

Otherwise, render:
```bash
quarto render <file> --to exam-gfm
```

Look for the rendered `.md` file in `_output/` or the project root.

If `quarto` is not installed, tell the user:
```
Quarto is required for .qmd files. Install from: https://quarto.org/docs/get-started/
Alternatively, render manually and provide the .md file: /exam:preview <rendered-file>.md
```

### Step 2: Determine examark path

Check for the examark CLI in this order:
1. Local build: `node dist/index.js` (if `dist/index.js` exists in project root)
2. Global install: `examark` (if available on PATH)
3. npx fallback: `npx examark`

If none found, tell the user: `Install examark: npm install -g examark`

### Step 3: Run Preview

```bash
<examark> <file.md> --preview
```

This outputs a JSON representation of the parsed exam. Parse the JSON output to extract question details.

### Step 4: Format and Display

Build a summary table from the parsed JSON. Truncate question stems to approximately 50 characters, appending `...` if truncated. Strip any markdown formatting or HTML tags from stems for readability.

**Standard output (no sections):**

```
Preview: <file.md>
Title: "Midterm Exam 1"

| #  | Type    | Pts | Stem                                              |
|----|---------|-----|----------------------------------------------------|
| 1  | MC      | 2   | What is the mean of the following data...          |
| 2  | TF      | 1   | The p-value is always between 0 and 1             |
| 3  | MA      | 3   | Select all assumptions of linear regr...           |
| 4  | Essay   | 10  | Explain the difference between Type I...           |
| 5  | Short   | 2   | What analysis examines one factor at...            |
| 6  | Match   | 4   | Match the statistic to its formula                |
| 7  | Num     | 2   | Calculate the standard deviation of...             |
| 8  | FMB     | 2   | The correlation r ranges from ___ to...            |
-------------------------------------------------------------
Total: 8 questions, 26 points
```

**Output with sections:**

```
Preview: <file.md>
Title: "Final Exam"

Section: Multiple Choice
| #  | Type | Pts | Stem                                               |
|----|------|-----|----------------------------------------------------|
| 1  | MC   | 2   | What is the mean of the following data...          |
| 2  | MC   | 2   | Which measure of central tendency is...            |
| 3  | MC   | 2   | A Type I error occurs when...                      |

Section: Short Answer
| #  | Type  | Pts | Stem                                              |
|----|-------|-----|----------------------------------------------------|
| 4  | Short | 3   | Define statistical significance in...              |
| 5  | Short | 3   | What analysis examines one factor at...            |

Section: Essay
| #  | Type  | Pts | Stem                                              |
|----|-------|-----|----------------------------------------------------|
| 6  | Essay | 10  | Compare and contrast parametric and...             |

-------------------------------------------------------------
Summary:
  Sections:  3
  Questions: 6
  Points:    22

  By type:
    MC:    3 questions (6 pts)
    Short: 2 questions (6 pts)
    Essay: 1 question  (10 pts)
```

### Step 5: Suggest Next Steps

After displaying the table:

- If everything looks good: "Ready to convert? Use `/exam:convert <file>`"
- If questions have no points assigned: "Note: N questions have no points specified. Default points will apply during conversion."
- If question count seems low: "Only N questions detected. If you expected more, check that all questions use the `## N.` or `N. [Type]` format."

### Error Handling

- If `--preview` outputs invalid JSON, show the raw output and suggest running `/exam:check <file>` to diagnose issues
- If no questions are found, report this clearly and suggest checking the file format
- If the file does not exist, report the error and check for similar filenames in the directory
- If Quarto render fails, show the error and suggest fixing the `.qmd` source
