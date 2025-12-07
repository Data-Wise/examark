# Extension Development Guide

This guide explains the internal architecture of the Examify Quarto extension and how to maintain it.

## Architecture

The extension at `_extensions/exam/` is a **Quarto Extension** that contributes several output formats (`exam-gfm`, `exam-pdf`, etc.).

### Directory Structure

```text
_extensions/
└── exam/
    ├── _extension.yml      # Main configuration (metadata & contribs)
    ├── exam-filter.lua     # Lua filter for modifying Pandoc AST
    ├── qti-post-render.js  # Node.js script for post-render QTI conversion
    ├── exam.scss           # SASS styling for HTML output
    └── ...                 # Other format-specific templates
```

### Key Components

#### 1. `_extension.yml`

Defines the extension metadata and the formats it provides. Each format (e.g., `exam-gfm`) specifies:

- **Filters**: Lua scripts to run (`exam-filter.lua`).
- **Defaults**: Default options (e.g., `solutions: false`).
- **Templates**: Any custom templates (though mostly standard `article` or `gfm` are used).

#### 2. `exam-filter.lua`

This is the core logic. It:

- Parses specific Divs (e.g., `.solution`).
- Handles the custom `exam` metadata.
- Modifies the document structure based on the target format (e.g., hiding solutions in student PDF).

#### 3. `qti-post-render.js`

This script is unique to `exam-gfm`. It is configured to run *after* Quarto renders the Markdown file. It invokes the `examify` CLI to automatically generate the QTI zip file.

**Trigger mechanism:**
Currently, this must be manually configured in the user's `_quarto.yml` or invoked via a shell wrapper. Future versions may automate this via `post-render` hooks if Quarto allows extension-level hooks.

## Maintenance Refresher

### Updating the Extension

1. **Modify** files in `_extensions/exam/`.
2. **Test** changes by running `quarto render examples/example.qmd`.
3. **Version Bump**: Update `version` in `_extensions/exam/_extension.yml`.
4. **commit** changes.

### Distribution

The extension is distributed via the GitHub repository. Users install it using:

```bash
quarto add Data-Wise/examify
```

This command downloads the `_extensions` directory from the root of the repo. **Therefore, the `_extensions` directory must always remain at the repository root.**

## Adding New Formats

To add a new format (e.g., `exam-revealjs`):

1. Edit `_extension.yml`.
2. Add a new entry under `contributes.formats`.
3. Define its defaults and filters.
4. Test with a sample document.

## Resources

- [Creating Extensions (Quarto Docs)](https://quarto.org/docs/extensions/creating.html)
- [Lua API Reference](https://quarto.org/docs/extensions/lua-api.html)
- [Pandoc Lua Filters](https://pandoc.org/lua-filters.html)
