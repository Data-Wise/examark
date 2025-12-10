# Examark

<div align="center">

![Examark Hero](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,14,16,18,20&height=200&section=header&text=Examark&fontSize=80&animation=fadeIn&fontAlignY=35&desc=Markdown%20→%20Canvas%20Quizzes&descAlignY=55&descSize=22&fontColor=ffffff)

[![npm version](https://img.shields.io/npm/v/examark?style=flat-square&logo=npm&color=CB3837)](https://www.npmjs.com/package/examark)
[![CI](https://img.shields.io/github/actions/workflow/status/Data-Wise/examark/ci.yml?branch=main&style=flat-square&logo=github&label=CI)](https://github.com/Data-Wise/examark/actions/workflows/ci.yml)
[![Docs](https://img.shields.io/github/actions/workflow/status/Data-Wise/examark/publish_docs.yml?branch=main&style=flat-square&logo=readthedocs&logoColor=white&label=Docs)](https://data-wise.github.io/examark/)
[![License](https://img.shields.io/badge/license-MIT-22C55E?style=flat-square)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)

**Write exams in Markdown. Export to Canvas in seconds.**

[Documentation](https://data-wise.github.io/examark/) · [Getting Started](https://data-wise.github.io/examark/getting-started/) · [Report Bug](https://github.com/Data-Wise/examark/issues)

</div>

---

## Why Examark?

Stop clicking through Canvas forms. **Write once, export anywhere.**

```
┌─────────────────┐      ┌──────────┐      ┌─────────────────┐
│   quiz.md       │ ───▶ │ examark  │ ───▶ │  quiz.qti.zip   │
│   (Markdown)    │      │          │      │  (Canvas-ready) │
└─────────────────┘      └──────────┘      └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   quiz.txt      │
                    │   (Printable)   │
                    └─────────────────┘
```

**Perfect for:** Instructors, TAs, and course developers who want version-controlled, portable exam files.

---

## Quick Start

**No installation needed** — try it now:

```bash
npx examark quiz.md -o quiz.qti.zip
```

### Write Your Exam

```markdown
# Statistics Midterm

1. [MC] What is the mean of 2, 4, 6? [2pts]
a) Three
b) Four [x]
c) Five

2. [TF] Variance can be negative. [1pt]
a) True
b) False [x]

3. [Essay, 10pts] Explain the Central Limit Theorem.
```

### Convert & Import

```bash
examark midterm.md -o midterm.qti.zip    # For Canvas
examark midterm.md -f text                # For printing
```

Then: **Canvas → Settings → Import Content → QTI .zip**

### Or Import to Item Banks (New Quizzes)

For random question selection across quizzes:

1. **Quizzes → ⋮ → Manage Item Banks**
2. **+ Add Bank** → Name your bank
3. **⋮ → Import Content** → Upload `.qti.zip`
4. Create quiz → **Add from Item Bank** → **Randomly select N questions**

📖 [Item Banks Tutorial →](https://data-wise.github.io/examark/tutorials/item-banks/)

---

## Features

<table>
<tr>
<td width="50%">

### 📝 Clean Syntax
Write questions naturally without complex markup.
```markdown
1. [MC] Question here [2pts]
a) Wrong
b) Right [x]
```

</td>
<td width="50%">

### 🧮 LaTeX Math
Full equation support, auto-converted for Canvas.
```markdown
Find $\bar{x}$ given:
$$\bar{x} = \frac{\sum x_i}{n}$$
```

</td>
</tr>
<tr>
<td>

### 📦 8 Question Types
- Multiple Choice (`[MC]`)
- True/False (`[TF]`)
- Multiple Answer (`[MA]`)
- Short Answer (`[Short]`)
- Numerical (`[Num]`)
- Essay (`[Essay]`)
- Matching (`[Match]`)
- Fill-in-Multiple-Blanks (`[FMB]`)

</td>
<td>

### 🔧 Powerful CLI
```bash
examark *.md -o output/       # Batch convert
examark quiz.md -f text       # Paper exams
examark verify pkg --strict   # New Quizzes check
examark check quiz.md         # Lint syntax
```

</td>
</tr>
<tr>
<td>

### 🖼️ Image Bundling
Local images automatically packaged into QTI.
```markdown
![Graph](assets/chart.png)
```

</td>
<td>

### 🔬 Quarto Integration
Dynamic questions with R/Python.
```yaml
format: exam-gfm
exam:
  qti: true
```

</td>
</tr>
</table>

---

## Installation

### 🚀 Choose Your Path

<table>
<tr>
<td width="33%">

#### 📝 Markdown Only
Write `.md` files → Canvas

</td>
<td width="33%">

#### 📊 Quarto Only
Author `.qmd` → HTML/PDF

</td>
<td width="33%">

#### 📊🎯 Quarto + Canvas
Author `.qmd` → Canvas

</td>
</tr>
<tr>
<td>

**One-Line Install:**
```bash
npx examark quiz.md
```
No install needed!

</td>
<td>

**One-Line Install:**
```bash
quarto add Data-Wise/examark
```
Extension only.

</td>
<td>

**Two Steps:**
```bash
quarto add Data-Wise/examark
npm install -g examark
```
Extension + CLI.

</td>
</tr>
</table>

---

### 📦 Detailed Installation Guide

<details open>
<summary><b>⚡ One-Line (No Install) — Try It Now</b></summary>

**For Markdown users who want to convert `.md` → QTI immediately:**

```bash
npx examark quiz.md -o quiz.qti.zip
```

**What this does:**
- Downloads `examark` temporarily to npm cache
- Converts your markdown file to QTI
- No permanent installation

**Requirements:** [Node.js](https://nodejs.org/) ≥18 (see Windows/Mac setup below)

**When to use:** Quick one-off conversions, trying examark without committing

</details>

---

<details>
<summary><b>👤 Average User — Permanent Install</b></summary>

### For Markdown Users (Static Exams)

Install once, use forever:

**macOS:**
```bash
# Option A: Homebrew (recommended)
brew install data-wise/tap/examark

# Option B: npm
npm install -g examark
```

**Windows:**
```bash
npm install -g examark
```

**Linux:**
```bash
npm install -g examark
```

**Usage:**
```bash
examark quiz.md -o quiz.qti.zip
examark *.md -o output/           # Batch convert
```

---

### For Quarto Users (Preview Only - No QTI)

Install Quarto extension for authoring and preview:

```bash
quarto add Data-Wise/examark
```

**What you get:**
- Formats: `exam-html`, `exam-pdf`, `exam-odt`, `exam-docx`, `exam-typst`
- LaTeX math support
- Solution toggle (`exam.solutions: true/false`)

**What you DON'T get:** QTI conversion (see "Quarto + QTI" below)

**Usage:**
```bash
quarto render exam.qmd --to exam-html    # Preview in browser
quarto render exam.qmd --to exam-pdf     # Print version
```

---

### For Quarto Users (Full Workflow - Preview + QTI)

Install both extension (authoring) and CLI (QTI conversion):

```bash
# Step 1: Quarto extension
quarto add Data-Wise/examark

# Step 2: CLI tool
npm install -g examark        # Windows/Linux
brew install data-wise/tap/examark  # macOS (alternative)
```

**Complete workflow:**
```bash
# 1. Author exam
vim exam.qmd

# 2. Render to markdown
quarto render exam.qmd --to exam-gfm

# 3. Convert to QTI
examark exam.md -o exam.qti.zip

# 4. Upload to Canvas
open exam.qti.zip  # Drag to Canvas → Import Content
```

> **💡 Tip:** Use `npx examark` instead of installing globally if you prefer

</details>

---

<details>
<summary><b>🔰 First-Time Setup (Windows/Mac)</b></summary>

### Windows Users

**If you've never used Node.js:**

1. **Install Node.js** → [nodejs.org](https://nodejs.org/)
   - Click green **"LTS"** button
   - Run installer, accept all defaults
   - Click through everything

2. **Open Terminal:**
   - Press `Windows + R`
   - Type `cmd` and press Enter

3. **Test it works:**
   ```cmd
   node --version
   ```
   Should show: `v18.x.x` or higher

4. **Use examark:**
   ```cmd
   npx examark quiz.md -o quiz.qti.zip
   ```

**Permanent install:**
```cmd
npm install -g examark
```

---

### macOS Users

**Recommended: Homebrew (easiest)**

1. **Install Homebrew** (if not installed):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install examark:**
   ```bash
   brew install data-wise/tap/examark
   ```

**Alternative: npm**

1. **Install Node.js** → [nodejs.org](https://nodejs.org/)

2. **Install examark:**
   ```bash
   npm install -g examark
   ```

</details>

---

<details>
<summary><b>🛠️ Advanced Users</b></summary>

### Install from Source

```bash
git clone https://github.com/Data-Wise/examark.git
cd examark
npm install
npm run build
npm link
```

### Install Specific Version

```bash
npm install -g examark@0.6.6
```

### Update to Latest

```bash
npm update -g examark       # npm
brew upgrade examark        # Homebrew
```

### Uninstall

```bash
npm uninstall -g examark    # npm
brew uninstall examark      # Homebrew
```

</details>

---

## Commands

| Command | Description |
|---------|-------------|
| `examark <file.md>` | Convert to QTI (default: `file.qti.zip`) |
| `examark <file.md> -f text` | Export as printable plain text |
| `examark *.md -o output/` | Batch convert multiple files |
| `examark verify <pkg>` | Validate QTI package |
| `examark verify <pkg> --strict` | Strict validation for New Quizzes |
| `examark emulate-canvas <pkg>` | Simulate Canvas import |
| `examark check <file.md>` | Lint markdown for errors |
| `examark --preview` | Preview parsed questions (JSON) |

**Options:** `-o <output>` · `-p <points>` · `-t <title>` · `--no-answers` · `-v` · `--strict`

---

## Configuration

Create `.examarkrc.json` for project defaults:

```json
{
  "defaultPoints": 2,
  "outputDir": "output",
  "validate": true
}
```

---

## Templates

**Markdown (no Quarto needed):**

| Template | Description |
|----------|-------------|
| [minimal.md](templates/markdown/minimal.md) | 3 questions — quickest start |
| [starter.md](templates/markdown/starter.md) | One of each question type |
| [all-question-types.md](templates/markdown/all-question-types.md) | Comprehensive — all 8 types |

**Quarto (for R/Python users):**

| Template | Description |
|----------|-------------|
| [minimal.qmd](templates/quarto/minimal.qmd) | Simplest Quarto template |
| [starter.qmd](templates/quarto/starter.qmd) | Full-featured starter |
| [dynamic.qmd](templates/quarto/dynamic.qmd) | Randomized questions with R |
| [with-figures.qmd](templates/quarto/with-figures.qmd) | R-generated plots |

---

## Quarto Integration

Generate dynamic, randomized questions with R or Python code.

### Quick Start

```bash
# Add extension to existing project
quarto add Data-Wise/examark

# Or start from template
quarto use template Data-Wise/examark
```

> **⚠️ Note:** This only installs the Quarto extension (for authoring/preview).
> To export QTI packages, also install the CLI: `npm install -g examark`

### Example: Dynamic Questions

```yaml
---
title: "Statistics Exam"
format: exam-html      # Preview in browser
exam:
  solutions: false
  default-points: 1
---

## 1. Random Calculation [2pts]

What is `r x <- sample(1:10, 1); x` + `r y <- sample(1:10, 1); y`?

a) `r x + y - 2`
b) `r x + y` [x]
c) `r x + y + 2`
```

### Available Formats

| Format | Output | Use Case |
|--------|--------|----------|
| `exam-html` | HTML | Browser preview |
| `exam-pdf` | PDF | Print exams |
| `exam-gfm` | Markdown | QTI conversion (use with CLI) |
| `exam-odt` | ODT | Google Docs, LibreOffice |
| `exam-docx` | DOCX | Microsoft Word |
| `exam-typst` | PDF | Modern typesetting |

### Complete QTI Workflow

```bash
# 1. Render to markdown
quarto render exam.qmd --to exam-gfm

# 2. Convert to QTI (requires CLI installed)
examark exam.md -o exam.qti.zip

# 3. Upload to Canvas
```

📖 [Full Quarto Guide →](https://data-wise.github.io/examark/extensions/quarto/) · [Dynamic Examples →](https://data-wise.github.io/examark/tutorials/dynamic-exams/)

---

## Documentation

| | |
|---|---|
| 📚 [**Full Docs**](https://data-wise.github.io/examark/) | Complete reference |
| 🚀 [Getting Started](https://data-wise.github.io/examark/getting-started/) | Install + first quiz |
| 📝 [Markdown Syntax](https://data-wise.github.io/examark/markdown/) | Question syntax |
| 🏦 [Item Banks](https://data-wise.github.io/examark/tutorials/item-banks/) | Random quizzes |
| ⚙️ [Configuration](https://data-wise.github.io/examark/config/) | Project settings |
| 🎓 [Tutorials](https://data-wise.github.io/examark/tutorials/) | R/Quarto, VS Code |

---

<div align="center">

**[Get Started →](https://data-wise.github.io/examark/getting-started/)**

Made with ❤️ by [Data-Wise](https://github.com/Data-Wise) · [MIT License](LICENSE)

</div>
