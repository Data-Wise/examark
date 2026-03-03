# ORCHESTRATE: Markdown Tables → HTML Tables in QTI Generator

## Context

Canvas `mattext texttype="text/html"` only renders HTML, not markdown. When exam questions contain markdown pipe tables (e.g., ANOVA results tables), they pass through as literal text with pipe characters, causing Canvas to display garbled content or partially fail import.

**Root cause**: `escapeXmlPreserveLaTeX()` in `src/generator/qti.ts` handles images, code, LaTeX, and XML escaping — but has no markdown table conversion.

**Impact**: Any exam with markdown tables in question stems, options, or feedback will render incorrectly in Canvas.

## Implementation Plan

### Step 1: Add markdown table → HTML conversion function

**File**: `src/generator/qti.ts`

Add a new function `convertMarkdownTablesToHtml(text: string): string` that:

1. Detects markdown table patterns: lines with `|` separators and a `|---|` divider row
2. Parses header row, divider (for alignment), and body rows
3. Generates `<table><thead><tr><th>...</th></tr></thead><tbody><tr><td>...</td></tr></tbody></table>`
4. Preserves LaTeX and other content within cells (tables may contain `$...$`, `\(...\)`, etc.)
5. Handles alignment from divider row (`:---`, `:---:`, `---:`)

**Key regex pattern**:
```
Lines matching: ^\|(.+)\|$
With a divider row: ^\|[\s:]*-+[\s:]*(\|[\s:]*-+[\s:]*)*\|$
```

### Step 2: Integrate into escapeXmlPreserveLaTeX

**File**: `src/generator/qti.ts`

Call `convertMarkdownTablesToHtml()` **before** the XML escaping step in `escapeXmlPreserveLaTeX()`, after image/code placeholder extraction but before LaTeX conversion. This ensures:
- Table cell content still gets LaTeX conversion
- HTML `<table>` tags are preserved (like `<img>` and `<code>` tags already are)

Use placeholder pattern (like images/code) to protect `<table>` HTML from XML escaping.

### Step 3: Add tests

**File**: `tests/generator.test.ts`

Add tests for:
1. Simple 2-column table converts to HTML
2. Table with LaTeX in cells preserves math
3. Table with alignment (`:---:`) generates correct `style` or `align` attributes
4. Multiple tables in one stem both convert
5. Non-table pipe characters (e.g., `|` in LaTeX `\|`) are not falsely matched
6. ANOVA results table (real-world case from Q41)

### Step 4: Add fixture and integration test

**File**: `tests/fixtures/` — add a question with a markdown table
**File**: `tests/generator.test.ts` — end-to-end: parse MD with table → generate QTI → verify HTML table in output

### Step 5: Update CLAUDE.md

Add to "Where to Look" table:
- `Convert markdown tables` → `src/generator/qti.ts:convertMarkdownTablesToHtml()`

## Verification

```bash
npm run build
npm test
# Also test with the practice exam:
node dist/index.js exam/practice-exam1-questions.md --preview  # verify parsing
node dist/index.js exam/practice-exam1-questions.md -o /tmp/test.qti.zip -v  # verify generation
```

## Files to Modify

| File | Change |
|------|--------|
| `src/generator/qti.ts` | Add `convertMarkdownTablesToHtml()`, integrate into `escapeXmlPreserveLaTeX()` |
| `tests/generator.test.ts` | Add table conversion tests |
| `CLAUDE.md` | Update "Where to Look" |

## Edge Cases

- Tables with empty cells: `| | value |`
- Tables with LaTeX: `| $\mu$ | $\sigma^2$ |`
- Tables with inline code: `| `mean()` | `sd()` |`
- Single-column tables (degenerate case — skip conversion)
- Pipe chars in LaTeX (`\|`, `\lvert`) — must not trigger table detection
