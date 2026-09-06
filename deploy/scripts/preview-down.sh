#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: preview-down.sh PR_NUMBER"
  exit 1
fi

PR="$1"
NS="eventix-pr-${PR}"
RELEASE="eventix-pr-${PR}"

echo "Removing preview ${RELEASE}..."
helm uninstall "$RELEASE" --namespace "$NS" 2>/dev/null || true
kubectl delete namespace "$NS" --ignore-not-found --wait=false

echo "Preview ${PR} removed."
