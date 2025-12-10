# Question Types Gallery

Examark supports 8 question types for Canvas LMS. Each type includes examples showing the Markdown syntax and how it appears in Canvas.

---

## Multiple Choice `[MC]`

The default question type. Students select one correct answer.

=== "Markdown"

    ```markdown
    1. [MC] What is the capital of France? [2pts]
    a) London
    b) Paris [x] // Correct answer
    c) Berlin
    d) Madrid
    ```

=== "Clean Syntax"

    ```markdown
    1. [MC] What is the capital of France? [2pts]
    a) London
    b) Paris [x]
    c) Berlin
    d) Madrid
    ```

=== "Traditional Syntax"

    ```markdown
    ## 1. What is the capital of France? [2 pts]
    a) London
    b) **Paris** ✓
    c) Berlin
    d) Madrid
    ```

**Answer Markers:** `[x]`, `**bold**`, `✓`, `[correct]`, or `*` prefix

---

## True/False `[TF]`

Binary choice questions. Use arrow syntax for compact format.

=== "Arrow Syntax (Compact)"

    ```markdown
    2. [TF] The Earth orbits the Sun. [1pt] → True

    3. [TF] Water freezes at 50°C. [1pt] → False
    ```

=== "Standard Options"

    ```markdown
    2. [TF] The Earth orbits the Sun. [1pt]
    a) True [x]
    b) False

    3. [TF] Water freezes at 50°C. [1pt]
    a) True
    b) False [x]
    ```

**Arrow formats:** `→ True`, `→ False`, `-> True`, `-> False`

---

## Multiple Answers `[MA]`

Students select all correct answers. Use `*` prefix for each correct option.

=== "Markdown"

    ```markdown
    4. [MA] Which are prime numbers? [3pts]
    *a) 2
    b) 4
    *c) 7
    d) 9
    *e) 11
    ```

=== "With Feedback"

    ```markdown
    4. [MA] Which are prime numbers? [3pts]
    *a) 2 // Smallest prime
    b) 4 // 4 = 2 × 2
    *c) 7 // Correct!
    d) 9 // 9 = 3 × 3
    *e) 11 // Correct!
    ```

**Aliases:** `[MultiAns]`, `[SelectAll]`, `[MultipleAnswers]`

---

## Short Answer `[Short]`

Fill-in-the-blank with typed response. Multiple accepted answers supported.

=== "Single Answer"

    ```markdown
    5. [Short] The chemical symbol for water is ___. [2pts]

    Answer: H2O
    ```

=== "Multiple Accepted Answers"

    ```markdown
    6. [Short] What is the SI unit of force? [2pts]

    Answer: Newton
    Answer: N
    Answer: newton
    Answer: newtons
    ```

**Aliases:** `[ShortAnswer]`, `[FillIn]`, `[FITB]`, `[FIB]`

!!! tip "Case Sensitivity"
    Canvas matches answers case-insensitively by default.

---

## Numerical `[Num]`

Numeric answers with optional tolerance for acceptable range.

=== "Exact Answer"

    ```markdown
    7. [Num] What is 15 ÷ 3? [2pts]

    Answer: 5 ± 0
    ```

=== "With Tolerance"

    ```markdown
    8. [Num] Calculate π to 2 decimal places. [3pts]

    Answer: 3.14 ± 0.01
    ```

=== "Range Tolerance"

    ```markdown
    9. [Num] The acceleration due to gravity is approximately ___ m/s². [2pts]

    Answer: 9.8 ± 0.2
    ```

**Aliases:** `[Numeric]`, `[Numerical]`, `[Number]`

**Tolerance formats:**

| Format | Meaning |
|--------|---------|
| `± 0` | Exact match required |
| `± 0.01` | Small rounding tolerance |
| `± 5` | Wide range accepted |

---

## Essay `[Essay]`

Open-ended long-form response. No answer options needed.

=== "Basic"

    ```markdown
    10. [Essay, 10pts] Explain the process of photosynthesis.
    ```

=== "With Instructions"

    ```markdown
    11. [Essay, 15pts] Discuss the causes of World War I.

    Your response should:
    - Be at least 500 words
    - Include at least 3 primary causes
    - Cite specific historical events
    ```

**Aliases:** `[LongAnswer]`, `[OpenEnded]`

