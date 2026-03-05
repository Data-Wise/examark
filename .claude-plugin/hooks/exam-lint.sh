#!/bin/bash
# exam-lint.sh — PostToolUse hook for examark plugin
# Auto-lints exam markdown files after Edit/Write operations.
# Reads JSON from stdin: { tool_name, tool_input: { file_path, ... } }
# Exits 0 always (informational only — never blocks edits).
# Lint warnings appear as system reminders to Claude.

set -euo pipefail

INPUT="$(cat)"

# Extract file_path from tool input JSON
get_file_path() {
  local json="$1"
  if command -v jq &>/dev/null; then
    printf '%s' "$json" | jq -r '.tool_input.file_path // empty' 2>/dev/null || true
  else
    printf '%s' "$json" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_input',{}).get('file_path',''))" 2>/dev/null || true
  fi
}

FILE_PATH="$(get_file_path "$INPUT")"

# Only lint markdown exam files (not .qmd, not READMEs, not docs/)
if [[ -z "$FILE_PATH" ]]; then
  exit 0
fi

# Must be a .md file
case "$FILE_PATH" in
  *.md) ;;
  *) exit 0 ;;
esac

# Skip non-exam files: docs, README, CHANGELOG, templates, skills, commands
BASENAME="$(basename "$FILE_PATH")"
case "$BASENAME" in
  README*|CHANGELOG*|CLAUDE*|CONTRIBUTING*|DESIGN*|AUDIT*|ORCHESTRATE*|MEMORY*|PROPOSAL*|ROADMAP*|RELEASE*|DELIVERY*|STATUS*)
    exit 0 ;;
esac
case "$FILE_PATH" in
  */docs/*|*/commands/*|*/skills/*|*/.claude/*|*/.claude-plugin/*|*/templates/*|*/examples/*)
    exit 0 ;;
esac

# File must exist
if [[ ! -f "$FILE_PATH" ]]; then
  exit 0
fi

# Quick heuristic: file should contain exam-like content (question markers or type markers)
if ! grep -qE '^\s*(##\s+[0-9]+\.|[0-9]+\.\s*\[)' "$FILE_PATH" 2>/dev/null; then
  exit 0
fi

# Find examark CLI
EXAMARK=""
PROJECT_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || echo "")"
if [[ -n "$PROJECT_ROOT" && -f "$PROJECT_ROOT/dist/index.js" ]]; then
  EXAMARK="node $PROJECT_ROOT/dist/index.js"
elif command -v examark &>/dev/null; then
  EXAMARK="examark"
fi

if [[ -z "$EXAMARK" ]]; then
  exit 0
fi

# Run lint (examark check) and capture output
LINT_OUTPUT=$($EXAMARK check "$FILE_PATH" 2>&1) || true

# If lint found issues, report them as a system reminder on stderr
if echo "$LINT_OUTPUT" | grep -qiE '(error|warning|issue)'; then
  echo "examark lint ($BASENAME): $LINT_OUTPUT" >&2
fi

exit 0
