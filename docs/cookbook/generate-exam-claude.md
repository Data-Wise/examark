# Generate an Exam with Claude Code

> **TL;DR** Generate a complete exam using Claude Code and the examark plugin's `/exam:convert` command.

**10 minutes** | Beginner | Claude Code

---

## Problem

You want to quickly create a well-formatted exam from a topic outline or learning objectives, using Claude as your authoring assistant.

## Solution

### 1. Describe your exam

Give Claude the topic, number of questions, difficulty level, and question types:

```
Create a 10-question statistics exam on hypothesis testing.
Include: 5 MC, 2 Short Answer, 1 Matching, 1 TF, 1 Essay.
Points: 2pts each for MC/TF/Short, 4pts for Matching, 5pts for Essay.
```

### 2. Claude generates the markdown

The plugin's built-in skills teach Claude proper examark syntax, so it produces correctly formatted output with answer markers, type tags, and point values.

### 3. Auto-lint catches issues

The PostToolUse hook automatically runs `examark check` after every edit or write to an exam `.md` file. You'll see any syntax issues immediately.

### 4. Convert to QTI

```
/exam:convert exam.md
```

### 5. Preview the exam

```
/exam:preview exam.md
```

This shows a formatted summary table of all questions: number, type, points, stem preview, and correct answer.

### 6. Validate for Canvas

Claude runs the Canvas emulator to confirm the package will import cleanly:

```bash
examark emulate-canvas exam.qti.zip
```

## Explanation

- The examark plugin includes 5 skills that teach Claude: syntax rules, question generation patterns, statistics-specific patterns, Quarto integration, and a quick reference cheat sheet.
- Auto-lint is **informational only** -- it flags issues but never blocks edits.
- Claude knows all 10 question types (MC, MA, TF, Essay, Short Answer, Numerical, Matching, FMB, Fill-in-Blank), all answer markers (`[x]`, `**bold**`, etc.), and feedback syntax (`//` inline, `>` blockquote, `> [feedback]` general).
- Best results come from **specific prompts**: include the topic, question count, question types, point values, and difficulty level.
- You can also provide learning objectives, a textbook chapter outline, or sample questions to guide Claude's output.

!!! tip "Prompting strategy"
    Be specific about what you want. "Create an exam" gives generic results.
    "Create 8 MC questions on ANOVA assumptions, 2pts each, with plausible distractors
    and `//` inline feedback explaining why each option is right or wrong" gives much
    better output.

## See Also

- [Iterative Editing with Claude](iterative-editing-claude.md) — refine and improve exam questions
- [Quarto + Claude Pipeline](quarto-claude-pipeline.md) — dynamic exams with R code chunks
- [Claude Code Plugin](../extensions/claude-plugin.md) — full plugin reference with workflows and prompting strategies
- [Import & Validate](import-validate.md) — verify QTI packages before uploading
