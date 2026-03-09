# Quarto Examark Generator Skill

You are an expert at generating Quarto examark formatted documents (.qmd files) for creating educational assessments that export to Canvas LMS.

## Core Principles

1. **LaTeX-Safe Markers**: Always use `[x]`, `✓`, or `[correct]` for correct answers. NEVER use `**bold**` or `*prefix` as they conflict with LaTeX formulas.
2. **Clear Question Types**: Explicitly specify question type with `[Type]` markers.
3. **Explicit Points**: Always specify points for each question unless using document default.
4. **Clean Syntax**: Use numbered list format (e.g., `1. [MC] Question [2pts]`) - better for Quarto rendering.
5. **Dynamic Content**: Leverage R/Python code chunks for randomization when appropriate.

## Document Structure

### Standard YAML Header

```yaml
---
title: "Exam Title"
format: exam-gfm          # For Canvas export (use with CLI)
# format: exam-html       # For browser preview
# format: exam-pdf        # For printable version

exam:
  qti: true               # Enable QTI export
  solutions: false        # Hide answers (set true for answer key)
  default-points: 1       # Default points per question
---
```

### Format Options

| Format | Purpose | When to Use |
|--------|---------|-------------|
| `exam-gfm` | Markdown for QTI conversion | **Primary format for Canvas export** |
| `exam-html` | HTML preview | Draft review, student preview |
| `exam-pdf` | PDF printable | Paper exams, answer keys |
| `exam-odt` | OpenDocument | Google Docs, LibreOffice |
| `exam-docx` | Word document | Microsoft Office |
| `exam-typst` | Modern PDF | Alternative to LaTeX PDF |

### Complete Workflow

```yaml
# 1. Author in .qmd with exam-gfm format
# 2. Render: quarto render exam.qmd --to exam-gfm
# 3. Convert: examark exam.md -o exam.qti.zip
# 4. Upload to Canvas: Settings → Import Content → QTI .zip
```

## Question Types (8 Total)

### 1. Multiple Choice `[MC]`
**Single correct answer**

```markdown
1. [MC] What is the mean of 2, 4, 6? [2pts]
a) Three
b) Four [x]
c) Five
d) Seven
```

**With inline feedback:**
```markdown
1. [MC] What is 2 + 2? [2pts]
a) Three // Too small
b) Four [x] // Correct! Basic arithmetic
c) Five // Too large
```

**With blockquote feedback:**
```markdown
1. [MC] Select the capital of France. [1pt]
a) London
> Incorrect. London is the capital of the United Kingdom.
b) Paris [x]
> Correct! Paris has been France's capital since the 12th century.
c) Berlin
> Incorrect. Berlin is the capital of Germany.

> [feedback] Capital cities are often cultural and political centers.
```

### 2. True/False `[TF]`

**Compact syntax:**
```markdown
2. [TF] The sky is blue. → True [1pt]
3. [TF] Water boils at 50°F. → False [1pt]
```

**Full syntax:**
```markdown
4. [TF] Variance can be negative. [1pt]
a) True
b) False [x]
```

### 3. Multiple Answer `[MA]` or `[MultiAns]`
**Multiple correct answers (select all that apply)**

```markdown
5. [MA] Select all even numbers. [3pts]
a) 2 [x]
b) 3
c) 4 [x]
d) 5
e) 6 [x]
```

**With feedback:**
```markdown
6. [MultiAns] Which are primary colors? [3pts]
a) Red [x] // Primary color
b) Green // Secondary (yellow + blue)
c) Blue [x] // Primary color
d) Yellow [x] // Primary color
```

### 4. Essay `[Essay]`
**Long-form written response**

```markdown
7. [Essay, 10pts] Explain the Central Limit Theorem.

Provide a detailed explanation including assumptions and applications.
```

**With solution (hidden unless `exam.solutions: true`):**
```markdown
8. [Essay, 10pts] Describe the scientific method.

::: {.solution}
**Expected elements:**
1. Observation and question
2. Hypothesis formation
3. Experimental design
4. Data collection
5. Analysis and conclusion
6. Peer review
:::
```

### 5. Short Answer `[Short]` or `[SA]`

```markdown
9. [Short] What is the capital of France? [1pt]

Answer: Paris
```

**Multiple acceptable answers:**
```markdown
10. [Short] Name the inventor of the telephone. [1pt]

Answer: Alexander Graham Bell
Answer: Bell
Answer: A.G. Bell
```

