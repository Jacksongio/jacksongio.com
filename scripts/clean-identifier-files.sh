#!/usr/bin/env bash
# Remove Windows "Mark of the Web" sidecar files (*Zone.Identifier, *.Identifier).
# Skips node_modules and .git when walking the tree.

set -euo pipefail

usage() {
  echo "Usage: $(basename "$0") [--dry-run] [DIR]"
  echo "  DIR defaults to the current directory."
  echo "  --dry-run  List files only; do not delete."
  exit "${1:-0}"
}

DRY_RUN=0
DIR="."

while [[ $# -gt 0 ]]; do
  case "$1" in
    -n | --dry-run) DRY_RUN=1; shift ;;
    -h | --help) usage 0 ;;
    -*)
      echo "Unknown option: $1" >&2
      usage 1
      ;;
    *)
      DIR="$1"
      shift
      ;;
  esac
done

if [[ ! -d "$DIR" ]]; then
  echo "Not a directory: $DIR" >&2
  exit 1
fi

count=0
while IFS= read -r f; do
  [[ -z "$f" ]] && continue
  count=$((count + 1))
  printf '%s\n' "$f"
  if [[ "$DRY_RUN" -eq 0 ]]; then
    rm -f -- "$f"
  fi
done < <(
  find "$DIR" \( -name node_modules -o -name .git \) -prune -o \
    -type f -name '*.Identifier' -print
)

if [[ "$count" -eq 0 ]]; then
  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "No *.Identifier files found under: $DIR"
  else
    echo "No *.Identifier files to remove under: $DIR"
  fi
  exit 0
fi

if [[ "$DRY_RUN" -eq 1 ]]; then
  echo "Dry run: $count file(s) listed (not deleted)."
else
  echo "Removed $count file(s)."
fi
