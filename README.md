# Examify

<div align="center">

![Examify Logo](https://img.shields.io/badge/Examify-v0.4.0-7C3AED?style=for-the-badge&logo=markdown&logoColor=white)

[![License](https://img.shields.io/badge/license-MIT-22C55E?style=for-the-badge)](LICENSE)
[![Tests](https://img.shields.io/badge/tests-32%20passing-22C55E?style=for-the-badge)](https://github.com/Data-Wise/examify/actions)
[![Node](https://img.shields.io/badge/node-≥18-3178C6?style=for-the-badge)](https://nodejs.org/)

**Create beautiful exams from Markdown and export to Canvas QTI format.**

[📖 Read the Documentation](https://data-wise.github.io/examify/) • [🐛 Report Bug](https://github.com/Data-Wise/examify/issues) • [💡 Request Feature](https://github.com/Data-Wise/examify/issues)

</div>

---

## ✨ Features

- **📝 Markdown First**: Write questions in simple, readable Markdown. Focus on content, not XML.
- **🧮 LaTeX Support**: Full equation support. We convert `$...$` to Canvas's expected format automatically.
- **🖼️ Image Bundling**: References to local images? We bundle them into the QTI package with a proper manifest.
- **🎓 Canvas Emulator**: Predict import success **before** you upload. Save hours of debugging.
- **🛡️ 6 Question Types**: Multiple Choice, True/False, Multiple Answer, Essay, Short Answer, and Numeric.

## 🚀 Quick Start

```bash
# 1. Install
git clone https://github.com/Data-Wise/examify.git
cd examify
npm install && npm run build && npm link

# 2. Convert your quiz
examify quiz.md -o quiz.qti.zip

# 3. Simulate import (optional but recommended)
examify emulate-canvas quiz.qti.zip
```

## 📝 Input Format

Questions must start with `## N.` (double hash + number + dot).

```markdown
# Statistics Quiz

## 1. What is the mean of 2, 4, 6? [2 pts]
a) 3
b) **4** ✓
c) 5

## 2. [TF] The sky is green. → False

## 3. [Essay, 10pts] Explain the Central Limit Theorem.
```

[View all supported formats in the docs →](https://data-wise.github.io/examify/formats/)

## 🔧 Commands

| Command | Description |
|---------|-------------|
| `examify <file.md>` | Convert Markdown to QTI package |
| `examify verify <file.zip>` | Validate package structure & diagnostics |
| `examify emulate-canvas <file.zip>` | Simulate Canvas import process |
| `examify check <file.md>` | Lint input file for syntax errors |

## 🛠️ Development

```bash
npm install      # Install dependencies
npm run build    # Build project
npm test         # Run tests (32 passing)
```

## 📄 License

MIT © [MediationVerse Team](https://github.com/Data-Wise)
