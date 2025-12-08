# Examify Roadmap

> Last updated: 2025-12-07

## Vision

Examify aims to be the **best tool for creating Canvas-ready exams** from Markdown and Quarto, with seamless IDE integration for university instructors.

---

## Current Status: v0.4.2 ✅

- [x] Markdown → QTI conversion
- [x] Image bundling with `imsmanifest.xml`
- [x] Quarto extension with multi-format output
- [x] Canvas emulator for validation
- [x] VS Code snippets for fast authoring
- [x] 35 passing tests
- [x] Branch protection + CI/CD

---

## Phase 1: Core Enhancements (Q1 2025)

### Question Types

- [ ] **Matching questions** — Match items from two columns
- [ ] **Fill-in-the-blank** — `The capital of France is ______.`
- [ ] **Ordering questions** — Put items in correct sequence
- [ ] **Hot spot / Image map** — Click on image regions

### Question Banks

- [ ] **Bank syntax** — `# Bank: Statistics Basics`
- [ ] **Pool syntax** — `## [Pool: 3 of 10] Easy Questions`
- [ ] **Cross-reference** — Include questions from other files

### Answer Feedback

- [ ] **Correct feedback** — `> ✓ Correct! The mean is...`
- [ ] **Incorrect feedback** — `> ✗ Incorrect. Remember that...`
- [ ] **General feedback** — Shown after submission

---

## Phase 2: IDE Integration (Q2 2025)

### VS Code Extension

- [ ] **Syntax highlighting** — Custom grammar for exam markdown
- [ ] **Live preview pane** — See rendered exam as you type
- [ ] **Diagnostics/linting** — "Question 3 has no correct answer"
- [ ] **CodeLens** — "Preview | Export | Validate" above questions
- [ ] **Command palette** — `Examify: Export to QTI`

### Language Server Protocol (LSP)

- [ ] **LSP server** — Enables support in any editor
- [ ] **Positron integration** — Works out of the box
- [ ] **Neovim/Emacs support** — Via standard LSP clients

---

## Phase 3: Import & Migration (Q3 2025)

### Import Formats

- [ ] **DOCX import** — `examify convert exam.docx`
- [ ] **PDF import** — OCR + AI extraction (experimental)
- [ ] **QTI import** — Reverse convert Canvas exports to Markdown
- [ ] **GIFT format** — Moodle compatibility

### Migration Tools

- [ ] **Batch convert** — Process entire folder of exams
- [ ] **Version control** — Track exam changes over semesters
- [ ] **Canvas API sync** — Direct upload without manual import

---

## Phase 4: AI Features (Q4 2025)

### Question Generation

- [ ] **Generate from prompt** — `examify generate "statistics" --count 10`
- [ ] **Generate from content** — Point at a textbook chapter
- [ ] **Difficulty levels** — Easy, medium, hard
- [ ] **Bloom's taxonomy** — Remember, understand, apply, analyze

### Quality Assurance

- [ ] **Duplicate detection** — Find similar questions across banks
- [ ] **Difficulty estimation** — Predict item difficulty
- [ ] **Bias detection** — Flag potentially problematic wording

---

## Backlog (Future Consideration)

| Feature | Notes |
|---------|-------|
| Item Response Theory | Embed difficulty/discrimination params |
| Adaptive testing | Not supported by Canvas, but Moodle does |
| QTI 3.0 | Future-proofing when Canvas upgrades |
| Web UI | Drag-drop interface for non-CLI users |
| Multi-LMS | Blackboard, Brightspace, Moodle |

---

## Contributing

See [CONTRIBUTING.md](docs/contributing.md) for how to get involved.

### Priority Areas

1. **Question types** — Add new question formats
2. **Tests** — Increase coverage
3. **Documentation** — Tutorials and examples
4. **VS Code extension** — Help wanted!

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.
