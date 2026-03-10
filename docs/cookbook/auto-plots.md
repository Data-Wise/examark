# Auto-Generated Plots

> **TL;DR** Embed auto-generated R and Python plots directly in Canvas quiz questions

**5 minutes** | Intermediate | Quarto + R or Python

---

## Problem

You want students to interpret plots (histograms, scatterplots) that are dynamically generated from data, not static images. The figures need to be bundled into the QTI package so Canvas can display them.

## Solution

### R Histograms

````markdown
```{r hist-data, include=FALSE}
set.seed(42)
scores <- rnorm(100, mean = 75, sd = 12)
skewness_val <- round(moments::skewness(scores), 2)
```

```{r histogram, fig.cap="Distribution of Exam Scores"}
hist(scores,
     main = "Exam Score Distribution",
     xlab = "Score",
     ylab = "Frequency",
     col = "steelblue",
     border = "white",
     breaks = 15)
abline(v = mean(scores), col = "red", lwd = 2, lty = 2)
```

## 2. Distribution Shape [2 pts]

Based on the histogram above, this distribution is:

a) Strongly positively skewed
b) Strongly negatively skewed
c) **Approximately symmetric** [correct]
d) Uniform
````

### R Scatterplots with Regression

````markdown
```{r regression-setup, include=FALSE}
set.seed(42)
n <- 50
hours <- runif(n, 1, 10)
scores <- 45 + 5 * hours + rnorm(n, 0, 8)
model <- lm(scores ~ hours)
b0 <- round(coef(model)[1], 1)
b1 <- round(coef(model)[2], 2)
r_sq <- round(summary(model)$r.squared, 3)
```

```{r scatterplot, fig.cap="Study Hours vs Exam Score"}
plot(hours, scores,
     main = "Study Hours vs. Exam Score",
     xlab = "Hours Studied",
     ylab = "Exam Score",
     pch = 19,
     col = alpha("steelblue", 0.7))
abline(model, col = "red", lwd = 2)
mtext(paste0("ŷ = ", b0, " + ", b1, "x"),
      side = 3, line = 0, cex = 0.9)
```
````

### Python Setup

````markdown
```{python setup}
import numpy as np
import matplotlib.pyplot as plt
np.random.seed(42)
```

```{python values}
# Generate random data
n = np.random.randint(20, 50)
sample = np.random.normal(100, 15, n)
sample_mean = round(np.mean(sample), 1)
sample_std = round(np.std(sample, ddof=1), 1)
```
````

### Python Figures

````markdown
```{python histogram}
#| fig-cap: "Sample Distribution"
plt.figure(figsize=(8, 5))
plt.hist(sample, bins=15, color='steelblue', edgecolor='white')
plt.axvline(sample_mean, color='red', linestyle='--', linewidth=2)
plt.xlabel('Value')
plt.ylabel('Frequency')
plt.title('Sample Distribution')
plt.show()
```
````

## Explanation

- **Examark automatically bundles R-generated figures** from Quarto into QTI packages -- no manual image handling needed.
- **Use `fig.cap` for accessibility** -- Canvas displays captions as alt text for screen readers.
- **Reference figures in the question stem that follows the code chunk** -- Quarto figure divs are automatically prepended to the next question.
- **Python uses `#| fig-cap:` comment syntax** instead of the R chunk option `fig.cap=`.
- **Both R and Python figures** are resolved relative to the input file directory and copied into the QTI package's `images/` folder.

## See Also

- [Randomized Values](randomized-values.md) -- R code chunks for random parameters
- [Multiple Versions](multiple-versions.md) -- Generate N exam versions from one source
- [Quarto Extension Reference](../extensions/quarto.md) -- All configuration options
