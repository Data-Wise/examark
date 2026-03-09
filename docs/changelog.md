# What's New

> **TL;DR** Latest features, fixes, and improvements to Examark.
> - **What:** Release notes and changelog
> - **Why:** Know what changed before updating
> - **How:** Check the version you're on with `examark --version`

---

## March 2026

### Website Restructure

- **Three-pillar homepage** — CLI, Quarto Extension, and Claude Code Plugin are now front-and-center on the [homepage](index.md)
- **Cookbook** — Tutorials renamed to Cookbook with task-based categories, time estimates, and difficulty levels. Browse by [what you're trying to do](cookbook/index.md).
- **Top-level nav** — Quarto Extension and Claude Code Plugin promoted from nested "Extensions" section to top-level navigation

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
