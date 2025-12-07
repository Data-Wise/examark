# Examify

<div align="center">

![Version](https://img.shields.io/badge/version-0.4.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)

**Create exams from Markdown and export to Canvas QTI format**

[📖 Documentation](https://data-wise.github.io/examify/) • [🐛 Report Bug](https://github.com/Data-Wise/examify/issues) • [💡 Request Feature](https://github.com/Data-Wise/examify/issues)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📝 **Markdown First** | Write questions in simple Markdown syntax |
| ✅ **Flexible Correct Markers** | Use `[correct]`, `✓`, `*`, or `**bold**` |
| 🧮 **LaTeX Support** | Math equations `$...$` converted to Canvas format |
| 🖼️ **Image Bundling** | Images automatically bundled in package for Canvas |
| 🎓 **Canvas Emulator** | Predict import success before uploading |
| 🛡️ **Built-in Validator** | Catches common import issues |

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/Data-Wise/examify.git
cd examify
npm install && npm run build && npm link

# Convert a file
examify quiz.md -o quiz.qti.zip

# Predict Canvas import success
examify emulate-canvas quiz.qti.zip
```

## 📄 Input Format

```markdown
# Pool: Statistics Quiz

## 1. What is the mean of 2, 4, 6?
a) 3
b) 4 [correct]
c) 5

## 2. [TF] Variance can be negative.
*False
True

## 3. [Essay, 10pts] Explain the central limit theorem.
```

### Correct Answer Markers

| Marker | Example | Best For |
|--------|---------|----------|
| `[correct]` | `b) Answer [correct]` | Quarto (recommended) |
| `✓` | `b) Answer ✓` | Visual editing |
| `*` prefix | `*b) Answer` | Quick marking |
| `**bold**` | `b) **Answer**` | Markdown native |

### Question Types

| Type | Syntax |
|------|--------|
| Multiple Choice | Default |
| True/False | `[TF]` or `→ True/False` |
| Multiple Answer | `[MultiAns]` |
| Essay | `[Essay]` |
| Short Answer | `[Short]` |

## 🎓 Canvas Emulator

Predict whether your QTI will import successfully:

```bash
$ examify emulate-canvas quiz.qti.zip

🎓 Canvas Import Emulator

📊 Analysis Results:
   Items scanned: 7
   Resources: 8
   Has test structure: Yes

✅ PREDICTION: Canvas import will likely SUCCEED
```

## 🔧 Commands

| Command | Description |
|---------|-------------|
| `examify <file.md>` | Convert to QTI package |
| `examify verify <file.zip>` | Validate package structure |
| `examify emulate-canvas <file.zip>` | Predict Canvas import |
| `examify check <file.md>` | Lint input file |

## 🛠️ Development

```bash
npm install      # Install dependencies
npm run build    # Build project
npm test         # Run tests (32 passing)
npm link         # Install globally
```

## 📚 Documentation

Full documentation with tutorials available at:
**[https://data-wise.github.io/examify/](https://data-wise.github.io/examify/)**

## 📄 License

MIT © [MediationVerse Team](https://github.com/Data-Wise)
