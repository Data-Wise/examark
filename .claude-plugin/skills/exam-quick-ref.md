# Examark Quick Reference
**One-page cheat sheet for exam generation**

---

## Question Format

```
[Number]. [Type] Question text [Points]
```

**Example:**
```markdown
1. [MC] What is 2 + 2? [2pts]
```

---

## Type Markers

| Marker | Type |
|--------|------|
| `[MC]` | Multiple Choice |
| `[TF]` | True/False |
| `[MA]` | Multiple Answer |
| `[Short]` | Short Answer |
| `[Num]` | Numerical |
| `[Essay]` | Essay |
| `[Match]` | Matching |
| `[FMB]` | Fill-in-Multiple-Blanks |

---

## Answer Markers

### ✅ Use These
- `[x]` — Primary (best for LaTeX!)
- `✓` — Checkmark
- `[correct]` — Explicit

### ❌ Don't Use
- `**bold**` — Breaks LaTeX!
- `*prefix` — Conflicts with lists

---

## Quick Examples

### Multiple Choice
```markdown
1. [MC] Question? [2pts]
a) Wrong
b) Right [x]
c) Wrong
```

### True/False
```markdown
2. [TF] Statement. → True [1pt]
3. [TF] Statement. → False [1pt]
```

### Multiple Answer
```markdown
4. [MA] Select all. [3pts]
a) Yes [x]
b) No
c) Yes [x]
```

### Short Answer
```markdown
5. [Short] Question? [1pt]

Answer: text
Answer: alt text
```

Or using `=` syntax:
```markdown
5. [Short] Question? [1pt]
= text
= alt text
```

### Numerical
```markdown
6. [Num] Calculate. [2pts]

Answer: 50 ± 0.1
```

### Matching
```markdown
7. [Match] Match items. [4pts]
- Item A => Match 1
- Item B => Match 2
```

### Essay
```markdown
8. [Essay, 10pts] Explain.

Provide details...
```

---

## LaTeX Math

### Inline
```markdown
The formula is $\bar{x} = \frac{\sum x_i}{n}$.
```

### Display
```markdown
$$s^2 = \frac{\sum (x_i - \bar{x})^2}{n-1}$$
```

### ⚠️ Critical Rule
```markdown
❌ WRONG: a) **$2x$**
✅ RIGHT: a) $2x$ [x]
```

**Never bold LaTeX formulas!**

---

## Feedback

### Inline
```markdown
a) Option [x] // Why correct
```

### Blockquote
```markdown
a) Option
> Explanation here.
```

### General
```markdown
> [feedback] After-submission note.
```

---

## Sections

```markdown
# Quiz Title

# Section: Topic 1

1. [MC] Question...

# Section: Topic 2

5. [MC] Question...
```

---

## Points Notation

```markdown
[1pt]      Single point
[2pts]     Multiple points
[Essay, 10pts]   With type marker
```

---

## Common Formulas (Statistics)

```latex
Mean: $\bar{x} = \frac{\sum x_i}{n}$

Variance: $s^2 = \frac{\sum (x_i - \bar{x})^2}{n-1}$

SD: $s = \sqrt{s^2}$

SE: $SE = \frac{s}{\sqrt{n}}$

t-test: $t = \frac{\bar{x} - \mu_0}{s/\sqrt{n}}$

CI: $\bar{x} \pm t_{\alpha/2} \cdot \frac{s}{\sqrt{n}}$

Correlation: $r = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum (x_i - \bar{x})^2 \sum (y_i - \bar{y})^2}}$

Regression: $\hat{y} = b_0 + b_1 x$
```

---

## Common Formulas (Calculus)

```latex
Derivative: $\frac{d}{dx}(x^n) = nx^{n-1}$

Power rule: $\frac{d}{dx}(x^2) = 2x$

Exponential: $\frac{d}{dx}(e^x) = e^x$

Log: $\frac{d}{dx}(\ln x) = \frac{1}{x}$

Integral: $\int x^n \, dx = \frac{x^{n+1}}{n+1} + C$

Definite: $\int_a^b f(x) \, dx = F(b) - F(a)$

Limit: $\lim_{x \to a} f(x)$
```

---

## Validation Checklist

Before converting to QTI:

- [ ] All questions numbered (1, 2, 3...)
- [ ] All have type markers
- [ ] All have points
- [ ] Correct answers marked with `[x]`
- [ ] No `**bold**` on answers
- [ ] LaTeX uses `$...$`
- [ ] Matching uses `=>`
- [ ] FMB has blank definitions
- [ ] Numerical has `± tolerance`

---

## Quarto Header

```yaml
---
title: "Quiz Title"
format: exam-gfm
exam:
  qti: true
  default-points: 1
---
```

---

## Workflow

```bash
# Markdown only
examark quiz.md -o quiz.qti.zip

# Quarto workflow
quarto render quiz.qmd --to exam-gfm
examark quiz.md -o quiz.qti.zip

# Validate
examark check quiz.md
examark verify quiz.qti.zip
```

---

## Common Errors

### Missing type marker
```markdown
❌ 1. Question [2pts]
✅ 1. [MC] Question [2pts]
```

### No correct answer
```markdown
❌ a) Option A
   b) Option B

✅ a) Option A [x]
   b) Option B
```

### Bold with LaTeX
```markdown
❌ a) **$x^2$**
✅ a) $x^2$ [x]
```

### Wrong separator
```markdown
❌ - Item A: Match 1
✅ - Item A => Match 1
```

---

## Tips

1. **Consistency**: Use `[x]` throughout
2. **LaTeX**: Always `$...$`, never bold
3. **Points**: Specify or use default
4. **Feedback**: Explain why
5. **Sections**: Group by topic
6. **Test**: Validate before QTI

---

## Canvas Import

1. Settings → Import Content
2. Select "QTI .zip file"
3. Upload `quiz.qti.zip`
4. Click "Import"
5. Wait for processing
6. Review imported quiz

---

## Quick Prompts

### For Claude Desktop

**Generate exam:**
```
"Create a 5-question statistics quiz on [topic]"
```

**Add questions:**
```
"Add 3 more MC questions on [topic]"
```

**Fix errors:**
```
"Check this for examark syntax errors:
[paste content]"
```

**Convert format:**
```
"Convert this to examark:
[paste questions]"
```

---

## Documentation

- **Full Docs**: https://data-wise.github.io/examark/
- **Templates**: `templates/` in repo
- **Issues**: github.com/Data-Wise/examark

---

**Keep this handy when generating exams!**
