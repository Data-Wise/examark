# Multiple Answers (Select All) Questions

> **TL;DR** (30 seconds)
> - **What:** "Select all that apply" questions with 2+ correct answers for Canvas
> - **Why:** Most common source of Canvas import failures — this guide prevents them
> - **How:** Use `[MA]` type marker + mark 2+ options with `[x]`, `**bold**`, or `*` prefix
> - **Next:** [Canvas Workflow](canvas-workflow.md) for the full import and validation guide

**10 minutes** | Beginner | No special tools required

---

## When to Use Multiple Answers

Use MA (Multiple Answers / Select All That Apply) when a question has **two or more correct options**. Canvas grades these differently from Multiple Choice:

| Feature | Multiple Choice `[MC]` | Multiple Answers `[MA]` |
|---------|----------------------|------------------------|
| Correct answers | Exactly 1 | 2 or more |
| Student selects | One radio button | Multiple checkboxes |
| Canvas grading | All or nothing | Partial credit possible |
| Common issues | Rare | See [Troubleshooting](#troubleshooting) |

---

## Basic Syntax

### Clean Syntax (Recommended)

```markdown
1. [MA] Which are measures of central tendency? [3pts]
a) Mean [x]
b) Range
c) Median [x]
d) Standard deviation
e) Mode [x]
```

### Traditional Syntax

```markdown
## 5. Which are measures of central tendency? [3 pts]
a) **Mean**
b) Range
c) **Median**
d) Standard deviation
e) **Mode**
```

### Using `*` Prefix

```markdown
1. [MA] Which are measures of central tendency? [3pts]
*a) Mean
b) Range
*c) Median
d) Standard deviation
*e) Mode
```

All three styles produce identical QTI output. The `[x]` marker is most explicit and recommended for clarity.

---

## Answer Markers

Any of these markers work for MA questions:

| Marker | Example | Notes |
|--------|---------|-------|
| `[x]` | `a) Mean [x]` | Most explicit, recommended |
| `**bold**` | `a) **Mean**` | Visual emphasis |
| `[correct]` | `a) Mean [correct]` | Readable |
| `*` prefix | `*a) Mean` | Compact |

!!! warning "At Least Two Required"
    MA questions **must** have 2 or more correct answers. If only one answer is correct, use `[MC]` instead. Canvas will reject MA questions with fewer than 2 correct options.

---

## Adding Feedback

### Inline Feedback

```markdown
1. [MA] Which assumptions does a t-test require? [4pts]
a) Normality [x] // Yes — the sampling distribution should be approximately normal
b) Equal sample sizes // Not required, though it helps with equal variances
c) Independence [x] // Yes — observations must be independent
d) Homogeneity of variance [x] // Yes — for independent samples t-test
e) Large sample size // Not required — that's for z-tests
```

### General Feedback

```markdown
1. [MA] Which assumptions does a t-test require? [4pts]
a) Normality [x]
b) Equal sample sizes
c) Independence [x]
d) Homogeneity of variance [x]
e) Large sample size

> [feedback] The three key assumptions are normality, independence, and homogeneity of variance. Equal sample sizes and large N are not required.
```

---

## Canvas Grading Behavior

Canvas grades MA questions using this formula:

$$\text{Score} = \text{Points} \times \frac{\text{Correct selections} - \text{Incorrect selections}}{\text{Total correct options}}$$

### Example

Question worth 4 points, 3 correct options (a, c, d):

| Student selects | Calculation | Score |
|-----------------|-------------|-------|
| a, c, d | (3 - 0) / 3 = 1.0 | 4/4 |
| a, c | (2 - 0) / 3 = 0.67 | 2.67/4 |
| a, c, d, e | (3 - 1) / 3 = 0.67 | 2.67/4 |
| a, b, c, d, e | (3 - 2) / 3 = 0.33 | 1.33/4 |
| b, e | (0 - 2) / 3 = -0.67 | 0/4 (no negative) |

!!! tip "Exam Design Tip"
    Include 5-6 options to reduce guessing effectiveness. With only 4 options and 2 correct, students have a 1-in-6 chance of guessing correctly.

---

## How QTI Represents MA Questions

Examark generates QTI with `rcardinality="Multiple"` and a special response processing block:

```xml
<resprocessing>
  <respcondition>
    <conditionvar>
      <and>
        <varequal respident="response1">option_a</varequal>
        <varequal respident="response1">option_c</varequal>
        <varequal respident="response1">option_d</varequal>
        <not><varequal respident="response1">option_b</varequal></not>
        <not><varequal respident="response1">option_e</varequal></not>
      </and>
    </conditionvar>
    <setvar action="Set" varname="SCORE">100</setvar>
  </respcondition>
</resprocessing>
```

Canvas needs **both** the correct selections (`<varequal>`) **and** the incorrect non-selections (`<not><varequal>`) to determine the answer. This is the most common source of QTI import failures for MA questions.

---

## Complete Example

```markdown
# Statistics Assessment
# Section: Inference

1. [MA] Which conditions must be met for a valid confidence interval for a proportion? [4pts]
a) Random sample [x]
b) Sample size > 30
c) np >= 10 [x]
d) n(1-p) >= 10 [x]
e) Population is normal
f) Observations are independent [x]

> [feedback] The four conditions are: random sample, np >= 10, n(1-p) >= 10, and independence. The "n > 30" rule applies to means, not proportions.

2. [MA] Which of the following increase the width of a confidence interval? [3pts]
a) Increasing confidence level [x]
b) Increasing sample size
c) Increasing variability [x]
d) Decreasing confidence level
e) Decreasing sample size [x]

3. [MA] Select all true statements about p-values. [3pts]
a) A p-value is the probability of observing data at least as extreme as ours, given $H_0$ is true [x]
b) A small p-value proves the alternative hypothesis
c) The p-value depends on the sample size [x]
d) A p-value of 0.03 means there's a 3% chance $H_0$ is true
e) P-values can be used to compare effect sizes
```

### Convert and Validate

```bash
# Convert to QTI
examark stats-quiz.md -o stats-quiz.qti.zip

# Validate before uploading
examark emulate-canvas stats-quiz.qti.zip
```

The emulator specifically checks MA questions for correct `rcardinality` and response processing.

---

## Troubleshooting

### "Importer couldn't determine correct answers"

**Cause:** QTI uses `rcardinality="Single"` instead of `"Multiple"`.

**Fix:** Make sure you use `[MA]` type marker, not `[MC]`:

```markdown
# Wrong — treated as MC (single correct)
1. [MC] Select all that apply...

# Correct — MA with multiple correct
1. [MA] Select all that apply...
```

### Only One Correct Answer Detected

**Cause:** Only one option is marked correct. MA requires 2+.

**Fix:** Add `[x]` to all correct options:

```markdown
# Wrong — only one marked
1. [MA] Which are valid?
a) Option A [x]
b) Option B      # <-- missing [x]

# Correct — both marked
1. [MA] Which are valid?
a) Option A [x]
b) Option B [x]
```

### Examark Lint Warning

Run `examark check` to catch MA issues before conversion:

```bash
examark check my-exam.md
```

The linter warns about:
- MA questions with fewer than 2 correct answers
- Missing answer markers on questions

### Canvas Shows Partial Credit When You Want All-or-Nothing

Canvas always uses partial credit for MA. To simulate all-or-nothing:
- Use a low point value (1 pt) so partial credit rounds down
- Or restructure as separate True/False questions

---

## Next Steps

- [Canvas Workflow](canvas-workflow.md) — Full import and validation guide
- [Question Types](../markdown/question-types.md) — All 10 question types at a glance
- [Canvas Emulator](../emulator.md) — Pre-upload validation tool
- [Item Banks](item-banks.md) — Build random quizzes from question pools