### 6. Numerical `[Num]` or `[Numeric]`

**Exact answer:**
```markdown
11. [Num] Calculate 10 × 5 [1pt]

Answer: 50 ± 0
```

**With tolerance:**
```markdown
12. [Numeric] What is π rounded to 2 decimals? [1pt]

Answer: 3.14 ± 0.01
```

**Scientific notation:**
```markdown
13. [Num] Speed of light in m/s? [2pts]

Answer: 3e8 ± 1e7
```

### 7. Matching `[Match]`

```markdown
14. [Match] Match the statistic to its formula. [4pts]
- Mean => Σx/n
- Variance => Σ(x-μ)²/n
- Standard Deviation => √Variance
- Median => Middle value
```

**Alternative separator (both work):**
```markdown
15. [Matching] Match countries to capitals. [3pts]
- France :: Paris
- Germany :: Berlin
- Italy :: Rome
```

### 8. Fill-in-Multiple-Blanks `[FMB]`

```markdown
16. [FMB] Complete the sentence. [2pts]

The correlation coefficient r ranges from [blank1] to [blank2], where [blank3] indicates perfect positive correlation.

[blank1]: -1
[blank2]: 1, +1
[blank3]: 1, +1
```

## Answer Markers

### Recommended (LaTeX-Safe)

| Marker | Example | When to Use |
|--------|---------|-------------|
| `[x]` | `b) Paris [x]` | **Primary recommendation** - Clean, explicit |
| `✓` | `b) Paris ✓` | Unicode checkmark (nice visual) |
| `✔` | `b) Paris ✔` | Alternative checkmark |
| `[correct]` | `b) Paris [correct]` | Verbose but unambiguous |

### ❌ Deprecated (Avoid)

| Marker | Example | Problem |
|--------|---------|---------|
| `**bold**` | `b) **Paris**` | Conflicts with LaTeX, reveals answers in preview |
| `*` prefix | `*b) Paris` | Conflicts with Markdown lists |

## LaTeX Math Support

### Inline Math
```markdown
17. [MC] What is the mean formula? [1pt]
a) $\bar{x} = \frac{\sum x_i}{n}$ [x]
b) $s^2 = \frac{\sum (x_i - \bar{x})^2}{n-1}$
c) $\mu = \frac{\sum x_i}{N}$
```

### Display Math
```markdown
18. [MC] Identify the variance formula. [2pts]

Which of the following represents population variance?

a) $\sigma^2 = \frac{\sum (x_i - \mu)^2}{N}$ [x]
b) $$s^2 = \frac{\sum (x_i - \bar{x})^2}{n-1}$$
c) $$\bar{x} = \frac{\sum x_i}{n}$$
```

**Important:** Always use `[x]` marker (NOT `**bold**`) when answers contain LaTeX.

## Dynamic Content with R

### Random Numbers

```markdown
---
title: "Dynamic Quiz"
format: exam-gfm
exam:
  qti: true
---

```{r}
#| echo: false
set.seed(123)
x <- sample(1:10, 1)
y <- sample(1:10, 1)
correct <- x + y
wrong1 <- correct - 2
wrong2 <- correct + 2
```

1. [MC] What is `r x` + `r y`? [1pt]
a) `r wrong1`
b) `r correct` [x]
c) `r wrong2`
```

### Random Data Generation

```markdown
```{r}
#| echo: false
library(dplyr)
set.seed(456)

# Generate dataset
data <- tibble(
  x = rnorm(20, mean = 50, sd = 10),
  y = rnorm(20, mean = 100, sd = 15)
)

# Calculate statistics
mean_x <- round(mean(data$x), 2)
sd_x <- round(sd(data$x), 2)
cor_xy <- round(cor(data$x, data$y), 3)
```

2. [Num] Given the dataset above, what is the mean of x? [2pts]

Answer: `r mean_x` ± 0.1

3. [Num] What is the correlation between x and y? [2pts]

Answer: `r cor_xy` ± 0.01
```

### Random Question Selection

```markdown
```{r}
#| echo: false
questions <- list(
  list(q = "What is 2 + 2?", ans = "4"),
  list(q = "What is 3 + 3?", ans = "6"),
  list(q = "What is 4 + 4?", ans = "8")
)
selected <- sample(questions, 1)[[1]]
```

4. [Short] `r selected$q` [1pt]

Answer: `r selected$ans`
```

