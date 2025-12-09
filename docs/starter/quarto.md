# Quarto Templates

For R and Python users who want dynamic, randomized questions.

!!! tip "Install the extension first"
    ```bash
    quarto add Data-Wise/examark
    ```

---

## Minimal Quarto

**Best for:** Quick start with Quarto

The simplest Quarto exam structure.

```yaml
---
title: "Quick Quiz"
format: exam-gfm

exam:
  qti: true
  solutions: false
  default-points: 2
---
```

```bash
curl -O https://raw.githubusercontent.com/Data-Wise/examark/main/templates/quarto/minimal.qmd
quarto render minimal.qmd
examark minimal.md -o quiz.qti.zip
```

[:material-download: Download minimal.qmd](https://github.com/Data-Wise/examark/raw/main/templates/quarto/minimal.qmd){ .md-button }

---

## Starter Template

**Best for:** Real exams with all question types

Complete template with examples of every question type.

```bash
curl -O https://raw.githubusercontent.com/Data-Wise/examark/main/templates/quarto/starter.qmd
quarto render starter.qmd
```

[:material-download: Download starter.qmd](https://github.com/Data-Wise/examark/raw/main/templates/quarto/starter.qmd){ .md-button }

---

## Dynamic Questions

**Best for:** Randomized practice problems

Template showing how to generate unique question variants using R.

```bash
curl -O https://raw.githubusercontent.com/Data-Wise/examark/main/templates/quarto/dynamic.qmd
quarto render dynamic.qmd
```

[:material-download: Download dynamic.qmd](https://github.com/Data-Wise/examark/raw/main/templates/quarto/dynamic.qmd){ .md-button }

---

## With Figures

**Best for:** Data visualization questions

Template with R-generated plots embedded in questions.

```bash
curl -O https://raw.githubusercontent.com/Data-Wise/examark/main/templates/quarto/with-figures.qmd
quarto render with-figures.qmd
```

[:material-download: Download with-figures.qmd](https://github.com/Data-Wise/examark/raw/main/templates/quarto/with-figures.qmd){ .md-button }

---

## Template Comparison

| Template | Dynamic | Figures | Best For |
|----------|---------|---------|----------|
| Minimal | No | No | Quick start |
| Starter | No | No | Real exams |
| Dynamic | Yes | No | Randomized problems |
| With Figures | Yes | Yes | Data visualization |

---

## Example Files

Looking for more examples? Check out the [examples/quarto/](https://github.com/Data-Wise/examark/tree/main/examples/quarto) folder:

| Example | Description |
|---------|-------------|
| `statistics-exam.qmd` | Real statistics exam with LaTeX math |
| `canvas-export.qmd` | Canvas-focused with all question types |
| `python-figures.qmd` | Python-generated plots |

---

## Workflow

```mermaid
graph LR
    A[exam.qmd] -->|quarto render| B[exam.md]
    B -->|examark| C[exam.qti.zip]
    C -->|import| D[Canvas LMS]
```

1. **Write** your exam in `.qmd` format with `format: exam-gfm`
2. **Render** with `quarto render exam.qmd`
3. **Convert** with `examark exam.md -o exam.qti.zip`
4. **Import** the `.qti.zip` into Canvas
