# Matching and Fill-in-Multiple-Blanks Questions

> **TL;DR** Write matching pairs and fill-in-multiple-blanks questions with the right syntax for Canvas.

**4 minutes** | Intermediate | CLI / Quarto

---

## Problem

You need to create matching or fill-in-multiple-blanks questions and want to make sure the syntax is correct for Canvas import.

## Solution

### Matching Questions

Use `- Left => Right` pairs after a `[Match]` type marker:

```markdown
1. [Match] Match the statistical test to its use case. [4pts]
- Independent t-test => Compare means of two unrelated groups
- Paired t-test => Compare means of two related measurements
- Chi-square test => Test association between categorical variables
- ANOVA => Compare means of three or more groups
```

The `::` separator also works:

```markdown
2. [Match] Match each symbol to its meaning. [3pts]
- μ :: Population mean
- σ :: Population standard deviation
- p̂ :: Sample proportion
```

Canvas renders matching questions as a list of left-side items, each with a dropdown menu containing all right-side options.

### Fill-in-Multiple-Blanks (FMB)

Use `[blankN]` placeholders in the stem, then define answers below:

```markdown
3. [FMB] Complete the sentence about hypothesis testing. [3pts]
In a two-tailed test at α = 0.05, we reject H₀ when p is
[blank1] than [blank2].

[blank1]: less, smaller, lower
[blank2]: 0.05, .05
```

Each blank becomes a separate text input in Canvas. Multiple acceptable answers for the same blank are separated by commas.

**Another example — regression terminology:**

```markdown
4. [FMB] In simple linear regression, the [blank1] variable is
plotted on the x-axis and the [blank2] variable on the y-axis. [2pts]

[blank1]: explanatory, independent, predictor
[blank2]: response, dependent, outcome
```

**Single-blank shortcut — use Short Answer instead:**

If you only need one blank, a `[Short]` question with `= answer` syntax is simpler:

```markdown
5. [Short] The standard deviation of a sampling distribution is
called the ___. [2pts]
= standard error
= SE
```

## Explanation

### Matching

- Canvas shows left-side items with dropdown menus of all right-side options.
- You need at least 2 pairs. There is no maximum, but 4-6 pairs is typical.
- Both `=>` and `::` separators work identically — choose whichever reads better.
- Canvas shuffles the right-side options in the dropdown, so order doesn't matter.
- Each pair is worth an equal fraction of the total points.

### Fill-in-Multiple-Blanks

- Blank IDs in the stem (`[blank1]`, `[blank2]`) must match the definitions below.
- Multiple correct answers per blank are separated by commas.
- Canvas auto-grades each blank independently — partial credit is given per blank.
- Matching is **case-insensitive** by default in Canvas.
- Keep blank IDs simple: `[blank1]`, `[blank2]`, etc.

### When to Use Which

| Question Type | Best For | Auto-Graded |
|---------------|----------|-------------|
| Matching | Concept pairing, term definitions | Yes |
| FMB | Sentence completion, multiple terms | Yes |
| Short Answer | Single-word/phrase answers | Yes |
| Essay | Open-ended explanations | No |

## See Also

- [Statistics Question Patterns](statistics-patterns.md)
- [Question Types Reference](../markdown/question-types.md)
- [Syntax Reference](../markdown/syntax.md)
