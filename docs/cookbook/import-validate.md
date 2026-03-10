# Import and Validate a Canvas Quiz

> **TL;DR** Write Markdown, convert to QTI, validate with the emulator, then upload to Canvas.

**10 minutes** | Beginner | CLI

---

## Problem

You have an exam written in Markdown and need to get it into Canvas as a working quiz with correct answers, images, and point values intact.

## Solution

### How It Works

```mermaid
flowchart LR
    A["exam.md"] --> B["examark"]
    B --> C["exam.qti.zip"]
    C --> D["emulate-canvas"]
    D -->|"Pass"| E["Canvas Import"]
    D -->|"Errors"| F["Fix Issues"]
    F --> A

    style A fill:#4A90D9,color:#fff
    style C fill:#7B68EE,color:#fff
    style E fill:#22C55E,color:#fff
    style F fill:#EF4444,color:#fff
```

**The three-step loop:**

1. **Write** your exam in Markdown (`.md` or `.qmd`)
2. **Convert** to QTI with `examark`
3. **Validate** with `emulate-canvas` --- catch errors before uploading

Run the emulator until you see `PREDICTION: Canvas import will likely SUCCEED`, then upload.

### Supported Question Types

| Type | Marker | Canvas Name | Notes |
|------|--------|-------------|-------|
| Multiple Choice | `[MC]` | Multiple Choice | One correct answer |
| True/False | `[TF]` | True/False | Binary questions |
| Multiple Answers | `[MA]` | Multiple Answers | 2+ correct answers required |
| Short Answer | `[Short]` | Fill in the Blank | Accepts multiple answers |
| Essay | `[Essay]` | Essay | Manually graded |
| Numerical | `[Num]` | Numerical | Exact value or range |
| Matching | `[Match]` | Matching | Pair relationships |
| Fill in Multiple Blanks | `[FMB]` | Fill in Multiple Blanks | Multiple blanks in stem |

### Correct Answer Markers

All markers are case-insensitive and interchangeable:

=== "Recommended"

    ```markdown
    1. [MC] What is the mean of 2, 4, 6? [2pts]
    a) Three
    b) Four [x]
    c) Five
    ```

=== "Checkmark"

    ```markdown
    1. [MC] What is the mean of 2, 4, 6? [2pts]
    a) Three
    b) Four ✓
    c) Five
    ```

=== "Star prefix (Multiple Answers)"

    ```markdown
    2. [MA] Which are measures of spread? [3pts]
    *a) Variance
    b) Mean
    *c) Standard deviation
    *d) Range
    ```

| Marker | Example | Use For |
|--------|---------|---------|
| `[x]` | `b) Answer [x]` | MC, TF, MA |
| `✓` or `✔` | `b) Answer ✓` | MC, TF, MA |
| `[correct]` | `b) Answer [correct]` | MC, TF, MA |
| `**bold**` | `b) **Answer**` | MC, TF (legacy) |
| `*` prefix | `*b) Answer` | MA (select-all) |

### Short Answer: Multiple Accepted Answers

Two equivalent syntaxes:

=== "= syntax (Recommended)"

    ```markdown
    5. [Short] What pattern indicates unequal variance? [2pts]
    = funnel
    = funnel shape
    = fan shape
    = megaphone
    ```

=== "Answer: syntax"

    ```markdown
    5. [Short] What pattern indicates unequal variance? [2pts]
    Answer: funnel
    Answer: funnel shape
    Answer: fan shape
    ```

The `=` syntax is preferred for readability when listing multiple acceptable answers. Both parse identically.

!!! note "Case Sensitivity"
    Canvas short answer matching is case-insensitive by default. List the most common spellings and phrasings.

### Multiple Answers: Getting Full Credit

Canvas Multiple Answers questions grade students on selecting **all correct** options and **none of the incorrect** ones. The QTI structure must explicitly exclude incorrect options.

```markdown
3. [MA] Which assumptions does OLS regression require? [4pts]
*a) Linearity
b) Large sample size
*c) Independence of errors
*d) Homoscedasticity
e) Normality of predictors
```

The `*` prefix marks correct answers. Examark automatically generates the required `<not><varequal>` exclusions for incorrect options in the QTI output.

!!! warning "Minimum 2 correct answers"
    Canvas rejects MA questions with fewer than 2 correct answers. The validator will flag this as a blocking error.

