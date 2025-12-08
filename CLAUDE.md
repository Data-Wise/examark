# Examify

Convert Markdown exams to Canvas QTI format.

<project_context>

- **Repo**: Data-Wise/examify
- **Docs**: <https://data-wise.github.io/examify/>
- **Version**: 0.4.2 | **Tests**: 142 passing
- **Distribution**: npm (`examify`), Homebrew (`data-wise/tap/examify`)
- **QTI Version**: 1.2 (Canvas Classic Quizzes)
</project_context>

<quick_reference>

```bash
# Convert
examify input.md -o output.qti.zip

# Verify
examify verify package.qti.zip

# Emulate Canvas import
examify emulate-canvas package.qti.zip

# Dev
npm run build && npm test
```

</quick_reference>

<architecture>
```
src/
├── index.ts          # CLI (Commander.js)
├── parser/           # Markdown → Question objects
├── generator/        # Question objects → QTI XML
├── diagnostic/       # Validator + Canvas emulator
└── utils/
```
</architecture>

<input_format>
Questions use `## N. Question` format:

```markdown
# Pool: Quiz Title
# Section: Multiple Choice

## 1. What is 2 + 2? [2 pts]
1) Three
2) **Four** ✓
3) Five

## 2. [TF] The sky is blue. → True

## 3. [Essay, 10pts] Explain your answer.
```

**Correct answer markers**: `**Bold**` | `✓` | `[correct]` | `*` prefix | `→ True/False`

**Question types**: Default=MC | `[TF]` | `[MultiAns]` | `[Essay]` | `[Short]` | `[Numeric]`
</input_format>

<development_rules>

1. Always work on `dev` branch - merge to `main` only for releases
2. Build before testing: `npm run build`
3. Generated test files go in `scratch/`
4. Images are bundled in QTI package with `imsmanifest.xml`
</development_rules>

<directory_structure>

| Path | Purpose |
|------|---------|
| `src/` | TypeScript source |
| `dist/` | Compiled JavaScript |
| `docs/` | MkDocs documentation |
| `examples/` | Sample input files |
| `scratch/` | Generated test QTI output |
| `tests/` | Vitest test suite (142 tests) |
| `_extensions/` | Quarto extension |
</directory_structure>

<workflows>
| Command | Action |
|---------|--------|
| `/build-test` | Build, test, generate QTI |
| `/convert-quiz` | Convert markdown → QTI + verify |
| `/deploy-docs` | Deploy to GitHub Pages |
| `/release` | `npm version patch` (automated) |
</workflows>

<docs_structure>
MkDocs Material theme (indigo/purple):

- `index.md` - Homepage
- `getting-started.md` - Installation
- `reference.md` - Commands
- `formats.md` - Input syntax
- `emulator.md` - Canvas emulator
- `troubleshooting.md` - Common issues
- `tutorials/` - Quarto, VSCode snippets
</docs_structure>

<github_actions_api>

```bash
# Check workflow status
curl -s "https://api.github.com/repos/Data-Wise/examify/actions/runs?per_page=3" | \
  jq '.workflow_runs[] | {name: .name, status: .conclusion, sha: .head_sha[:7]}'
```

</github_actions_api>

<troubleshooting>
**Docs not updating?**
1. Check Actions tab for "Publish Docs" status
2. Wait 10 min (GitHub Pages cache)
3. Hard refresh: Cmd+Shift+R
4. Manual trigger: Actions → Publish Docs → Run workflow
</troubleshooting>
