---
name: convert
description: Convert markdown exam to Canvas QTI package (auto-detects .qmd files)
argument-hint: <file> [--strict] [--format text] [--no-answers]
---

# /exam:convert — Convert Exam to QTI

Convert a markdown exam file to a Canvas-importable QTI 1.2 package. Automatically detects Quarto `.qmd` files and renders them first.

## Usage

```
/exam:convert <file>                  # Convert .md to .qti.zip
/exam:convert <file.qmd>             # Render Quarto first, then convert
/exam:convert <file> --strict         # Strict validation (New Quizzes)
/exam:convert <file> --format text    # Export as plain text instead
/exam:convert <file> --no-answers     # Exclude answer key (text only)
/exam:convert *.md                    # Batch convert all .md files
```

## When Invoked

Follow these steps in order:

### Step 1: Detect File Type

Examine the input file extension:
- `.qmd` → Quarto source, needs rendering first (go to Step 2a)
- `.md` → Markdown, ready for conversion (go to Step 2b)
- `.qti.zip` → Already a package, suggest `/exam:check` instead
- Other → Error: "Unsupported file type. Expected .md or .qmd"

### Step 2a: Render Quarto (if .qmd)

Run Quarto render to produce GFM markdown:

```bash
quarto render <file> --to exam-gfm
```

Look for the rendered `.md` file in `_output/` or the project root. If the post-render hook already created a `.qti.zip`, report success and skip to Step 4.

If `quarto` is not installed, tell the user:
```
Quarto is required for .qmd files. Install from: https://quarto.org/docs/get-started/
Alternatively, render manually and run: /exam:convert <rendered-file>.md
```

### Step 2b: Determine examark path

Check for the examark CLI in this order:
1. Local build: `node dist/index.js` (if `dist/index.js` exists in project root)
2. Global install: `examark` (if available on PATH)
3. npx fallback: `npx examark`

If none found, tell the user: `Install examark: npm install -g examark`

### Step 3: Convert to QTI

Run the conversion with validation:

```bash
<examark> <input.md> -o <input>.qti.zip -v
```

If `--strict` was requested, add the flag to the verify step:
```bash
<examark> verify <input>.qti.zip --strict
```

If `--format text` was requested:
```bash
<examark> <input.md> -f text -o <input>.txt
```

If `--no-answers` was requested (text format only):
```bash
<examark> <input.md> -f text --no-answers -o <input>.txt
```

### Step 4: Report Results

After successful conversion, run `examark <input.md> --preview` to get the question breakdown, then display:

```
Converted: <input.md> → <output.qti.zip>

| #  | Type   | Points | Stem (preview)              |
|----|--------|--------|-----------------------------|
| 1  | MC     | 2      | What is the mean of...      |
| 2  | TF     | 1      | The p-value is always...    |
| 3  | Essay  | 10     | Explain the difference...   |
──────────────────────────────────────────────────────
Total: N questions, M points

Validation: PASS (or list issues)

Ready to upload to Canvas:
  Course Settings → Import Course Content → QTI .zip file
```

### Error Handling

- If conversion fails, show the full error output
- If validation finds warnings, show them but report success
- If validation finds errors, show them and suggest `/exam:check <file>` for details
- If batch mode (`*.md`), process each file and show a summary table at the end
