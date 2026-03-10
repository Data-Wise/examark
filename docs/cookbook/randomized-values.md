# Randomized Values with R

> **TL;DR** Generate unique exam questions with randomized values using R code chunks in Quarto

**5 minutes** | Intermediate | Quarto + R

---

## Problem

You want each student (or exam version) to see different numbers, but still have correct answers computed automatically. Manually creating multiple versions is tedious and error-prone.

## Solution

### Setup Chunk

Every dynamic exam starts with a setup chunk that controls reproducibility:

````markdown
```{r setup, include=FALSE}
# CRITICAL: Set seed for reproducibility
set.seed(42)  # Change for different versions

# Load packages
library(knitr)

# Configure chunks
knitr::opts_chunk$set(
  echo = FALSE,      # Hide code
  warning = FALSE,   # Hide warnings
  message = FALSE    # Hide messages
)
```
````

### Random Values Pattern

Generate random parameters and compute derived values:

```r
# Generate random data
sample_size <- sample(20:50, 1)
sample_mean <- round(runif(1, 50, 100), 1)
sample_sd <- round(runif(1, 5, 15), 1)

# Compute derived values
std_error <- sample_sd / sqrt(sample_size)
t_critical <- qt(0.975, sample_size - 1)
margin_error <- t_critical * std_error

# Confidence interval bounds
ci_lower <- round(sample_mean - margin_error, 2)
ci_upper <- round(sample_mean + margin_error, 2)
```

### Creating Plausible Distractors

Good distractors are based on common student errors:

```r
correct_answer <- ci_upper - ci_lower  # Width of CI

# Distractor 1: Forgot to multiply by 2
wrong_1 <- margin_error

# Distractor 2: Used wrong t-value
wrong_2 <- round(1.96 * std_error * 2, 2)

# Distractor 3: Random plausible value
wrong_3 <- round(correct_answer * runif(1, 0.5, 0.8), 2)
```

### Full Question Example

````markdown
```{r ci-setup, include=FALSE}
set.seed(42)
n <- sample(25:40, 1)
xbar <- round(runif(1, 70, 90), 1)
s <- round(runif(1, 8, 15), 1)
se <- s / sqrt(n)
t_crit <- round(qt(0.975, n-1), 3)
me <- round(t_crit * se, 2)
ci_lower <- round(xbar - me, 2)
ci_upper <- round(xbar + me, 2)
```

## 1. Confidence Interval [3 pts]

A sample of n = `r n` students has a mean score of $\bar{x}$ = `r xbar` with standard deviation s = `r s`.

Calculate the 95% confidence interval for the population mean.

a) (`r ci_lower - 2`, `r ci_upper + 2`)
b) (`r ci_lower + 1`, `r ci_upper - 1`)
c) **(`r ci_lower`, `r ci_upper`)** [correct]
d) (`r xbar - s`, `r xbar + s`)

::: {.solution}
SE = s/√n = `r s`/√`r n` = `r round(se, 3)`

t* = `r t_crit` (df = `r n-1`)

ME = t* × SE = `r t_crit` × `r round(se, 3)` = `r me`

CI = (`r xbar` ± `r me`) = (`r ci_lower`, `r ci_upper`)
:::
````

## Explanation

- **`set.seed()` ensures reproducibility** — the same seed always produces the same random values. Change the seed to get a different exam version.
- **Distractors based on common student errors** (forgetting to multiply by 2, using z instead of t) are more pedagogically valuable than random wrong answers.
- **Use `[correct]` marker with R inline code** for reliability — the bold marker `**...**` can conflict with inline R expressions containing asterisks.
- **Compute everything from the random inputs** — never hardcode derived values, or they won't match when the seed changes.

## See Also

- [Auto-Generated Plots](auto-plots.md) — Embed R/Python figures in questions
- [Multiple Versions](multiple-versions.md) — Generate N exam versions from one source
- [Quarto Setup](quarto-setup.md) — Initial Quarto + examark configuration
- [Quarto Extension Reference](../extensions/quarto.md) — All configuration options