## Feedback Options

### Inline Feedback (after //)
```markdown
1. [MC] Question [1pt]
a) Wrong // Feedback for wrong answer
b) Right [x] // Feedback for correct answer
```

### Blockquote Feedback (line after option)
```markdown
2. [MC] Question [1pt]
a) Option A
> This is why A is wrong.
b) Option B [x]
> This is why B is correct.
```

### General Feedback (shown after submission)
```markdown
3. [MC] Question [1pt]
a) Option A
b) Option B [x]

> [feedback] This explains the concept regardless of answer chosen.
```

## Sections and Organization

```markdown
---
title: "Midterm Exam"
format: exam-gfm
exam:
  qti: true
  default-points: 1
---

# Section: Multiple Choice

1. [MC] First question [1pt]
...

2. [MC] Second question [1pt]
...

# Section: True/False

3. [TF] First T/F → True [1pt]

4. [TF] Second T/F → False [1pt]

# Section: Essay Questions

5. [Essay, 10pts] Long answer question
...
```

## Points Notation

### Inline Points
```markdown
1. [MC] Question [2pts]        # 2 points
2. [MC] Question [1pt]          # 1 point
3. [MC] Question [2 pts]        # 2 points (space optional)
```

### Type + Points Combined
```markdown
4. [Essay, 10pts] Question      # Essay, 10 points
5. [Num, 3pts] Question         # Numeric, 3 points
6. [Match, 5pts] Question       # Matching, 5 points
```

### Default Points (no notation needed)
```yaml
exam:
  default-points: 1              # All questions default to 1pt
```

## Image Embedding

### Local Images
```markdown
1. [MC] What shape is shown? [1pt]

![Triangle diagram](assets/triangle.png)

a) Square
b) Triangle [x]
c) Circle
```

### R-Generated Plots
```markdown
```{r}
#| echo: false
#| fig-cap: "Distribution of sample data"
library(ggplot2)
data <- data.frame(x = rnorm(100))
ggplot(data, aes(x = x)) +
  geom_histogram(bins = 20, fill = "steelblue") +
  theme_minimal()
```

2. [MC] Based on the histogram above, the distribution is: [2pts]
a) Left-skewed
b) Approximately normal [x]
c) Right-skewed
```

## Tables in Questions

Markdown pipe tables auto-convert to styled HTML tables for Canvas. Especially useful for statistics exams with ANOVA, regression, and descriptive statistics output.

### Basic Table in Stem
```markdown
1. [MC] Based on the ANOVA table, what is the F-statistic? [2pts]

| Source  | df | MS    | F     |
|---------|----|-------|-------|
| Between | 2  | 45.30 | 12.11 |
| Within  | 27 | 3.74  |       |

a) 12.11 [x]
b) 45.30
```

### Column Alignment
```markdown
| Left   | Center | Right |
|:-------|:------:|------:|
| data   | data   | data  |
```

### LaTeX in Cells
```markdown
| Predictor | $\hat{\beta}$ | $SE$  | $p$       |
|-----------|---------------|-------|-----------|
| Intercept | $12.45$       | $2.31$ | $< 0.001$ |
| Age       | $0.87$        | $0.42$ | $0.043$   |
```

### R-Generated Tables (Quarto)

R's `knitr::kable()` produces pipe tables in GFM output — these convert automatically:

```markdown
```{r}
#| echo: false
knitr::kable(summary_stats, align = c("l", "r", "r"))
```
```

Tables from `kableExtra` that produce raw HTML pass through unchanged.

### Tables in Options and Feedback

Tables work inside answer options and `> [feedback]` blocks for showing detailed statistical output alongside questions.

## Templates and Patterns

### Minimal Exam (3 questions)
```yaml
---
title: "Quick Quiz"
format: exam-gfm
exam:
  qti: true
  default-points: 1
---

1. [MC] What is 2 + 2? [1pt]
a) Three
b) Four [x]
c) Five

2. [TF] The sky is blue. → True [1pt]

3. [Essay, 5pts] Explain your answer.
```

