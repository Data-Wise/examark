# Commands Reference

Complete command reference for Examify CLI.

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `examify <file> -o <out.zip>` | Convert Markdown to QTI |
| `examify <file> -f text` | Export as printable text |
| `examify *.md -o output/` | Batch convert multiple files |
| `examify verify <pkg>` | Validate package structure |
| `examify emulate-canvas <pkg>` | Simulate Canvas import |
| `examify check <file>` | Lint input file |
| `examify <file> --preview` | Preview parsed questions |

---

## examify (convert)

**Usage:**

```bash
examify <input> [options]
examify <pattern> -o <directory>   # Batch mode
```

**What it does:**

- Parses your Markdown file for questions
- Generates QTI 1.2 XML for Canvas Classic Quizzes
- Bundles images with `imsmanifest.xml`
- Creates a `.qti.zip` package (or `.txt` for text export)

**When to use:**

Converting your Markdown quiz files for Canvas import or printable exams.

**Options:**

| Option | Description |
|--------|-------------|
| `-o, --output <path>` | Output file or directory (batch mode) |
| `-f, --format <type>` | Output format: `qti` (default) or `text` |
| `-v, --validate` | Validate output after generating |
| `-p, --points <n>` | Default points per question |
| `-t, --title <title>` | Override quiz title |
| `--preview` | Preview parsed questions, no file created |
| `--no-answers` | Exclude answer key from text export |

**Examples:**

```bash
# Basic conversion to QTI
examify quiz.md

# Custom output path
examify quiz.md -o output/my-quiz.qti.zip

# Export as printable text
examify quiz.md -f text

# Text export without answers
examify quiz.md -f text --no-answers

# Batch convert all markdown files
examify *.md -o output/

# Set default points
examify quiz.md -p 2

# Preview without generating
examify quiz.md --preview
```

---

## Batch Conversion

Convert multiple files at once using glob patterns:

```bash
# Convert all .md files in current directory
examify *.md -o output/

# Convert files from specific folder
examify exams/*.md -o qti-packages/

# Convert specific pattern
examify midterm-*.md -o midterms/
```

**Notes:**

- Output directory is created if it doesn't exist
- Each file is named based on input: `quiz.md` → `quiz.qti.zip`
- Errors in one file don't stop processing of others
- Summary shows success/failure counts

---

## Text Export

Export quizzes as plain text for paper exams:

```bash
examify quiz.md -f text
examify quiz.md -f text -o exam.txt
examify quiz.md -f text --no-answers
```

**Output includes:**

- Quiz title and header
- Name/Date fields for students
- All questions formatted for printing
- Answer key at the end (unless `--no-answers`)

**Example output:**

```text
STATISTICS QUIZ 1
Name: _________________________  Date: _________

1. [2 pts] What is the mean of 2, 4, 6?
   a) Three
   b) Four
   c) Five

2. [1 pt] TRUE or FALSE: Variance can be negative.

---
ANSWER KEY
1. b
2. False
```

---

## verify

**Usage:**

```bash
examify verify <path>
```

**What it does:**

- Validates manifest structure
- Checks all referenced resources exist
- Validates XML syntax
- Reports missing or malformed files

**When to use:**

Checking an existing QTI package before Canvas import.

**Example:**

```bash
examify verify quiz.qti.zip
examify verify ./qti-folder/
```

---

## emulate-canvas

**Usage:**

```bash
examify emulate-canvas <path>
```

**What it does:**

- Simulates Canvas LMS import process
- Validates QTI 1.2 compatibility
- Checks for duplicate IDs
- Predicts import success or failure

**When to use:**

Before uploading to Canvas, especially for complex quizzes.

**Example:**

```bash
examify emulate-canvas quiz.qti.zip
```

**Output includes:**

- Item count and structure analysis
- Canvas-specific validation checks
- Success/failure prediction
- Actionable fix suggestions

---

## check (lint)

**Usage:**

```bash
examify check <input>
# or
examify lint <input>
```

**What it does:**

- Validates Markdown syntax
- Checks question formatting
- Reports missing answer markers
- Identifies structural issues

**When to use:**

Before conversion to catch input errors early.

**Example:**

```bash
examify check quiz.md
```

---

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Success |
| `1` | Error (validation failed, file not found, etc.) |
