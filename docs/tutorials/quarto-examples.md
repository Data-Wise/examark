# Quarto Examples

This guide shows how to use Quarto with R or Python to generate dynamic figures for your exams.

## Overview

Examify works great with Quarto-generated content. The workflow is:

1. **Author** your exam in `.qmd` with R/Python code chunks
2. **Render** to generate figures
3. **Convert** the markdown with figure references to QTI

## R Example: Statistics Quiz

The `examples/quarto-figures.qmd` demonstrates R-generated plots:

```{r}
#| echo: false
#| fig-width: 5
#| fig-height: 3.5
#| label: fig-histogram

set.seed(42)
data <- rnorm(500, mean = 100, sd = 15)
hist(data, 
     main = "Distribution of Test Scores",
     xlab = "Score", 
     col = "steelblue")
```

Then reference in your question:

```markdown
## 1. Histogram Interpretation [2 pts]

![Distribution of Test Scores](quarto-figures_files/figure-html/fig-histogram-1.png)

Based on the histogram above, which statement is most accurate?

a) The distribution is right-skewed
b) **The distribution is approximately normal** ✓
c) The distribution is left-skewed
```

## Python Example: Data Science Quiz

The `examples/quarto-python-figures.qmd` shows Python matplotlib/seaborn:

```python
#| echo: false
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)
group_a = np.random.normal(75, 10, 50)
group_b = np.random.normal(85, 5, 50)

fig, ax = plt.subplots()
ax.boxplot([group_a, group_b], labels=['Group A', 'Group B'])
ax.set_title('Test Scores by Group')
plt.show()
```

## Complete Workflow

```bash
# Step 1: Render Quarto to generate figures
cd examples
quarto render quarto-figures.qmd

# Step 2: Convert markdown with figure references
examify quarto-figures.md -o quiz.qti.zip

# Step 3: Verify (optional)
examify emulate-canvas quiz.qti.zip
```

## Figure Types Supported

| Type | Extension | Notes |
|------|-----------|-------|
| PNG | `.png` | Default Quarto output |
| SVG | `.svg` | Vector graphics |
| JPEG | `.jpg` | Photos |
| GIF | `.gif` | Animations |
| WebP | `.webp` | Modern format |

## Tips

!!! tip "Use Labels"
    Always use `#| label: fig-name` in your code chunks. This makes the output filenames predictable.

!!! warning "Render First"
    You must run `quarto render` before `examify` — we bundle the generated images, not the code.

!!! example "Reproducibility"
    Use `set.seed()` (R) or `np.random.seed()` (Python) for reproducible figures across builds.

## Sample Files

| File | Description |
|------|-------------|
| `examples/quarto-figures.qmd` | R histograms, scatter plots, normal distribution |
| `examples/quarto-python-figures.qmd` | Python box plots, time series, heatmaps |
| `examples/quarto-figures.md` | Markdown referencing generated figures |