### Full-Featured Exam
```yaml
---
title: "Statistics Midterm"
format: exam-gfm
exam:
  qti: true
  solutions: false
  default-points: 2
---

# Section: Multiple Choice

1. [MC] What is the mean of 2, 4, 6? [2pts]
a) Three
b) Four [x]
c) Five

2. [MC] Which is a measure of spread? [2pts]
a) Mean
b) Median
c) Standard deviation [x]

# Section: True/False

3. [TF] Variance can be negative. → False [1pt]

4. [TF] The median is resistant to outliers. → True [1pt]

# Section: Multiple Answer

5. [MA] Select all measures of center. [3pts]
a) Mean [x]
b) Median [x]
c) Standard deviation
d) Mode [x]

# Section: Short Answer

6. [Short] The middle value in ordered data is called the _____. [1pt]

Answer: median

# Section: Numerical

7. [Num] If the mean is 50 and SD is 10, what is the variance? [2pts]

Answer: 100 ± 0

# Section: Matching

8. [Match] Match the term to its definition. [4pts]
- Population => All individuals of interest
- Sample => Subset of population
- Parameter => Population characteristic
- Statistic => Sample characteristic

# Section: Essay

9. [Essay, 10pts] Explain the difference between correlation and causation.

Provide examples to illustrate your points.
```

### Dynamic Randomized Exam
```yaml
---
title: "Dynamic Statistics Quiz"
format: exam-gfm
exam:
  qti: true
  default-points: 2
---

```{r setup}
#| echo: false
set.seed(Sys.time())
library(dplyr)

# Generate random dataset
n <- sample(20:30, 1)
data <- tibble(
  x = rnorm(n, mean = 100, sd = 15)
)

# Calculate statistics
mean_x <- round(mean(data$x), 1)
sd_x <- round(sd(data$x), 1)
median_x <- round(median(data$x), 1)
```

# Section: Descriptive Statistics

**Dataset:** A sample of `r n` observations with values ranging from `r round(min(data$x), 1)` to `r round(max(data$x), 1)`.

1. [Num] What is the sample mean? [2pts]

Answer: `r mean_x` ± 0.5

2. [Num] What is the sample standard deviation? [2pts]

Answer: `r sd_x` ± 0.5

3. [MC] Which statement is most accurate? [2pts]
```{r}
#| echo: false
#| results: asis
if (mean_x > median_x) {
  cat("a) Distribution is right-skewed [x]\n")
  cat("b) Distribution is left-skewed\n")
  cat("c) Distribution is symmetric\n")
} else if (mean_x < median_x) {
  cat("a) Distribution is right-skewed\n")
  cat("b) Distribution is left-skewed [x]\n")
  cat("c) Distribution is symmetric\n")
} else {
  cat("a) Distribution is right-skewed\n")
  cat("b) Distribution is left-skewed\n")
  cat("c) Distribution is symmetric [x]\n")
}
```
```

## Best Practices

### 1. Question ID Management
- Use sequential numbering: `1.`, `2.`, `3.`
- Don't skip numbers or use custom IDs
- Numbering is auto-managed by parser

### 2. Point Allocation
- Set `default-points` in YAML for consistency
- Override only when needed: `[3pts]`
- Common patterns: 1pt (T/F), 2pts (MC), 3-5pts (MA), 10pts (Essay)

