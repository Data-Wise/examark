# Quarto GFM Torture Test

## Section: Inline Code Edge Cases

1. [MC] What does `lm()` return in R? [1pt]
a) Data frame
b) **Model object**
c) Plot

2. [MC] Multiple `code` blocks `in` one `question`? [1pt]
a) **All render**
b) Some break

3. [MC] Code with special chars: `x < 5 && y > 10` works? [1pt]
a) **Yes**
b) No

4. [MC] Backticks in code: `sprintf("hello `world`")` ok? [1pt]
a) **Might break**
b) Fine

5. [MA] Select all valid: `NULL`, `NA`, `NaN`, `Inf` [1pt]
*a) `NULL` is null
*b) `NA` is missing
*c) `NaN` is not-a-number
*d) `Inf` is infinity

## Section: LaTeX Math Torture

6. [MC] Inline math: The mean is \(\bar{x} = \frac{\sum x}{n}\). Correct? [1pt]
a) **Yes**
b) No

7. [MC] Display math test [1pt]

The regression equation is:

\[
y = \beta_0 + \beta_1 x + \epsilon
\]

a) **Linear**
b) Nonlinear

8. [MC] Mixed: \(\alpha = 0.05\) and \[H_0: \mu = 0\] both work? [1pt]
a) **Yes**
b) No

9. [MC] Complex math: \(\hat{\beta} = (X^T X)^{-1} X^T y\) renders? [1pt]
a) **Should work**
b) Might break

10. [MC] Greek letters: \(\alpha, \beta, \gamma, \delta, \epsilon, \zeta\) [1pt]
a) **All show**
b) Some missing

## Section: Comparison Operators

11. [MC] For p < 0.05, reject H₀? [1pt]
a) **Yes**
b) No

12. [MC] If x > 100 and y <= 50, what's true? [1pt]
a) x < y
b) **x > y**

13. [MC] Range: 5 < x < 10 means? [1pt]
a) x outside range
b) **x between 5 and 10**

14. [MC] Operators: <=, >=, !=, == all work? [1pt]
a) **Most do**
b) None

15. [TF] Statement: mean(x) < median(x) implies left skew [1pt]
a) **True**
b) False

## Section: Negative Numbers (Parser Killer)

16. [MC] Model output [2pts]

Coefficient estimates:
  • Intercept = 10.5, SE = 2.1
  • Age = -0.45, SE = 0.12, t = -3.75, p < 0.001
  • Treatment = -2.3, SE = 0.8, t = -2.88, p = 0.004

What does Age coefficient mean?

a) **Each year decreases outcome by 0.45**
b) Each year increases outcome

17. [MC] Correlation interpretation [1pt]

Output shows:
  • r = -0.82, p < 0.001
  • 95% CI: [-0.89, -0.71]

Conclusion?

a) No relationship
b) **Strong negative**

18. [MC] ANOVA results [2pts]

Source table:
  • Between groups: SS = 245.3, df = 3, F = 12.4, p < 0.001
  • Within groups: SS = 456.8, df = 96
  • Total: SS = 702.1, df = 99

Significant?

a) **Yes, reject null**
b) No

19. [MC] Regression diagnostics [1pt]

Residual plot shows:
  • Mean residual: -0.002
  • SD: 3.45
  • Range: [-8.2, 9.7]

Interpretation?

a) Heteroscedastic
b) **Roughly normal**

## Section: Multi-line HTML & Images

20. [MC] Question with embedded figure [1pt]

<div id="fig-example" class="quarto-figure">
<img src="plot.png"
     alt="Residual plot showing random scatter"
     style="width: 500px" />
</div>

What does this show?

a) **Homoscedasticity**
b) Pattern

## Section: Escaped Characters from Quarto

21. [MC] In Quarto GFM, \< becomes &lt; and \> becomes &gt;? [1pt]
a) **Yes**
b) No

22. [MC] Test escaped: x \< 5 should render as x &lt; 5? [1pt]
a) **Correct**
b) Wrong

## Section: Complex Combinations

23. [MC] Kitchen sink question [3pts]

Given model: `lm(y ~ x1 + x2)` with output:

