# Examark Roadmap - Consolidated Plan

**Last Updated**: December 11, 2025
**Current Version**: 0.6.6
**Primary Users**: Statistics instructors using Quarto for dynamic exam generation

---

## 🎯 Project Status: What's Actually Done

### ✅ Completed Since v0.4.2

**Question Types** (10 total - COMPLETE):
- ✅ Multiple Choice, Multiple Answers, True/False
- ✅ Essay, Short Answer, Numerical
- ✅ Matching questions
- ✅ Fill-in-multiple-blanks (FMB)
- ✅ Fill-in-the-blank (single blank)

**Answer Feedback** (COMPLETE):
- ✅ Correct/incorrect feedback per option
- ✅ General feedback for whole question
- ✅ Inline feedback (`// comment`)
- ✅ Blockquote feedback (`> feedback text`)

**Validation & Diagnostics** (COMPLETE):
- ✅ Canvas emulator for validation
- ✅ Pre-conversion linting
- ✅ Post-conversion validation
- ✅ Strict mode for New Quizzes
- ✅ Quarto GFM feature detection

**Quarto Integration** (COMPLETE):
- ✅ Full GFM compatibility (code, math, operators, images)
- ✅ 6 output formats (HTML, PDF, GFM, ODT, DOCX, Typst)
- ✅ R/Python dynamic content
- ✅ Solution visibility toggle
- ✅ Positron IDE integration (Ctrl+Shift+Q)

**Project Infrastructure** (COMPLETE):
- ✅ 249 tests (96% passing)
- ✅ Automated releases (npm, Homebrew, Quarto)
- ✅ Comprehensive documentation site (MkDocs)
- ✅ Torture test suite (30 edge cases)
- ✅ CLI with batch conversion

### 🐛 Known Issues