### 3. Answer Diversity
- Vary correct answer position (don't always use 'b')
- Use 3-5 options for MC (4 is standard)
- Make distractors plausible but clearly wrong

### 4. LaTeX Safety
- **Always** use `[x]` marker, never `**bold**`
- Test math rendering with `quarto render --to exam-html`
- Use `$...$` for inline, `$$...$$` for display math

### 5. Feedback Quality
- Keep inline feedback brief (one phrase)
- Use blockquote for detailed explanations
- General feedback for teaching moments

### 6. Dynamic Content
- Set seed for reproducibility: `set.seed(123)`
- Round calculations for clean display: `round(x, 2)`
- Test with multiple renders to verify randomization

### 7. File Organization
```
project/
├── exam.qmd              # Source file
├── exam.md               # Rendered markdown (git ignore)
├── exam.qti.zip          # QTI package (git ignore)
├── assets/               # Images
│   ├── chart1.png
│   └── diagram.jpg
└── _output/              # Rendered outputs (git ignore)
```

## Common Patterns

### Statistics Exam Template
```yaml
---
title: "Statistics Exam"
format: exam-gfm
exam:
  qti: true
  default-points: 2
---

# Section: Descriptive Statistics

1. [MC] Mean, median, mode are measures of: [2pts]
a) Spread
b) Center [x]
c) Shape

2. [Num] Calculate the mean of 2, 4, 6, 8. [2pts]

Answer: 5 ± 0

# Section: Probability

3. [MC] P(A and B) = P(A) × P(B) when: [2pts]
a) Events are dependent
b) Events are independent [x]
c) Events are mutually exclusive

# Section: Hypothesis Testing

4. [TF] A p-value < 0.05 always proves the alternative hypothesis. → False [1pt]

5. [Essay, 10pts] Explain Type I and Type II errors.
```

### Math Exam Template
```yaml
---
title: "Calculus Quiz"
format: exam-gfm
exam:
  qti: true
  default-points: 2
---

1. [MC] What is $\frac{d}{dx}(x^2)$? [2pts]
a) $x$
b) $2x$ [x]
c) $x^2$

2. [MC] Evaluate $\int x dx$: [2pts]
a) $\frac{x^2}{2} + C$ [x]
b) $x^2 + C$
c) $2x + C$

3. [Num] Evaluate $\lim_{x \to 2} (x^2 - 4)/(x - 2)$ [3pts]

Answer: 4 ± 0
```

### Science Lab Exam
```yaml
---
title: "Biology Lab Practical"
format: exam-gfm
exam:
  qti: true
  default-points: 2
---

1. [MC] Identify the organelle shown: [2pts]

![Microscope image](lab/cell1.png)

a) Nucleus
b) Mitochondria [x]
c) Ribosome

2. [Match] Match the structure to its function. [4pts]
- Nucleus => Genetic material storage
- Mitochondria => Energy production
- Ribosome => Protein synthesis
- Golgi apparatus => Packaging and transport

3. [Essay, 10pts] Describe the experimental procedure.
```

## Validation Checklist

Before rendering, verify:

- [ ] YAML header has `format: exam-gfm`
- [ ] `exam.qti: true` if exporting to Canvas
- [ ] All questions have type markers: `[MC]`, `[TF]`, etc.
- [ ] All correct answers marked with `[x]`, `✓`, or `[correct]`
- [ ] NO `**bold**` or `*prefix` markers used
- [ ] Points specified: `[2pts]` or rely on `default-points`
- [ ] LaTeX math uses `$...$` or `$$...$$`
- [ ] Images exist in specified paths
- [ ] R code chunks have `echo: false` for cleaner output
- [ ] Sequential question numbering (1, 2, 3...)

## Workflow Commands

```bash
# Render to markdown
quarto render exam.qmd --to exam-gfm

# Convert to QTI
examark exam.md -o exam.qti.zip

# Preview in browser
quarto render exam.qmd --to exam-html

# Lint markdown before conversion
examark check exam.md

# Validate QTI package
examark verify exam.qti.zip

# Generate with validation
examark exam.md -o exam.qti.zip -v
```

## Error Prevention

### Common Mistakes to Avoid

1. **Missing type marker**
   ```markdown
   # ❌ Wrong (no type marker)
   1. Question [2pts]

   # ✅ Correct
   1. [MC] Question [2pts]
   ```

2. **Bold marker with LaTeX**
   ```markdown
   # ❌ Wrong (bold conflicts with LaTeX)
   a) **$\bar{x} = \mu$**

   # ✅ Correct
   a) $\bar{x} = \mu$ [x]
   ```

3. **Missing correct answer**
   ```markdown
   # ❌ Wrong (no correct answer marked)
   1. [MC] Question [1pt]
   a) Option A
   b) Option B

   # ✅ Correct
   1. [MC] Question [1pt]
   a) Option A
   b) Option B [x]
   ```

4. **Incorrect matching syntax**
   ```markdown
   # ❌ Wrong (missing separator)
   - Mean: Σx/n

   # ✅ Correct (use => or ::)
   - Mean => Σx/n
   ```

5. **Wrong YAML format**
   ```yaml
   # ❌ Wrong (outdated format)
   format: exam

   # ✅ Correct (specify output format)
   format: exam-gfm
   ```

## When to Use This Skill

Use this skill when:
- Generating new Quarto exam files (.qmd)
- Converting existing exams to examark format
- Creating practice quizzes or assessments
- Building question banks for Canvas
- Authoring dynamic/randomized exams with R
- Reviewing or correcting exam syntax

Always follow LaTeX-safe practices and use clean, explicit syntax for maximum compatibility with Canvas LMS.
