# CLI Reference

Complete command reference for Canvas QTI Converter.

## Commands

### Convert (Default)

Convert a Markdown file to QTI package.

```bash
qti-convert <input> [options]
```

**Options:**

| Option | Description |
|--------|-------------|
| `-o, --output <file>` | Output QTI zip file path |
| `-v, --validate` | Validate output structure |
| `--preview` | Preview parsed questions (no file created) |

**Examples:**

```bash
# Basic conversion
qti-convert quiz.md

# Custom output path
qti-convert quiz.md -o my-quiz.qti.zip

# Preview without generating file
qti-convert quiz.md --preview
```

---

### Verify

Validate an existing QTI package structure.

```bash
qti-convert verify <path>
```

**Examples:**

```bash
qti-convert verify quiz.qti.zip
qti-convert verify ./qti-folder/
```

---

### Emulate Canvas

Simulate Canvas LMS import and predict success/failure.

```bash
qti-convert emulate-canvas <path>
```

**Output includes:**

- Item count and structure analysis
- Canvas-specific validation checks
- Success/failure prediction
- Actionable fix suggestions

---

### Check (Lint)

Lint a Markdown file for syntax errors.

```bash
qti-convert check <input>
# or
qti-convert lint <input>
```

**Examples:**

```bash
qti-convert check quiz.md
```

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Success |
| `1` | Error (validation failed, file not found, etc.) |
