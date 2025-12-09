# Markdown Templates

No Quarto or R required. Just edit and convert with the examark CLI.

---

## Minimal Template

**Best for:** Quick start, learning the format

The simplest possible exam with just 3 questions.

```markdown
# Quick Quiz

1. [MC] What is 2 + 2? [2pts]
a) Three
b) Four [x]
c) Five

2. [TF] The sky is blue. [1pt]
a) True [x]
b) False

3. [Essay, 5pts] Explain your answer.
```

```bash
curl -O https://raw.githubusercontent.com/Data-Wise/examark/main/examples/minimal.md
examark minimal.md -o quiz.qti.zip
```

[:material-download: Download minimal.md](https://github.com/Data-Wise/examark/raw/main/examples/minimal.md){ .md-button }

---

## Starter Template

**Best for:** Real exams, one of each question type

Complete template with all question types and helpful comments.

```bash
curl -O https://raw.githubusercontent.com/Data-Wise/examark/main/examples/starter-exam-md.md
examark starter-exam-md.md -o exam.qti.zip
```

[:material-download: Download starter-exam-md.md](https://github.com/Data-Wise/examark/raw/main/examples/starter-exam-md.md){ .md-button }

---

## Statistics Exam

**Best for:** Math/science courses with LaTeX formulas

Real-world statistics exam demonstrating LaTeX math support.

```markdown
## 6. [MC] The formula for sample variance is: [3pts]

a) $s^2 = \frac{\sum(x_i - \bar{x})}{n}$
b) $s^2 = \frac{\sum(x_i - \bar{x})^2}{n-1}$ [x]
c) $s^2 = \frac{\sum(x_i - \bar{x})^2}{n}$
d) $s^2 = \sqrt{\frac{\sum(x_i - \bar{x})^2}{n-1}}$
```

```bash
curl -O https://raw.githubusercontent.com/Data-Wise/examark/main/examples/statistics-exam.md
examark statistics-exam.md -o stats-midterm.qti.zip
```

[:material-download: Download statistics-exam.md](https://github.com/Data-Wise/examark/raw/main/examples/statistics-exam.md){ .md-button }

---

## Comprehensive Template

**Best for:** Reference, edge cases, full feature demo

Full exam with all 21 question types and formatting options.

```bash
curl -O https://raw.githubusercontent.com/Data-Wise/examark/main/examples/canvas-ready.md
examark canvas-ready.md -o comprehensive.qti.zip
```

[:material-download: Download canvas-ready.md](https://github.com/Data-Wise/examark/raw/main/examples/canvas-ready.md){ .md-button }

---

## Template Comparison

| Template | Questions | Math | Best For |
|----------|-----------|------|----------|
| Minimal | 3 | No | Quick start |
| Starter | 8 | No | Real exams |
| Statistics | 8 | Yes | STEM courses |
| Comprehensive | 21 | Yes | Reference |