**Non-Critical (Won't Block Release):**
1. Validator XML parser miscounting items (3 torture tests fail)
2. Multi-line HTML `<div>` parsing edge case

**Technical Debt:**
- QTI 2.1 generator exists but not integrated
- Some error messages lack line numbers

---

## 📊 Roadmap: Prioritized by Impact

### 🔴 Phase 1: Stability & Bug Fixes (v0.6.7)
**Timeline**: 1-2 days
**Status**: Immediate priority

| Task | Effort | Priority | Blocker? |
|------|--------|----------|----------|
| Fix validator XML parser (item counting) | 2h | HIGH | Yes |
| Fix multi-line HTML div parsing | 3h | MEDIUM | No |
| Update torture tests to pass | 1h | MEDIUM | No |

**Rationale**: Clean slate before adding features.

---

### 🟠 Phase 2: Quick Wins (v0.7.0)
**Timeline**: 1-2 weeks
**Status**: High impact, low effort

#### 1. Canvas Visual Documentation 📸
**Effort**: 4 hours | **Impact**: MASSIVE

Import `torture-quarto.md` into Canvas and screenshot each question type:
- Multiple Choice with inline code
- LaTeX math (inline and display)
- Comparison operators
- R-generated figures
- Feedback blocks
- Matching with code

**Deliverable**: `docs/canvas-preview.md` showing before/after

#### 2. Answer Randomization 🎲
**Effort**: 6 hours | **Impact**: HIGH (exam security)

```bash
examark exam.md --randomize
```

```yaml
exam:
  randomize: true
```

- Shuffle answer options (preserve correct answer)
- Add to QTI metadata: `shuffle_answers=true`
- Test in Canvas to verify

#### 3. Numeric Range Answers 🔢
**Effort**: 4 hours | **Impact**: MEDIUM (common in stats)

**Syntax**:
```markdown
[Num] What is the mean? [1pt]
Answer: 5-10
Answer: 7.5 ± 0.5
```

**Implementation**:
- Parser: detect range/plus-minus syntax
- Generator: `<response_num>` with `vargte`/`varlte`
- Support: ranges, ±, single values, scientific notation

#### 4. Quarto Post-Render Automation 🪝
**Effort**: 3 hours | **Impact**: HIGH (workflow improvement)

Update `qti-post-render.js` to actually run examark CLI:
- Auto-detect `exam.qti: true`
- Generate QTI in `_output/` or project root
- Show success message with file location

**User Experience**:
```bash
quarto render exam.qmd
# Automatically generates exam.qti.zip ✓
```

**Total Phase 2**: ~17 hours (~2 working days)

---

### 🟡 Phase 3: Enhanced Validation (v0.7.1)
**Timeline**: 2-3 weeks
**Status**: Improves user experience

#### 1. Line Numbers in Errors 📍
**Effort**: 8 hours | **Impact**: HIGH (debugging)

Current error:
```
Error: Question has no correct answer
```

Better error:
```
exam.md:45 Error: Question "What is the mean?" has no correct answer marked
  45 | 1. [MC] What is the mean?
  46 | a) 5
  47 | b) 10
     | ^ Add [x] or **bold** to mark correct answer
```

**Implementation**:
- Add `sourceLine` to all parser objects
- Update linter/validator to track line numbers
- Format output with code context (like ESLint)

#### 2. Enhanced Canvas Emulator 🎓
**Effort**: 4 hours | **Impact**: MEDIUM

```bash
examark emulate-canvas exam.qti.zip --verbose
```

**Enhancements**:
- Simulate Canvas import step-by-step
- Predict which questions will fail with explanations
- Show warnings for Canvas quirks
- Add `--fix` flag to auto-correct issues

#### 3. Validation Strictness Levels 🔒
**Effort**: 3 hours | **Impact**: MEDIUM

```bash
examark check exam.md --level strict
```

**Levels**:
- `lenient`: Warn only, allow Canvas quirks (default)
- `standard`: Current behavior
- `strict`: New Quizzes compliance
- `pedantic`: Full QTI 1.2 spec compliance

**Config**:
```json
{
  "validation": {
    "level": "strict",
    "canvas": "new-quizzes"
  }
}
```

**Total Phase 3**: ~15 hours (~2 days)

---

### 🟢 Phase 4: Workflow Enhancements (v0.8.0)
**Timeline**: 1-2 months
**Status**: Quality of life improvements

#### 1. Question Pool/Item Bank Guide 📚
**Effort**: 6 hours | **Impact**: HIGH (common workflow)

**Deliverables**:
- Tutorial: "Creating Question Banks for Canvas"
- Workflow diagram: examark → Import → Bank → Quiz
- Best practices: naming, tagging, organization
- Classic Banks vs Item Banks comparison
- Video walkthrough (optional)

#### 2. QTI 2.1 Export 📦
**Effort**: 8 hours | **Impact**: MEDIUM (future-proofing)

**Status**: Generator exists in `src/generator/qti21.ts`, needs integration

```bash
examark exam.md --format qti21
```

**Tasks**:
- Add CLI flag
- Update manifest generator
- Test with Canvas (Classic + New Quizzes)
- Document when to use 1.2 vs 2.1

#### 3. Question Weighting & Partial Credit ⚖️
**Effort**: 10 hours | **Impact**: MEDIUM

**Syntax**:
```markdown
1. [MC] Hard question? [5pts, weight=2]
   # Worth 10 points total (5 × 2)

2. [MA] Select all that apply: [4pts]
   *a) Correct [50%]
   *b) Correct [50%]
   c) Incorrect
   # 2 points each for partial credit
```

**Use Cases**:
- Weight important questions more heavily
- Partial credit for multiple-answer questions
- Different point values per option

#### 4. Template Generator 🎨
**Effort**: 6 hours | **Impact**: MEDIUM (onboarding)

```bash
examark init statistics-midterm
examark init math-homework
examark init quick-quiz
examark init final-exam
```

**Output**: Scaffolded `.qmd` file with:
- Example questions of each type
- R code chunks (for stats)
- LaTeX math examples
- Comments explaining syntax

**Total Phase 4**: ~30 hours (~4 days)

---

### 🔵 Phase 5: Import & Interop (v0.9.0)
**Timeline**: 2-3 months
**Status**: Nice to have, lower priority

#### 1. Import from Other Formats 📥
**Effort**: 20 hours | **Impact**: MEDIUM (migration)

**Priority Order**:
1. **Moodle XML** (common in academia)
2. **GIFT** (Moodle's text format)
3. **Blackboard** (if requested)
4. **QTI 2.x** (reverse import from Canvas exports)

```bash
examark import quiz.xml --from moodle -o quiz.md
examark import gift.txt --from gift -o quiz.md
examark import canvas-export.qti --to markdown -o quiz.md
```

#### 2. Question Metadata & Tagging 🏷️
**Effort**: 8 hours | **Impact**: LOW (power users)

**Syntax**:
```markdown
1. [MC] What is regression? [2pts]
   Tags: #regression #statistics #midterm1
   Difficulty: medium
   Learning Objective: LO-3.2
   Bloom: understand
```

**Use Cases**:
- Canvas tags for item analysis
- Filter questions by difficulty
- Align with learning objectives
- Export metadata to CSV

#### 3. Batch Operations 🔄
**Effort**: 6 hours | **Impact**: LOW

```bash
examark batch convert **/*.md --recursive
examark merge exam1.md exam2.md -o final.md
examark split final.md --by-section
examark stats exam.qti.zip  # analyze question distribution
```

**Total Phase 5**: ~34 hours (~5 days)

---

### ⚪ Phase 6: Advanced Vision (v1.0.0+)
**Timeline**: 6+ months
**Status**: Future, requires discussion

#### 1. Web-Based Preview UI 🌐
**Effort**: 40+ hours | **Impact**: HIGH but requires maintenance

**Stack**: Next.js + React + Monaco Editor

**Features**:
- Live preview: Markdown → Canvas rendering
- WYSIWYG editor for non-technical users
- Drag-and-drop question reordering
- Export to MD, QTI, or PDF
- Share preview links

**Deployment**: examark.dev or GitHub Pages

**Concerns**:
- Maintenance burden
- Hosting costs
- Security (file uploads)

#### 2. AI-Assisted Generation 🤖
**Effort**: 30 hours | **Impact**: MEDIUM (experimental)

```bash
examark generate --topic "linear regression" --count 5 --difficulty medium
```

**Implementation**:
- Use Claude API or OpenAI
- Generate questions in examark format
- User reviews/edits before finalizing
- Learn from user corrections

**Challenges**:
- Quality control
- API costs ($)
- Rate limits

#### 3. VS Code Extension 🔧
**Effort**: 50+ hours | **Impact**: MEDIUM (niche audience)

**Features**:
- Syntax highlighting (TextMate grammar)
- Live preview pane (webview)
- Linting and diagnostics
- Snippets for question types
- One-click QTI export
- Canvas import simulation

**Marketplace**: "Examark for VS Code"

#### 4. LTI Integration 🔗
**Effort**: 40+ hours | **Impact**: LOW (very niche, high complexity)

**Feature**: Direct publish to Canvas from CLI (no manual import)

**Challenges**:
- Institution must grant LTI developer key
- OAuth flow + security
- Different Canvas instances have different configs
- Maintenance nightmare

**Verdict**: Probably not worth it unless heavily requested

**Total Phase 6**: ~160 hours (not prioritized for 2025)

---

## 🧠 Brainstormed Ideas (Parking Lot)

### Analytics & Insights 📊
- Parse Canvas quiz results → identify difficult questions
- Track question performance over semesters
- Suggest revisions based on student data
- Difficulty estimation using Item Response Theory

### Collaboration Features 🤝
- Multi-author exams (merge contributions)
- Git-based workflows with conflict resolution
- Shared question libraries (GitHub repo)
- Community-contributed question banks

### Accessibility ♿
- WCAG 2.1 AAA compliance checking
- Screen reader testing
- Alternative text validation for images
- Keyboard navigation audit
- Color contrast checking

### Content Libraries 📖
- Pre-built question banks:
  - Statistics 101 (100+ questions)
  - Calculus I-III
  - General Chemistry
  - etc.
- Community contributions (CC-BY license)
- Searchable question database
- "examark install stats101" → downloads bank

### Platform Expansion 🚀
- Moodle LMS full support
- D2L Brightspace support
- Google Classroom integration
- Blackboard Learn support
- Generic SCORM export

### IDE Integration Beyond VS Code 🔧
- Neovim plugin (Lua)
- Emacs mode (Elisp)
- JetBrains plugin (IntelliJ, PyCharm)
- Sublime Text package
- Atom (deprecated but some still use)

### Advanced Question Types 🎯
- Hot spot / Image map questions
- Ordering/sequencing questions
- Drag-and-drop categorization
- Audio/video response questions
- Calculated questions (formula-based)

---

## 🎯 Recommended Next Steps

**For a Team of One:**

### Week 1-2: Immediate Wins
1. ✅ Fix validator bugs (v0.6.7)
2. 📸 Canvas screenshots documentation
3. 🎲 Answer randomization
4. 🪝 Quarto post-render automation

### Month 1: Polish & UX
5. 📍 Line numbers in error messages
6. 🎓 Enhanced Canvas emulator
7. 🔒 Validation strictness levels

### Month 2: Documentation & Workflow
8. 📚 Question bank/item bank tutorial
9. 📦 QTI 2.1 integration
10. 🎨 Template generator

### Month 3+: Community & Expansion
11. 📥 Moodle XML import (if requested)
12. 🏷️ Question metadata/tagging (if requested)
13. 🌐 Web UI prototype (if time/interest)

---

## 📈 Success Metrics

**How do we measure success?**

### Quantitative
- GitHub stars / npm downloads / Homebrew installs
- Test coverage % (currently 96%)
- Canvas import success rate (estimated 98%)
- Issue resolution time (median)
- Documentation page views

### Qualitative
- User testimonials / case studies
- Instructor adoption at universities
- Community contributions (PRs, issues, discussions)
- Mentions in academic papers / course syllabi
- "examark" becoming a verb 😊

**Current Stats (Dec 2025)**:
- ⭐ Tests: 249 (96% passing)
- 📦 npm: examark@0.6.6
- 🍺 Homebrew: data-wise/tap/examark
- 📚 Docs: https://data-wise.github.io/examark/
- 🎓 Primary users: Statistics instructors

---

## 💡 Design Principles

As we build, maintain these principles:

1. **Markdown First**: Plain text is the interface, not a GUI
2. **Quarto Native**: Statistics instructors are primary users
3. **Canvas Compatible**: QTI must import cleanly every time
4. **Well Tested**: Every feature needs comprehensive tests
5. **Documented**: If not documented, it doesn't exist
6. **Backward Compatible**: Never break existing exams
7. **Open Source**: Community-driven, transparent development
8. **Simple Over Feature-Rich**: Do fewer things, do them well

---

## 🤝 How to Contribute

**Ways to Help**:

1. **Use It**: Try examark with real course materials
2. **Report Bugs**: Open issues with reproducible examples
3. **Contribute Examples**: Submit example exams to `examples/`
4. **Write Docs**: Tutorials, how-tos, case studies
5. **Code Features**: Pick from roadmap, submit PR
6. **Spread the Word**: Tell colleagues, blog about it

**Good First Issues**:
- Add more type marker aliases
- Improve error messages
- Write additional tests
- Canvas screenshot documentation
- Translate docs to other languages

---

## 🔮 Vision: Examark in 2026

**Where could we be in 1 year?**

- **Adoption**: The default tool for Quarto-based assessments in statistics education
- **Ecosystem**: Extensions, plugins, community question libraries
- **Multi-Platform**: Canvas, Moodle, and at least one other LMS
- **Tooling**: CLI (mature), web UI (beta), IDE extension (VS Code)
- **Community**: 100+ contributors, 1,000+ active users, 10,000+ exams created
- **Reputation**: Featured in university teaching workshops, cited in ed-tech papers

**Stretch Goal**: "examark" becomes a verb
- "I examarked my final today"
- "Don't forget to examark before Friday"
- "Just examark it and upload"

---

## 📝 Discussion Topics

**Open Questions for Community Input**:

1. **Priority**: QTI 2.1 integration vs Moodle XML import?
2. **Web UI**: Worth the maintenance burden? Hosted where?
3. **Question Banks**: How to handle community contributions? Licensing?
4. **Versioning**: How to handle breaking changes? Semver strict?
5. **AI Generation**: Ethical considerations? Quality control?
6. **Commercial Model**: Keep 100% free, or premium features?

**Feedback Channels**:
- GitHub Issues: Bug reports, feature requests
- GitHub Discussions: Open-ended questions, ideas
- Email: For private/sensitive topics
- Office Hours: (TBD) Live Q&A sessions

---

## 📅 Milestones

### v0.6.7 (Week 1) - Bug Fix Release
- Fix validator XML parser
- Fix HTML div parsing
- All tests passing

### v0.7.0 (Week 2-3) - Quick Wins
- Canvas screenshots
- Answer randomization
- Numeric ranges
- Quarto automation

### v0.7.1 (Month 1) - Enhanced Validation
- Line numbers in errors
- Enhanced emulator
- Validation levels

### v0.8.0 (Month 2) - Workflow Improvements
- Question bank guide
- QTI 2.1 support
- Weighting/partial credit
- Template generator

### v0.9.0 (Month 3) - Interoperability
- Moodle XML import
- Question metadata
- Batch operations

### v1.0.0 (Month 4-6) - Major Release
- Stable API
- Feature complete
- Production ready
- Celebration! 🎉

---

**Last Updated**: December 11, 2025
**Next Review**: January 2026

**End of Roadmap**
