#!/bin/bash
# Quarto Post-Render Hook for Automatic QTI Generation
#
# Add this to your project's _quarto.yml:
#
#   project:
#     post-render: _quarto-post-render.sh
#
# Or to a specific document's YAML:
#
#   post-render: _quarto-post-render.sh
#

set -e

# Get the rendered file from Quarto
RENDERED_FILE="$QUARTO_PROJECT_OUTPUT_FILES"

# Check if it's a markdown file
if [[ "$RENDERED_FILE" == *.md ]]; then
  BASE="${RENDERED_FILE%.md}"
  QTI_FILE="${BASE}.qti.zip"

  echo ""
  echo "📦 Generating QTI package..."

  # Try to find examark
  if command -v examark &> /dev/null; then
    examark "$RENDERED_FILE" -o "$QTI_FILE"
    echo "✅ QTI package ready: $QTI_FILE"
  elif [ -f "dist/index.js" ]; then
    # Development mode
    node dist/index.js "$RENDERED_FILE" -o "$QTI_FILE"
    echo "✅ QTI package ready: $QTI_FILE"
  else
    echo "⚠️  examark not found. Install with: npm install -g examark"
    echo "   Or run manually: examark $RENDERED_FILE -o $QTI_FILE"
  fi
  echo ""
fi
