# Input Formats

Examify accepts a simple Markdown-based format for quiz questions. This guide covers the complete syntax for all question types.

---

## Quick Start

Create a file called `quiz.md`:

```markdown
# My Quiz

## 1. What is 2 + 2?

a) 3
b) **4** ✓
c) 5
```

Convert to Canvas QTI:

```bash
examify quiz.md -o quiz.qti.zip
```

---

## Document Structure

### Quiz Title

The first `# Title` line becomes the quiz title:

```markdown
# Statistics Midterm Exam
```

### Sections

Group questions into sections:

```markdown
# Section: Multiple Choice

## 1. Question one...

## 2. Question two...

# Section: Essay Questions

## 3. Essay question...
```

### Questions

Questions **must** use `## N. Question` format:

```markdown
## 1. What is the capital of France? [2 pts]

## 2. [TF] The Earth is round. → True

## 3. [Essay, 10pts] Explain your reasoning.
```

---

## Question Types

### Multiple Choice (Default)

The default type. Mark the correct answer with one of the supported markers.

```markdown
## 1. What is 2 + 2? [2 pts]

a) 3
b) **4** ✓
c) 5
d) 6
```

**Supported Answer Markers:**

| Marker | Example | Notes |
|--------|---------|-------|
| `**Bold**` | `b) **Answer**` | Most visual |
| `**Bold** ✓` | `b) **Answer** ✓` | With checkmark |
| `[correct]` | `b) Answer [correct]` | Quarto-friendly |
| `*` prefix | `*b) Answer` | Traditional format |

All markers can be combined. These all mark option b as correct:

```markdown
b) **Correct answer**
b) Correct answer ✓
b) Answer [correct]
*b) Answer
```

---

### True / False

Use `[TF]` tag or arrow syntax.

**Method 1: Arrow Syntax (Recommended)**

Single-line format with answer in the header:

```markdown
## 2. [TF] The sky is blue. → True

## 3. [TF] Water boils at 50°C. → False
```

**Method 2: Standard Options**

```markdown
## 4. [TF] The Earth is flat.

*True
False
```

**Arrow Formats:** Use `→ True`, `→ False`, `-> True`, or `-> False`.

---

### Multiple Answers

Use `[MultiAns]` for questions with multiple correct answers.

```markdown
## 5. [MultiAns, 4pts] Which are primary colors?

*a) Red
b) Orange
*c) Blue
d) Green
*e) Yellow
```

Mark all correct answers with `*` prefix.

---

### Short Answer

Use `[Short]` for fill-in-the-blank questions.

```markdown
## 6. [Short] The capital of France is

Answer: Paris
```

**Multiple Accepted Answers:**

```markdown
## 7. [Short] What is the SI unit of force?

Answer: Newton
Answer: N
Answer: newton
```

Canvas matches case-insensitively.

---

### Numeric

Use `[Numeric]` with a tolerance value.

```markdown
## 8. [Numeric, 3pts] Calculate the mean of 2, 4, 6, 8, 10.

Answer: 6 ± 0.1
```

**Tolerance Formats:**

| Format | Meaning |
|--------|---------|
| `± 0` | Exact match required |
| `± 0.01` | Allow small rounding error |
| `± 5` | Allow range of values |

---

### Essay

Use `[Essay]` for open-ended questions. No answer options needed.

```markdown
## 9. [Essay, 10pts] Explain the process of photosynthesis.

Describe at least three key steps in your explanation.
Include the role of chlorophyll and sunlight.
```

Everything after the header becomes the question stem.

---

## Points

### Default Points

Questions default to 1 point unless specified.

### Inline Points

Use `[N pts]` or `[Npts]` syntax:

```markdown
## 1. Easy question [1 pt]

## 2. Medium question [5 pts]

## 3. Hard question [10pts]
```

### Combined with Type

```markdown
## 4. [Essay, 10pts] Describe...

## 5. [MultiAns, 4pts] Select all...

## 6. [Numeric, 3pts] Calculate...
```

---

## LaTeX Math

