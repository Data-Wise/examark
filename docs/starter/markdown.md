# Markdown Templates

No Quarto or R required. Just edit and convert with the examark CLI.

---

## Minimal Template

**Best for:** Quick start, learning the format

The simplest possible exam with just 3 questions.

```markdown
# Quick Quiz

## 1. Sample Multiple Choice [2 pts]

What is the capital of France?

a) London
b) Paris [x]
c) Berlin
d) Madrid

## 2. [TF] The Earth orbits the Sun. [1 pt]

a) True [x]
b) False

## 3. [Short] Name the largest planet in our solar system. [2 pts]

Answer: Jupiter
```

```bash
curl -O https://raw.githubusercontent.com/Data-Wise/examark/main/templates/markdown/minimal.md
examark minimal.md -o quiz.qti.zip
```

[:material-download: Download minimal.md](https://github.com/Data-Wise/examark/raw/main/templates/markdown/minimal.md){ .md-button }

---

## Starter Template

**Best for:** Real exams, one of each question type

Complete template with all question types and helpful comments.

```bash
curl -O https://raw.githubusercontent.com/Data-Wise/examark/main/templates/markdown/starter.md
examark starter.md -o exam.qti.zip
```

[:material-download: Download starter.md](https://github.com/Data-Wise/examark/raw/main/templates/markdown/starter.md){ .md-button }

---

## All Question Types

**Best for:** Reference, comprehensive feature demo

Full exam demonstrating all 8 question types and formatting options.

```bash
curl -O https://raw.githubusercontent.com/Data-Wise/examark/main/templates/markdown/all-question-types.md
examark all-question-types.md -o comprehensive.qti.zip
```

[:material-download: Download all-question-types.md](https://github.com/Data-Wise/examark/raw/main/templates/markdown/all-question-types.md){ .md-button }

---

## Template Comparison

| Template | Questions | Math | Best For |
|----------|-----------|------|----------|
| Minimal | 3 | No | Quick start |
| Starter | 8 | No | Real exams |
| All Question Types | 21 | Yes | Reference |

---

## Example Files

Looking for more examples? Check out the [examples/markdown/](https://github.com/Data-Wise/examark/tree/main/examples/markdown) folder:

| Example | Description |
|---------|-------------|
| `statistics-exam.md` | Real statistics exam with LaTeX math |
| `with-images.md` | Questions with embedded images |
| `validation-test.md` | Canvas validation edge cases |
| `edge-cases.md` | Various edge cases for testing |
