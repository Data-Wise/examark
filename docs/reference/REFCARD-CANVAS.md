# Canvas Import Quick Reference

> One-page reference for Examark → Canvas workflow

---

## Essential Commands

| Command | Action |
|---------|--------|
| `examark exam.md -o exam.qti.zip` | Convert to QTI package |
| `examark check exam.md` | Lint before converting |
| `examark emulate-canvas exam.qti.zip` | Predict import success |
| `examark verify exam.qti.zip` | Validate package structure |
| `examark exam.md -f text` | Export as printable text |

---

## Question Type Markers

| Type | Marker | Min Correct | Canvas Name |
|------|--------|-------------|-------------|
| Multiple Choice | `[MC]` | 1 | Multiple Choice |
| True/False | `[TF]` | 1 | True/False |
| Multiple Answers | `[MA]` | **2+** | Multiple Answers |
| Short Answer | `[Short]` | 1 | Fill in the Blank |
| Essay | `[Essay]` | 0 | Essay |
| Numerical | `[Num]` | 1 | Numerical |
| Matching | `[Match]` | — | Matching |
| Fill Multiple Blanks | `[FMB]` | 1 per blank | Fill Multiple Blanks |

---

## Correct Answer Markers

```markdown
b) Answer [x]        ← preferred
b) Answer ✓          ← checkmark
b) Answer [correct]  ← explicit
*b) Answer           ← star prefix (MA questions)
```

---

## Short Answer: Multiple Accepted Answers

```markdown
5. [Short] What causes funnel-shaped residuals? [2pts]
= heteroscedasticity
= heteroskedasticity
= non-constant variance
= unequal variance
```

Or original syntax: `Answer: heteroscedasticity` (one per line)

---

## Common Canvas Import Errors

| Error in Canvas | Cause | Fix |
|----------------|-------|-----|
| "Couldn't determine correct answers" (MA) | `rcardinality="Single"` | Use `*` prefix for MA answers |
| "Couldn't determine correct answers" (Short) | No `<varequal>` | Add `= answer` or `Answer: text` |
| Questions missing | XML malformed | Re-run `examark check` |
| Images broken | Missing files | Ensure images exist relative to `.md` |
| Points wrong | No `[Npts]` in source | Add `[2pts]` to question or set `defaultPoints` |

---

## Quarto Workflow

```bash
# Render + convert + validate
quarto render exam.qmd --to exam-gfm
examark exam.md -o exam.qti.zip
examark emulate-canvas exam.qti.zip
```

**YAML frontmatter:**

```yaml
format: exam-gfm
exam:
  qti: true
  solutions: false
  default-points: 2
```

---

## Configuration File (`.examarkrc.json`)

```json
{
  "defaultPoints": 2,
  "outputDir": "output",
  "validate": true
}
```

---

## Import to Canvas

1. **Settings** → **Import Course Content**
2. Type: **QTI .zip file**
3. Upload `.qti.zip` → **Import**
4. Find in: **Quizzes** → **Question Banks**

**Item Banks (New Quizzes):**
Settings → **Manage Item Banks** → **Import Content**

---

## See Also

- [Canvas Workflow Guide](../cookbook/canvas-workflow.md)
- [Question Types](../markdown/question-types.md)
- [Canvas Emulator](../emulator.md)
- [Item Banks Tutorial](../cookbook/item-banks.md)
