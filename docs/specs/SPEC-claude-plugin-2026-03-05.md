# SPEC: Examark Claude Code Plugin

**Status:** draft
**Created:** 2026-03-05
**From Brainstorm:** This session

---

## Overview

Create a Claude Code plugin for examark that wraps the existing CLI with intelligent workflow commands, auto-validation hooks, and migrated skill files. The plugin adds orchestration intelligence around the existing conversion tool — detecting file types, chaining render+convert+validate steps, and providing formatted output.

## Primary User Story

**As a** statistics instructor using Claude Code with Quarto,
**I want** slash commands that convert my exam markdown to Canvas QTI,
**So that** I don't have to remember CLI flags or run multiple tools manually.

## Acceptance Criteria

- [ ] `/exam:convert exam.md` produces a `.qti.zip` and reports question breakdown
- [ ] `/exam:convert exam.qmd` auto-detects Quarto and runs render first
- [ ] `/exam:check` works on both `.md` (lint) and `.qti.zip` (validate) files
- [ ] `/exam:preview` shows a formatted question table
- [ ] Skills are loaded from plugin (not `.claude/skills/` separately)
- [ ] Plugin installs via symlink for local dev

## Secondary User Stories

- **As a** Claude Code user working on exam content, I want auto-linting feedback when I write exam markdown so I catch syntax errors immediately.
- **As a** developer extending examark, I want the plugin structure to be a reference for how to wrap a CLI tool as a Claude Code plugin.

## Architecture

```
examark repo
├── .claude-plugin/
│   ├── plugin.json            # Manifest
│   ├── hooks/
│   │   └── exam-lint.sh       # PreToolUse: auto-lint exam .md files
│   └── skills/                # Migrated from .claude/skills/
│       ├── exam-formatting.md
│       ├── exam-generation.md
│       ├── exam-quick-ref.md
│       ├── quarto-generator.md
│       └── statistics.md
├── commands/                  # Slash commands
│   ├── convert.md             # /exam:convert
│   ├── check.md               # /exam:check
│   └── preview.md             # /exam:preview
├── src/                       # Existing TypeScript source
├── dist/                      # Built CLI
└── package.json               # Existing npm package
```

### Data Flow

```
/exam:convert exam.qmd
    │
    ├─ Detect file type (.qmd)
    │  → Run: quarto render exam.qmd --to exam-gfm
    │  → Output: exam.md
    │
    ├─ Convert
    │  → Run: examark exam.md -o exam.qti.zip -v
    │  → Output: exam.qti.zip
    │
    ├─ Validate
    │  → Run: examark verify exam.qti.zip
    │  → Canvas emulation check
    │
    └─ Report
       → Question count, types, points breakdown
       → Validation status
       → File location
```

## API Design

N/A - No API changes. Plugin wraps existing CLI commands.

## Data Models

N/A - No data model changes. Uses existing `ParsedQuiz` types.

## Dependencies

| Dependency | Purpose | Required |
|-----------|---------|----------|
| `examark` CLI | Core conversion engine | Yes (local `dist/index.js` or global) |
| `quarto` | Render `.qmd` files | Only for Quarto workflows |
| Claude Code | Plugin host | Yes |

## Plugin Manifest (`plugin.json`)

```json
{
  "name": "examark",
  "version": "0.1.0",
  "description": "Convert markdown exams to Canvas QTI packages",
  "author": {
    "name": "Data-Wise"
  },
  "commands": "../commands",
  "skills": "./skills"
}
```

## Command Specifications

### `/exam:convert`

**Arguments:**
- `file` (required) — Input file path (`.md`, `.qmd`, or glob pattern)
- `--validate` / `-v` — Run validation after conversion (default: true)
- `--strict` — Use strict New Quizzes validation
- `--format` / `-f` — Output format: `qti` (default), `text`
- `--no-answers` — Exclude answer key (text format only)

**Behavior:**
1. If `.qmd` → `quarto render` first, find output `.md`
2. Run `examark <file> -o <file>.qti.zip`
3. If `--validate` → run `examark verify`
4. Report: question count, types, points, validation status

### `/exam:check`

**Arguments:**
- `file` (required) — Input `.md` or `.qti.zip`
- `--strict` — Strict validation mode

**Behavior:**
- `.md` file → `examark check` (pre-conversion lint)
- `.qti.zip` file → `examark verify` + `examark emulate-canvas`
- Reports issues with line numbers

### `/exam:preview`

**Arguments:**
- `file` (required) — Input `.md` file

**Behavior:**
- Runs `examark <file> --preview`
- Formats as table: #, Type, Points, Stem preview
- Shows totals

## UI/UX Specifications

N/A - CLI plugin, no UI components.

**Output format**: Markdown tables and status messages in terminal.

## Open Questions

1. **Should plugin live in examark repo or separate repo?** Leaning toward examark repo (`.claude-plugin/` directory) for single-source-of-truth. But this means the npm package includes plugin files (minor size increase).

2. **Hook trigger: PreToolUse or PostToolUse?** PreToolUse can warn before writing bad exam markdown. PostToolUse can validate after a file is written. PostToolUse seems more useful — validate the result.

3. **Scholar integration**: Should `/exam:convert` know about scholar's JSON exam format? Could accept `exam-midterm-*.json` and auto-convert through examark. Future scope.

## Review Checklist

- [ ] Plugin structure matches Claude Code conventions
- [ ] Commands work with both local `dist/index.js` and global `examark`
- [ ] Skills don't duplicate CLAUDE.md content
- [ ] Hook doesn't fire on non-exam markdown files
- [ ] Tests cover: `.md` convert, `.qmd` convert, batch, validation
- [ ] Plugin installs cleanly via symlink

## Implementation Notes

- **Prefer local dist/**: The post-render hook pattern already does this — check `dist/index.js` before falling back to global `examark`. Commands should follow the same pattern.
- **No JS in commands**: Keep commands as pure-prompt markdown. The `<system>` JS pattern from scholar adds complexity. Since examark commands just shell out to the CLI, prompt-only commands are simpler and easier to maintain.
- **Skill migration**: Move files, don't copy. Update `.claude/skills/README.md` to point to plugin location.
- **Symlink for dev**: `ln -s /Users/dt/projects/apps/examark ~/.claude/plugins/examark`

## Implementation Order

1. Create `.claude-plugin/plugin.json`
2. Create `commands/convert.md` (MVP command)
3. Migrate skills from `.claude/skills/` → `.claude-plugin/skills/`
4. Create `commands/check.md`
5. Create `commands/preview.md`
6. Create `hooks/exam-lint.sh`
7. Test full workflow: generate (scholar) → convert (examark plugin) → upload

## History

| Date | Change |
|------|--------|
| 2026-03-05 | Initial spec from brainstorm session |