Both inline and display math are supported.

### Inline Math

Use single dollar signs:

```markdown
## 1. In regression, what does $\beta_1$ represent?

The formula $y = mx + b$ describes a line.
```

### Display Math

Use double dollar signs:

```markdown
## 2. Which formula shows the quadratic equation?

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

a) Pythagorean theorem
b) **Quadratic formula** ✓
c) Euler's identity
```

### Canvas Compatibility

Examify automatically converts:

| Markdown | Canvas |
|----------|--------|
| `$...$` | `\(...\)` |
| `$$...$$` | `\[...\]` |

Canvas renders math using MathJax.

---

## Images

Images are automatically bundled into the QTI package.

### Basic Syntax

```markdown
## 1. What does this graph show?

![Graph Description](assets/graph.png)

a) Linear growth
b) **Exponential growth** ✓
c) No relationship
```

### Supported Formats

| Format | Extension | Best For |
|--------|-----------|----------|
| PNG | `.png` | Charts, screenshots |
| JPEG | `.jpg`, `.jpeg` | Photos |
| SVG | `.svg` | Vector graphics |
| GIF | `.gif` | Animations |
| WebP | `.webp` | Modern format |

### Path Requirements

- Use **relative paths** from your Markdown file
- Recommended: Keep images in an `assets/` subfolder
- Paths are **case-sensitive**

```
quiz/
├── my-quiz.md
└── assets/
    ├── chart1.png
    ├── diagram.svg
    └── photo.jpg
```

### What Happens

Examify:

1. Finds all `![alt](path)` references
2. Copies images into the QTI package
3. Generates `imsmanifest.xml`
4. Creates proper `<img>` tags in the QTI XML

---

## Code Blocks

Include code examples in questions:

````markdown
## 1. What does this code output?

```python
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
```

a) Hello World
b) **Hello, World!** ✓
c) greet(World)
d) Error
````

Code is preserved with syntax highlighting in Canvas.

---

## Solution Blocks

Examify ignores solution content:

```html
<div class="solution">
  This content will NOT appear in Canvas.
</div>
```

Or use the proof class:

```html
<div class="proof">
  Step-by-step solution...
</div>
```

**Quarto Users:** Use `:::` blocks:

```markdown
::: {.solution}
This is hidden in Canvas export.
:::
```

---

## Complete Example

```markdown
# Statistics Quiz 1

# Section: Concepts

## 1. Central Tendency [2 pts]

Which measure is most affected by outliers?

a) Mode
b) Median
c) **Mean** ✓
d) Range

## 2. [TF] The variance can be negative. → False

# Section: Calculations

## 3. [Numeric, 3pts] Calculate the z-score.

Given: X = 85, μ = 70, σ = 10

$$z = \frac{X - \mu}{\sigma}$$

Answer: 1.5 ± 0.01

# Section: Written Response

## 4. [Essay, 10pts] Explain correlation vs causation.

Provide an example of a spurious correlation.
```

---

## Templates

Ready-to-use templates in `examples/`:

| Template | Description |
|----------|-------------|
| `starter-exam-md.md` | Minimal starter template |
| `canvas-ready.md` | All question types for Canvas |
| `canvas-validation.md` | Comprehensive test file |

---

## Validation

Before uploading to Canvas:

```bash
# Check for syntax issues
examify check quiz.md

# Preview parsed questions
examify quiz.md --preview

# Simulate Canvas import
examify emulate-canvas quiz.qti.zip
```

---

## Troubleshooting

### Question not detected

- Ensure it starts with `## N.` (two hashes)
- Check for proper spacing after `##`

### Correct answer not found

- Verify marker syntax (`**Bold**`, `✓`, `*` prefix)
- Ensure the marker is on the answer line, not the question

### Images missing

- Check paths are relative
- Verify files exist at the specified path
- Use `examify verify quiz.qti.zip` to check bundling

### Math not rendering

- Ensure dollar signs are not escaped
- Check for proper spacing around `$` symbols
- Verify Canvas has MathJax enabled
