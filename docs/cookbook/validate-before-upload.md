# Validate Before Upload

> **TL;DR** Catch Canvas import errors before uploading with examark's three-stage validation pipeline.

**3 minutes** | Beginner | CLI

---

## Problem

You've converted your exam to QTI but want to be confident it will import correctly before uploading to Canvas.

## Solution

Run three commands in sequence — each catches a different class of error:

**Step 1: Lint the source markdown**

```bash
examark check exam.md
```

```
✓ 25 questions found
✓ All questions have stems
✓ All questions have correct answers
✓ No duplicate question IDs
```

**Step 2: Validate the QTI package**

```bash
examark verify exam.qti.zip
```

```
✓ Valid QTI 1.2 package
✓ imsmanifest.xml present
✓ 25 items found
✓ All referenced files exist
```

**Step 3: Simulate a Canvas import**

```bash
examark emulate-canvas exam.qti.zip
```

```
✓ Canvas import simulation: SUCCESS
✓ 25/25 questions would import correctly
✓ No unsupported question types
✓ All correct answers defined
```

**One-liner for all three stages:**

```bash
examark check exam.md && examark exam.md -o exam.qti.zip -v && examark emulate-canvas exam.qti.zip
```

The `-v` flag on the convert command runs `verify` automatically after conversion.

## Explanation

The three stages catch different classes of errors:

- **`check`** — Source-level issues before conversion: missing question stems, no correct answer marked, duplicate IDs, empty sections.
- **`verify`** — Package-level issues after conversion: malformed XML, missing files referenced in the manifest, invalid QTI structure.
- **`emulate-canvas`** — Canvas-specific issues: Multiple Answer questions with wrong cardinality, unsupported interaction types, security violations (`<script>` tags), and Quarto GFM compatibility.

For New Quizzes validation, add `--strict` to the verify command:

```bash
examark verify exam.qti.zip --strict
```

## See Also

- [Import and Validate](import-validate.md)
- [Fix Import Errors](fix-import-errors.md)
- [Canvas Emulator Reference](../emulator.md)
