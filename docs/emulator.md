# Canvas Import Emulator

> **TL;DR** (30 seconds)
> - **What:** Predicts whether Canvas will accept your QTI package before you upload
> - **Why:** Catch broken answers, missing images, and format errors locally
> - **How:** `examark emulate-canvas quiz.qti.zip`
> - **Next:** [Troubleshooting](troubleshooting.md) if the emulator flags issues

The **Examark** emulator predicts whether your QTI package will import successfully into Canvas LMS.

## Usage

```bash
examark emulate-canvas your-package.qti.zip
```

## What It Checks

| Check | Severity | Description |
|-------|----------|-------------|
| Correct answer defined | Error | MC/TF questions must have a correct answer marked |
| MA cardinality | Error | Multiple Answers questions must use `rcardinality="Multiple"` |
| MA incorrect exclusion | Error | MA resprocessing must include `<not>` for each incorrect option |
| Short answer answers | Error | Short answer questions must have at least one accepted answer |
| Supported interactions | Error | Canvas only supports choice, text entry, extended text |
| Image references | Error | All image files must exist in the package |
| Stem content | Error | Questions must have non-empty text |
| Option count | Error | Choice questions need at least 2 options |
| Security | Error | No XSS vectors (`<script>`, `javascript:`) allowed |
| Path Safety | Error | Resources cannot use `../` traversal |
| Identifier format | Warning | Special characters may cause issues |
| MC multiple correct | Warning | Canvas uses only first correct answer for MC questions |
| responseProcessing | Warning | Manual grading needed if missing |

## Example Output

### Success

```text
🎓 Canvas Import Emulator

📊 Analysis Results:
   Items scanned: 7
   Resources: 8
   Has test structure: Yes

✅ PREDICTION: Canvas import will likely SUCCEED
```

### Failure

```text
❌ PREDICTION: Canvas import will likely FAIL

🔴 Canvas Import Blockers:
   • No correct answer defined in items/item_3.xml

🔧 Suggested Fixes:
   → Mark correct answers with [correct], ✓, or **bold**
```

## Common Issues

### Images Not Showing

If images don't appear in Canvas after import:

1. Ensure images are in the `items/` folder
2. Check that image paths are relative
3. For R/Python-generated figures, verify they're rendered before conversion

### "Couldn't determine correct answers"

This error means Canvas can't find the `correctResponse` element or the QTI structure is wrong for the question type:

**For Multiple Choice / True-False:**

1. Mark exactly one answer as correct in your Markdown
2. Use `[correct]` suffix, checkmark `✓`, or `[x]` marker

**For Multiple Answers (`[MA]`):**

1. Mark 2 or more answers as correct with `*` prefix
2. Ensure at least 2 correct options are defined — Canvas requires this for MA questions

**For Short Answer (`[Short]`):**

1. Add accepted answer(s) using `Answer: text` or `= text` syntax
2. Multiple accepted answers: use `= answer` on separate lines

## Pro Tips

!!! tip "Run Before Import"
    Always run the emulator before uploading to Canvas to catch issues early.

!!! tip "R/Python Figures"
    Generate all figures with Quarto/RMarkdown *before* running Examark.

---

## Troubleshooting Guide

### Error: "Failed to import content"

**Cause:** Usually indicates a malformed manifest or missing resources.

**Fix:**

```bash
# Verify package structure
examark verify your-package.qti.zip
```

Check that:

- All referenced files exist in the package
- `imsmanifest.xml` is valid XML
- No special characters in filenames

---

### Error: "Unsupported question type"

**Cause:** Canvas doesn't recognize the QTI interaction type.

**Supported types:**

| QTI Interaction | Canvas Type |
|-----------------|-------------|
| `choiceInteraction` | Multiple Choice |
| `textEntryInteraction` | Fill in the Blank |
| `extendedTextInteraction` | Essay |

---

### Math Equations Not Rendering

**Cause:** LaTeX delimiters not converted.

**Expected format for Canvas:**

| Source | Canvas Format |
|--------|---------------|
| `$x^2$` | `\(x^2\)` |
| `$$\sum_{i=1}^n$$` | `\[\sum_{i=1}^n\]` |

Examark handles this automatically. If equations still don't render:

1. Check Canvas has MathJax enabled
2. Verify no conflicting HTML entities (`&lt;` vs `<`)

---

### Question Points Not Importing

**Cause:** Points specified incorrectly in source.

**Correct syntax:**

```markdown
## 1. [Essay, 10pts] Explain the concept.
## 2. [5pts] Multiple choice question?
```

---

### Need More Help?

- [Open an issue](https://github.com/Data-Wise/examark/issues) on GitHub
- Check the [Canvas QTI documentation](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-is-QTI/ta-p/2)
