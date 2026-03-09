# Claude Code Plugin

> **TL;DR** (30 seconds)
> - **What:** Examark slash commands for Claude Code — convert, check, and preview exams
> - **Why:** Author and validate exams without leaving your AI coding session
> - **How:** Symlink `.claude-plugin/` → `~/.claude/plugins/examark`, then `/exam:convert`
> - **Next:** [Quarto Extension](quarto.md) for R/Python dynamic exams

Use examark directly from [Claude Code](https://claude.ai/code) with slash commands for converting, checking, and previewing exams.

## Installation

Symlink the plugin directory into your Claude Code plugins:

```bash
ln -s /path/to/examark/.claude-plugin ~/.claude/plugins/examark
```

Or if installed via npm:

```bash
ln -s $(npm root -g)/examark/.claude-plugin ~/.claude/plugins/examark
```

Restart Claude Code to load the plugin.

## Commands

### /exam:convert

Convert a markdown or Quarto exam file to a Canvas QTI package.

```
/exam:convert exam.md                # Convert markdown to QTI
/exam:convert exam.qmd               # Render Quarto first, then convert
/exam:convert exam.md --strict       # Strict validation (New Quizzes)
/exam:convert exam.md --format text  # Export as plain text
```

**What it does:**

1. Detects file type (`.md` or `.qmd`)
2. Renders Quarto if needed (`quarto render --to exam-gfm`)
3. Converts to QTI using the examark CLI
4. Shows a summary table of converted questions
5. Suggests next steps

### /exam:check

Validate an exam file — auto-detects whether to lint markdown or verify a QTI package.

```
/exam:check exam.md                  # Lint markdown for errors
/exam:check exam.qti.zip             # Verify QTI + emulate Canvas import
/exam:check exam.qti.zip --strict    # Strict mode for New Quizzes
```

**For markdown files**, it checks:

- Missing correct answer markers
- Invalid question types
- Empty question stems
- Multiple correct answers on single-choice questions

**For QTI packages**, it runs:

- Structural validation (QTI 1.2 compliance)
- Manifest completeness check
- Canvas import emulation

### /exam:preview

Display a formatted summary table of all questions in an exam file.

```
/exam:preview exam.md                # Show question summary table
/exam:preview exam.qmd               # Auto-render Quarto, then preview
```

**Example output:**

```
Preview: exam.md
Title: "Midterm Exam 1"

| #  | Type  | Pts | Stem                                              |
|----|-------|-----|---------------------------------------------------|
| 1  | MC    | 2   | What is the mean of the following data...          |
| 2  | TF    | 1   | The p-value is always between 0 and 1             |
| 3  | MA    | 3   | Select all assumptions of linear regr...           |
| 4  | Essay | 10  | Explain the difference between Type I...           |
-------------------------------------------------------------
Total: 4 questions, 16 points
```

## Auto-Lint Hook

The plugin includes a `PostToolUse` hook that automatically lints exam markdown files whenever you edit them with Claude Code. If the linter finds issues, they appear as system reminders in your conversation.

**What triggers the hook:**

- Any `Edit` or `Write` operation on a `.md` file
- Only fires for files that look like exams (contain question markers)
- Skips README, CHANGELOG, docs, and other non-exam files

**What it checks:**

- Runs `examark check` on the modified file
- Reports errors and warnings inline

## Skills

The plugin includes knowledge files that help Claude generate well-formatted exams:

| Skill | Description |
|-------|-------------|
| Exam Formatting | Syntax rules, answer markers, type markers |
| Exam Generation | Question patterns, templates for all 8 types |
| Quick Reference | One-page cheat sheet for examark syntax |
| Quarto Generator | Quarto-specific exam authoring guide |
| Statistics | Statistics-specific question patterns and formulas |

## CLI Detection

All commands automatically find the examark CLI in this order:

1. Local build: `node dist/index.js` (for development)
2. Global install: `examark` (npm global)
3. npx fallback: `npx examark`

## Plugin Structure

```
.claude-plugin/
  plugin.json           # Plugin manifest
  hooks/
    hooks.json          # Hook configuration
    exam-lint.sh        # PostToolUse auto-lint script
  skills/
    exam-formatting.md
    exam-generation.md
    exam-quick-ref.md
    quarto-generator.md
    statistics.md
commands/
  convert.md            # /exam:convert command
  check.md              # /exam:check command
  preview.md            # /exam:preview command
```
