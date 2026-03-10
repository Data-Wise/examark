# Table Conversion Test Questions

## 1. Based on the ANOVA table below, what is the F-statistic for the treatment effect? [2 pts]

| Source    | df | MS    | F     |
|-----------|----|-------|-------|
| Between   | 2  | 45.30 | 12.11 |
| Within    | 27 | 3.74  |       |
| Total     | 29 |       |       |

a) 12.11 [x]
b) 45.30
c) 3.74
d) 29

## 2. Which variable has the highest mean based on the descriptive statistics? [2 pts]

| Variable | N   |  Mean  | Std Dev |
|:---------|:---:|-------:|--------:|
| Pretest  | 30  |  72.45 |    8.31 |
| Posttest | 30  |  81.20 |    7.56 |
| Followup | 30  |  78.90 |    9.12 |

a) Pretest
b) Posttest [x]
c) Followup
d) Cannot be determined

## 3. Based on the regression output, which predictor is statistically significant? [3 pts]

| Predictor          | $\hat{\beta}$ | $SE$  | $t$   | $p$       |
|--------------------|----------------|-------|-------|-----------|
| Intercept          | $12.45$        | $2.31$ | $5.39$ | $< 0.001$ |
| $X_1$ (Age)        | $0.87$         | $0.42$ | $2.07$ | $0.043$   |
| $X_2$ (Income)     | $0.12$         | $0.15$ | $0.80$ | $0.427$   |
| $\mu$ (Group Mean) | $-1.34$        | $0.61$ | $-2.20$ | $0.032$  |

a) Only $X_1$ (Age)
b) Only $X_2$ (Income)
c) Both $X_1$ and $\mu$ (Group Mean) [x]
d) All predictors are significant

## 4. A researcher collected anxiety scores before and after an intervention. Compare the two distributions and select the correct interpretation. [3 pts]

**Pre-intervention:**

| Statistic | Value |
|-----------|-------|
| Mean      | 42.7  |
| Median    | 44.0  |
| SD        | 11.3  |
| Skewness  | -0.85 |

**Post-intervention:**

| Statistic | Value |
|-----------|-------|
| Mean      | 31.2  |
| Median    | 30.5  |
| SD        | 8.6   |
| Skewness  | 0.12  |

a) The intervention reduced anxiety and the post distribution is more symmetric [x]
b) The intervention had no meaningful effect on anxiety
c) The post-intervention distribution is more skewed than pre
d) The standard deviation increased after the intervention

## 5. Which of the following correctly represents a chi-square test result? [2 pts]

a) The test was not significant at any conventional level

b) The following result was obtained:

| | Observed | Expected |
|---------|----------|----------|
| Category A | 25 | 20 |
| Category B | 15 | 20 |
| Category C | 20 | 20 |

with $\chi^2(2) = 2.50$, $p = 0.287$ [x]

c) The expected frequencies were all equal to zero

d) The test had negative degrees of freedom

## 6. A sample of 40 students took a statistics exam. The mean score was 74.5 with a standard deviation of 12.3. What is the 95% confidence interval for the population mean? [2 pts]

a) (70.57, 78.43)
b) (70.68, 78.32) [x]
c) (72.20, 76.80)
d) (62.20, 86.80)

> [feedback] The 95% CI uses $z^* = 1.96$ for large samples:
>
> | Component       | Formula              | Value  |
> |-----------------|----------------------|--------|
> | Standard Error  | $s / \sqrt{n}$       | 1.945  |
> | Margin of Error | $z^* \times SE$      | 3.812  |
> | Lower Bound     | $\bar{x} - ME$       | 70.688 |
> | Upper Bound     | $\bar{x} + ME$       | 78.312 |
>
> Rounding gives (70.68, 78.32).

## 7. Examine the frequency table below. How many categories have fewer than 10 observations? [2 pts]

| Category | Frequency | Relative Freq |
|----------|-----------|---------------|
| A        | 15        | 0.25          |
| B        |           | 0.08          |
| C        | 8         | 0.13          |
| D        |           |               |
| E        | 22        | 0.37          |
| F        | 5         | 0.08          |

a) 1
b) 2 [x]
c) 3
d) 4
