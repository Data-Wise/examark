# Canvas QTI Converter

Convert Markdown/Text question files to Canvas-compatible QTI format for easy quiz import.

## Features

- 📝 Write questions in familiar Markdown format
- 🔢 Supports Multiple Choice, True/False, Essay, Short Answer
- 🧮 Preserves LaTeX math notation (`\( \alpha \)`)
- 📦 Outputs valid QTI XML for Canvas import

## Installation

```bash
npm install -g canvas-qti-converter
# or
bun install -g canvas-qti-converter
```

## Usage

```bash
qti-convert questions.md -o output.qti.xml
```

### Options

| Option | Description |
|--------|-------------|
| `-o, --output <file>` | Output file (default: `<input>.qti.xml`) |
| `-v, --validate` | Validate output structure |
| `--preview` | Preview parsed questions |

## Input Format

```markdown
# Pool: My Question Bank
Points: 2

---

## Section: Topic Name

Instructions for this section.

1. What is the correct answer?
   *a) This is correct (asterisk marks it)
   b) Wrong answer
   c) Wrong answer
   d) Wrong answer

2. [Essay, 10pts] Explain your reasoning.

3. [TF] True or false statement here.
   *True
   False
```

### Syntax

- `# Pool: Name` - Question bank name
- `Points: N` - Default points per question
- `## Section: Name` - Group questions by topic
- `*a)` - Asterisk prefix marks correct answer
- `[Essay, Npts]` - Question type override with points
- `\( LaTeX \)` - Inline math preserved

## License

MIT
