# Multiple Exam Versions

> **TL;DR** Generate multiple unique exam versions from a single Quarto source using different random seeds

**5 minutes** | Intermediate | Quarto + R + CLI

---

## Problem

You need several versions of the same exam with different numbers and plots to reduce cheating, but don't want to maintain multiple source files.

## Solution

### Strategy 1: Multiple Seeds

A bash script that swaps the seed and renders each version:

```bash
# build-versions.sh

for seed in 100 200 300; do
    sed -i '' "s/set.seed([0-9]*)/set.seed($seed)/" exam.qmd
    quarto render exam.qmd
    mv exam.md "version-${seed}.md"
    examark "version-${seed}.md" -o "version-${seed}.qti.zip"
done
```

### Strategy 2: Parameterized Documents

Add YAML parameters to your `.qmd`:

```yaml
---
params:
  seed: 42
---
```

Then use the parameter in your setup chunk:

```r
set.seed(params$seed)
```

Create a wrapper script that renders all versions:

```r
# render_versions.R
versions <- c("A" = 100, "B" = 200, "C" = 300)

for (v in names(versions)) {
    quarto::quarto_render(
        "exam.qmd",
        output_file = paste0("exam-", v, ".md"),
        execute_params = list(seed = versions[[v]])
    )
}
```

Strategy 2 is cleaner because it does not modify the source file.

## Advanced Patterns

### Conditional Question Types

Generate different question types based on random selection:

```r
question_type <- sample(c("ci", "hypothesis", "regression"), 1)

if (question_type == "ci") {
  # Generate CI question
} else if (question_type == "hypothesis") {
  # Generate hypothesis test question
} else {
  # Generate regression question
}
```

### Answer Validation

Ensure generated answers fall within sensible bounds:

```r
repeat {
  # Generate random values
  p_value <- runif(1, 0, 0.1)

  # Validate constraints
  if (p_value > 0.001 && p_value < 0.099) break
}
```

### Distractor Quality Check

A helper function that guarantees distractors are sufficiently different from the correct answer and from each other:

```r
generate_distractors <- function(correct, n = 3) {
  distractors <- c()
  while (length(distractors) < n) {
    d <- correct + sample(c(-1, 1), 1) * runif(1, 1, 5)
    d <- round(d, 2)

    # Ensure distractor is different from correct and others
    if (abs(d - correct) > 0.5 && !d %in% distractors) {
      distractors <- c(distractors, d)
    }
  }
  distractors
}
```

## Workflow Checklist

- [ ] Set deterministic seed
- [ ] Test with multiple seeds to ensure validity
- [ ] Verify all computed answers are reasonable
- [ ] Check figure generation works
- [ ] Preview HTML before export
- [ ] Run Canvas emulator on each version
- [ ] Document which seed produces which version

## Troubleshooting

### Different Results Each Render

**Cause:** Seed not set or set after random operations.

**Fix:** Put `set.seed()` at the very top of setup chunk, before any other code.

### Figures Not Embedded

**Cause:** Figure path issues.

**Fix:** Ensure figures are in the same directory or set the path explicitly:

```yaml
knitr::opts_chunk$set(fig.path = "figures/")
```

### Math Not Rendering

**Cause:** Missing variant setting.

**Fix:** Add the tex math variant to your format:

```yaml
format:
  exam-gfm:
    variant: +tex_math_dollars
```

### Inline R Code Shows Raw

**Cause:** Quarto processing issue with inline expressions.

**Fix:** Ensure backticks are proper `` `r expr` `` syntax and the R code is valid.

## Templates

Download ready-to-use templates:

- [dynamic.qmd](https://github.com/Data-Wise/examark/blob/main/templates/quarto/dynamic.qmd) -- Randomized questions with R
- [canvas-export.qmd](https://github.com/Data-Wise/examark/blob/main/examples/quarto/canvas-export.qmd) -- Canvas-optimized example

## See Also

- [Randomized Values](randomized-values.md) -- R code chunks for random parameters
- [Auto-Generated Plots](auto-plots.md) -- Embed R/Python figures in questions
- [Quarto Setup](quarto-setup.md) -- Initial Quarto + examark configuration
- [Quarto Extension Reference](../extensions/quarto.md) -- All configuration options
