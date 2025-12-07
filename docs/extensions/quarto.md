# Quarto Exam Extension

Examify includes a powerful Quarto extension that allows you to author exams in Quarto (`.qmd`) and export them to multiple formats, including Examify-ready Markdown, HTML, PDF, and more.

## Installation

### From Repository

To install the extension into your Quarto project:

```bash
quarto add Data-Wise/examify
```

### Local Installation

If you have the `examify` repository cloned locally:

1. Copy the `_extensions` folder from this repository into your Quarto project.
2. Ensure you have the `exam` folder inside `_extensions`.

## Usage

To use the extension, specify the `exam-gfm` format in your document YAML frontmatter. This format produces GitHub Flavored Markdown optimized for Examify conversion.

```yaml
---
title: "Statistics Midterm"
format:
  exam-gfm:
    variant: +tex_math_dollars
---

## 1. Question...
```

### Available Formats

The extension supports several output formats:

| Format | Description |
|--------|-------------|
| `exam-gfm` | **Recommended for Examify.** Generates Markdown for QTI conversion. |
| `exam-html` | Preview the exam as a clean HTML webpage. |
| `exam-pdf` | Printable PDF version for students. |
| `exam-pdf-solutions` | PDF version with solution blocks visible. |
| `exam-docx` | Export to Microsoft Word. |
| `exam-odt` | Export to OpenDocument Text (LibreOffice). |
| `exam-typst` | Modern, fast PDF generation via Typst. |

## Workflow: Quarto to Canvas

1. **Author** your exam in `exam.qmd`.
2. **Render** to Markdown:

   ```bash
   quarto render exam.qmd --to exam-gfm
   ```

3. **Convert** to QTI using Examify:

   ```bash
   examify exam.md -o exam.qti.zip
   ```

4. **Upload** the QTI zip to Canvas.

## Configuration

You can configure extension behavior in your `_quarto.yml` or document header:

```yaml
format:
  exam-gfm:
    exam:
      solutions: false      # Hide solution blocks
      default-points: 1     # Default points per question
      shuffle-answers: true # Shuffle options (where supported)
```

## Solution Blocks

Wrap solutions in a div with the `.solution` class. The extension handles showing/hiding them based on the format.

```markdown
::: {.solution}
**Correct Answer:** The limit approaches infinity because...
:::
```

- In `exam-gfm` / `exam-pdf`: **Hidden**
- In `exam-pdf-solutions`: **Visible**