Coefficients:
  • Intercept: 12.5 (SE = 2.1, p < 0.001)
  • x1: -0.67 (SE = 0.15, p < 0.001)
  • x2: 0.34 (SE = 0.08, p < 0.001)

Model fit: \(R^2 = 0.76\), \(F(2, 97) = 152.3\), \(p < 0.001\)

For interpretation where x1 > 10 and x2 <= 5, what's the prediction?

a) \(\hat{y} = 12.5 - 0.67x_1 + 0.34x_2\)
b) **Need actual values**
c) Cannot determine

24. [MA] Select ALL true about code `summary(model)`: [2pts]
*a) Shows coefficients
*b) Shows \(R^2\)
*c) Shows p-values
d) Shows raw data

25. [Essay] Complex explanation [10pts]

Explain why in the model output:

```r
Call:
lm(formula = mpg ~ wt + hp, data = mtcars)

Coefficients:
            Estimate Std. Error t value Pr(>|t|)
(Intercept)  37.2273     1.5988  23.285  < 2e-16 ***
wt           -3.8778     0.6327  -6.129 1.12e-06 ***
hp           -0.0318     0.0090  -3.519  0.00145 **
```

The coefficient for `wt` is -3.8778. What does this mean in context where all else is held constant and typical weights are 2.5 < wt < 5.5?

## Section: Feedback with Quarto Features

26. [MC] Question with inline code feedback [1pt]

What does `mean(c(1, 2, NA))` return?

a) 1.5 // Wrong: `mean()` needs `na.rm = TRUE`
b) **NA** // Correct: `NA` propagates without `na.rm = TRUE`
c) Error

> [feedback] Remember: In R, `mean()` returns `NA` if any values are `NA` unless you specify `na.rm = TRUE`.

27. [TF] Hypothesis test statement [1pt]

For \(H_0: \mu = 100\) vs \(H_a: \mu \neq 100\) with p = 0.03, reject \(H_0\) at \(\alpha = 0.05\)?

a) **True** // Correct: p < \(\alpha\) means reject
b) False // Wrong: When p < \(\alpha\), we reject \(H_0\)

## Section: Matching with Code & Math

28. [Match] Match R function to output [4pts]

Match the function to what it returns:

- `lm()` => Linear model object
- `summary()` => Detailed statistics
- `coef()` => Coefficient vector
- `predict()` => Predicted values

29. [FMB] Fill-in-multiple-blanks with code [3pts]

In R, to fit a linear model, use [blank1]. To get \(R^2\), use [blank2] on the model. To test if slope \(\neq\) 0, check the [blank3].

[blank1]: lm(), lm(y ~ x)
[blank2]: summary(), summary(model)$r.squared
[blank3]: p-value, t-statistic

## Section: Stress Test - All Features Combined

30. [MC] Ultimate torture question [5pts]

You run the following R code:

```r
model <- lm(yield ~ fertilizer + water, data = crops)
summary(model)
```

Output shows:

Coefficients:
  • (Intercept): 45.2 (SE = 3.1, t = 14.6, p < 2e-16)
  • fertilizer: -0.82 (SE = 0.15, t = -5.47, p < 0.001)
  • water: 1.23 (SE = 0.21, t = 5.86, p < 0.001)

Model: \(R^2 = 0.68\), \(F(2, 47) = 49.2\), \(p < 0.001\)

For plots where:
  • Residuals show mean ≈ 0, SD = 4.2
  • Q-Q plot is roughly linear
  • Fitted vs residuals shows random scatter

Given fertilizer > 50 and water <= 20, if we increase water by 1 unit while holding fertilizer constant, the model predicts yield will:

a) Decrease by 0.82 units
b) **Increase by 1.23 units**
c) Increase by 45.2 units
d) Cannot determine without actual values

> [feedback] The coefficient for `water` is 1.23, meaning for each 1-unit increase in water (holding fertilizer constant), yield increases by 1.23 units. The inequality constraints water <= 20 tell us the range but don't affect the interpretation of the slope. The model equation is: \(\hat{y} = 45.2 - 0.82 \times \text{fertilizer} + 1.23 \times \text{water}\).
