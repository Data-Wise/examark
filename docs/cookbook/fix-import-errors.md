# Fix Canvas Import Errors

> **TL;DR** Fix the most common Canvas import errors before they waste your time.

**5 minutes** | Beginner | CLI

---

## Problem

You uploaded a QTI package to Canvas and something went wrong --- questions are missing answers, images are blank, or the emulator flagged errors. These are the four most common failures and how to fix each one.

## Solution

### Pre-flight Checklist

Before uploading to Canvas, run through this checklist:

- [ ] Run `examark check exam.md` --- catches syntax errors in your Markdown
- [ ] Run `examark emulate-canvas exam.qti.zip` --- simulates the Canvas import
- [ ] Verify MA questions have 2+ correct answers marked with `*` prefix
- [ ] Verify short answer questions have `= answer` or `Answer: text` lines
- [ ] Check that image paths are relative to the Markdown file

If the emulator shows `PREDICTION: Canvas import will likely SUCCEED`, you are safe to upload.

### "Couldn't determine correct answers" for Multiple Answers

**Cause:** The QTI `rcardinality` is set to `"Single"` instead of `"Multiple"`. This happens when an MA question has fewer than 2 correct answers marked.

**Fix:** Ensure your MA questions use the `*` prefix on at least two options:

```markdown
2. [MA] Which are valid? [2pts]
*a) Option A
b) Option B
*c) Option C
```

The `*` prefix marks correct answers. Examark automatically sets `rcardinality="Multiple"` and generates the required `<not><varequal>` exclusions for incorrect options.

!!! warning "Minimum 2 correct answers"
    Canvas rejects MA questions with fewer than 2 correct answers. If you only have one correct answer, use `[MC]` instead of `[MA]`.

### "No correct answers" for Short Answer

**Cause:** The question has no accepted answer lines after the stem.

**Fix:** Add accepted answers using the `=` syntax:

```markdown
6. [Short] Define heteroscedasticity. [2pts]
= unequal variance
= non-constant variance
= heteroskedasticity
```

Each `=` line adds an acceptable answer. Canvas matches case-insensitively, so list the most common spellings and phrasings.

You can also use the `Answer:` syntax:

```markdown
6. [Short] Define heteroscedasticity. [2pts]
Answer: unequal variance
Answer: non-constant variance
```

### Images Not Appearing in Canvas

**Cause:** Image paths are absolute or the image files are missing at conversion time.

**Fix:** Use relative paths from the Markdown file's directory:

```markdown
![Residual Plot](images/residual-plot.png)
```

Examark resolves image paths relative to the input file and bundles them into the QTI package. If you are using Quarto, run `quarto render` first so R-generated plots exist before `examark` bundles them.

!!! tip "Verify bundled images"
    Run `examark emulate-canvas exam.qti.zip` --- the emulator checks that all referenced images exist in the package.

### Points Not Importing

**Cause:** No point values specified in the Markdown source.

**Fix:** Add points per question with the `[Npts]` syntax:

```markdown
1. [MC] Question text? [5pts]
```

Or set a project-wide default in `.examarkrc.json`:

```json
{ "defaultPoints": 2 }
```

Per-question `[Npts]` overrides the project default. If neither is set, Canvas uses its own default (typically 1 point).

## Explanation

Canvas is strict about QTI compliance because the QTI 1.2 spec is precise about how question metadata must be structured:

- **MA cardinality**: The QTI spec requires `rcardinality="Multiple"` for questions where more than one response is valid. Canvas uses this field to determine grading behavior.
- **Answer exclusions**: Canvas MA grading needs explicit `<not><varequal>` entries for incorrect options. Without them, Canvas cannot calculate partial credit correctly.
- **Image bundling**: QTI packages are self-contained ZIP archives. Every image referenced in the XML must exist in the package and be listed in `imsmanifest.xml`.
- **Point values**: Canvas reads points from the QTI `<setvar>` element. If missing, it falls back to its own default.

The `emulate-canvas` command catches all of these issues before you upload, saving a round-trip to Canvas.

## See Also

- [Import and Validate](import-validate.md) --- The full happy-path workflow
- [Multiple Answers Tutorial](multiple-answers.md) --- Deep dive into MA grading and QTI internals
- [Canvas Emulator](../emulator.md) --- Full emulator documentation
- [Canvas Quick Reference](../reference/REFCARD-CANVAS.md) --- One-page cheat sheet
