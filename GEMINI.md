# Canvas QTI Converter - Project Notes

## Project Overview

- **Location**: `/Users/dt/dev-tools/canvas-examifyer`
- **Purpose**: Convert Markdown questions to Canvas-compatible QTI 1.2 packages
- **Documentation**: <https://data-wise.github.io/canvas-examifyer/>
- **Version**: 0.3.0

## Key Commands

```bash
# Convert markdown to QTI (output to scratch folder)
node dist/index.js input.md -o scratch/output.qti.zip

# Verify QTI package
node dist/index.js verify package.qti.zip

# Simulate Canvas import
node dist/index.js emulate-canvas package.qti.zip

# Preview parsed questions
node dist/index.js input.md --preview

# Run tests (32 tests)
npm test
```

## Development Rules

- **Generated test files go in `scratch/`** - Keep root directory clean
- **Build before testing**: `npm run build`
- **QTI format**: Uses QTI 1.2 (Canvas Classic Quizzes), not QTI 2.1

## Input Format Requirements

Questions MUST use `## N. Question` format (with ##):

```markdown
# Pool: Quiz Title

# Section: Multiple Choice

## 1. What is 2 + 2? [2 pts]

1)  Three
2)  **Four** ✓
3)  Five

## 2. [TF] The sky is blue. → True
```

### Correct Answer Markers

- `**Bold**` or `✓` checkmark
- `[correct]` suffix
- `*` prefix (e.g., `*a) Answer`)
- `→ True` or `→ False` for T/F questions

## Question Types

| Type | Syntax |
|------|--------|
| Multiple Choice | Default |
| True/False | `[TF]` or `→ True/False` |
| Multiple Answer | `[MultiAns]` |
| Essay | `[Essay]` |
| Short Answer | `[Short]` |
| Numeric | `[Numeric]` with `± tolerance` |

## Folder Structure

- `src/` - TypeScript source
- `dist/` - Compiled JavaScript
- `docs/` - MkDocs documentation
- `examples/` - Sample input files
- `scratch/` - **Generated test QTI files (always output here)**
- `tests/` - Vitest test suite

## Canvas Import Process

1. Course → Settings → Import Course Content
2. Content Type: QTI .zip file
3. Upload .qti.zip file
4. Import → Check Quizzes → Manage Question Banks
