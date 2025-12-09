# YAML Options Reference

Complete reference for Quarto exam YAML front matter options.

---

## Quick Start Template

Copy this YAML block to start a new exam:

```yaml
---
title: "My Exam Title"
format:
  exam-qti: default      # For Canvas/LMS import
  exam-html: default     # For browser preview
  exam-pdf: default      # For printing

exam:
  solutions: false       # Set true for answer key
  default-points: 2      # Default points per question
---
```

---

## Output Formats

### LMS Export (Canvas, Blackboard, Moodle)

```yaml
format:
  exam-qti: default
```

Generates Markdown optimized for `examark` conversion to QTI 1.2.

### HTML Preview

```yaml
format:
  exam-html: default
```

Preview exams in browser with styled formatting.

### PDF (Printable)

=== "Student Version"

    ```yaml
    format:
      exam-pdf: default
    ```

=== "With Solutions"

    ```yaml
    format:
      exam-pdf-solutions: default
    ```

### Word/OpenDocument

=== "DOCX (Microsoft Word)"

    ```yaml
    format:
      exam-docx: default
    ```

=== "ODT (LibreOffice/Google Docs)"

    ```yaml
    format:
      exam-odt: default
    ```

### Multiple Formats

Generate multiple outputs from one source:

```yaml
format:
  exam-qti: default       # Canvas import
  exam-html: default      # Quick preview
  exam-pdf: default       # Print version
  exam-pdf-solutions: default  # Answer key
```

---

## Exam Options

All options go under the `exam:` key:

```yaml
exam:
  solutions: false
  default-points: 2
  grading-table: true
```

### Core Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `solutions` | boolean | `false` | Show correct answers and explanations |
| `default-points` | number | `2` | Default points when not specified in question |
| `grading-table` | boolean | `true` | Show point summary table (PDF/HTML) |
| `include-answers` | boolean | `true` | Include answer markers in output (QTI only) |
| `shuffle-answers` | boolean | `false` | Randomize answer order |

### Font Options (PDF/HTML)

```yaml
exam:
  fonts:
    size: 10pt
    section-size: 1.2em
    question-title-size: 1em
    question-title-weight: 600
```

| Option | Default | Description |
|--------|---------|-------------|
| `size` | `10pt` | Base font size |
| `section-size` | `1.2em` | Section header size |
| `question-title-size` | `1em` | Question title size |
| `question-title-weight` | `600` | Question title weight |

### Answer Space (PDF only)

Control blank space for handwritten answers:

```yaml
exam:
  answer-space:
    short-answer: 2cm
    essay: 5cm
    numeric: 1.5cm
    multiple-choice: 0cm
    true-false: 0cm
```

### Headers and Footers (PDF only)

```yaml
exam:
  header:
    left: "STATS 101"
    center: "Midterm Exam"
    right: "Name: _______"
  footer:
    center: "Page {{page}} of {{pages}}"
```

Available variables: `{{page}}`, `{{pages}}`, `{{course.number}}`

---

## Complete Examples

### Canvas Quiz

```yaml
---
title: "Chapter 5 Quiz"
format:
  exam-qti: default

exam:
  solutions: false
  default-points: 2
---
```

### Printable Midterm

```yaml
---
title: "Statistics 101 - Midterm"
format:
  exam-pdf: default
  exam-pdf-solutions: default

exam:
  solutions: false
  default-points: 2
  grading-table: true
  fonts:
    size: 11pt
  answer-space:
    short-answer: 3cm
    essay: 8cm
  header:
    left: "STATS 101"
    right: "Name: _________________"
  footer:
    center: "Page {{page}} of {{pages}}"
---
```

### Multi-Format Exam

```yaml
---
title: "Final Exam"
format:
  exam-qti: default       # Canvas import
  exam-html: default      # Quick preview
  exam-pdf: default       # Print version
  exam-pdf-solutions: default  # Answer key

exam:
  solutions: false
  default-points: 2
  grading-table: true
---
```

---

## Format-Specific Defaults

Each format has sensible defaults. Override only what you need.

### exam-qti

```yaml
exam-qti:
  variant: gfm+tex_math_dollars  # Preserves LaTeX math
  exam:
    solutions: false
    default-points: 2
    include-answers: true
```

### exam-pdf

```yaml
exam-pdf:
  documentclass: article
  fontsize: 10pt
  geometry: margin=1in
  exam:
    solutions: false
    default-points: 2
    grading-table: true
```

### exam-html

```yaml
exam-html:
  toc: false
  theme: cosmo
  exam:
    solutions: false
    default-points: 2
    grading-table: true
```

---

## See Also

- [Input Formats](../formats.md) - Question syntax reference
- [Quarto Extension](../extensions/quarto.md) - Installation and setup
- [Templates](../starter/index.md) - Ready-to-use examples
