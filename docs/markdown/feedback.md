# Feedback

Examark supports multiple feedback formats to help students learn from their answers.

---

## Feedback Types

| Type | When Shown | Use Case |
|------|------------|----------|
| **Inline** | Per-option | Explain why each answer is right/wrong |
| **Blockquote** | Per-option | Longer explanations |
| **General** | After submission | Overall question feedback |

---

## Inline Feedback

Use `//` to add feedback to any option:

```markdown
1. [MC] What is the capital of France? [2pts]
a) London // London is the capital of England
b) Paris [x] // Correct! Paris has been France's capital since 987 AD
c) Berlin // Berlin is the capital of Germany
d) Madrid // Madrid is the capital of Spain
```

### In Canvas

- Students see feedback after submitting
- Each option's feedback appears when that option is selected
- Correct answer feedback reinforces learning

---

## Blockquote Feedback

For longer explanations, use `>` on the line after an option:

```markdown
1. [MC] Which statistical test compares means of two groups? [3pts]

a) Chi-square test
> The chi-square test is used for categorical data, not comparing means.

b) t-test [x]
> Correct! The t-test compares means between two groups when
> the data is approximately normally distributed.

c) ANOVA
> ANOVA compares means across THREE or more groups, not just two.

d) Correlation
> Correlation measures the relationship between variables,
> not the difference in means.
```

### Multi-line Feedback

Continue blockquotes for longer explanations:

```markdown
b) t-test [x]
> Correct! The independent samples t-test is used when:
>
> - You have two independent groups
> - The dependent variable is continuous
> - Data is approximately normal
> - Variances are roughly equal
```

---

## General Feedback

Add overall feedback for the entire question using `> [feedback]`:

```markdown
1. [MC] What is 2 + 2? [1pt]
a) 3
b) 4 [x]
c) 5

> [feedback] This is basic addition. Remember that addition combines quantities.
```

### Placement

General feedback should be:
- After all options
- Separated by a blank line
- Marked with `> [feedback]`

```markdown
1. [TF] Correlation implies causation. [1pt]
a) True
b) False [x]

> [feedback] A common misconception! Correlation shows a relationship
> exists between variables, but doesn't prove one causes the other.
> Consider: ice cream sales and drowning deaths are correlated
> (both increase in summer), but one doesn't cause the other.
```

---

## Combining Feedback Types

Use all three types together:

```markdown
1. [MC] In hypothesis testing, what does a p-value of 0.03 indicate? [3pts]

a) The null hypothesis is definitely true
> A p-value never proves the null hypothesis is true.

b) There's a 3% chance the null hypothesis is true
> Common misconception! The p-value is NOT the probability
> that the null hypothesis is true.

c) If the null hypothesis were true, there's a 3% chance of getting results this extreme [x]
> Correct! This is the proper interpretation of a p-value.

d) The effect size is 3%
> The p-value doesn't tell us about effect size.

> [feedback] P-values are often misunderstood. Remember:
> - Small p-value → results unlikely under null hypothesis
> - p-value ≠ probability null is true
> - Statistical significance ≠ practical importance
```

---

## Feedback for Different Question Types

### True/False

```markdown
1. [TF] The mean is always greater than the median. [1pt]
a) True // Only true for right-skewed distributions
b) False [x] // Correct! In symmetric distributions they're equal; in left-skewed, median > mean

> [feedback] The relationship between mean and median depends on the distribution's shape.
```

### Multiple Answers

```markdown
1. [MA] Select all assumptions of linear regression. [4pts]
*a) Linearity // Yes! The relationship must be linear
b) Normality of X // X doesn't need to be normal, only residuals
*c) Independence // Yes! Observations must be independent
*d) Homoscedasticity // Yes! Constant variance of residuals
e) Equal sample sizes // Not required for regression

> [feedback] Remember: LINE - Linearity, Independence, Normality (of residuals), Equal variance
```

### Essay

Essays can have general feedback:

```markdown
1. [Essay, 10pts] Explain the Central Limit Theorem.

> [feedback] A strong answer should include:
> - Definition: sampling distribution of means approaches normal
> - Sample size requirement (typically n ≥ 30)
> - Why it matters for inference
> - Real-world application
```

### Numeric

```markdown
1. [Num] Calculate the z-score: x=85, μ=70, σ=10 [2pts]

Answer: 1.5 ± 0.01

> [feedback] Formula: z = (x - μ) / σ = (85 - 70) / 10 = 15/10 = 1.5
```

---

## Best Practices

### Do

- Explain **why** answers are correct/incorrect
- Provide learning opportunities in wrong-answer feedback
- Keep feedback concise but informative
- Use general feedback for broader concepts

### Don't

- Just say "Correct!" or "Wrong!"
- Give away answers to similar questions
- Write paragraphs for simple questions
- Forget feedback on wrong answers (they need it most!)

---

## Example: Complete Question

```markdown
1. [MC] A researcher finds r = 0.85 between study hours and exam scores.
   This means: [3pts]

a) Studying more causes higher scores
> Correlation doesn't prove causation. There could be confounding
> variables (e.g., motivation affects both studying and scores).

b) 85% of score variation is explained by study hours
> Close thinking, but that would be r² = 0.72 (72%), not r itself.

c) There's a strong positive linear relationship [x]
> Correct! r = 0.85 indicates a strong positive correlation.
> Values close to +1 show strong positive relationships.

d) The relationship is statistically significant
> We can't determine significance from r alone—we need
> the sample size and to conduct a hypothesis test.

> [feedback] Correlation coefficient (r) ranges from -1 to +1:
> - |r| > 0.7: Strong relationship
> - 0.3 < |r| < 0.7: Moderate relationship
> - |r| < 0.3: Weak relationship
>
> Remember: Correlation ≠ Causation!
```

---

## See Also

- [Syntax Reference](syntax.md) — Complete syntax guide
- [Question Types](question-types.md) — Examples for each type
