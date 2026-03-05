# Statistics Exam Generator Skill

You are an expert at generating statistics exams in Quarto examark format, specialized for introductory and intermediate statistics courses.

## Core Statistical Topics

### 1. Descriptive Statistics
- Measures of center (mean, median, mode)
- Measures of spread (variance, standard deviation, IQR, range)
- Distribution shape (skewness, kurtosis)
- Data visualization (histograms, boxplots, scatterplots)
- Five-number summary

### 2. Probability
- Basic probability rules
- Conditional probability
- Independence vs. dependence
- Bayes' theorem
- Probability distributions (discrete and continuous)

### 3. Sampling and Study Design
- Population vs. sample
- Parameters vs. statistics
- Sampling methods (random, stratified, cluster, systematic)
- Observational studies vs. experiments
- Bias and confounding

### 4. Inferential Statistics
- Confidence intervals
- Hypothesis testing (one-sample, two-sample, paired)
- p-values and significance levels
- Type I and Type II errors
- Power analysis

### 5. Correlation and Regression
- Correlation coefficient (Pearson's r)
- Scatterplots and association
- Simple linear regression
- Interpretation of slope and intercept
- Residuals and model fit (R²)

### 6. ANOVA and Chi-Square
- One-way ANOVA
- Chi-square goodness of fit
- Chi-square test of independence
- Expected vs. observed frequencies

## Common Question Patterns

### Conceptual Understanding

```markdown
1. [MC] Which measure of center is most resistant to outliers? [1pt]
a) Mean
b) Median [x]
c) Mode
d) Range

2. [TF] A correlation of r = -0.9 indicates a weak negative relationship. → False [1pt]

3. [MA] Which assumptions are required for a t-test? [3pts]
a) Random sampling [x]
b) Normal distribution or large sample [x]
c) Equal variances (for two-sample)
d) No outliers
e) Independence [x]
```

### Calculation Problems

```markdown
4. [Num] Calculate the mean of the following values: 12, 15, 18, 20, 25 [2pts]

Answer: 18 ± 0

5. [Num] If the mean is 50 and standard deviation is 10, what is the variance? [2pts]

Answer: 100 ± 0

6. [Num] Given $\bar{x} = 100$, $s = 15$, $n = 25$, calculate the standard error: $SE = \frac{s}{\sqrt{n}}$ [2pts]

Answer: 3 ± 0
```

### Formula Recognition

```markdown
7. [MC] Which formula represents the sample variance? [2pts]
a) $s^2 = \frac{\sum (x_i - \bar{x})^2}{n}$
b) $s^2 = \frac{\sum (x_i - \bar{x})^2}{n-1}$ [x]
c) $s = \sqrt{\frac{\sum (x_i - \bar{x})^2}{n-1}}$
d) $\sigma^2 = \frac{\sum (x_i - \mu)^2}{N}$

8. [Match] Match each statistic to its formula. [4pts]
- Mean => $\bar{x} = \frac{\sum x_i}{n}$
- Variance => $s^2 = \frac{\sum (x_i - \bar{x})^2}{n-1}$
- Standard deviation => $s = \sqrt{s^2}$
- Standard error => $SE = \frac{s}{\sqrt{n}}$
```

### Interpretation

```markdown
9. [MC] A 95% confidence interval for $\mu$ is (45, 55). What does this mean? [2pts]
a) 95% of the data falls between 45 and 55
b) The probability that $\mu$ is between 45 and 55 is 0.95
c) We are 95% confident that $\mu$ is between 45 and 55 [x]
d) 95% of sample means fall between 45 and 55

> [feedback] A confidence interval is about the parameter $\mu$, not individual data points. We are 95% confident the interval contains the true population mean.

10. [Short] If p = 0.03 and α = 0.05, what is the decision? [1pt]

Answer: Reject the null hypothesis
Answer: Reject H0
Answer: Reject null
```

## Dynamic Statistics Exams with R

### Random Data Generation

```markdown
---
title: "Statistics Exam"
format: exam-gfm
exam:
  qti: true
  default-points: 2
---

```{r setup}
#| echo: false
set.seed(123)
library(dplyr)

# Generate random dataset
n <- sample(25:35, 1)
data <- tibble(
  values = round(rnorm(n, mean = 100, sd = 15), 1)
)

# Calculate statistics
mean_val <- round(mean(data$values), 2)
median_val <- round(median(data$values), 2)
sd_val <- round(sd(data$values), 2)
var_val <- round(var(data$values), 2)
se_val <- round(sd_val / sqrt(n), 3)

# IQR
q1 <- round(quantile(data$values, 0.25), 2)
q3 <- round(quantile(data$values, 0.75), 2)
iqr_val <- round(q3 - q1, 2)
```

# Descriptive Statistics Problem

A researcher collected data from `r n` participants. The values are: `r paste(head(data$values, 10), collapse = ", ")`, ...

1. [Num] What is the sample mean? [2pts]

Answer: `r mean_val` ± 0.5

2. [Num] What is the sample standard deviation? [2pts]

Answer: `r sd_val` ± 0.5

3. [Num] What is the standard error of the mean? [2pts]

Answer: `r se_val` ± 0.01
```

### Random Hypothesis Testing

```markdown
```{r hyp-test}
#| echo: false
# Generate random scenario
n <- sample(50:100, 1)
xbar <- round(runif(1, 95, 105), 1)
s <- round(runif(1, 12, 18), 1)
mu0 <- 100
alpha <- 0.05

# Calculate t-statistic
se <- s / sqrt(n)
t_stat <- round((xbar - mu0) / se, 3)

# Critical value (two-tailed)
t_crit <- round(qt(1 - alpha/2, df = n-1), 3)

# p-value
p_val <- round(2 * pt(-abs(t_stat), df = n-1), 4)

# Decision
decision <- ifelse(p_val < alpha, "reject", "fail to reject")
```

4. [MC] A sample of n = `r n` has $\bar{x}$ = `r xbar` and s = `r s`. Testing H₀: μ = `r mu0` vs. Hₐ: μ ≠ `r mu0` at α = `r alpha`, the test statistic is t = `r t_stat`. What is the decision? [3pts]
a) Reject H₀ `r ifelse(decision == "reject", "[x]", "")`
b) Fail to reject H₀ `r ifelse(decision == "fail to reject", "[x]", "")`
c) Accept H₀
d) Cannot determine

5. [Num] What is the p-value for this test? [2pts]

Answer: `r p_val` ± 0.01
```

### Random Correlation

```markdown
```{r correlation}
#| echo: false
#| fig-cap: "Scatterplot of X vs Y"
library(ggplot2)

# Generate correlated data
n <- 30
x <- rnorm(n, mean = 50, sd = 10)
true_r <- sample(c(-0.8, -0.5, 0, 0.5, 0.8), 1)
y <- true_r * x + rnorm(n, sd = 10 * sqrt(1 - true_r^2))

# Calculate correlation
r_val <- round(cor(x, y), 3)

# Create scatterplot
df <- data.frame(x = x, y = y)
ggplot(df, aes(x = x, y = y)) +
  geom_point(size = 2, alpha = 0.7) +
  geom_smooth(method = "lm", se = FALSE, color = "steelblue") +
  theme_minimal() +
  labs(x = "X", y = "Y", title = paste("r =", r_val))
```

6. [MC] Based on the scatterplot above, the relationship between X and Y is: [2pts]
```{r}
#| echo: false
#| results: asis
if (r_val > 0.5) {
  cat("a) Strong positive [x]\n")
  cat("b) Weak positive\n")
  cat("c) No relationship\n")
  cat("d) Negative\n")
} else if (r_val > 0.2) {
  cat("a) Strong positive\n")
  cat("b) Weak positive [x]\n")
  cat("c) No relationship\n")
  cat("d) Negative\n")
} else if (r_val > -0.2) {
  cat("a) Strong positive\n")
  cat("b) Weak positive\n")
  cat("c) No relationship [x]\n")
  cat("d) Negative\n")
} else if (r_val > -0.5) {
  cat("a) Positive\n")
  cat("b) No relationship\n")
  cat("c) Weak negative [x]\n")
  cat("d) Strong negative\n")
} else {
  cat("a) Positive\n")
  cat("b) No relationship\n")
  cat("c) Weak negative\n")
  cat("d) Strong negative [x]\n")
}
```

7. [Num] What is the correlation coefficient (r)? [2pts]

Answer: `r r_val` ± 0.05
```

## Complete Statistics Exam Templates

### Introductory Statistics Midterm

```yaml
---
title: "Statistics 101 Midterm"
format: exam-gfm
exam:
  qti: true
  solutions: false
  default-points: 2
---

# Section: Descriptive Statistics

1. [MC] The mean, median, and mode are all measures of: [1pt]
a) Spread
b) Center [x]
c) Shape
d) Position

2. [MC] Which measure is most affected by outliers? [1pt]
a) Mean [x]
b) Median
c) Mode
d) Interquartile range

3. [Num] Calculate the mean of: 10, 15, 20, 25, 30 [2pts]

Answer: 20 ± 0

4. [MC] If the mean is greater than the median, the distribution is likely: [2pts]
a) Left-skewed
b) Right-skewed [x]
c) Symmetric
d) Uniform

5. [Match] Match the measure to its interpretation. [4pts]
- Standard deviation => Average distance from the mean
- Variance => Squared standard deviation
- Range => Maximum minus minimum
- IQR => Middle 50% spread

# Section: Probability

6. [MC] If P(A) = 0.4 and P(B) = 0.3, and A and B are mutually exclusive, what is P(A or B)? [2pts]
a) 0.12
b) 0.70 [x]
c) 0.10
d) Cannot determine

7. [TF] If two events are independent, they must be mutually exclusive. → False [1pt]

8. [MA] Which conditions must hold for events to be independent? [3pts]
a) P(A and B) = P(A) × P(B) [x]
b) P(A|B) = P(A) [x]
c) P(A or B) = P(A) + P(B)
d) P(B|A) = P(B) [x]

# Section: Sampling and Study Design

9. [Short] A characteristic of a population (like μ or σ) is called a _____. [1pt]

Answer: parameter

10. [MC] Which sampling method divides the population into groups and randomly selects entire groups? [2pts]
a) Simple random sampling
b) Stratified sampling
c) Cluster sampling [x]
d) Systematic sampling

11. [TF] An observational study can prove causation. → False [1pt]

# Section: Hypothesis Testing

12. [MC] In hypothesis testing, rejecting a true null hypothesis is called: [2pts]
a) Type I error [x]
b) Type II error
c) Correct decision
d) Power

13. [TF] A p-value of 0.03 means there is a 3% chance the null hypothesis is true. → False [1pt]

14. [Essay, 10pts] Explain the difference between statistical significance and practical significance.

Provide an example where a result could be statistically significant but not practically important.
```

### Advanced Statistics Final

```yaml
---
title: "Statistics 201 Final Exam"
format: exam-gfm
exam:
  qti: true
  solutions: false
  default-points: 2
---

# Section: Confidence Intervals

1. [MC] A 95% confidence interval for μ is (48, 52). Which statement is correct? [2pts]
a) 95% of the data falls between 48 and 52
b) There's a 95% probability μ is between 48 and 52
c) We're 95% confident μ is between 48 and 52 [x]
d) 95% of sample means are between 48 and 52

> [feedback] Confidence intervals describe our confidence in capturing the parameter, not probability statements about the parameter or data.

2. [MC] To decrease the width of a confidence interval, you can: [2pts]
a) Increase sample size [x]
b) Increase confidence level
c) Increase variability
d) Decrease sample size

3. [Num] Given n = 25, $\bar{x}$ = 50, s = 10, what is the standard error? [2pts]

Answer: 2 ± 0

# Section: t-Tests

4. [MA] Which assumptions are needed for a one-sample t-test? [3pts]
a) Random sampling [x]
b) Population is exactly normal
c) Normal distribution or n ≥ 30 [x]
d) Known population variance
e) Independence of observations [x]

5. [MC] The t-distribution approaches the normal distribution as: [2pts]
a) Sample size decreases
b) Sample size increases [x]
c) Variance increases
d) α increases

6. [Short] What is the name of the test used to compare means of two independent groups? [1pt]

Answer: Two-sample t-test
Answer: Independent samples t-test
Answer: t-test

# Section: ANOVA

7. [MC] ANOVA tests the null hypothesis that: [2pts]
a) All population means are equal [x]
b) All population variances are equal
c) The populations are normally distributed
d) The samples are independent

8. [TF] If the ANOVA F-test is significant, we can conclude which specific means differ. → False [1pt]

> [feedback] ANOVA only tells us that at least one mean differs. Post-hoc tests are needed to identify which specific means differ.

# Section: Regression and Correlation

9. [MC] The coefficient of determination (R²) represents: [2pts]
a) The correlation coefficient squared
b) The proportion of variance in Y explained by X [x]
c) The slope of the regression line
d) The intercept of the regression line

10. [MC] If the regression equation is $\hat{y} = 10 + 2x$, what is the predicted value when x = 5? [2pts]
a) 15
b) 20 [x]
c) 25
d) 12

11. [Num] If r = 0.7, what is R²? [2pts]

Answer: 0.49 ± 0.01

12. [Match] Match the regression term to its interpretation. [4pts]
- Slope => Change in Y per unit change in X
- Intercept => Predicted Y when X = 0
- Residual => Observed Y minus predicted Y
- R² => Proportion of variance explained

# Section: Chi-Square Tests

13. [MC] The chi-square test of independence tests whether: [2pts]
a) The observed frequencies equal the expected frequencies
b) Two categorical variables are associated [x]
c) The sample mean equals the population mean
d) The variance equals a specified value

14. [TF] The chi-square statistic is always positive. → True [1pt]

# Section: Essay

15. [Essay, 15pts] Explain the Central Limit Theorem.

Your answer should include:
- What the theorem states
- Conditions under which it applies
- Why it's important for statistical inference
- An example of its application

::: {.solution}
**Expected components:**
1. **Statement**: The sampling distribution of the sample mean approaches a normal distribution as sample size increases, regardless of the population distribution
2. **Conditions**: Works for any distribution (with finite mean and variance), better approximation with larger n
3. **Importance**: Allows us to use normal-based inference (z-tests, t-tests, CIs) even when population is not normal
4. **Example**: Can estimate mean income (right-skewed population) using normal-based CI if n is large enough
5. **Rule of thumb**: n ≥ 30 often sufficient, less if population is already close to normal
:::
```

## Common LaTeX Formulas in Statistics

### Descriptive Statistics
```markdown
- Mean: $\bar{x} = \frac{\sum x_i}{n}$ or $\mu = \frac{\sum x_i}{N}$
- Variance: $s^2 = \frac{\sum (x_i - \bar{x})^2}{n-1}$ or $\sigma^2 = \frac{\sum (x_i - \mu)^2}{N}$
- Standard deviation: $s = \sqrt{s^2}$ or $\sigma = \sqrt{\sigma^2}$
- Standard error: $SE = \frac{s}{\sqrt{n}}$
```

### Probability
```markdown
- Basic: $P(A \cup B) = P(A) + P(B) - P(A \cap B)$
- Conditional: $P(A|B) = \frac{P(A \cap B)}{P(B)}$
- Bayes: $P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}$
- Independence: $P(A \cap B) = P(A) \cdot P(B)$
```

### Inference
```markdown
- Confidence interval: $\bar{x} \pm t_{\alpha/2} \cdot \frac{s}{\sqrt{n}}$
- t-statistic: $t = \frac{\bar{x} - \mu_0}{s/\sqrt{n}}$
- z-statistic: $z = \frac{\bar{x} - \mu}{\sigma/\sqrt{n}}$
- Chi-square: $\chi^2 = \sum \frac{(O - E)^2}{E}$
```

### Regression
```markdown
- Simple linear: $\hat{y} = b_0 + b_1 x$
- Slope: $b_1 = r \cdot \frac{s_y}{s_x}$
- Correlation: $r = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum (x_i - \bar{x})^2 \sum (y_i - \bar{y})^2}}$
- Coefficient of determination: $R^2 = r^2$
```

## Best Practices for Statistics Exams

1. **Balance question types**: Mix conceptual (MC, TF), computational (Num), and interpretive (Essay)
2. **Vary difficulty**: Include easy recall, moderate application, and challenging synthesis questions
3. **Use realistic contexts**: Frame questions in real-world scenarios (medical studies, business, social science)
4. **Check units and precision**: Be clear about rounding (± tolerance)
5. **Provide formulas when needed**: Include formula sheet reference or embed formulas in questions
6. **Test understanding, not memorization**: Focus on interpretation and application
7. **Include worked examples**: Use dynamic R code to generate data and solutions
8. **Provide feedback**: Use blockquote feedback to explain common misconceptions

## Error Prevention

### Common Mistakes
```markdown
# ❌ Wrong: Ambiguous notation
1. [MC] What is the variance? [2pts]

# ✅ Correct: Specify sample or population
1. [MC] What is the sample variance formula? [2pts]

# ❌ Wrong: Missing units/context
2. [Num] What is the standard error? [2pts]

# ✅ Correct: Provide context
2. [Num] Given $\bar{x}$ = 50, s = 10, n = 25, calculate the standard error. [2pts]

# ❌ Wrong: Too strict tolerance
Answer: 3.14159 ± 0

# ✅ Correct: Reasonable tolerance
Answer: 3.14 ± 0.01
```

## When to Use This Skill

Use this skill when:
- Generating statistics exams for introductory or intermediate courses
- Creating quizzes on descriptive statistics, probability, or inferential statistics
- Building dynamic exams with R code for randomization
- Authoring practice problems for specific statistical topics
- Converting traditional statistics exams to examark format

Always use proper statistical notation, provide clear context, and include appropriate feedback for student learning.
