# Quarto Extension Setup

> **TL;DR** Install the Quarto extension and create your first dynamic statistics exam in 10 minutes.

**10 minutes** | Beginner | Quarto

---

## Problem

You want to create exams with R/Python code chunks for computed values and auto-generated plots, but need to set up the Quarto-to-Canvas pipeline first.

## Solution

### Why Use Quarto?

| Feature | Benefit |
|---------|---------|
| **Dynamic Content** | Generate random numbers for unique question variants |
| **Reproducibility** | Version control your exam source code |
| **Embedded Plots** | Auto-generate and embed R/Python plots |
| **Multi-Format** | One source → PDF, HTML, Canvas QTI |

### Prerequisites

- [Quarto](https://quarto.org) installed (≥ 1.4.0)
- [R](https://r-project.org) installed (for dynamic questions)
- [Examark](../getting-started.md) installed globally

### Step 1: Install the Extension

```bash
quarto add Data-Wise/examark
```

This creates `_extensions/exam/` in your project with the Lua filters and styling.

### Step 2: Create Your First Exam

Create a file called `midterm.qmd`:

```yaml
---
title: "Statistics Midterm"
format: exam-gfm

exam:
  qti: true
  solutions: false
  default-points: 2
---

# Section: Descriptive Statistics

## 1. Mean Calculation [2 pts]

What is the mean of: 10, 20, 30, 40, 50?

a) 25
b) **30** [correct]
c) 35
d) 40

## 2. [TF] The median is resistant to outliers. → True
```

### Step 3: Render to Markdown

```bash
quarto render midterm.qmd
```

This creates `midterm.md` with properly formatted questions for Examark.

!!! tip "QTI Export Instructions"
    With `exam.qti: true`, the render output shows the exact examark command to run.

### Step 4: Convert to Canvas QTI

```bash
examark midterm.md -o midterm.qti.zip
```

### Step 5: Upload to Canvas

1. Go to your Canvas course
2. Navigate to **Settings → Import Course Content**
3. Select **QTI .zip file**
4. Upload `midterm.qti.zip`
5. Select import options and click **Import**

Your questions will appear in **Quizzes → Question Banks**.

## Explanation

- The `exam-gfm` format renders your `.qmd` to GitHub-Flavored Markdown, which is the input format Examark expects. Other formats like `exam-html` and `exam-pdf` are available for previewing and printing.
- Setting `exam.qti: true` tells the Quarto filter to output the exact `examark` command you need to run after rendering.
- Setting `solutions: false` hides answer keys in the rendered output — this is the safe default for student-facing versions.
- The extension uses a Pandoc Lua filter (`exam-filter.lua`) to process exam-specific YAML options and format the output correctly.
- R/Python code chunks execute during `quarto render`, so all computed values and plots are baked into the final Markdown before Examark ever sees them.

## See Also

- [Quarto Daily Workflow](quarto-workflow.md) — R code chunks, plots, multiple versions, best practices
- [Import & Validate](import-validate.md) — Verify your QTI package before uploading
- [Your First Quiz](first-quiz.md) — Plain Markdown approach (no Quarto)
- [Quarto Extension Reference](../extensions/quarto.md) — Full configuration options
