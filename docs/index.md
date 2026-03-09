# Examark

**Create exams from Markdown and export to Canvas QTI format.**

[![npm](https://img.shields.io/npm/v/examark?style=flat-square&logo=npm&color=CB3837)](https://www.npmjs.com/package/examark)
[![CI](https://img.shields.io/github/actions/workflow/status/Data-Wise/examark/ci.yml?style=flat-square&logo=github&label=CI)](https://github.com/Data-Wise/examark/actions/workflows/ci.yml)
[![Docs](https://img.shields.io/github/actions/workflow/status/Data-Wise/examark/publish_docs.yml?style=flat-square&logo=github&label=Docs)](https://github.com/Data-Wise/examark/actions/workflows/publish_docs.yml)
[![License](https://img.shields.io/badge/license-MIT-22C55E?style=flat-square)](https://github.com/Data-Wise/examark/blob/main/LICENSE)

[Get Started :material-arrow-right:](getting-started.md){ .md-button .md-button--primary }
[View on GitHub :material-github:](https://github.com/Data-Wise/examark){ .md-button }

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

---

## ✨ Features

<div class="grid cards" markdown>

- :material-file-document-edit:{ .lg .middle } **Markdown First**

    ---

    Write questions in simple, readable Markdown. Clean syntax without headers for better HTML/PDF output.

- :material-math-integral:{ .lg .middle } **LaTeX Math**

    ---

    Full equation support with `$...$` inline and `$$...$$` display math.

- :material-image-multiple:{ .lg .middle } **Image Bundling**

    ---

    Automatically packages images into Canvas-ready QTI with proper manifests.

- :material-shield-check:{ .lg .middle } **Canvas Emulator**

    ---

    Predict import success *before* uploading. Catch errors early.

- :material-format-list-checks:{ .lg .middle } **[8 Question Types](markdown/question-types.md)**

    ---

    Multiple choice, true/false, multiple answer, essay, short answer, numeric, matching, and fill-in-blanks.

- :material-printer:{ .lg .middle } **Multiple Export Formats**

    ---

    Export to Canvas QTI or plain text for printable paper exams.

- :material-language-python:{ .lg .middle } **Quarto Integration**

    ---

    Use with R/Python for dynamic, randomized exam generation.

- :material-robot:{ .lg .middle } **[Claude Code Plugin](extensions/claude-plugin.md)**

    ---

    Slash commands and auto-lint for exam authoring directly in Claude Code.

- :material-folder-multiple:{ .lg .middle } **Batch Conversion**

    ---

    Convert multiple files at once with glob patterns: `examark *.md -o output/`

- :material-bank:{ .lg .middle } **[Item Banks Support](cookbook/item-banks.md)**

    ---

    Import directly to Canvas Item Banks for random question selection across quizzes.

</div>

---

## 🆕 What's New (March 2026)

- **Three-pillar homepage** — CLI, Quarto Extension, and Claude Code Plugin front-and-center
- **Cookbook** — Tutorials renamed with task-based categories and time estimates
- **Claude Code Plugin** — 3 slash commands + auto-lint for exam authoring in Claude
- **`= answer` syntax** — Cleaner multi-line format for short answer questions

[:octicons-arrow-right-24: Full changelog](changelog.md)

---

## 📖 Documentation

<div class="grid cards" markdown>

- :material-rocket-launch:{ .lg .middle } **[Getting Started](getting-started.md)**

    Installation and your first quiz in 5 minutes.

- :material-format-list-bulleted:{ .lg .middle } **[Markdown Syntax](markdown/index.md)**

    Complete question syntax reference.

- :material-test-tube:{ .lg .middle } **[Canvas Emulator](emulator.md)**

    Pre-validate before uploading.

- :material-school:{ .lg .middle } **[Cookbook](cookbook/index.md)**

    R/Quarto integration and more.

</div>

---

## 🤝 Contributing

See the [Contributing Guide](contributing.md) for development setup and guidelines.

---

## 📄 License

MIT © [Data-Wise](https://github.com/Data-Wise)
