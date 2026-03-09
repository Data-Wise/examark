# ORCHESTRATE: Website Restructure — Phase 1

**Branch:** `feature/website-restructure`
**Spec:** `docs/specs/SPEC-website-restructure-2026-03-09.md`
**Scope:** Phase 1 only (index + nav + cookbook rename)

---

## Pre-Flight

- [ ] Verify `mkdocs build --strict` passes before any changes
- [ ] Confirm current file count: 32 markdown files in `docs/`

---

## Increment 1: Rename tutorials/ → cookbook/

**Goal:** Move directory, preserve git history.

```bash
git mv docs/tutorials docs/cookbook
```

**Files moved (7):**
- `docs/tutorials/index.md` → `docs/cookbook/index.md`
- `docs/tutorials/first-quiz.md` → `docs/cookbook/first-quiz.md`
- `docs/tutorials/canvas-workflow.md` → `docs/cookbook/canvas-workflow.md`
- `docs/tutorials/multiple-answers.md` → `docs/cookbook/multiple-answers.md`
- `docs/tutorials/item-banks.md` → `docs/cookbook/item-banks.md`
- `docs/tutorials/quarto.md` → `docs/cookbook/quarto.md`
- `docs/tutorials/dynamic-exams.md` → `docs/cookbook/dynamic-exams.md`
- `docs/tutorials/vscode-snippets.md` → `docs/cookbook/vscode-snippets.md`

**Validation:** `git status` shows renames, no deletions.

**Commit:** `refactor: rename tutorials/ to cookbook/`

---

## Increment 2: Update all internal links

**Goal:** Fix every `tutorials/` reference across the site.

```bash
grep -r "tutorials/" docs/ --include="*.md" -l
```

**Known files with `tutorials/` links (update all):**
- `docs/index.md` — Tutorials link in Documentation grid + Item Banks link in features
- `docs/cookbook/index.md` — internal links to sibling pages
- `docs/cookbook/*.md` — any cross-references between cookbook pages
- `docs/extensions/quarto.md` — links to quarto tutorial
- `docs/getting-started.md` — may link to first-quiz tutorial
- `docs/markdown/*.md` — may have tutorial cross-links

**Also update:**
- Any `[Tutorials]` display text → `[Cookbook]`

**Validation:** `mkdocs build --strict` — 0 errors

**Commit:** `docs: update all tutorials/ links to cookbook/`

---

## Increment 3: Update mkdocs.yml nav

**Goal:** Promote Quarto/Claude to top-level, rename Tutorials→Cookbook.

**Changes to `mkdocs.yml`:**

```yaml
nav:
  - Home: index.md
  - Getting Started: getting-started.md
  - Visual Workflows: workflows.md
  - Markdown:
      - markdown/index.md
      - Question Types: markdown/question-types.md
      - Syntax Reference: markdown/syntax.md
      - LaTeX Math: markdown/latex.md
      - Images & Media: markdown/images.md
      - Feedback: markdown/feedback.md
      - Document Structure: markdown/structure.md
  - CLI Reference:
      - Commands: reference.md
      - YAML Options: reference/yaml-options.md
      - Configuration: config.md
      - Canvas Emulator: emulator.md
      - Canvas Quick Reference: reference/REFCARD-CANVAS.md
  - Quarto Extension: extensions/quarto.md
  - Claude Code Plugin: extensions/claude-plugin.md
  - Cookbook:
      - cookbook/index.md
      - Your First Quiz: cookbook/first-quiz.md
      - Canvas Workflow: cookbook/canvas-workflow.md
      - Multiple Answers (Select All): cookbook/multiple-answers.md
      - Item Banks & Random Quizzes: cookbook/item-banks.md
      - R & Quarto: cookbook/quarto.md
      - Dynamic Exams: cookbook/dynamic-exams.md
      - VS Code Snippets: cookbook/vscode-snippets.md
  - Templates:
      - starter/index.md
      - Markdown: starter/markdown.md
      - Quarto: starter/quarto.md
  - Resources:
      - Troubleshooting: troubleshooting.md
      - Site Design: DESIGN.md
      - Contributing: contributing.md
```