### Validation Pipeline

Run validation before uploading:

```bash
# Step 1: Check the Markdown source
examark check exam.md

# Step 2: Convert
examark exam.md -o exam.qti.zip

# Step 3: Emulate Canvas import
examark emulate-canvas exam.qti.zip
```

#### What the emulator catches

| Check | What It Means |
|-------|---------------|
| **MA cardinality** | MA questions must use `rcardinality="Multiple"` |
| **MA incorrect exclusion** | Canvas needs explicit `<not>` for each wrong option |
| **Short answer answers** | Short answer must have at least one accepted answer |
| **Correct answer defined** | MC/TF must have a correct answer marked |
| **Option count** | Need at least 2 answer choices |
| **Image references** | All bundled images must exist |
| **Security** | No XSS vectors allowed |

#### Success output

```text
Canvas Import Emulator

Analysis Results:
   Items scanned: 18
   Resources: 19
   Has test structure: Yes

PREDICTION: Canvas import will likely SUCCEED
```

#### Failure output (with fix hints)

```text
PREDICTION: Canvas import will likely FAIL

Canvas Import Blockers:
   - Multiple answers question q3: rcardinality="Single" (must be "Multiple")
   - Short answer question q7: no correct answers defined

Suggested Fixes:
   - Q3: Add a second correct answer with * prefix
   - Q7: Add "Answer: text" or "= text" line after question stem
```

### Quarto to Canvas Workflow

For Quarto (`.qmd`) files with R/Python code:

#### Automatic (Recommended)

Add a post-render hook to `_quarto.yml` --- QTI is generated automatically after every render:

```yaml
project:
  type: default
  output-dir: _output
  render:
    - "exam/*.qmd"
  post-render: ./_quarto-post-render.sh
```

```bash
# One command does both steps
quarto render exam.qmd --to exam-gfm
# QTI package ready: _output/exam/exam.qti.zip
```

The `_quarto-post-render.sh` script is included in the starter template (`quarto use template Data-Wise/examark`).

!!! note "Quarto 1.8+ path requirement"
    Use `post-render: ./_quarto-post-render.sh` with the `./` prefix. Bare filenames fail in Quarto 1.8+ due to Deno path resolution.

#### Manual

```bash
# Step 1: Render to GFM (Markdown)
quarto render exam.qmd --to exam-gfm

# Step 2: Convert to QTI
examark _output/exam/exam.md -o exam.qti.zip

# Step 3: Validate
examark emulate-canvas exam.qti.zip
```

Or add `exam.qti: true` to your YAML frontmatter --- Quarto prints the exact `examark` command to run after rendering.

!!! tip "R-generated figures"
    Examark automatically bundles R-generated plots from Quarto code chunks into the QTI package. Run `quarto render` before `examark` so all figures are generated first.

### Importing to Canvas

After `emulate-canvas` shows success:

1. Go to **Course Settings** > **Import Course Content**
2. Select **QTI .zip file** as Content Type
3. Upload your `.qti.zip` file
4. Click **Import**
5. Find imported questions in **Quizzes** > **Question Banks**

#### Item Banks (New Quizzes)

To import directly to an Item Bank:

1. Go to **Course Settings** > **Manage Item Banks**
2. Click **Import Content**
3. Upload your `.qti.zip`

Item Banks work with Canvas New Quizzes and support random question selection. See the [Item Banks recipe](item-banks.md).

## Explanation

- The emulator runs the same checks Canvas performs during import, so errors caught here will not surprise you after uploading.
- MA questions require both correct selections and incorrect exclusions in the QTI XML --- Examark handles this automatically when you use `*` prefix markers.
- Short answer questions accept multiple phrasings via `=` lines. Canvas matches case-insensitively.
- Quarto post-render hooks eliminate the manual conversion step entirely for `.qmd` workflows.

## See Also

- [Fix Import Errors](fix-import-errors.md) --- Troubleshoot common Canvas failures
- [Your First Quiz](first-quiz.md) --- Start from scratch
- [Canvas Emulator](../emulator.md) --- Full emulator documentation
- [Canvas Quick Reference](../reference/REFCARD-CANVAS.md) --- One-page cheat sheet
- [Item Banks](item-banks.md) --- Using Canvas New Quizzes Item Banks
