# Your First Quiz

Create and import a quiz into Canvas in under 5 minutes.

---

## Step 1: Create a Markdown File

Create a file called `quiz.md` with this content:

```markdown
# My First Quiz

1. [MC] What is the capital of France? [2pts]
a) London
b) Paris [x]
c) Berlin
d) Madrid

2. [TF] The Earth is flat. [1pt]
a) True
b) False [x]

3. [Essay, 5pts] Describe your favorite book.
```

That's it! The syntax is:

- `# Title` — Quiz title
- `1. [MC]` — Question number and type (MC = Multiple Choice)
- `[2pts]` — Point value
- `[x]` — Marks the correct answer

---

## Step 2: Convert to QTI

Open your terminal and run:

```bash
npx examark quiz.md -o quiz.qti.zip
```

!!! success "Output"
    ```
    ✓ Generated QTI 1.2 Package: quiz.qti.zip
      • 3 questions
      • 0 sections
      • Format: Canvas Classic Quizzes compatible
    ```

---

## Step 3: Import into Canvas

1. Go to your Canvas course
2. Click **Settings** → **Import Course Content**
3. Select **QTI .zip file**
4. Choose your `quiz.qti.zip` file
5. Click **Import**

![Canvas Import](https://community.canvaslms.com/t5/image/serverpage/image-id/10577i7B1E1D7F5B5B5B5B){ width="400" }

---

## Step 4: Verify and Publish

1. Go to **Quizzes** in your course
2. Find "My First Quiz"
3. Click to preview
4. Click **Publish** when ready

---

## What's Next?

- [Input Formats](../formats.md) — Learn all question types
- [Templates](../starter/index.md) — Download ready-made examples
- [Commands Reference](../reference.md) — All CLI options

---

## Quick Reference

| Type | Syntax |
|------|--------|
| Multiple Choice | `[MC]` |
| True/False | `[TF]` |
| Multiple Answer | `[MA]` |
| Short Answer | `[Short]` |
| Numeric | `[Numeric]` |
| Essay | `[Essay]` |
| Matching | `[Match]` |
| Fill-in-Blanks | `[FMB]` |

| Correct Answer Markers |
|------------------------|
| `[x]` after option |
| `**Bold**` the answer |
| `[correct]` suffix |
| `*` prefix on option |
