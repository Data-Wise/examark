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

---

## Workflows

### Author a New Exam

The fastest way to create an exam from scratch:

1. **Describe your exam** — give Claude the topic, question count, types, and difficulty:

    ```
    Create a 10-question statistics exam on hypothesis testing.
    Include: 5 MC, 2 Short Answer, 1 Matching, 1 TF, 1 Essay.
    Points: 2pts each for MC/TF/Short, 4pts for Matching, 5pts for Essay.
    ```

2. **Claude writes the markdown** — the plugin's skills teach Claude proper examark syntax
3. **Auto-lint runs on each edit** — the PostToolUse hook catches issues immediately
4. **Convert** — `/exam:convert exam.md`
5. **Preview** — `/exam:preview exam.md` to verify the question summary

### Edit an Existing Exam

Iterative editing with instant validation:

1. **Open your exam file** and ask Claude to make changes:

    ```
    Add inline feedback to questions 3-5 explaining why each option is right/wrong
    ```

2. **Auto-lint validates after each edit** — issues appear as system reminders
3. **Check manually anytime** — `/exam:check exam.md`
4. **Preview the result** — `/exam:preview exam.md`

Common editing requests:

- "Add `//` inline feedback to all MC questions"
- "Convert questions 3 and 4 from MC to MA (select all that apply)"
- "Add `= answer` variants for the short answer questions"
- "Change all questions to 3pts each"
- "Add `> [feedback]` general feedback to questions 1-5"

### Quarto + Claude Workflow

For R/Python dynamic exams:

1. **Set up the extension**:

    ```
    Set up a Quarto exam project with the examark extension
    ```

2. **Describe the exam with R requirements**:

    ```
    Create a statistics midterm in Quarto (.qmd) with:
    - R setup chunk with set.seed(42)
    - 3 MC questions with R-computed values
    - 1 question with an R-generated histogram
    - Use exam-gfm format with solutions hidden
    ```

3. **Render and convert**:

    ```
    Render this exam and convert to QTI
    ```

    Claude runs `quarto render` → `examark convert` → `examark emulate-canvas`

See [Quarto + Claude Pipeline](../cookbook/quarto-claude-pipeline.md) for the full recipe.

---

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

---

## Prompting Strategies

### Be Specific About Structure

Good prompts include topic, question count, types, and difficulty:

=== "Specific (Better)"

    ```
    Create a 10-question exam on ANOVA for an intro stats course.
    Include: 4 MC, 2 Short Answer (with = answer variants), 1 Matching,
    1 FMB, 1 TF, 1 Essay (5pts). Use [2pts] for all others.
    Add inline feedback with // for each MC option.
    ```

=== "Vague (Less Effective)"

    ```
    Make me a stats exam about ANOVA.
    ```

### Ask for Specific Question Types

Claude knows all 10 examark question types. Use the type markers in your prompt:

- "Add a `[Match]` question pairing statistical tests to their assumptions"
- "Write 3 `[Short]` questions with `= answer` variants for common spellings"
- "Create an `[FMB]` question with 3 blanks about the regression equation"

### Request Feedback and Solutions

```
Add inline feedback (// comments) to all MC and TF questions
explaining why each option is correct or incorrect.
```

```
Add general feedback (> [feedback]) to questions 1-5 with
the complete solution shown after submission.
```

### Iterate on Difficulty

```
Questions 3 and 7 are too easy. Make the distractors more plausible
by using common student misconceptions about p-values.
```

---

## Auto-Lint Deep Dive

The PostToolUse hook (`hooks/exam-lint.sh`) runs automatically after every `Edit` or `Write` operation in Claude Code.

### What Triggers the Hook

The hook applies **multi-layer filtering** to avoid false positives:

| Filter | Logic | Skips |
|--------|-------|-------|
| Extension | Must be `.md` | `.qmd`, `.ts`, `.json`, etc. |
| Filename | Rejects known non-exam names | README, CHANGELOG, CLAUDE, DESIGN, ORCHESTRATE, etc. |
| Directory | Rejects documentation paths | `docs/`, `commands/`, `skills/`, `.claude/`, `templates/`, `examples/` |
| Content | Must contain question markers | Files without `## 1.` or `1. [` patterns |

### What It Catches

The hook runs `examark check` on the file and reports:

- Missing correct answer markers (`[x]`, `**bold**`, `✓`, `[correct]`, `*`)
- Questions without stems
- Invalid or unrecognized type markers
- Multiple correct answers on single-choice (MC/TF) questions
- Missing answers on short answer questions

### Behavior

- **Informational only** — the hook never blocks edits (always exits 0)
- Lint warnings appear as system reminders in the Claude conversation
- Claude sees the warnings and can self-correct on the next edit
- Only fires when `examark` CLI is available (local build or global install)

