# Troubleshooting

> **TL;DR** (30 seconds)
> - **What:** Fix common Examark conversion and Canvas import problems
> - **Why:** Most issues are solved by one diagnostic command
> - **How:** `examark emulate-canvas quiz.qti.zip` — catches 90% of import failures
> - **Next:** [Contributing](contributing.md) to report bugs that aren't covered here

Common issues and solutions for Examark.

---

## Quick Diagnosis

Run these commands to check your setup:

```bash
# Check Examark is installed
examark --version

# Validate your input file
examark check quiz.md

# Test package structure
examark verify quiz.qti.zip

# Simulate Canvas import (catches most issues)
examark emulate-canvas quiz.qti.zip
```

---

## Installation Issues

### Node.js version error

**Symptom:** `Error: Examark requires Node.js 18+`

**Solution:**

```bash
# Check your Node version
node --version

# Install Node 18+ via nvm
nvm install 18
nvm use 18
```

### Command not found after npm link

**Symptom:** `zsh: command not found: examark`

**Solution:**

```bash
# Rebuild and relink
npm run build
npm link

# Or use npx (no install needed)
npx examark quiz.md -o quiz.qti.zip
```

---

## Conversion Issues

### No questions found

**Symptom:** `No questions found. Ensure headers start with ## and follow the correct format.`

**Cause:** Questions must use either `## N.` headers or `N. [Type]` clean syntax.

**Solution:**

=== "Traditional Syntax"

    ```markdown
    ## 1. What is 2+2?
    a) Three
    b) Four [x]
    ```

=== "Clean Syntax (Recommended)"

    ```markdown
    1. [MC] What is 2+2?
    a) Three
    b) Four [x]
    ```

### Images not bundling

**Symptom:** Images appear broken in Canvas after import

**Cause:** Image paths are relative to the Markdown file location.

**Solution:**

```bash
# Ensure images exist at the referenced path
ls -la assets/

# Use relative paths in your Markdown
![Chart](assets/chart.png)
```

!!! tip "Quarto Figures"
    R/Python-generated figures from Quarto code chunks are automatically bundled. Use `<div id="fig-...">` format or standard `![](path)` references.

---

## Canvas Import Issues

### "Couldn't determine correct answers"

**Symptom:** Questions import but Canvas marks all answers as incorrect, or shows "couldn't determine the correct answers" after import.

**Cause:** Missing or unrecognized answer markers.

**Solution:** Use one of these markers for correct answers:

| Marker | Example | Notes |
|--------|---------|-------|
| `[x]` | `b) Answer [x]` | **Recommended** |
| `[correct]` | `b) Answer [correct]` | Quarto-friendly (no bracket conflicts) |
| `✓` | `b) Answer ✓` | Unicode checkmark |
| `*` prefix | `*b) Answer` | For multiple answers `[MA]` |

!!! warning "Avoid `**bold**` markers"
    Bold markers (`**Answer**`) conflict with LaTeX math formatting and are deprecated. Use `[x]` instead.

### Multiple Answers questions fail silently

**Symptom:** `[MA]` questions import but Canvas can't determine correct answers.

**Cause:** QTI cardinality set to `Single` instead of `Multiple`, or missing `<not><varequal>` for incorrect options.

**Solution:**

1. Ensure you're using the `[MA]` type marker (not `[MC]`)
2. Mark correct answers with `*` prefix: `*a) Correct answer`
3. Run the emulator to verify: `examark emulate-canvas quiz.qti.zip`

!!! note
    This was fixed in v0.6.6. If you're on an older version, update: `npm install -g examark@latest`

### Import completes but no questions appear

**Symptom:** Canvas says import succeeded but question bank is empty

**Solution:**

1. **Classic Quizzes:** Navigate to **Quizzes** → **Manage Question Banks**
2. **New Quizzes:** Navigate to **Item Banks** → **Manage Item Banks**
3. Check for a bank named after your quiz title
4. If still missing, run the Canvas emulator to diagnose:

```bash
examark emulate-canvas quiz.qti.zip
examark emulate-canvas quiz.qti.zip --strict  # Stricter checks for New Quizzes
```

---

## Quarto GFM Issues

Issues specific to Quarto-rendered `.qmd` files.

### Inline code not rendering in Canvas

**Symptom:** Backtick code (`` `x` ``) appears as raw text in Canvas instead of formatted code.

**Solution:** Examark automatically converts backticks to `<code>` tags. If code contains `<` or `>`, these are XML-escaped to prevent QTI parsing errors. Update to v0.6.6+ if you see truncated questions.

### LaTeX math not displaying

**Symptom:** Math formulas show as raw text like `$\bar{x}$` in Canvas.

**Solution:** Examark converts `$...$` to `\(...\)` and `$$...$$` to `\[...\]` (Canvas MathJax format). Verify conversion:

```bash
examark quiz.md --preview | grep -i "latex"
```

### Comparison operators mangled

**Symptom:** `<` and `>` in statistical output (e.g., `p < 0.05`) display incorrectly.

**Cause:** Quarto GFM escapes `<` to `\<`, which may not render correctly in Canvas.

**Solution:** Examark v0.6.6+ strips Quarto escapes and converts to proper HTML entities (`&lt;`, `&gt;`). The emulator will warn about unescaped operators:

```bash
examark emulate-canvas quiz.qti.zip
# ℹ️ Quarto GFM features detected: 3 items with comparison operators
```

### R-generated figures not appearing

**Symptom:** Plots from R/Python code chunks are missing in Canvas.

**Solution:** Ensure figures are rendered before conversion:

```bash
quarto render exam.qmd --to exam-gfm
examark exam.md -o exam.qti.zip
```

Examark detects `<div id="fig-...">` blocks and HTML `<img>` tags from Quarto output and bundles them automatically.

---

## Validation Errors

### What the emulator checks

The `emulate-canvas` command catches issues before you upload to Canvas:

| Check | What it detects |
|-------|----------------|
| Question structure | Missing stems, empty questions |
| Correct answers | Missing markers, wrong cardinality |
| Interaction types | Unsupported question types |
| Image references | Missing or broken image paths |
| MA cardinality | `rcardinality="Single"` on multiple-answer questions |
| Security | `<script>`, `<iframe>` in content |
| Quarto features | Inline code, LaTeX math, comparison operators |

```bash
# Standard check
examark emulate-canvas quiz.qti.zip

# Strict mode (for New Quizzes)
examark emulate-canvas quiz.qti.zip --strict
```

---

## Build & Development Issues

### Build fails with TypeScript errors

**Solution:**

```bash
# Always build before testing
npm run build

# Check for type errors
npx tsc --noEmit
```

!!! tip
    Imports must use `.js` extension (e.g., `import { x } from './parser/markdown.js'`) even though source files are `.ts`.

---

## Getting Help

- Check [GitHub Issues](https://github.com/Data-Wise/examark/issues)
- See [Contributing Guide](contributing.md) to report bugs
- Review [Markdown Syntax](markdown/syntax.md) for syntax reference
- Try [Canvas Workflow](tutorials/canvas-workflow.md) for step-by-step import guide
