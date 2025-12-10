# Documentation Design

This document describes the structure, design principles, and organization of the Examark documentation website.

---

## Site Architecture

### Navigation Structure

```
Home                          # Landing page with features overview
├── Getting Started           # Installation + first quiz (5 min)
├── Markdown/                 # Core syntax documentation
│   ├── Overview              # Index with quick reference
│   ├── Question Types        # Visual gallery of all 8 types
│   ├── Syntax Reference      # Complete syntax guide
│   ├── LaTeX Math            # Math formatting
│   ├── Images & Media        # Image bundling
│   ├── Feedback              # Feedback options
│   └── Document Structure    # File organization
├── CLI Reference/            # Command-line tools
│   ├── Commands              # All CLI commands
│   ├── YAML Options          # Config file reference
│   ├── Configuration         # Project settings
│   └── Canvas Emulator       # Pre-import validation
├── Quarto Extension/         # R/Python integration
│   └── Overview              # Extension docs
├── Tutorials/                # Step-by-step guides
│   ├── Index                 # Tutorial overview
│   ├── Your First Quiz       # Beginner tutorial
│   ├── R & Quarto            # Quarto integration
│   ├── Dynamic Exams         # Randomization
│   └── VS Code Snippets      # Editor setup
├── Templates/                # Starter files
│   ├── Index                 # Template overview
│   ├── Markdown              # .md templates
│   └── Quarto                # .qmd templates
└── Resources/                # Additional materials
    ├── Troubleshooting       # Common issues
    ├── Site Design           # Documentation architecture
    └── Contributing          # Development guide
```

### File Organization

```
docs/
├── index.md                  # Homepage
├── getting-started.md        # Quick start guide
├── DESIGN.md                 # This file
├── markdown/                 # Markdown syntax docs
│   ├── index.md              # Overview + quick reference
│   ├── question-types.md     # Visual gallery
│   ├── syntax.md             # Complete syntax
│   ├── latex.md              # Math formatting
│   ├── images.md             # Image handling
│   ├── feedback.md           # Feedback options
│   └── structure.md          # Document organization
├── reference/                # Reference materials
│   └── yaml-options.md       # YAML config reference
├── extensions/               # Extension docs
│   └── quarto.md             # Quarto extension
├── tutorials/                # Tutorials
│   ├── index.md
│   ├── first-quiz.md
│   ├── quarto.md
│   ├── dynamic-exams.md
│   └── vscode-snippets.md
├── starter/                  # Templates
│   ├── index.md
│   ├── markdown.md
│   └── quarto.md
├── stylesheets/              # Custom CSS
│   └── extra.css
├── DESIGN.md                 # Documentation architecture
├── config.md                 # Configuration
├── emulator.md               # Canvas emulator
├── reference.md              # CLI reference
├── troubleshooting.md        # Common issues
└── contributing.md           # Developer guide
```

---

## Design Principles

### 1. Progressive Disclosure

- **Homepage**: High-level features, quick start
- **Getting Started**: Essential info only
- **Markdown Section**: Detailed syntax (opt-in depth)
- **Reference**: Complete technical details

### 2. Task-Oriented Organization

| User Goal | Path |
|-----------|------|
| Try it out | Home → Quick Start |
| Write first exam | Getting Started → Templates |
| Learn syntax | Markdown → Question Types |
| Debug issues | Resources → Troubleshooting |
| Use with R/Python | Quarto Extension |
| Contribute | Resources → Contributing |

### 3. Two Audience Tracks

**Track A: Markdown Users**
```
Home → Getting Started → Markdown → Templates
```

**Track B: Quarto/R Users**
```
Home → Getting Started → Quarto Extension → Tutorials
```

### 4. Consistent Page Structure

Each documentation page follows:

1. **Title** — Clear, action-oriented
2. **Overview** — What this page covers
3. **Content** — Main documentation
4. **Examples** — Practical code samples
5. **See Also** — Related pages

---

## Theme Configuration

### Material for MkDocs

```yaml
theme:
  name: material
  palette:
    primary: indigo
    accent: purple
  font:
    text: Inter
    code: JetBrains Mono
```

### Key Features Enabled

| Feature | Purpose |
|---------|---------|
| `navigation.instant` | Fast page transitions |
| `navigation.tabs` | Top-level section tabs |
| `navigation.sections` | Grouped sidebar items |
| `content.code.copy` | Copy buttons on code |
| `content.tabs.link` | Synced content tabs |
| `search.suggest` | Search suggestions |

### Color Scheme

- **Primary**: Indigo (#3F51B5)
- **Accent**: Purple (#9C27B0)
- **Light/Dark**: Auto-detects system preference

---

## Content Guidelines

### Code Examples

Always use tabbed examples for syntax variations:

```markdown
=== "Clean Syntax"
    ```markdown
    1. [MC] Question [2pts]
    ```

=== "Traditional"
    ```markdown
    ## 1. Question [2 pts]
    ```
```

### Admonitions

Use appropriately:

| Type | Use For |
|------|---------|
| `!!! tip` | Best practices, shortcuts |
| `!!! note` | Additional information |
| `!!! warning` | Common pitfalls |
| `!!! example` | Practical examples |

### Internal Links

- Use relative paths: `[Link](../page.md)`
- Link to sections: `[Link](page.md#section)`
- Cross-reference related content

### Tables

Prefer tables for:
- Quick reference (markers, types)
- Comparison (formats, options)
- Structured data

---

## Page Templates

### Section Index Page

```markdown
# Section Name

Brief description of what this section covers.

---

## Overview

Explanation of the section's purpose.

---

## Documentation

<div class="grid cards" markdown>

- :material-icon:{ .lg .middle } **[Page Title](page.md)**
    ---
    Brief description.

</div>

---

## Quick Reference

| Item | Value |
|------|-------|
| ... | ... |

---

## See Also

- [Related Page](../related.md)
```

### Content Page

```markdown
# Page Title

Brief description of the page content.

---

## Section 1

Content with examples.

### Subsection

More detail.

---

## Section 2

Additional content.

---

## See Also

- [Related Page](related.md)
```

---

## Maintenance

### Adding New Pages

1. Create `.md` file in appropriate directory
2. Add to `nav:` in `mkdocs.yml`
3. Add cross-links from related pages
4. Build and verify: `mkdocs build`

### Updating Navigation

Edit `mkdocs.yml`:

```yaml
nav:
  - Section:
      - section/index.md
      - Page: section/page.md
```

### Testing

```bash
# Build site
mkdocs build

# Serve locally
mkdocs serve

# Check for broken links
mkdocs build --strict
```

---

## Future Improvements

### Content

- [ ] Add Canvas screenshots showing imported questions
- [ ] Video tutorials for complex topics
- [ ] More real-world exam examples
- [ ] Searchable question type examples

### Features

- [ ] API documentation (if public API added)
- [ ] Changelog page (auto-generated)
- [ ] Version selector (for multiple versions)
- [ ] Search analytics

### Technical

- [ ] Automated link checking in CI
- [ ] Documentation coverage metrics
- [ ] User feedback collection

---

## Related Files

| File | Purpose |
|------|---------|
| `mkdocs.yml` | Site configuration |
| `docs/stylesheets/extra.css` | Custom styles |
| `.github/workflows/publish_docs.yml` | Auto-deploy |
| `README.md` | GitHub landing page |
