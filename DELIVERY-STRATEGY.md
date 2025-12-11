# Examark Delivery Strategy - Deep Brainstorm

**Date**: December 11, 2025
**Topic**: Streamlined package delivery and installation models

---

## 🎯 The Core Problem

**Current State (v0.6.6):**
```
User wants to create exam → Install examark CLI → Install Quarto → Install extension → Render → Convert → Upload
                            (npm or Homebrew)      (separate)        (quarto add)
```

**Pain Points:**
1. **Multi-step installation**: CLI + Quarto extension are separate
2. **Dependency hell**: Node.js required for CLI, even for R users
3. **Workflow friction**: Manual convert step after rendering
4. **R users alienated**: "Why do I need Node.js for an R/Quarto workflow?"
5. **Platform complexity**: Different install methods for different OSes

**Goal**: One-command install, zero-friction workflow

---

## 🚀 Delivery Models: The Full Spectrum

### Model 1: Current Split Architecture (Status Quo)

**Structure:**
```
examark (npm/Homebrew)    +    examark Quarto extension
    ↓                               ↓
TypeScript CLI                  Lua filter + formats
QTI generation                  No conversion capability
```

**Pros:**
- ✅ Clean separation of concerns
- ✅ CLI works standalone (no Quarto needed)
- ✅ Extension works for preview (no QTI generation)
- ✅ Easy to maintain (two independent packages)

**Cons:**
- ❌ Users must install both
- ❌ Manual workflow (render → convert)
- ❌ R users need Node.js (feels wrong)
- ❌ No integration between CLI and extension

**User Experience Score**: 3/10

---

### Model 2: Quarto Extension with Embedded CLI

**Structure:**
```
examark Quarto extension
    ↓
Lua filter + formats + BUNDLED examark CLI binary
    ↓
Post-render hook calls embedded binary
```

**Implementation Options:**

#### 2A: Bundle Node.js Binary (pkg)
```bash
quarto add Data-Wise/examark
# Downloads platform-specific bundle:
# - _extensions/exam/bin/examark-macos-arm64
# - _extensions/exam/bin/examark-linux-x64
# - _extensions/exam/bin/examark-win-x64.exe
```

**Pros:**
- ✅ Single install: `quarto add`
- ✅ No external dependencies
- ✅ Works offline
- ✅ Consistent behavior across platforms

**Cons:**
- ❌ Large download (50-100 MB per platform)
- ❌ Security concerns (binary distribution)
- ❌ Hard to update (must reinstall extension)
- ❌ Platform-specific builds (3x maintenance)

