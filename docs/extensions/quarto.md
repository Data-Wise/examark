# Quarto Exam Extension

Examify includes a powerful Quarto extension that allows you to author exams in Quarto (`.qmd`) and export them to multiple formats, including Examify-ready Markdown, HTML, PDF, and more.

## Installation

### Method 1: GitHub Installation (Recommended)

Install directly from the GitHub repository:

```bash
quarto add Data-Wise/examify
```

This will:

1. Download the extension from GitHub
2. Create `_extensions/exam/` in your project
3. Prompt you to trust the extension

!!! tip "Install a Specific Version"
    Pin to a release tag for reproducible builds:
    ```bash
    quarto add Data-Wise/examify@v0.4.2
    ```

### Method 2: Project-Wide Installation

For organization-wide extensions, install at the project root:

```bash
cd ~/my-quarto-project
quarto add Data-Wise/examify
```

All `.qmd` files in the project will have access to the extension.

### Method 3: Local/Development Installation

If you have the repository cloned locally:

```bash
# Clone the repo
git clone https://github.com/Data-Wise/examify.git

# Copy the extension to your project
cp -r examify/_extensions/exam your-project/_extensions/
```

### Verify Installation

Check that the extension is installed:

```bash
ls _extensions/exam/
```

You should see:

```text
_extension.yml  exam-filter.lua  exam.scss  qti-post-render.js
```

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

   **Or Enable Auto-Generation:**

   Add `qti-export: true` to your YAML to bundle automatically on render.

   ```yaml
   format:
     exam-gfm:
       qti-export: true
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
