# ORCHESTRATE: Website Restructure Phases 2 & 3

**Branch**: `feature/website-phase2-3`
**Spec**: `docs/specs/SPEC-website-restructure-2026-03-09.md` (lines 188-272)
**Base**: `dev` (after Phase 1 merge)

---

## Goal

**Phase 2**: Split 3 long cookbook files into focused recipes, create 8 new recipes.
**Phase 3**: Expand Claude Code Plugin page to ~400 lines, add Claude cookbook recipes.

Every recipe follows the standard template: TL;DR + Problem + Solution + Explanation + See Also.

---

## Phase 2: Cookbook Recipe Splitting

### Increment 1: Split `canvas-workflow.md` (344 lines) → 2 recipes

**Files to create:**
- `docs/cookbook/import-validate.md` — Core workflow: write MD → convert → import → verify (~150 lines)
- `docs/cookbook/fix-import-errors.md` — Troubleshooting: common Canvas import failures + fixes (~120 lines)

**Steps:**
1. Read `canvas-workflow.md`, identify natural split points
2. Create `import-validate.md` — the happy path (convert, upload, verify)
3. Create `fix-import-errors.md` — troubleshooting (common errors, validation, emulator)
4. Delete `canvas-workflow.md`
5. Update `mkdocs.yml` nav (replace single entry with 2)
6. Update `cookbook/index.md` (Canvas Import section)
7. Grep all `.md` files for `canvas-workflow.md` links, update to new filenames
8. `mkdocs build --strict` — verify no broken links

---

### Increment 2: Split `quarto.md` (322 lines) → 2 recipes

**Files to create:**
- `docs/cookbook/quarto-setup.md` — Installation, project config, first render (~140 lines)
- `docs/cookbook/quarto-workflow.md` — Daily workflow: render → QTI, `= syntax`, post-render hook (~140 lines)

