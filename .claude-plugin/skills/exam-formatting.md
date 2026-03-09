# Examark Formatting Skill (Claude Desktop)

Examark is a markdown-based format for creating educational assessments that export to Canvas LMS.

## Core Syntax Rules

### Question Format
```
[Number]. [Type] Question text [Points]
```

**Examples:**
```markdown
1. [MC] What is 2 + 2? [2pts]
2. [TF] The sky is blue. [1pt]
3. [Essay, 10pts] Explain your answer.
```

### Type Markers (Case-Insensitive)

| Short | Aliases | Question Type |
|-------|---------|---------------|
| `[MC]` | `[MultiChoice]`, `[Multiple Choice]` | Multiple Choice |
| `[TF]` | `[TrueFalse]`, `[True/False]` | True/False |
| `[MA]` | `[MultiAns]`, `[SelectAll]` | Multiple Answer |
| `[Essay]` | `[LongAnswer]` | Essay |
| `[Short]` | `[SA]`, `[ShortAnswer]` | Short Answer |
| `[Num]` | `[Numeric]`, `[Number]` | Numerical |
| `[Match]` | `[Matching]` | Matching |
| `[FMB]` | `[FillBlanks]` | Fill Multiple Blanks |

## Answer Markers

### ✅ Recommended (LaTeX-Safe)

| Marker | Example | When to Use |
|--------|---------|-------------|
| `[x]` | `b) Paris [x]` | **Primary** - Clean, explicit |
| `✓` | `b) Paris ✓` | Visual checkmark |
| `✔` | `b) Paris ✔` | Alternative checkmark |
| `[correct]` | `b) Paris [correct]` | Verbose but clear |

### ❌ Deprecated (Avoid)

| Marker | Example | Problem |
|--------|---------|---------|
| `**bold**` | `b) **Paris**` | Conflicts with LaTeX formulas |
| `*` prefix | `*b) Paris` | Conflicts with markdown lists |

**Critical Rule**: Always use `[x]` when answers contain LaTeX formulas!

## LaTeX Math Support

### Inline Math
```markdown
The mean formula is $\bar{x} = \frac{\sum x_i}{n}$.
```

### Display Math
```markdown
The variance formula:
$$s^2 = \frac{\sum (x_i - \bar{x})^2}{n-1}$$
```

### In Questions
```markdown
1. [MC] What is $\frac{d}{dx}(x^2)$? [2pts]
a) $x$
b) $2x$ [x]
c) $x^2$
```

**⚠️ NEVER do this:**
```markdown
a) **$2x$**  ❌ BREAKS LaTeX rendering!
```

**✅ Always do this:**
```markdown
a) $2x$ [x]  ✅ Works perfectly
```

## Question Type Examples

### Multiple Choice
```markdown
1. [MC] What is the capital of France? [1pt]
a) London
b) Paris [x]
c) Berlin
d) Rome
```

### True/False (Two Formats)

**Compact:**
```markdown
2. [TF] The sky is blue. → True [1pt]
3. [TF] Water boils at 50°F. → False [1pt]
```

**Full:**
```markdown
4. [TF] Earth is flat. [1pt]
a) True
b) False [x]
```

### Multiple Answer
```markdown
5. [MA] Select all prime numbers. [3pts]
a) 2 [x]
b) 4
c) 5 [x]
d) 6
e) 7 [x]
```

### Short Answer
```markdown
6. [Short] What is the capital of Italy? [1pt]

Answer: Rome
Answer: rome
```

Or using `=` syntax (one answer per line):
```markdown
6. [Short] What is the capital of Italy? [1pt]
= Rome
= rome
```

### Numerical
```markdown
7. [Num] What is 10 × 5? [2pts]

Answer: 50 ± 0

8. [Num] Approximate π to 2 decimals. [1pt]

Answer: 3.14 ± 0.01
```

### Matching
```markdown
9. [Match] Match the country to its capital. [4pts]
- France => Paris
- Germany => Berlin
- Italy => Rome
- Spain => Madrid
```

**Alternative separator (both work):**
```markdown
- France :: Paris
- Germany :: Berlin
```

### Fill-in-Multiple-Blanks
```markdown
10. [FMB] Complete the sentence. [2pts]

The correlation r ranges from [blank1] to [blank2].

[blank1]: -1
[blank2]: 1, +1
```

