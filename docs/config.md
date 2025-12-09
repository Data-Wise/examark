# Configuration

Examark supports project-level configuration through JSON config files.

---

## Config Files

Examark searches for config files in this order:

1. `.examarkrc.json` (recommended)
2. `examark.config.json`

The search starts from the input file's directory and moves up to the filesystem root.

---

## Creating a Config File

Create `.examarkrc.json` in your project root:

```json
{
  "defaultPoints": 2,
  "outputDir": "output",
  "validate": true,
  "title": "Course Quiz"
}
```

---

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `defaultPoints` | number | `1` | Default points for questions without explicit points |
| `outputDir` | string | (same as input) | Default output directory for generated files |
| `validate` | boolean | `false` | Always validate output after conversion |
| `title` | string | (from file) | Default quiz title override |

---

## Option Details

### defaultPoints

Set the default point value for questions that don't specify points:

```json
{
  "defaultPoints": 2
}
```

Questions with explicit points (e.g., `[5pts]`) are not affected.

### outputDir

Specify where generated files should be saved:

```json
{
  "outputDir": "qti-packages"
}
```

The directory is created if it doesn't exist.

### validate

Always run validation after generating QTI:

```json
{
  "validate": true
}
```

Equivalent to always using the `-v` flag.

### title

Override the quiz title for all conversions:

```json
{
  "title": "Statistics 101 - Quiz"
}
```

The title from the Markdown file's `# Title` line is used if not set.

---

## CLI Override

Command-line options always take precedence over config file settings:

```bash
# Uses config file defaultPoints
examark quiz.md

# CLI overrides config file
examark quiz.md -p 5
```

---

## Example Project Structure

```
my-course/
├── .examarkrc.json      # Project config
├── exams/
│   ├── midterm.md
│   └── final.md
└── output/              # Generated files go here
    ├── midterm.qti.zip
    └── final.qti.zip
```

**`.examarkrc.json`:**

```json
{
  "defaultPoints": 2,
  "outputDir": "output",
  "validate": true
}
```

**Usage:**

```bash
cd my-course
examark exams/midterm.md    # Output: output/midterm.qti.zip
examark exams/*.md -o output/  # Batch convert all exams
```

---

## Monorepo Support

For monorepos with multiple courses, place config files in each course directory:

```
courses/
├── statistics/
│   ├── .examarkrc.json   # Statistics-specific settings
│   └── quizzes/
├── calculus/
│   ├── .examarkrc.json   # Calculus-specific settings
│   └── quizzes/
```

Each course's quizzes use their own config file.