**Steps:**
1. Read `quarto.md`, identify setup vs workflow content
2. Create `quarto-setup.md` — getting started with Quarto extension
3. Create `quarto-workflow.md` — ongoing usage patterns
4. Delete `quarto.md`
5. Update `mkdocs.yml` nav
6. Update `cookbook/index.md` (Dynamic Content section)
7. Grep for `quarto.md` links (careful: don't touch `extensions/quarto.md`), update
8. `mkdocs build --strict`

---

### Increment 3: Split `dynamic-exams.md` (381 lines) → 3 recipes

**Files to create:**
- `docs/cookbook/randomized-values.md` — R code chunks for random parameters (~100 lines)
- `docs/cookbook/auto-plots.md` — R-generated figures in QTI packages (~100 lines)
- `docs/cookbook/multiple-versions.md` — Generating N unique exam versions (~100 lines)

**Steps:**
1. Read `dynamic-exams.md`, identify the 3 topic clusters
2. Create 3 recipe files
3. Delete `dynamic-exams.md`
4. Update `mkdocs.yml` nav
5. Update `cookbook/index.md`
6. Update cross-links
7. `mkdocs build --strict`

---

### Increment 4: Create 8 new recipes

Create in this order (grouped by dependency):

**Canvas Import:**
- `docs/cookbook/validate-before-upload.md` — Pre-upload QTI validation (~60 lines)

**CLI:**
- `docs/cookbook/batch-convert.md` — Batch conversion patterns (~50 lines)

**Question Patterns:**
- `docs/cookbook/statistics-patterns.md` — Stats-specific question patterns (~100 lines)
- `docs/cookbook/matching-fmb.md` — Matching + FMB question authoring (~80 lines)
- `docs/cookbook/short-answer-variants.md` — Short answer `= syntax` patterns (~60 lines)

**Claude Code:**
- `docs/cookbook/generate-exam-claude.md` — Generate exam with `/exam:convert` (~80 lines)
- `docs/cookbook/iterative-editing-claude.md` — Edit-check-preview loop (~60 lines)
- `docs/cookbook/quarto-claude-pipeline.md` — Quarto + Claude Code combined (~80 lines)

**Steps:**
1. Create each recipe using standard template
2. Update `mkdocs.yml` nav — add new categories (Question Patterns, CLI, Claude Code)
3. Update `cookbook/index.md` — add new sections + recipe tables
4. `mkdocs build --strict`

---

### Increment 5: Phase 2 validation

1. Full `mkdocs build --strict` — zero errors
2. Verify all cookbook recipes follow template (TL;DR, Problem, Solution, Explanation, See Also)
3. Verify all cross-links work (See Also sections)
4. Run `npm test` — ensure no test regressions
5. Review `cookbook/index.md` — all recipes listed, categories make sense
6. Commit with: `docs: Phase 2 cookbook recipe splitting`

---

## Phase 3: Claude Code Plugin Expansion

### Increment 6: Expand `extensions/claude-plugin.md` (~150 → ~400 lines)

Current page has: TL;DR, Installation, Commands (3), Auto-Lint, Skills table, CLI Detection, Plugin Structure.

**New sections to add:**

| Section | Lines (est.) | Content |
|---------|-------------|---------|
| Workflows | 80 | "Author New Exam", "Edit Existing Exam", "Quarto + Claude" — step-by-step |
| Prompting Strategies | 50 | How to ask Claude for good exam questions, prompt examples |
| Auto-Lint Deep Dive | 40 | What it catches, filtering logic, customization |
| Skills Reference (expand) | 40 | What each skill teaches Claude, when it activates |
| Plugin Architecture | 40 | For developers: manifest, hooks, skills, commands structure |
| Troubleshooting | 20 | Common issues: CLI not found, hook not firing, etc. |

**Steps:**
1. Read current `claude-plugin.md` (150 lines)
2. Read actual plugin files (`.claude-plugin/plugin.json`, hooks, skills) for accuracy
3. Add Workflows section after Installation
4. Expand Commands section with more examples
5. Add Prompting Strategies section
6. Expand Auto-Lint with filtering details from `exam-lint.sh`
7. Expand Skills Reference with per-skill descriptions
8. Add Plugin Architecture section
9. Add Troubleshooting section
10. Verify line count ~400
11. `mkdocs build --strict`

---

### Increment 7: Update Claude Code cookbook recipes

The 3 Claude Code recipes from Increment 4 should cross-link to the expanded plugin page. Review and update:

- `generate-exam-claude.md` — link to Workflows section
- `iterative-editing-claude.md` — link to Auto-Lint section
- `quarto-claude-pipeline.md` — link to Quarto + Claude workflow

Also update:
- `cookbook/index.md` — ensure Claude Code section is prominent
- `docs/index.md` — verify Claude hero CTA still points correctly

---

### Increment 8: Final validation + PR

1. Full `mkdocs build --strict` — zero errors
2. Run `npm test`
3. Review all new/modified files for consistency
4. Grep for any remaining broken cross-links
5. Commit with: `docs: Phase 3 Claude plugin expansion`
6. Create PR: `gh pr create --base dev`

---

## Recipe Template (for reference)

```markdown
# Recipe Title

> **TL;DR** One-liner of what this recipe solves

**X minutes** | Beginner/Intermediate | CLI/Quarto/Claude

---

## Problem

What you're trying to do and why it matters. 1-2 sentences.

## Solution

\```bash
examark command here
\```

(Or markdown example, or Claude prompt.)

## Explanation

Why this works, gotchas, common mistakes. Bullet points preferred.

## See Also

- [Related Recipe](link)
- [Reference Page](link)
```

---

## Target Nav Structure

```yaml
- Cookbook:
    - cookbook/index.md
    - Your First Quiz: cookbook/first-quiz.md
    - Import & Validate: cookbook/import-validate.md
    - Fix Import Errors: cookbook/fix-import-errors.md
    - Multiple Answers (Select All): cookbook/multiple-answers.md
    - Item Banks & Random Quizzes: cookbook/item-banks.md
    - Validate Before Upload: cookbook/validate-before-upload.md
    - Batch Convert: cookbook/batch-convert.md
    - Quarto Setup: cookbook/quarto-setup.md
    - Quarto Workflow: cookbook/quarto-workflow.md
    - Randomized Values: cookbook/randomized-values.md
    - Auto-Generated Plots: cookbook/auto-plots.md
    - Multiple Versions: cookbook/multiple-versions.md
    - Statistics Patterns: cookbook/statistics-patterns.md
    - Matching & FMB: cookbook/matching-fmb.md
    - Short Answer Variants: cookbook/short-answer-variants.md
    - Generate Exam with Claude: cookbook/generate-exam-claude.md
    - Iterative Editing with Claude: cookbook/iterative-editing-claude.md
    - Quarto + Claude Pipeline: cookbook/quarto-claude-pipeline.md
    - VS Code Snippets: cookbook/vscode-snippets.md
```

---

## Risks

- **Cross-link breakage**: Many pages link to `canvas-workflow.md`, `quarto.md`, `dynamic-exams.md` — grep thoroughly before/after splits
- **Duplicate content**: Recipes should be focused — reference pages cover depth, recipes cover tasks
- **Cookbook index bloat**: 19 recipes — categories must be clear and scannable
- **Claude plugin accuracy**: Expanded page must match actual plugin behavior (read source files)
- **website.test.ts**: May have hardcoded file checks — update if tests reference old filenames
