# Quick Start Tutorial

Get started with Canvas QTI Converter in 5 minutes.

## Installation

```bash
# Clone the repository
git clone https://github.com/Data-Wise/canvas-qti-converter.git
cd canvas-qti-converter

# Install dependencies
npm install

# Build the project
npm run build

# Link globally (optional)
npm link
```

## Your First Conversion

### 1. Create a Markdown File

Create `quiz.md`:

```markdown
# Pool: My First Quiz

## 1. What is 2 + 2?
a) 3
b) 4 [correct]
c) 5

## 2. [TF] The Earth is flat.
*False
True

## 3. [Essay, 10pts] Explain photosynthesis.
```

### 2. Convert to QTI

```bash
qti-convert quiz.md -o quiz.qti.zip
```

### 3. Verify Your Package

```bash
qti-convert emulate-canvas quiz.qti.zip
```

### 4. Import to Canvas

1. Go to your Canvas course
2. Click **Settings** → **Import Course Content**
3. Select **QTI .zip file**
4. Upload your `quiz.qti.zip`
5. Click **Import**

## What's Next?

- [Input Formats](formats.md) - Learn all supported question types
- [Canvas Emulator](emulator.md) - Predict import success
- [CLI Reference](reference.md) - All command options
