# Statistics Question Patterns

> **TL;DR** Ready-to-use question patterns for common statistics topics: hypothesis testing, confidence intervals, regression, and distributions.

**5 minutes** | Intermediate | CLI / Quarto

---

## Problem

You're writing a statistics exam and want well-structured question templates for common topics that convert cleanly to Canvas QTI.

## Solution

### Hypothesis Test Interpretation (MC)

```markdown
1. [MC] A researcher tests H₀: μ = 50 vs H₁: μ ≠ 50 and obtains
p = 0.03. At α = 0.05, what is the conclusion? [2pts]
a) Fail to reject H₀
b) Reject H₀ [x]
c) Accept H₁
d) The test is inconclusive
```

### Confidence Interval (Short Answer)

Use `= answer` syntax to accept multiple phrasings:

```markdown
2. [Short] A 95% confidence interval for μ is (42.3, 57.7).
What is the margin of error? [2pts]
= 7.7
= 7.70
```

### Distribution Shape (MC)

```markdown
3. [MC] A distribution has mean = 45, median = 52, and mode = 58.
The shape is: [2pts]
a) Positively skewed
b) Negatively skewed [x]
c) Symmetric
d) Bimodal
```

### Regression Interpretation (MC)

```markdown
4. [MC] In the regression equation ŷ = 3.2 + 1.5x, what does 1.5
represent? [2pts]
a) The y-intercept
b) The predicted value when x = 0
c) The average change in y for a one-unit increase in x [x]
d) The correlation coefficient
```

### Matching: Resistance to Outliers

```markdown
5. [Match] Match each statistic to its resistance to outliers. [3pts]
- Mean => Not resistant
- Median => Resistant
- Standard Deviation => Not resistant
- IQR => Resistant
```

### Fill-in-Multiple-Blanks: Hypothesis Testing

```markdown
6. [FMB] Complete the hypothesis testing statement. [2pts]
If p-value is [blank1] than α, we [blank2] the null hypothesis.

[blank1]: less, smaller, lower
[blank2]: reject
```

### True/False with Feedback

```markdown
7. [TF] A p-value of 0.02 means there is a 2% probability that
the null hypothesis is true. [1pt]
a) True // This is a common misconception.
b) False [x] // The p-value is the probability of observing data
this extreme given H₀ is true, not the probability that H₀ is true.
```

### Numerical Answer

```markdown
8. [Num] A sample of n = 36 has mean = 80 and standard deviation = 12.
What is the standard error of the mean? [2pts]
Answer: 2
```

## Explanation

Tips for writing effective statistics questions:

- **Use plausible distractors.** Base wrong answers on common student misconceptions (e.g., "Accept H₁" instead of "Reject H₀", confusing p-value interpretation).
- **Include units where appropriate.** Canvas renders Unicode characters like μ, σ, and ŷ correctly.
- **For short answer, list common phrasings.** Students may write "7.7" or "7.70" — the `= answer` syntax lets you accept both.
- **Match questions work well for terminology.** Canvas renders them as dropdown menus, making them efficient for concept pairing.
- **Use LaTeX for formulas.** Examark converts `$\bar{x}$` to Canvas-compatible `\(\bar{x}\)` automatically.
- **Inline feedback (`//`) is ideal for misconception correction.** Students see feedback immediately after answering in Canvas.

## See Also

- [Matching and FMB Questions](matching-fmb.md)
- [Question Types Reference](../markdown/question-types.md)
- [LaTeX Math Guide](../markdown/latex.md)
