# Short Answer Variants

> **TL;DR** List multiple acceptable answers for short answer questions so Canvas auto-grades correctly.

**5 minutes** | Beginner | CLI / Quarto

---

## Problem

Students may answer with different phrasings (e.g., "t-test", "t test", "Student's t-test") and you want all reasonable variations to be marked correct automatically.

## Solution

Use `= answer` syntax to list each acceptable variant on its own line:

```markdown
1. [Short] What is the name for the average of a dataset? [1pt]
= mean
= arithmetic mean
= sample mean
```

Alternatively, use the `Answer:` syntax:

```markdown
1. [Short] What is the average? [1pt]
Answer: mean
Answer: arithmetic mean
```

For statistics courses, list common phrasings and abbreviations:

```markdown
2. [Short] What analysis examines one factor at each level of another? [2pts]
= simple effects
= simple effect analysis
= simple effects analysis
= simple main effects
```

### In Quarto `.qmd` files

Wrap `= answer` lines in a raw markdown block to prevent Pandoc from treating them as paragraph continuation:

````markdown
5. [Short] What test compares two group means? [2pts]

```{=markdown}
= t-test
= t test
= independent samples t-test
```
````

## Explanation

- Canvas matching is **case-insensitive** by default, so you don't need separate entries for capitalization.
- Each `= ` line adds one acceptable answer variant. There is no limit on the number of variants.
- Both `= text` and `Answer: text` produce identical QTI output (multiple `<varequal>` elements in one `<conditionvar>`).
- List common spellings, abbreviations, and phrasings students are likely to use.
- The `{=markdown}` raw block is only needed in `.qmd` files. Plain `.md` files handle `=` lines natively.

## See Also

- [Statistics Patterns](statistics-patterns.md) -- question templates for common stats topics
- [Syntax Reference](../markdown/syntax.md) -- complete syntax documentation
- [Quarto Workflow](quarto-workflow.md) -- rendering `.qmd` exams to QTI
