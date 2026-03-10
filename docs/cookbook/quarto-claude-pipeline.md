# Quarto + Claude Pipeline

> **TL;DR** Use Claude Code to author Quarto exams with R code chunks, then convert to QTI in one workflow.

**15 minutes** | Intermediate | Quarto / Claude Code

---

## Problem

You want to create a dynamic exam with R-computed values and auto-generated plots, but writing the R code chunks and examark syntax together is complex.

## Solution

### 1. Set up Quarto

If you haven't already, ask Claude to set up the project:

```
Set up a Quarto exam project with the examark extension
```

Claude runs `quarto add Data-Wise/examark` and creates the `_quarto.yml` configuration.

### 2. Describe the exam with R requirements

Be specific about what R should compute:

```
Create a statistics midterm in Quarto (.qmd) with:
- R setup chunk with set.seed(42)
- 3 MC questions where distractors are computed from the data
- 1 question with an R-generated histogram
- Use exam-gfm format with solutions hidden
```

### 3. Claude generates the `.qmd`

Claude produces a file with proper YAML frontmatter, R code chunks, and examark syntax. For example:

````markdown
---
title: "Midterm Exam"
format: exam-gfm
exam:
  qti: true
  solutions: false
---

```{r}
#| echo: false
set.seed(42)
x <- rnorm(30, mean = 100, sd = 15)
sample_mean <- round(mean(x), 2)
```

1. [MC] The sample mean is `r sample_mean`. What is the
   correct interpretation? [2pts]
a) The population mean is `r sample_mean`
b) The average of the 30 observations is `r sample_mean` [x]
c) Half the values are above `r sample_mean`
d) The median equals `r sample_mean`
````

### 4. Render and convert

Ask Claude to handle the full pipeline:

```
Render this exam and convert to QTI
```

Claude runs:

```bash
quarto render midterm.qmd --to exam-gfm
examark midterm.md -o midterm.qti.zip
examark emulate-canvas midterm.qti.zip
```

### 5. Generate multiple versions

Ask Claude to create a build script for exam versions with different seeds:

```
Create a script that generates 3 exam versions with seeds 100, 200, 300
```

Claude can create a shell script that renders each version with a different `set.seed()` value, producing separate QTI packages for each.

## Explanation

- Claude's plugin skills include Quarto-specific patterns: code chunks, figure captions, solution divs, and `exam-gfm` format options.
- The `exam-gfm` format defaults to `qti: true` and `solutions: false` -- these are the right defaults for producing QTI packages.
- R-generated plots are automatically bundled in the QTI package. Canvas renders them as inline images.
- Use `[x]` or `[correct]` markers (not `**bold**`) with R inline code for reliability -- bold markers can conflict with R output formatting.
- Wrap `= answer` lines in `{=markdown}` raw blocks in `.qmd` files so Pandoc preserves them.
- LaTeX math in R output (`$\bar{x}$`) converts correctly to Canvas format (`\(\bar{x}\)`).

!!! note "Quarto rendering"
    The `quarto render` step executes all R code chunks. Make sure R and any
    required packages are installed before rendering. Claude can help you
    add a package installation chunk if needed.

## See Also

- [Generate an Exam with Claude](generate-exam-claude.md) — plain markdown exams without R
- [Claude Code Plugin](../extensions/claude-plugin.md) — Quarto + Claude workflow details
- [Quarto Setup](quarto-setup.md) — initial Quarto extension installation
- [Quarto Workflow](quarto-workflow.md) — rendering and converting `.qmd` exams
- [Randomized Values](randomized-values.md) — using R for randomized exam content
