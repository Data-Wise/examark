# Markdown Syntax

Examark uses an extended Markdown syntax designed specifically for exam authoring. This section covers everything you need to write effective exam content.

---

## Overview

Examark supports two syntax styles that can be mixed in the same file:

=== "Clean Syntax (Recommended)"

    ```markdown
    1. [MC] What is 2 + 2? [2pts]
    a) Three
    b) Four [x]
    c) Five
    ```

    - No `##` headers needed
    - Better for Quarto HTML/PDF output
    - Requires type marker `[MC]` or points `[2pts]`

=== "Traditional Syntax"

    ```markdown
    ## 1. What is 2 + 2? [2 pts]
    a) Three
    b) **Four** ✓
    c) Five
    ```

    - Uses `## N.` headers
    - Visual bold/checkmark markers
    - Original format

---

## Documentation

<div class="grid cards" markdown>

- :material-format-list-numbered:{ .lg .middle } **[Question Types](question-types.md)**

    ---

    All 8 question types with examples: MC, TF, MA, Short, Numeric, Essay, Matching, FMB.

- :material-code-tags:{ .lg .middle } **[Syntax Reference](syntax.md)**

    ---

    Complete syntax guide: structure, markers, points, sections, and special elements.

- :material-math-integral:{ .lg .middle } **[LaTeX Math](latex.md)**

    ---

    Inline and display math, Canvas compatibility, common formulas.

- :material-image:{ .lg .middle } **[Images & Media](images.md)**

    ---

    Image bundling, supported formats, paths, and best practices.

- :material-message-text:{ .lg .middle } **[Feedback](feedback.md)**

    ---

    Inline feedback, blockquote feedback, and general feedback options.

- :material-file-document-multiple:{ .lg .middle } **[Document Structure](structure.md)**

    ---

    Titles, sections, question organization, and metadata.

</div>

---

## Quick Reference

### Answer Markers

| Marker | Example | Notes |
|--------|---------|-------|
| `[x]` | `b) Answer [x]` | Recommended |
| `**Bold**` | `b) **Answer**` | Visual |
| `✓` or `✔` | `b) Answer ✓` | Unicode checkmark |
| `[correct]` | `b) Answer [correct]` | Explicit |
| `*` prefix | `*b) Answer` | Traditional |

### Type Markers

| Type | Markers | Description |
|------|---------|-------------|
| Multiple Choice | `[MC]` | Single correct (default) |
| True/False | `[TF]`, `[T/F]` | Binary choice |
| Multiple Answers | `[MA]`, `[SelectAll]` | Multiple correct |
| Short Answer | `[Short]`, `[FIB]` | Fill-in-blank |
| Numerical | `[Num]`, `[Numeric]` | Number with tolerance |
| Essay | `[Essay]` | Long-form response |
| Matching | `[Match]` | Pair items |
| Fill Multiple Blanks | `[FMB]` | Multiple blanks |

### Points Syntax

```markdown
1. [MC] Question here [2pts]      # Clean syntax
1. [MC, 2pts] Question here       # Combined with type
## 1. Question here [2 pts]       # Traditional syntax
```

---

## See Also

- [Getting Started](../getting-started.md) — Installation and first quiz
- [Templates](../starter/index.md) — Ready-to-use examples
- [Input Formats](../formats.md) — Complete reference (legacy page)
