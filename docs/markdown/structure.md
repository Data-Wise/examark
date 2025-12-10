# Document Structure

How to organize your exam files for best results.

---

## Basic Structure

A complete exam file has:

```markdown
# Quiz Title

# Section: First Section

1. [MC] First question... [2pts]
...

# Section: Second Section

2. [Essay] Second question... [10pts]
...
```

---

## Quiz Title

The first `# Title` becomes the quiz/bank name in Canvas:

```markdown
# Statistics Midterm - Fall 2024
```

**Best Practices:**

- Be descriptive: `Statistics Midterm` not just `Quiz`
- Include term/date if relevant
- Avoid special characters that may cause issues

---

## Sections

Group related questions with section headers:

```markdown
# Section: Multiple Choice

1. [MC] Question one... [2pts]
2. [MC] Question two... [2pts]

# Section: Calculations

3. [Num] Calculate the mean... [3pts]
4. [Num] Calculate the variance... [3pts]

# Section: Written Response

5. [Essay] Explain your reasoning... [10pts]
```

### Section Header Formats

All of these create sections:

```markdown
# Section: Multiple Choice
# Section - Multiple Choice
# Part 1: Multiple Choice
# SECTION: MULTIPLE CHOICE
```

### Sections in Canvas

- Questions grouped by section
- Section titles appear in quiz navigation
- Useful for organizing large exams

---

## Question Numbering

### Automatic Numbering

Questions are numbered sequentially:

```markdown
1. [MC] First question...
2. [MC] Second question...
3. [MC] Third question...
```

### Numbering Across Sections

Continue numbering across sections:

```markdown
# Section: Part A

1. [MC] Question one...
2. [MC] Question two...

# Section: Part B

3. [Essay] Question three...
4. [Essay] Question four...
```

### Restarting Numbers

You can restart numbering per section (Canvas handles IDs internally):

```markdown
# Section: Multiple Choice

1. [MC] First MC...
2. [MC] Second MC...

# Section: Essays

1. [Essay] First essay...  # OK to restart at 1
2. [Essay] Second essay...
```

---

## File Organization

### Single File

For smaller exams (< 50 questions):

```
exam.md
```

### With Assets

For exams with images:

```
my-exam/
├── exam.md
└── assets/
    ├── figure1.png
    ├── figure2.png
    └── diagram.svg
```

### Multiple Exams

For course materials:

```
course-exams/
├── .examarkrc.json      # Shared config
├── midterm/
│   ├── midterm.md
│   └── assets/
├── final/
│   ├── final.md
│   └── assets/
└── quizzes/
    ├── quiz1.md
    ├── quiz2.md
    └── quiz3.md
```

---

## Metadata

### Points Summary

Total points are calculated automatically:

```markdown
# My Quiz (Total: 25 points)

1. [MC] Question [5pts]
2. [MC] Question [5pts]
3. [Essay] Question [15pts]
```

### Instructions (Manual)

Add instructions at the start (not parsed, but visible in source):

```markdown
# Statistics Final Exam

<!--
Instructions:
- 90 minutes allowed
- Calculator permitted
- Show all work for partial credit
-->

# Section: Multiple Choice
...
```

---

## Comments

### HTML Comments

Not included in output:

```markdown
<!-- This is a comment -->
<!-- TODO: Add more questions here -->
```

### Visible Notes

For graders/TAs (will appear in QTI):

```markdown
1. [Essay, 10pts] Explain the concept.

*Grading rubric: 4pts definition, 3pts example, 3pts application*
```

---

## Solution Blocks

Content to exclude from Canvas (for instructor versions):

```html
<div class="solution">
**Answer Key:**
1. B
2. A
3. C
</div>
```

Or with Quarto fenced divs:

```markdown
::: {.solution}
The correct answer is B because...
:::
```

---

## Complete Example

```markdown
# STAT 101 - Midterm Exam
# Fall 2024

<!--
Time: 60 minutes
Points: 50 total
Calculator: Allowed
-->

# Section: Concepts (20 points)

1. [MC] What measure of central tendency is most affected by outliers? [2pts]
a) Mode
b) Median
c) Mean [x]

2. [MC] Which describes the spread of data? [2pts]
a) Mean
b) Standard deviation [x]
c) Median

3. [TF] Correlation implies causation. [2pts] → False

4. [TF] Variance can be negative. [2pts] → False

5. [MA] Select all measures of spread. [4pts]
*a) Range
b) Mean
*c) Variance
*d) Standard deviation

6. [Match] Match symbols to meanings. [4pts]
- μ => Population mean
- σ => Population standard deviation
- x̄ => Sample mean
- s => Sample standard deviation

7. [Short] The middle value in sorted data is called the ___. [2pts]
Answer: median

8. [FMB] Fill in the z-score formula: z = (x - [blank1]) / [blank2] [2pts]
[blank1]: μ, mu, mean
[blank2]: σ, sigma, standard deviation

# Section: Calculations (15 points)

9. [Num] Data: 2, 4, 6, 8, 10. Calculate the mean. [3pts]

$$\bar{x} = \frac{\sum x_i}{n}$$

Answer: 6 ± 0

10. [Num] For the same data, calculate the variance. [5pts]

$$s^2 = \frac{\sum(x_i - \bar{x})^2}{n-1}$$

Answer: 10 ± 0.1

11. [Num] A z-score of 2.0 with μ=100, σ=15. What is x? [7pts]

Answer: 130 ± 0

# Section: Written Response (15 points)

12. [Essay, 15pts] Explain the Central Limit Theorem.

Your response should include:
- Definition
- Requirements (sample size)
- Why it's important for statistical inference
- A real-world example

> [feedback] Key points: sampling distribution of means approaches normal
> as n increases, regardless of population distribution shape.

<div class="solution">
**Rubric:**
- Definition (4pts)
- Sample size discussion (3pts)
- Importance for inference (4pts)
- Real-world example (4pts)
</div>
```

---

## See Also

- [Syntax Reference](syntax.md) — Complete syntax
- [Configuration](../config.md) — Project settings
- [Templates](../starter/index.md) — Starter files