**Key changes:**
1. `Extensions:` section removed
2. `Quarto Extension:` promoted to top-level
3. `Claude Code Plugin:` promoted to top-level
4. `Tutorials:` → `Cookbook:` with `cookbook/` paths

**Validation:** `mkdocs build --strict` — 0 errors

**Commit:** `docs: promote extensions to top-level nav, rename Tutorials to Cookbook`

---

## Increment 4: Rewrite index.md — Three-Pillar Hero

**Goal:** Add three product hero sections above existing feature grid.

**Insert after badges/buttons, before `## Features`:**

```markdown
---

## Three Ways to Use Examark

<div class="grid cards" markdown>

- :material-console:{ .lg .middle } **CLI Tool**

    ---

    Write exams in Markdown, convert to Canvas QTI packages. No coding required.

    ```bash
    npm install -g examark
    examark quiz.md -o quiz.qti.zip
    ```

    [:octicons-arrow-right-24: Getting Started](getting-started.md)

- :material-language-r:{ .lg .middle } **Quarto Extension**

    ---

    Author dynamic exams with R/Python code chunks. Randomized values, computed answers, auto-generated plots.

    ```bash
    quarto add Data-Wise/examark
    ```

    [:octicons-arrow-right-24: Quarto Guide](extensions/quarto.md)

- :material-robot:{ .lg .middle } **Claude Code Plugin**

    ---

    AI-assisted exam authoring with slash commands and auto-lint. Generate, validate, and iterate without leaving Claude.

    ```
    /exam:convert  /exam:check  /exam:preview
    ```

    [:octicons-arrow-right-24: Plugin Guide](extensions/claude-plugin.md)

</div>
```

**Also update in index.md:**
- Documentation grid: change "Tutorials" link to "Cookbook" with `cookbook/index.md`
- Item Banks link: `tutorials/item-banks.md` → `cookbook/item-banks.md`

**Validation:** `mkdocs build --strict` + visual check with `mkdocs serve`

**Commit:** `docs: add three-pillar hero section to index page`

---

## Increment 5: Rewrite cookbook/index.md

**Goal:** Replace tutorial listing with task-based categories.

**New structure for `docs/cookbook/index.md`:**

```markdown
# Cookbook

> **TL;DR** Browse recipes by what you're trying to do.
> Each recipe is a focused, self-contained guide.

---

## Getting Started

| Recipe | Time | Level |
|--------|------|-------|
| [Your First Quiz](first-quiz.md) | 5 min | Beginner |

## Canvas Import

| Recipe | Time | Level |
|--------|------|-------|
| [Canvas Workflow](canvas-workflow.md) | 10 min | Beginner |
| [Multiple Answers (Select All)](multiple-answers.md) | 8 min | Intermediate |
| [Item Banks & Random Quizzes](item-banks.md) | 10 min | Intermediate |

## Dynamic Content (Quarto)

| Recipe | Time | Level |
|--------|------|-------|
| [R & Quarto](quarto.md) | 15 min | Intermediate |
| [Dynamic Exams](dynamic-exams.md) | 15 min | Advanced |

## IDE Integration

| Recipe | Time | Level |
|--------|------|-------|
| [VS Code Snippets](vscode-snippets.md) | 5 min | Beginner |
```

**Validation:** `mkdocs build --strict`

**Commit:** `docs: rewrite cookbook index with task-based categories`

---

## Post-Flight

- [ ] `mkdocs build --strict` passes with 0 errors
- [ ] `mkdocs serve` — visual inspection of:
  - [ ] Three-pillar hero renders correctly
  - [ ] Nav tabs show Quarto Extension and Claude Code Plugin at top level
  - [ ] Cookbook section works, all pages load
  - [ ] No broken links anywhere
- [ ] All 5 increments committed with conventional commit messages
- [ ] Create PR: `gh pr create --base dev`

---

## Open Decisions (from spec)

These are deferred to Phase 2/3 — no action needed in Phase 1:

1. **Tutorial splitting** — keep existing pages intact for now; split in Phase 2
2. **Claude plugin expansion** — Phase 3
3. **New cookbook recipes** — Phase 2
4. **Visual Workflows page** — keep as-is for Phase 1
