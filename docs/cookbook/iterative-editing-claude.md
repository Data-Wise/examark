# Iterative Editing with Claude Code

> **TL;DR** Use Claude's auto-lint hook to iteratively improve exam questions with instant feedback.

**5 minutes** | Beginner | Claude Code

---

## Problem

You have an exam draft but want to refine it -- fix formatting issues, improve distractors, add feedback, or adjust difficulty -- with instant validation at each step.

## Solution

The workflow is a simple loop: ask Claude to edit, auto-lint runs, review, repeat.

### 1. Ask Claude to edit

Tell Claude what you want to change:

```
Add inline feedback to questions 3-5 explaining why each option is right or wrong
```

### 2. Auto-lint runs automatically

After every Edit or Write to an exam `.md` file, the PostToolUse hook runs `examark check` and shows any issues.

### 3. Review and repeat

If lint reports problems, Claude can fix them in the next edit. Keep iterating until the output is clean.

### Common editing requests

- `"Add // inline feedback to all MC questions"`
- `"Convert questions 3 and 4 from MC to MA (select all that apply)"`
- `"Add = answer variants for the short answer questions"`
- `"Change all questions to 3pts each"`
- `"Add a matching question about regression terminology"`
- `"Add > [feedback] general feedback to questions 1-5"`
- `"Make the distractors more plausible for question 2"`
- `"Reorder the answer options so the correct answer isn't always (b)"`

### Manual checks

Run these anytime for on-demand validation:

```
/exam:check exam.md
```

```
/exam:preview exam.md
```

## Explanation

- Auto-lint filters smartly: it only runs on exam `.md` files by checking filename patterns, directory context, and file content.
- The hook is **informational** -- it shows warnings but does not prevent edits from being saved.
- `/exam:check` runs a full lint pass including missing answers, duplicate IDs, empty stems, and unsupported syntax.
- `/exam:preview` shows a formatted summary table so you can quickly scan question types, point values, and stems without reading the raw markdown.

## See Also

- [Generate an Exam with Claude](generate-exam-claude.md) -- create an exam from scratch
- [Fix Import Errors](fix-import-errors.md) -- troubleshoot Canvas import failures
- [Short Answer Variants](short-answer-variants.md) -- adding `= answer` alternatives
