---
name: check
description: Validate exam markdown or QTI package (auto-detects file type)
argument-hint: <file> [--strict]
---

# /exam:check — Smart Exam Validation

Validate an exam file by auto-detecting its type: lint markdown source for authoring errors, or verify a QTI package for Canvas import readiness.

## Usage

```
/exam:check <file.md>                # Lint markdown for errors
/exam:check <file.qti.zip>           # Verify QTI + emulate Canvas import
/exam:check <file.qti.zip> --strict  # Strict mode for Canvas New Quizzes
```

## When Invoked

Follow these steps in order:

### Step 1: Detect File Type

Examine the input file extension:
- `.md` → Markdown source, run pre-conversion lint (go to Step 2a)
- `.qti.zip` → QTI package, run post-conversion validation (go to Step 2b)
- `.qmd` → Quarto source, tell user: "This is a Quarto file. Render it first with `quarto render <file> --to exam-gfm`, then check the resulting `.md` or `.qti.zip`."
- Other → Error: "Unsupported file type. Expected .md or .qti.zip"

### Step 2a: Lint Markdown Source

#### Determine examark path

Check for the examark CLI in this order:
1. Local build: `node dist/index.js` (if `dist/index.js` exists in project root)
2. Global install: `examark` (if available on PATH)
3. npx fallback: `npx examark`

If none found, tell the user: `Install examark: npm install -g examark`

#### Run the linter

```bash
<examark> check <file.md>
```

#### Interpret results

Parse the output and report issues grouped by severity:

**Errors** (will prevent Canvas import):
- No questions found
- Missing correct answer markers
- Invalid question type
- Empty question stems

**Warnings** (may cause unexpected behavior):
- Multiple correct answers on single-choice question
- Missing points specification (defaults will apply)
- Duplicate question IDs

#### Suggest common fixes

For each error found, provide actionable guidance:

| Error | Fix |
|-------|-----|
| No correct answer marked | Add `[x]` after the correct option: `b) Answer [x]` |
| Unknown type marker | Use a supported marker: `[MC]`, `[TF]`, `[MA]`, `[Essay]`, `[Short]`, `[Num]`, `[Match]`, `[FMB]` |
| No questions found | Ensure questions use `## 1.` or `1. [Type]` format |
| Empty stem | Add question text between the header and the answer options |
| Multiple correct (MC) | Use `[MA]` type for multiple-answer questions, or remove extra `[x]` markers |

Go to Step 3.

### Step 2b: Verify QTI Package

#### Determine examark path

Same detection order as Step 2a.

#### Run verification

```bash
<examark> verify <file.qti.zip>
```

If `--strict` was requested:
```bash
<examark> verify <file.qti.zip> --strict
```

#### Run Canvas emulation

```bash
<examark> emulate-canvas <file.qti.zip>
```

If `--strict` was requested:
```bash
<examark> emulate-canvas <file.qti.zip> --strict
```

#### Interpret results

Parse both outputs and combine into a unified report. The emulator predicts how Canvas will handle the import and catches issues that structural validation alone misses.

Go to Step 3.

### Step 3: Report Results

Display a structured validation report:

**For markdown files (.md):**

```
Checked: <file.md>

Errors (N):
  Line 12: No correct answer marked for question 3
    Fix: Add [x] after the correct option, e.g., b) Answer [x]

  Line 25: Unknown type marker [Multiple]
    Fix: Use [MC] for multiple choice or [MA] for multiple answers

Warnings (M):
  Line 8: Multiple correct answers on MC question 2
    Fix: Change type to [MA] if multiple answers intended

Summary: N errors, M warnings
```

If no issues found:
```
Checked: <file.md>

All clear — 0 errors, 0 warnings.
N questions detected, ready for conversion.

Next: /exam:convert <file.md>
```

**For QTI packages (.qti.zip):**

```
Verified: <file.qti.zip>

Structure:  PASS — valid QTI 1.2 package
Manifest:   PASS — all referenced files present
Questions:  N items validated
Canvas:     PASS — import simulation successful

Quarto features detected:
  Inline code: 12 instances
  LaTeX math:  59 instances

Ready to upload to Canvas:
  Course Settings → Import Course Content → QTI .zip file
```

If issues found:
```
Verified: <file.qti.zip>

Structure:  PASS
Manifest:   PASS
Questions:  FAIL — 2 issues found

Errors:
  Q3: Missing correct answer in resprocessing
  Q7: Unsupported interaction type for New Quizzes

Recommendation: Fix the source markdown and reconvert.
  /exam:convert <source.md> --strict
```

### Error Handling

- If examark is not found, provide installation instructions
- If the file does not exist, report the error and check for similar filenames in the directory
- If the package is corrupted or not a valid zip, report clearly
- Always show the raw examark output if parsing fails, so the user can interpret it directly
