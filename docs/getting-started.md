# Getting Started

Get up and running with Examark in under 5 minutes.

---

## Which Installation Path?

Choose based on your workflow:

| You Want To... | Install This |
|----------------|-------------|
| **Convert `.md` files to Canvas quizzes** | CLI tool (see below) |
| **Author `.qmd` files with R/Python (preview only)** | `quarto add Data-Wise/examark` |
| **Author `.qmd` files AND export to Canvas** | Both extension + CLI |

---

## Installation

### ⚡ One-Line (No Install)

**Try it now** — no installation required:

```bash
npx examark quiz.md -o quiz.qti.zip
```

Perfect for one-time conversions or trying Examark.

**Requirements:** [Node.js](https://nodejs.org/) ≥18

---

### 📦 Permanent Install

=== "macOS"

    **Option 1: Homebrew (Recommended)**

    ```bash
    brew install data-wise/tap/examark
    ```

    Installs CLI + dependencies. No Node.js setup needed.

    **Option 2: npm**

    ```bash
    npm install -g examark
    ```

    Requires [Node.js 18+](https://nodejs.org/).

=== "Windows"

    **Step 1: Install Node.js** (if not already installed)

    1. Go to [nodejs.org](https://nodejs.org/)
    2. Click green **"LTS"** button (recommended version)
    3. Run installer with all defaults
    4. Open **Command Prompt** (`Windows + R` → type `cmd`)
    5. Verify: `node --version` (should show v18.x.x+)

    **Step 2: Install Examark**

    ```cmd
    npm install -g examark
    ```

    **Step 3: Verify**

    ```cmd
    examark --version
    ```

    !!! tip "Skip Installation"
        Use `npx examark quiz.md` to run without installing!

=== "Linux"

    **Ubuntu/Debian:**

    ```bash
    # Install Node.js 18+ (if needed)
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs

    # Install Examark
    npm install -g examark
    ```

    **Fedora/RHEL:**

    ```bash
    # Install Node.js 18+ (if needed)
    curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
    sudo dnf install nodejs

    # Install Examark
    npm install -g examark
    ```

=== "Quarto Extension"

    **For Quarto users authoring `.qmd` files:**

    ```bash
    quarto add Data-Wise/examark
    ```

    !!! warning "QTI Export Requires CLI"
        The Quarto extension only provides authoring and preview formats (`exam-html`, `exam-pdf`, etc.).

        **To export QTI packages for Canvas**, also install the CLI:

        ```bash
        npm install -g examark
        ```

        Then workflow is:
        ```bash
        quarto render exam.qmd --to exam-gfm  # Render
        examark exam.md -o exam.qti.zip       # Convert
        ```

=== "Advanced"

    **Install from source:**

    ```bash
    git clone https://github.com/Data-Wise/examark.git
    cd examark
    npm install
    npm run build
    npm link
    ```

    **Install specific version:**

    ```bash
    npm install -g examark@0.6.6
    ```

### ✅ Verify Installation

```bash
examark --version
```

---

## First Conversion

### 1. Create a quiz file

Create `quiz.md`:

=== "Clean Syntax (Recommended)"

    ```markdown
    # Statistics Quiz

    # Section: Multiple Choice

    1. [MC] What is 2 + 2? [2pts]
    a) Three
    b) Four [x] // Correct answer
    c) Five

    2. [TF] The sky is blue. [1pt]
    a) True [x]
    b) False

    3. [Essay, 10pts] Explain the water cycle.
    ```

=== "Traditional Syntax"

    ```markdown
    # Statistics Quiz

    # Section: Multiple Choice

    ## 1. What is 2 + 2?

    a) Three
    b) **Four** ✓
    c) Five

    ## 2. [TF] The sky is blue. → True

    ## 3. [Essay, 10pts] Explain the water cycle.
    ```

### 2. Convert to QTI

```bash
examark quiz.md -o quiz.qti.zip
```

Output:

```text
✓ Generated QTI 1.2 Package: quiz.qti.zip
  • 3 questions
  • 1 section
  • 0 images bundled
```

### 3. Verify the package

```bash
examark emulate-canvas quiz.qti.zip
```

Output:

```text
🎓 Canvas Import Emulator

📊 Analysis Results:
   Items scanned: 3
   Resources: 4
   Has test structure: Yes

✅ PREDICTION: Canvas import will likely SUCCEED
```

---

## Templates

Start with a ready-made template:

**Markdown (no Quarto needed):**

| Template | Questions | Best For |
|----------|-----------|----------|
| [`minimal.md`](https://github.com/Data-Wise/examark/blob/main/templates/markdown/minimal.md) | 3 | Quickest start |
| [`starter.md`](https://github.com/Data-Wise/examark/blob/main/templates/markdown/starter.md) | 6 | Beginners |
| [`all-question-types.md`](https://github.com/Data-Wise/examark/blob/main/templates/markdown/all-question-types.md) | 15+ | All 8 question types |

**Quarto (R/Python):** See the [Quarto Extension](extensions/quarto.md) for `.qmd` templates.

---

## Import to Canvas

1. Go to **Settings** → **Import Course Content**
2. Select **QTI .zip file** as Content Type
3. Upload your `.qti.zip` file
4. Click **Import**
5. Navigate to **Quizzes** → **Manage Question Banks**

---

## Other Export Options

### Plain Text (Paper Exams)

Export for printing:

```bash
examark quiz.md -f text -o quiz.txt
```

### Batch Conversion

Convert multiple files at once:

```bash
examark *.md -o output/
```

### Project Configuration

Create `.examarkrc.json` for project settings:

```json
{
  "defaultPoints": 2,
  "outputDir": "output",
  "validate": true
}
```

See [Configuration](config.md) for all options.

---

## Next Steps

- [Markdown Syntax](markdown/syntax.md) — Complete question syntax guide
- [Commands Reference](reference.md) — All CLI options
- [Configuration](config.md) — Project settings
- [Canvas Emulator](emulator.md) — Pre-import validation
- [Tutorials](tutorials/index.md) — R/Quarto integration
- [Quarto Extension](extensions/quarto.md) — Advanced authoring
