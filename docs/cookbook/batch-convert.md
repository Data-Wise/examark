# Batch Convert Multiple Exams

> **TL;DR** Convert all your exam markdown files to QTI packages in one command.

**2 minutes** | Beginner | CLI

---

## Problem

You have multiple exam files and want to convert them all without running examark on each file individually.

## Solution

**Convert all markdown files to QTI, output to a directory:**

```bash
examark *.md -o output/
```

**Export multiple exams as plain text (for printing):**

```bash
examark exams/*.md -f text
```

**Export without answer keys (student copies):**

```bash
examark exams/*.md -f text --no-answers
```

**Convert and validate each file in a loop:**

```bash
for f in exams/*.md; do
  examark "$f" -o "qti/$(basename "$f" .md).qti.zip"
  examark emulate-canvas "qti/$(basename "$f" .md).qti.zip"
done
```

This produces one QTI package per file and runs the Canvas emulator on each.

## Explanation

- The output directory is auto-created if it doesn't exist.
- Each input file becomes a separate QTI package — they are not merged.
- Glob patterns (`*.md`) work on all platforms (macOS, Linux, Windows with bash).
- Use the `-v` flag to auto-validate during conversion: `examark *.md -o output/ -v`.
- The text export (`-f text`) produces readable plain-text versions suitable for printing or emailing.

## See Also

- [Import and Validate](import-validate.md)
- [Validate Before Upload](validate-before-upload.md)
