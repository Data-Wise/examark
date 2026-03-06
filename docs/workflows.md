# Visual Workflows

> **TL;DR** (30 seconds)
> - **What:** Visual diagrams showing every Examark workflow at a glance
> - **Why:** See the big picture before diving into details
> - **How:** Pick your workflow below, follow the arrows
> - **Next:** [Getting Started](getting-started.md) to begin

---

## Markdown to Canvas (CLI)

The core workflow — write Markdown, get a Canvas quiz.

```mermaid
flowchart LR
    A["Write exam.md"] --> B["examark check"]
    B -->|"Fix issues"| A
    B -->|"Clean"| C["examark convert"]
    C --> D["exam.qti.zip"]
    D --> E["emulate-canvas"]
    E -->|"Pass"| F["Upload to Canvas"]
    E -->|"Errors"| A
```

| Step | Command | What Happens |
|------|---------|-------------|
| 1. Lint | `examark check exam.md` | Catches missing answers, bad syntax |
| 2. Convert | `examark exam.md -o exam.qti.zip` | Generates QTI 1.2 package |
| 3. Validate | `examark emulate-canvas exam.qti.zip` | Simulates Canvas import |
| 4. Upload | Canvas → Import → QTI | Import into Classic or New Quizzes |

---

## Quarto to Canvas (R/Python)

For dynamic exams with computed answers and generated plots.

```mermaid
flowchart LR
    A["Write exam.qmd\n(R/Python code)"] --> B["quarto render\n--to exam-gfm"]
    B --> C["exam.md\n+ figures"]
    C --> D["examark convert"]
    D --> E["exam.qti.zip\n(images bundled)"]
    E --> F["Upload to Canvas"]

    style A fill:#f3e8ff,stroke:#7c3aed
    style E fill:#dcfce7,stroke:#22c55e
```

| Step | Command | What Happens |
|------|---------|-------------|
| 1. Render | `quarto render exam.qmd --to exam-gfm` | Executes R/Python, produces Markdown + figures |
| 2. Convert | `examark exam.md -o exam.qti.zip` | Bundles figures into QTI package |
| 3. Upload | Canvas → Import → QTI | Plots and computed answers appear in Canvas |

!!! tip "Post-Render Hook"
    With `exam.qti: true` in your YAML, the post-render hook runs examark automatically after `quarto render`.

---

## Validation Pipeline

How examark checks your work at each stage.

```mermaid
flowchart TD
    A["exam.md"] --> B{"examark check\n(pre-conversion)"}
    B -->|"Errors"| C["Fix Markdown"]
    C --> A
    B -->|"Clean"| D["examark convert"]
    D --> E["exam.qti.zip"]
    E --> F{"examark verify\n(post-conversion)"}
    F -->|"Invalid XML"| G["Fix & Reconvert"]
    G --> D
    F -->|"Valid"| H{"emulate-canvas\n(Canvas simulation)"}
    H -->|"Would fail"| I["Fix Issues"]
    I --> A
    H -->|"Would succeed"| J["Ready to Upload"]

    style J fill:#dcfce7,stroke:#22c55e
    style C fill:#fef3c7,stroke:#f59e0b
    style G fill:#fef3c7,stroke:#f59e0b
    style I fill:#fef3c7,stroke:#f59e0b
```

| Check | Stage | What It Catches |
|-------|-------|----------------|
| `check` | Pre-conversion | Missing stems, duplicate IDs, no correct answer |
| `verify` | Post-conversion | Invalid XML, missing files, broken references |
| `emulate-canvas` | Pre-upload | Wrong cardinality, unsupported types, security issues |

---

## Output Formats

All the ways to export your exam.

```mermaid
flowchart LR
    A["exam.md\nor exam.qmd"] --> B["examark / quarto"]
    B --> C["QTI 1.2 (.qti.zip)\nCanvas Import"]
    B --> D["Plain Text\nPrintable Exam"]
    B --> E["HTML\nBrowser Preview"]
    B --> F["PDF\nPrint-Ready"]
    B --> G["DOCX / ODT\nWord / Google Docs"]

    style C fill:#dcfce7,stroke:#22c55e
```

| Format | Command | Use Case |
|--------|---------|----------|
| **QTI** | `examark exam.md -o exam.qti.zip` | Canvas import |
| **Text** | `examark exam.md -f text` | Printable exam |
| **Text (no key)** | `examark exam.md -f text --no-answers` | Student handout |
| **HTML** | `quarto render exam.qmd --to exam-html` | Browser preview |
| **PDF** | `quarto render exam.qmd --to exam-pdf` | Print-ready |

---

## Choose Your Path

Not sure where to start? Follow the arrow that matches your situation:

```mermaid
flowchart TD
    Start["I want to create\na Canvas quiz"] --> Q1{"Do you use\nR or Python?"}
    Q1 -->|"No"| MD["Write Markdown\nexam.md"]
    Q1 -->|"Yes"| QMD["Write Quarto\nexam.qmd"]
    MD --> CLI["examark convert"]
    QMD --> Render["quarto render"]
    Render --> CLI
    CLI --> QTI["exam.qti.zip"]
    QTI --> Canvas["Upload to Canvas"]

    click MD "getting-started" "Getting Started"
    click QMD "extensions/quarto" "Quarto Extension"
    click CLI "reference" "CLI Reference"

    style Start fill:#f3e8ff,stroke:#7c3aed
    style Canvas fill:#dcfce7,stroke:#22c55e
```
