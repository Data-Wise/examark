# Canvas Item Banks & Random Quizzes

Learn how to use Examark with Canvas Item Banks for creating quizzes with randomly selected questions.

---

## Overview

Canvas offers two quiz systems, each with its own question storage:

| System | Quiz Type | Question Storage | Random Selection |
|--------|-----------|------------------|------------------|
| **Classic Quizzes** | Classic | Question Banks | Question Groups |
| **New Quizzes** | New | Item Banks | "Randomly select N" |

**Good news:** Examark's QTI packages work with both systems!

---

## Why Use Item Banks?

Item Banks (New Quizzes) offer several advantages:

- **Shareable** — Banks belong to you, not the course. Share across courses and with colleagues.
- **Random Selection** — Pull N random questions from a larger pool
- **Consistent Updates** — Edit a question once, updates everywhere it's used
- **Better Organization** — Tag and filter questions by topic

### Use Case: Statistics Instructor

Create a bank of 50 statistics questions, then:
- Weekly quiz: Randomly select 5 questions
- Midterm: Randomly select 20 questions
- Final: Randomly select 30 questions

Each student gets a different set, reducing collaboration concerns.

---

## Method 1: Import to Item Bank (Recommended)

This imports questions directly into an Item Bank for use with New Quizzes.

### Step 1: Generate QTI Package

```bash
examark questions.md -o questions.qti.zip
```

### Step 2: Open Item Banks

1. Go to your Canvas course
2. Click **Quizzes** in course navigation
3. Click the **three dots (⋮)** menu
4. Select **Manage Item Banks**

![Manage Item Banks menu](https://community.canvaslms.com/t5/image/serverpage/image-id/23073i8E7F0B5B6D87AC17)

### Step 3: Create or Select a Bank

- Click **+ Add Bank** to create new, or
- Select an existing bank

### Step 4: Import QTI

1. Inside the bank, click the **three dots (⋮)**
2. Select **Import Content**
3. Drag and drop your `.qti.zip` file (or click Browse)
4. Click **Import**

The bank name defaults to the QTI file name. Questions appear in the bank.

### Step 5: Create Quiz with Random Selection

1. Go to **Quizzes** → **+ Quiz** → **New Quizzes**
2. In the quiz builder, click **Add from Item Bank**
3. Select your bank
4. Choose either:
   - **All questions** — Use every question
   - **Randomly select** — Specify how many (e.g., 10 of 50)
5. Set points per question
6. Click **Done**

---

## Method 2: Import to Classic Quiz + Question Bank

This creates a Classic Quiz and automatically populates a Question Bank.

### Step 1: Generate QTI Package

```bash
examark questions.md -o questions.qti.zip
```

### Step 2: Import via Course Settings

1. Go to **Settings** → **Import Course Content**
2. Content Type: **QTI .zip file**
3. Upload your `.qti.zip` file
4. Click **Import**

This creates:
- A Classic Quiz with all questions
- A Question Bank with the same questions

### Step 3: Use Question Groups (Random Selection)

1. Create or edit a Classic Quiz
2. Click **New Question Group**
3. Link to your Question Bank
4. Set "Pick X questions" and points
5. Save

---

## Organizing Large Question Sets

### By Section

Create separate files for different topics:

```
stats-questions/
├── descriptive.md      # Mean, median, mode
├── probability.md      # Basic probability
├── inference.md        # Hypothesis testing
└── regression.md       # Linear regression
```

Convert each to a separate Item Bank:

```bash
examark stats-questions/*.md -o item-banks/
```

Then in Canvas, create quizzes that pull from multiple banks:
- 3 questions from Descriptive
- 3 questions from Probability
- 4 questions from Inference

### By Difficulty

Tag questions in your Markdown with sections:

```markdown
# Statistics Item Bank

# Section: Easy

1. [MC] What is the mean of 2, 4, 6? [1pt]
a) 3
b) 4 [x]
c) 5

# Section: Medium

2. [MC] Which measure is resistant to outliers? [2pts]
a) Mean
b) Median [x]
c) Standard deviation

# Section: Hard

3. [Num] Calculate the z-score for x=85, μ=70, σ=10. [3pts]
Answer: 1.5 ± 0.01
```

---

## Tips for Statistics Instructors

### Numeric Tolerances

For calculated answers, use tolerances:

```markdown
1. [Num] Calculate the standard deviation. [3pts]
Answer: 2.83 ± 0.05
```

This accepts 2.78 to 2.88, accommodating rounding differences.

### Multiple Correct Values

Some statistics problems accept multiple valid answers:

```markdown
1. [Short] What measure of central tendency should you use for skewed data? [2pts]
Answer: median
Answer: Median
Answer: the median
```

### Formula Questions with Quarto

Generate randomized values with R:

```qmd
```{r}
#| echo: false
set.seed(Sys.time())
n <- sample(5:10, 1)
values <- round(rnorm(n, 50, 10))
correct_mean <- round(mean(values), 2)
```

1. [Num] Calculate the mean of: `r paste(values, collapse=", ")` [2pts]
Answer: `r correct_mean` ± 0.1
```

Each render produces different values → different Item Bank contents.

---

## Comparison: Question Banks vs Item Banks

| Feature | Question Banks (Classic) | Item Banks (New Quizzes) |
|---------|-------------------------|--------------------------|
| Ownership | Course-specific | User-specific |
| Sharing | Copy course content | Direct sharing with colleagues |
| Random Selection | Question Groups | Built-in "Randomly select N" |
| Question Types | 12 types | 10 types (no calculated) |
| QTI Import | ✅ Via course import | ✅ Direct to bank |
| Future Support | Being phased out | Actively developed |

**Recommendation:** Use Item Banks (New Quizzes) for new courses.

---

## Troubleshooting

### Import Fails

- Ensure file is `.zip` not just `.qti`
- Check file isn't corrupted (try `examark verify file.qti.zip`)
- Some question types may not import (check Canvas support)

### Questions Missing After Import

- Images may need manual re-upload for Item Banks
- Matching questions with many pairs may truncate
- Run `examark emulate-canvas file.qti.zip` to preview

### Can't Find Item Banks Option

- Item Banks require **New Quizzes** to be enabled
- Contact your Canvas admin if not available
- Use Question Banks (Classic) as fallback

---

## See Also

- [Getting Started](../getting-started.md) — First exam in 5 minutes
- [Markdown Syntax](../markdown/index.md) — Question format reference
- [Canvas Emulator](../emulator.md) — Test before importing
- [Dynamic Exams](dynamic-exams.md) — Randomized questions with R/Python