**Tools**: [pkg](https://github.com/vercel/pkg), [nexe](https://github.com/nexe/nexe)

#### 2B: Bundle WASM Module
```bash
quarto add Data-Wise/examark
# Downloads:
# - _extensions/exam/examark.wasm (5-10 MB)
# - _extensions/exam/wasm-runner.js
```

**Implementation:**
- Compile TypeScript → WASM using [AssemblyScript](https://www.assemblyscript.org/) or [Binaryen](https://github.com/WebAssembly/binaryen)
- Run via Node.js WASI or browser

**Pros:**
- ✅ Single install
- ✅ Platform-independent (one binary)
- ✅ Smaller size than Node binary
- ✅ Future-proof (WASM is standard)
- ✅ Can run in browser (web preview!)

**Cons:**
- ❌ Requires WASM compilation (new build step)
- ❌ Not all Node APIs available (file I/O limited)
- ❌ Debugging harder
- ❌ Still requires Node.js runtime (unless pure WASI)

**Feasibility**: Medium-High (TypeScript → WASM is doable)

#### 2C: Fallback to System CLI
```lua
-- _extensions/exam/qti-post-render.lua
function generate_qti()
  -- Try embedded binary first
  local embedded = find_embedded_binary()
  if embedded then
    os.execute(embedded .. " " .. input_file)
  else
    -- Fall back to system CLI
    os.execute("examark " .. input_file)
  end
end
```

**Pros:**
- ✅ Best of both worlds
- ✅ Works even if system CLI not installed
- ✅ Falls back gracefully

**Cons:**
- ❌ Complex logic
- ❌ Still large download

**User Experience Score**: 7/10

---

### Model 3: R Package as Primary Interface

**Structure:**
```
examark (CRAN R package)
    ↓
R wrapper functions + embedded converter
    ↓
C++ extension OR system calls to binary
```

#### 3A: Pure R Implementation

**Rewrite parser/generator in R:**
```r
library(examark)

# Parse markdown
exam <- examark::parse_exam("exam.md")

# Generate QTI
examark::generate_qti(exam, output = "exam.qti.zip")

# Integrated workflow
examark::quarto_to_qti("exam.qmd")  # Render + convert in one step
```

**Pros:**
- ✅ Native to R/Quarto ecosystem
- ✅ No external dependencies
- ✅ CRAN distribution (trusted)
- ✅ Installable via `install.packages("examark")`
- ✅ Works in RStudio/Positron natively

**Cons:**
- ❌ Complete rewrite (100+ hours)
- ❌ Maintain two codebases (TypeScript + R)
- ❌ R parsing libraries less mature than TypeScript
- ❌ XML generation in R (use xml2 package)

**Packages to use:**
- `xml2` - XML generation
- `zip` - Create QTI archives
- `knitr` / `rmarkdown` - Integration with Quarto

#### 3B: R Wrapper Around CLI (System Calls)

```r
library(examark)

# Calls system examark CLI under the hood
examark::convert("exam.md", output = "exam.qti.zip")

# Checks for CLI availability
examark::check_cli()  # Returns TRUE/FALSE
examark::install_cli()  # Installs via npm/Homebrew
```

**Pros:**
- ✅ Quick to implement (wrapper only)
- ✅ Leverages existing TypeScript code
- ✅ Easy to maintain (just R wrapper)

**Cons:**
- ❌ Still requires Node.js/npm
- ❌ Not self-contained

#### 3C: R Package with Embedded Binary (V8 Engine)

**Use the V8 R package to run JavaScript:**
```r
library(V8)
library(examark)

# examark package includes JS bundle
ctx <- v8()
ctx$source(system.file("js/examark.bundle.js", package = "examark"))

# Call JS functions from R
ctx$call("parseMarkdown", readLines("exam.md"))
ctx$call("generateQTI", exam_data)
```

**Pros:**
- ✅ Self-contained (no external Node.js needed)
- ✅ Leverages existing TypeScript code
- ✅ Single install: `install.packages("examark")`
- ✅ Works on CRAN (V8 is on CRAN)

**Cons:**
- ❌ V8 package can be finicky to install
- ❌ Need to bundle JS (webpack/rollup)
- ❌ File I/O through R (not direct)

**Example**: This is how the `jsonlite` package works!

**Feasibility**: HIGH - This is the sweet spot!

**User Experience Score**: 9/10

---

### Model 4: Standalone Desktop App

**Structure:**
```
Examark.app (Electron/Tauri)
    ↓
GUI editor + Live preview + QTI export
    ↓
Self-contained, no dependencies
```

**Implementation:**

#### 4A: Electron App
```
Examark/
├── Examark.app (macOS)
├── Examark.exe (Windows)
├── examark.deb (Linux)
└── Features:
    ├── Monaco Editor (VS Code editor)
    ├── Live preview pane
    ├── QTI export button
    ├── Canvas emulator
    └── File manager
```

**Pros:**
- ✅ Beautiful GUI for non-CLI users
- ✅ Live preview (instant feedback)
- ✅ Single download (50-100 MB)
- ✅ Works offline
- ✅ Drag-and-drop images

**Cons:**
- ❌ Large app size
- ❌ Maintenance burden (GUI code)
- ❌ Distribution complexity (code signing, notarization)
- ❌ CLI users won't use it

**Tools**: [Electron](https://www.electronjs.org/), [Tauri](https://tauri.app/) (smaller, Rust-based)

#### 4B: Web App (Progressive Web App)

**Deploy at examark.dev:**
```
https://examark.dev
    ↓
Monaco Editor + WASM converter
    ↓
Generate QTI in browser
    ↓
Download .qti.zip
```

**Pros:**
- ✅ No installation required
- ✅ Works on any platform
- ✅ Easy to update (just deploy)
- ✅ Can work offline (PWA)
- ✅ Shareable links

**Cons:**
- ❌ Requires internet (initial load)
- ❌ File access limited (browser sandbox)
- ❌ Privacy concerns (upload exams to server?)

**Solution**: Client-side only (no server upload)

**User Experience Score**: 8/10 (GUI), 2/10 (CLI users)

---

### Model 5: Polyglot Package (Multi-Runtime)

**Structure:**
```
examark package
    ↓
├── bin/examark (CLI for terminal users)
├── lib/examark.wasm (embeddable WASM module)
├── R/examark/ (R package wrapper)
├── python/examark/ (Python package wrapper)
└── _extensions/exam/ (Quarto extension)
```

**Distribution:**
```bash
# CLI users
npm install -g examark
brew install examark

# R users
install.packages("examark")  # Includes embedded WASM

# Python users
pip install examark  # Also includes WASM

# Quarto users
quarto add Data-Wise/examark  # Extension calls R/Python package
```

**Pros:**
- ✅ Universal package (one codebase)
- ✅ Users install via their preferred tool
- ✅ WASM core shared across all runtimes
- ✅ Consistent behavior
- ✅ Future-proof

**Cons:**
- ❌ Complex build system
- ❌ Multiple package registries
- ❌ Maintenance overhead

**Feasibility**: High effort, but cleanest long-term solution

**User Experience Score**: 10/10

---

## 🎯 Recommended Strategy: Hybrid Approach

### Phase 1: R Package with V8 (Immediate - v0.7.0)

**Why:**
- Primary users are R/Quarto statistics instructors
- V8 package lets us embed JS without external Node.js
- Single install: `install.packages("examark")`
- Works in RStudio/Positron natively

**Implementation:**
```r
# R/examark.R
library(V8)

.examark_ctx <- NULL

.onLoad <- function(libname, pkgname) {
  .examark_ctx <<- V8::v8()
  bundle <- system.file("js/examark.bundle.js", package = "examark")
  .examark_ctx$source(bundle)
}

#' Convert markdown to QTI
#' @export
convert_to_qti <- function(input, output = NULL) {
  content <- readLines(input, warn = FALSE)
  .examark_ctx$assign("markdown", paste(content, collapse = "\n"))

  # Call JS function
  qti_data <- .examark_ctx$eval("generateQTI(parseMarkdown(markdown))")

  # Write ZIP file
  if (is.null(output)) {
    output <- sub("\\.md$", ".qti.zip", input)
  }

  write_qti_zip(qti_data, output)
  invisible(output)
}

#' Quarto workflow: render and convert
#' @export
quarto_to_qti <- function(input, render = TRUE) {
  if (render) {
    quarto::quarto_render(input, output_format = "exam-gfm")
  }

  md_file <- sub("\\.qmd$", ".md", input)
  convert_to_qti(md_file)
}
```

**User Experience:**
```r
# Install once
install.packages("examark")

# Use in R
library(examark)
quarto_to_qti("exam.qmd")
# ✓ Rendered to exam.md
# ✓ Generated exam.qti.zip

# Or just convert
convert_to_qti("exam.md")
```

**Deliverables:**
1. Build JS bundle: `webpack src/index.ts → dist/examark.bundle.js`
2. Create R package structure
3. Submit to CRAN (or rOpenSci first)
4. Update Quarto extension to optionally call R package

**Timeline**: 2-3 weeks

---

### Phase 2: WASM Core Module (Medium-term - v0.8.0)

**Why:**
- Platform-independent
- Embeddable in any runtime
- Smaller than Node binary
- Enables web preview

**Implementation:**
1. Compile TypeScript → WASM (using Binaryen or Emscripten)
2. Create WASI interface for file I/O
3. Test in Node.js, Deno, browser
4. Bundle in R package (replace V8 bundle)

**Benefits:**
- R package becomes even lighter
- Can create web app version
- Python package can use same WASM
- Quarto extension can bundle WASM directly

**Timeline**: 1-2 months (after WASM tooling matures)

---

### Phase 3: Polyglot Distribution (Long-term - v1.0.0)

**Goal**: Universal package, installed via any tool

**Structure:**
```
examark monorepo
├── core/               # WASM module (shared)
├── cli/                # Node.js CLI wrapper
├── r-package/          # R package (calls WASM)
├── python-package/     # Python package (calls WASM)
├── quarto-extension/   # Quarto extension (calls R/Python)
├── web/                # Web app (uses WASM directly)
└── desktop/            # Electron app (optional)
```

**Distribution Matrix:**

| User Type | Installation | Command |
|-----------|-------------|---------|
| CLI power users | npm/Homebrew | `examark exam.md` |
| R users | CRAN | `examark::convert_to_qti("exam.md")` |
| Python users | PyPI | `examark.convert("exam.md")` |
| Quarto users | Extension | Auto-convert on render |
| GUI users | Desktop app | Drag-and-drop |
| Web users | Browser | https://examark.dev |

**Timeline**: 3-6 months

---

## 💰 Cost-Benefit Analysis

### Current Model (Split CLI + Extension)
- **Development**: ⭐⭐⭐⭐⭐ (easy, already done)
- **User Experience**: ⭐⭐ (multiple installs)
- **Maintenance**: ⭐⭐⭐⭐ (two independent packages)
- **Distribution**: ⭐⭐⭐ (npm + extension registry)

### R Package with V8
- **Development**: ⭐⭐⭐ (2-3 weeks)
- **User Experience**: ⭐⭐⭐⭐⭐ (single install for R users)
- **Maintenance**: ⭐⭐⭐⭐ (bundle JS, minimal wrapper)
- **Distribution**: ⭐⭐⭐⭐⭐ (CRAN is trusted)

### WASM Module
- **Development**: ⭐⭐ (learning curve)
- **User Experience**: ⭐⭐⭐⭐⭐ (universal)
- **Maintenance**: ⭐⭐⭐ (need WASM tooling)
- **Distribution**: ⭐⭐⭐⭐⭐ (platform-independent)

### Desktop App
- **Development**: ⭐ (lots of GUI code)
- **User Experience**: ⭐⭐⭐⭐ (pretty, but niche)
- **Maintenance**: ⭐⭐ (GUI needs updates)
- **Distribution**: ⭐⭐ (code signing, notarization)

---

## 🎯 Recommended Roadmap

### Immediate (v0.7.0) - 2-3 weeks
1. **Create R package with V8**
   - Bundle JS with webpack
   - Wrap with R functions
   - Test in RStudio/Positron
   - Submit to rOpenSci for review

2. **Update Quarto extension**
   - Detect if R package installed
   - Call `examark::convert_to_qti()` if available
   - Fall back to CLI if not

3. **Update documentation**
   - Recommend R package for Quarto users
   - Keep CLI for markdown-only users

### Near-term (v0.8.0) - 1-2 months
4. **Explore WASM compilation**
   - Prototype TypeScript → WASM
   - Test file I/O via WASI
   - Benchmark performance

5. **Create WASM bundle**
   - Replace V8 bundle in R package
   - Create standalone WASM module
   - Test in browser

### Medium-term (v0.9.0) - 3-4 months
6. **Python package** (if requested)
   - Wrap WASM module
   - Publish to PyPI
   - Support Jupyter notebooks

7. **Web app** (if time permits)
   - Deploy to examark.dev
   - Client-side only (WASM)
   - PWA for offline use

### Long-term (v1.0.0) - 6+ months
8. **Polyglot distribution**
   - Unified monorepo
   - WASM core + language wrappers
   - Desktop app (if demand exists)

---

## 🤔 Open Questions

### For Community Discussion:

1. **R Package Priority**: Should we prioritize R package over CLI improvements?
   - **Pro**: Primary users are R/Quarto users
   - **Con**: CLI-only users might feel abandoned

2. **CRAN vs GitHub**: Where to distribute R package initially?
   - **CRAN**: Trusted, but strict review process
   - **rOpenSci**: Good middle ground, peer review
   - **GitHub**: Quick, but users must trust us

3. **V8 vs WASM**: Use V8 now, migrate to WASM later?
   - **V8**: Works today, proven tech
   - **WASM**: Future-proof, but immature tooling

4. **Desktop App**: Do we need a GUI at all?
   - **Target users**: Instructors who aren't comfortable with CLI
   - **Reality**: Most instructors already use RStudio/Positron

5. **Python Package**: Worth the effort?
   - **Pro**: Expand user base to Python scientists
   - **Con**: Maintenance burden, fewer statistics courses use Python for exams

6. **Pricing Model**: All free, or premium features?
   - **Free**: Core conversion (current)
   - **Premium**: Web app with unlimited storage, AI generation, collaboration?

---

## 📊 User Personas & Preferred Install Methods

| Persona | Preferred Tool | Install Method |
|---------|---------------|----------------|
| **Dr. Statistics** (R user) | RStudio/Positron | `install.packages("examark")` ⭐ |
| **Prof. Math** (Quarto + CLI) | Terminal + Positron | `brew install examark` |
| **Dr. Data Science** (Python) | Jupyter | `pip install examark` |
| **TA Student** (Markdown only) | VS Code | `npm install -g examark` |
| **Admin Non-Technical** | GUI | Download Examark.app |

**Insight**: R package targets 70% of our users (statistics instructors)

---

## 🚀 Quick Start Vision (After R Package)

**Ideal User Experience:**

```r
# One-time setup
install.packages("examark")

# Create exam in Quarto
# exam.qmd (write your questions with R code chunks)

# Render and convert in one command
library(examark)
quarto_to_qti("exam.qmd")

# Output:
# ✓ Rendered exam.qmd → exam.md
# ✓ Generated exam.qti.zip
# ✓ Ready to upload to Canvas!

# Upload to Canvas via browser or:
# (future) examark::upload_to_canvas("exam.qti.zip", course_id = 12345)
```

**Zero external dependencies (no Node.js, no CLI installation)**

---

## 💡 Key Insights

1. **R package is the killer feature** - It's what our users actually want
2. **V8 is good enough** - Don't wait for perfect WASM tooling
3. **CLI should stay** - Power users and CI/CD need it
4. **Desktop app is overkill** - Users already have RStudio/Positron
5. **Web app is nice-to-have** - Good for demos, not critical path
6. **WASM is future** - But don't block on it today

---

## 🎯 Decision Matrix

| Option | Effort | Impact | Maintenance | Priority |
|--------|--------|--------|-------------|----------|
| R package (V8) | Medium | HIGH | Low | 🔴 DO NOW |
| WASM core | High | HIGH | Medium | 🟡 LATER |
| Python package | Medium | LOW | Low | 🟢 MAYBE |
| Desktop app | Very High | LOW | High | ⚪ SKIP |
| Web app | High | MEDIUM | Medium | 🟡 NICE-TO-HAVE |

---

## 📝 Action Items

**This Week:**
1. Prototype R package structure
2. Bundle JS with webpack/rollup
3. Test V8 integration
4. Write R wrapper functions

**Next Week:**
1. Create R package tests
2. Write vignette (tutorial)
3. Submit to rOpenSci
4. Update Quarto extension to call R package

**This Month:**
1. Get rOpenSci feedback
2. Iterate on R package
3. Submit to CRAN
4. Announce to R community

---

**End of Brainstorm**

**Recommendation**: Start with R package (V8), migrate to WASM later, keep CLI for power users.