### Essay
```markdown
11. [Essay, 10pts] Explain the Central Limit Theorem.

Provide examples and discuss assumptions.
```

## Feedback Formats

### Inline Feedback
```markdown
1. [MC] Question [1pt]
a) Wrong // This is incorrect because...
b) Right [x] // This is correct because...
```

### Blockquote Feedback
```markdown
2. [MC] Question [1pt]
a) Option A
> This is why A is wrong.
b) Option B [x]
> This is why B is correct.
```

### General Feedback
```markdown
3. [MC] Question [1pt]
a) Option A
b) Option B [x]

> [feedback] This concept is important because...
```

## Document Structure

### Simple Document
```markdown
# Quiz Title

1. [MC] First question [2pts]
a) Option A
b) Option B [x]

2. [TF] Second question → True [1pt]

3. [Essay, 5pts] Third question
```

### With Sections
```markdown
# Final Exam

# Section: Multiple Choice

1. [MC] Question 1 [2pts]
...

2. [MC] Question 2 [2pts]
...

# Section: True/False

3. [TF] Question 3 → True [1pt]
...

# Section: Essay

4. [Essay, 10pts] Question 4
...
```

## Quarto Integration

### Minimal .qmd File
```yaml
---
title: "My Quiz"
format: exam-gfm
exam:
  qti: true
  default-points: 1
---

1. [MC] Question [2pts]
a) Option A
b) Option B [x]
```

### Workflow
```bash
# 1. Render Quarto to markdown
quarto render quiz.qmd --to exam-gfm

# 2. Convert to QTI
examark quiz.md -o quiz.qti.zip

# 3. Upload to Canvas
# Settings → Import Content → QTI .zip
```

## Common Errors & Fixes

### Error: No correct answer marked
```markdown
❌ Wrong:
1. [MC] Question [1pt]
a) Option A
b) Option B

✅ Fixed:
1. [MC] Question [1pt]
a) Option A
b) Option B [x]
```

### Error: Bold with LaTeX
```markdown
❌ Wrong:
1. [MC] What is $\bar{x}$? [1pt]
a) **$\frac{\sum x}{n}$**

✅ Fixed:
1. [MC] What is $\bar{x}$? [1pt]
a) $\frac{\sum x}{n}$ [x]
```

### Error: Missing type marker
```markdown
❌ Wrong:
1. Question text [2pts]

✅ Fixed:
1. [MC] Question text [2pts]
```

### Error: Inconsistent points
```markdown
❌ Wrong:
1. [MC] Question [2pts]
2. [MC] Question [3 points]
3. [MC] Question (1 pt)

✅ Fixed:
1. [MC] Question [2pts]
2. [MC] Question [3pts]
3. [MC] Question [1pt]
```

## Validation Checklist

Before finalizing any exam:

- [ ] All questions numbered sequentially (1, 2, 3...)
- [ ] All questions have type markers: `[MC]`, `[TF]`, etc.
- [ ] All questions have points: `[1pt]`, `[2pts]`, etc.
- [ ] All MC/MA/TF questions have correct answers marked
- [ ] Correct answer markers are `[x]`, `✓`, or `[correct]` (NOT bold!)
- [ ] LaTeX formulas use `$...$` or `$$...$$`
- [ ] No mixing of answer markers in same document
- [ ] Matching questions use `=>` or `::` separator
- [ ] Numerical answers have tolerance: `Answer: 50 ± 0`
- [ ] FMB questions have blank definitions

## Best Practices

1. **Consistency**: Use same markers throughout (prefer `[x]`)
2. **LaTeX Safety**: Never bold LaTeX formulas
3. **Clear Points**: Always specify points, or set document default
4. **Type Markers**: Use short forms (`[MC]`, `[TF]`) for clarity
5. **Feedback**: Provide explanations for conceptual questions
6. **Validation**: Check syntax before converting to QTI
7. **Testing**: Render to HTML first to preview formatting

## When to Apply This Skill

Use these formatting rules when:
- Writing new exam questions
- Converting existing quizzes to examark format
- Reviewing documents for syntax errors
- Troubleshooting rendering issues
- Ensuring Canvas compatibility

**Goal**: Create valid examark syntax that converts cleanly to Canvas QTI packages.
