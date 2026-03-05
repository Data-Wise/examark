# ORCHESTRATE: Examark Claude Code Plugin

**Branch**: feature/claude-plugin
**Base**: dev
**Spec**: docs/specs/SPEC-claude-plugin-2026-03-05.md

## Goal

Create a Claude Code plugin for examark with 3 slash commands, migrated skills, and a post-edit hook for auto-linting exam files.

## Phases

### Phase 1: Plugin Foundation (this session)

- [x] Create worktree
- [ ] `.claude-plugin/plugin.json` — manifest
- [ ] `commands/convert.md` — `/exam:convert` command
- [ ] `commands/check.md` — `/exam:check` command
- [ ] `commands/preview.md` — `/exam:preview` command
- [ ] `.claude-plugin/skills/` — migrate from `.claude/skills/`
- [ ] Commit all files

### Phase 2: Hook + Testing (next session)

- [ ] `.claude-plugin/hooks/exam-lint.sh` — PostToolUse auto-lint
- [ ] `.claude-plugin/hooks/hooks.json` — hook config
- [ ] Test: symlink plugin to `~/.claude/plugins/examark`
- [ ] Test: `/exam:convert` on sample exam
- [ ] Test: `/exam:check` on .md and .qti.zip
- [ ] Test: `/exam:preview` table output

### Phase 3: Integration + PR

- [ ] Update CLAUDE.md with plugin docs
- [ ] Update README if needed
- [ ] Create PR to dev

## File Map

```
.claude-plugin/
  plugin.json
  hooks/
    hooks.json
    exam-lint.sh
  skills/
    exam-formatting.md      (from .claude/skills/claude-desktop-examark-formatting.md)
    exam-generation.md      (from .claude/skills/claude-desktop-exam-generation.md)
    exam-quick-ref.md       (from .claude/skills/examark-quick-reference.md)
    quarto-generator.md     (from .claude/skills/quarto-examark-generator.md)
    statistics.md           (from .claude/skills/statistics-exam-generator.md)
commands/
  convert.md
  check.md
  preview.md
```

## Notes

- Commands are pure-prompt (no `<system>` JS blocks)
- Prefer local `dist/index.js` over global `examark`
- Skills migrated, not copied — update `.claude/skills/README.md` to point here