---

## Skills Reference

The plugin includes 5 skill files that teach Claude how to author exams correctly. Skills are loaded automatically when the plugin is active.

| Skill File | What Claude Learns | When It Helps |
|-----------|-------------------|---------------|
| `exam-formatting.md` | All syntax rules: type markers, answer markers, points syntax, feedback formats, `= answer` syntax | Every exam authoring session |
| `exam-generation.md` | Question templates for all 10 types, pedagogical patterns, distractor strategies | Creating new exams from scratch |
| `exam-quick-ref.md` | One-page cheat sheet: markers, types, CLI commands | Quick syntax lookups |
| `quarto-generator.md` | `.qmd` authoring: YAML frontmatter, R code chunks, `{=markdown}` blocks, fig.cap, solution divs | Quarto/R exam creation |
| `statistics.md` | Statistics-specific patterns: hypothesis testing, CI, regression, distributions, common formulas | Statistics course exams |

### How Skills Work

Skills are markdown files in `.claude-plugin/skills/` that Claude reads as context. They act as reference documentation that Claude consults when authoring exams:

- Claude uses `exam-formatting.md` to ensure correct syntax for any question type
- When asked to create statistics questions, Claude references `statistics.md` for domain-specific patterns
- For Quarto exams, `quarto-generator.md` provides the R code chunk patterns and YAML configuration

---

## Plugin Architecture

For developers who want to understand or extend the plugin.

### Manifest (`plugin.json`)

```json
{
  "name": "examark",
  "version": "0.1.0",
  "description": "Convert markdown exams to Canvas QTI packages",
  "commands": "../commands",
  "skills": "./skills"
}
```

- `commands` points to `commands/` (relative to repo root, outside `.claude-plugin/`)
- `skills` points to `skills/` inside the plugin directory

### Directory Layout

```
.claude-plugin/
  plugin.json              # Plugin manifest
  hooks/
    hooks.json             # Hook configuration (PostToolUse)
    exam-lint.sh           # Auto-lint script
  skills/
    exam-formatting.md     # Syntax rules
    exam-generation.md     # Question patterns
    exam-quick-ref.md      # Cheat sheet
    quarto-generator.md    # Quarto guide
    statistics.md          # Statistics patterns
commands/
  convert.md               # /exam:convert command
  check.md                 # /exam:check command
  preview.md               # /exam:preview command
```

### Hook Configuration (`hooks.json`)

```json
{
  "hooks": [
    {
      "event": "PostToolUse",
      "script": "./hooks/exam-lint.sh",
      "tools": ["Edit", "Write"]
    }
  ]
}
```

The hook fires on `Edit` and `Write` tool uses. The script receives JSON on stdin with `tool_name` and `tool_input.file_path`.

### CLI Detection Order

All commands find the examark CLI automatically:

1. **Local build**: `node dist/index.js` (development — in the repo)
2. **Global install**: `examark` (npm global or Homebrew)
3. **npx fallback**: `npx examark` (downloads if needed)

---

## Troubleshooting

### CLI Not Found

**Symptom:** Commands return "examark not found" or similar.

**Fix:** Ensure examark is installed globally:

```bash
npm install -g examark
# or
brew install data-wise/tap/examark
```

Or build locally for development:

```bash
npm run build   # Creates dist/index.js
```

### Auto-Lint Not Firing

**Symptom:** Editing exam files but no lint output appears.

**Possible causes:**

1. Plugin not loaded — restart Claude Code after symlinking
2. File doesn't match filters — must be `.md`, contain question markers, not in `docs/` directory
3. examark CLI not available — install globally or build locally

### Hook Blocked by Permissions

**Symptom:** Hook script errors about permission denied.

**Fix:**

```bash
chmod +x .claude-plugin/hooks/exam-lint.sh
```

### Wrong File Getting Linted

**Symptom:** Non-exam markdown files triggering lint warnings.

The hook filters by filename pattern and content heuristic. If a file contains `## 1.` or `1. [` patterns, it may trigger. Rename the file or move it to a filtered directory (`docs/`, `templates/`).

---

## See Also

- [Generate Exam with Claude](../cookbook/generate-exam-claude.md) — Step-by-step exam generation
- [Iterative Editing with Claude](../cookbook/iterative-editing-claude.md) — Edit-check-preview loop
- [Quarto + Claude Pipeline](../cookbook/quarto-claude-pipeline.md) — Dynamic exams with R
- [Quarto Extension](quarto.md) — R/Python exam authoring
- [Syntax Reference](../markdown/syntax.md) — Complete examark syntax