!!! note "Grading"
    Essay questions require manual grading in Canvas.

---

## Matching `[Match]`

Match items from two columns. Use `=>` or `::` separator.

=== "Arrow Syntax"

    ```markdown
    12. [Match] Match the country to its capital. [4pts]
    - France => Paris
    - Germany => Berlin
    - Italy => Rome
    - Spain => Madrid
    ```

=== "Double Colon Syntax"

    ```markdown
    13. [Match] Match the element to its symbol. [3pts]
    - Hydrogen :: H
    - Oxygen :: O
    - Carbon :: C
    ```

=== "With LaTeX"

    ```markdown
    14. [Match] Match the formula to its name. [4pts]
    - $\bar{x} = \frac{\sum x_i}{n}$ => Sample Mean
    - $s^2 = \frac{\sum(x_i - \bar{x})^2}{n-1}$ => Sample Variance
    - $\sigma = \sqrt{\frac{\sum(x_i - \mu)^2}{N}}$ => Population Standard Deviation
    ```

**Aliases:** `[Matching]`, `[MAT]`

---

## Fill-in-Multiple-Blanks `[FMB]`

Multiple blanks within a single question stem.

=== "Basic"

    ```markdown
    15. [FMB] Complete the equation. [4pts]

    The quadratic formula is x = [numerator] divided by [denominator].

    [numerator]: -b ± √(b²-4ac), -b plus or minus square root of b squared minus 4ac
    [denominator]: 2a
    ```

=== "Sentence Completion"

    ```markdown
    16. [FMB] Fill in the blanks. [3pts]

    In statistics, the [measure1] is the average value, while the [measure2] is the middle value.

    [measure1]: mean, average
    [measure2]: median, middle value
    ```

=== "Code Completion"

    ```markdown
    17. [FMB] Complete the Python code. [2pts]

    To print "Hello", use: [func]([arg])

    [func]: print
    [arg]: "Hello", 'Hello'
    ```

**Aliases:** `[MultiBlanks]`, `[FillInMultiple]`, `[FITB]`

**Syntax:**

1. Use `[blank_name]` in the question stem
2. Define answers at the end: `[blank_name]: answer1, answer2, ...`
3. Multiple accepted answers are comma-separated

---

## Quick Reference

| Type | Marker | Correct Answer | Use Case |
|------|--------|----------------|----------|
| Multiple Choice | `[MC]` | `[x]`, `**bold**`, `✓` | Single best answer |
| True/False | `[TF]` | `→ True/False` or `[x]` | Binary facts |
| Multiple Answers | `[MA]` | `*` prefix on each | Select all that apply |
| Short Answer | `[Short]` | `Answer: text` | Fill in the blank |
| Numerical | `[Num]` | `Answer: N ± tolerance` | Calculated values |
| Essay | `[Essay]` | None (manual grade) | Open-ended response |
| Matching | `[Match]` | `item => match` | Pair relationships |
| Fill Multiple Blanks | `[FMB]` | `[blank]: answers` | Multiple fill-ins |

---

## Complete Example

Here's an exam using multiple question types:

```markdown
# Statistics Midterm

# Section: Concepts

1. [MC] Which measure of central tendency is most affected by outliers? [2pts]
a) Mode
b) Median
c) Mean [x] // Correct - extreme values pull the mean
d) Range

2. [TF] The variance can be negative. [1pt] → False

3. [MA] Which are measures of spread? [2pts]
*a) Standard deviation
b) Mean
*c) Range
d) Median
*e) Variance

# Section: Calculations

4. [Num] Calculate the z-score for X=85 when μ=70 and σ=10. [3pts]

$$z = \frac{X - \mu}{\sigma}$$

Answer: 1.5 ± 0.01

5. [FMB] Complete the formula. [2pts]

The sample variance is calculated as [numerator] divided by [denominator].

[numerator]: Σ(x-x̄)², sum of squared deviations
[denominator]: n-1, n minus 1

# Section: Written Response

6. [Essay, 10pts] Explain the Central Limit Theorem and its importance in statistics.

Include:
- Definition
- Conditions for application
- Real-world example
```

---

## See Also

- [Syntax Reference](syntax.md) — Complete syntax reference
- [Getting Started](../getting-started.md) — Your first quiz
- [Templates](../starter/index.md) — Ready-to-use examples
