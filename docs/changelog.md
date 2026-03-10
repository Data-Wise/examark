# What's New

> **TL;DR** Latest features, fixes, and improvements to Examark.
> - **What:** Release notes and changelog
> - **Why:** Know what changed before updating
> - **How:** Check the version you're on with `examark --version`

---

## March 2026

### Markdown Tables in QTI

Pipe tables in question stems, answer options, and feedback blocks now convert to styled HTML during QTI generation. Canvas renders them with the `ic-Table` CSS class and inline style fallback.

- GFM alignment support (`:---` left, `:---:` center, `---:` right)
- LaTeX math inside table cells preserved through the conversion pipeline
- Tables in stems, answers, and feedback all supported

### Website Restructure

**Phase 1:**

- Three-pillar homepage — CLI, Quarto Extension, and Claude Code Plugin front-and-center
- Tutorials renamed to [Cookbook](cookbook/index.md) with task-based categories
- Quarto Extension and Claude Code Plugin promoted to top-level navigation

**Phase 2 — Cookbook Recipes (19 total):**

Split 3 long tutorials into focused recipes and created 8 new ones:

| Category | Recipes |
|----------|---------|
| Getting Started | Your First Quiz |
| Canvas Import | Import & Validate, Fix Import Errors, Multiple Answers, Item Banks, Validate Before Upload |
| CLI | Batch Convert |
| Dynamic Content | Quarto Setup, Quarto Workflow, Randomized Values, Auto-Generated Plots, Multiple Versions |
| Question Patterns | Statistics Patterns, Matching & FMB, Short Answer Variants |
| Claude Code | Generate Exam, Iterative Editing, Quarto + Claude Pipeline |
| IDE Integration | VS Code Snippets |

**Phase 3 — Claude Plugin Expansion:**

Expanded [Claude Code Plugin page](extensions/claude-plugin.md) from 150 to ~400 lines with new sections: Workflows, Prompting Strategies, Auto-Lint Deep Dive, Skills Reference, Plugin Architecture, and Troubleshooting.

### Claude Code Plugin

Use examark directly from [Claude Code](https://claude.ai/code) with 3 slash commands and an auto-lint hook that catches errors as you write.

| Command | Description |
|---------|-------------|
| `/exam:convert` | Convert .md/.qmd to QTI package |
| `/exam:check` | Lint markdown or verify QTI package |
| `/exam:preview` | Show formatted question summary |

See the [Plugin Guide](extensions/claude-plugin.md) for setup instructions.

### Short Answer `= answer` Syntax

Multiple acceptable answers for short answer questions now support a cleaner multi-line format:

```markdown
1. [Short] What pattern indicates unequal variance? [2pts]
= funnel
= funnel shape
= fan shape
```

Both `Answer: text` (original) and `= text` (new) syntaxes are fully supported. See [Short Answer syntax](markdown/question-types.md#short-answer).

### Canvas QTI Reliability

The emulator and validator now catch additional Canvas import blockers:

- Multiple Answers (`[MA]`) questions missing `rcardinality="Multiple"` — previously caused silent "couldn't determine correct answers" errors in Canvas
- MA questions missing incorrect-option exclusions in resprocessing
- Short answer questions with no accepted answers defined

---

## December 2025

### v0.6.6 — Templates Reorganization

- Reorganized examples and templates into categorized folders
- `templates/markdown/` — Production-ready Markdown starters
- `templates/quarto/` — Quarto starters with dynamic content
- 39 Quarto extension tests (38 passing, 1 skipped)

### Quarto GFM Compatibility

- R-generated figures from code chunks are automatically bundled in QTI packages
- Inline code (`` `code` ``) converts to HTML `<code>` tags
- LaTeX math (`$x$`) converts to Canvas format `\(x\)`
- Comparison operators (`<`, `>`) correctly escape to `&lt;` and `&gt;`
- Figure divs (`<div id="fig-...">`) automatically prepended to following questions

### Canvas Emulator Enhancements

- Quarto GFM compatibility tracking and display
- Pre-scan logic detects inline code, LaTeX math, escaped comparison operators
- Raw HTML extraction for accurate content analysis

### Documentation Overhaul

- New "Markdown" section with 6 pages: question types, syntax, LaTeX, images, feedback, structure
- Reorganized navigation structure
- TL;DR boxes on all 22 key pages (ADHD score: ~92/100)
- Visual Workflows page with 5 mermaid diagrams

### Torture Test Suite

- 30 comprehensive Quarto GFM edge case questions
- 14 test cases covering inline code, LaTeX math, comparison operators, negative numbers, HTML images, feedback, all question types
- All tests passing

---

## v0.6.0 — Rename to Examark

Renamed from `examify` to `examark` to avoid company name conflict.

**Backward Compatibility:**

- Config files: Both `.examarkrc.json` and `.examifyrc.json` supported
- npm: `examify` package redirects to `examark`
- Homebrew: `examify` formula redirects to `examark`
- GitHub: Old URLs auto-redirect
