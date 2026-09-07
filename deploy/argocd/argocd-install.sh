#!/usr/bin/env bash
set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)"
RELEASE="argocd"

if [[ -f "$DIR/.env" ]]; then
  set -a
  source "$DIR/.env"
  set +a
fi

NAMESPACE="${ARGOCD_NAMESPACE:-argocd}"

if [[ -z "${GITHUB_TOKEN:-}" ]]; then
  read -rsp "GitHub PAT (repo): " GITHUB_TOKEN
  echo
fi

echo "Adding Argo CD repository..."
helm repo add argo https://argoproj.github.io/argo-helm 2>/dev/null || true
echo ""

echo "Upgrading Argo CD..."

helm upgrade --install "$RELEASE" argo/argo-cd \
  -n "$NAMESPACE" \
  --create-namespace \
  -f "$DIR/argo-cd-values.yaml"

SECRET_NAME="argocd-notifications-secret"

kubectl patch secret "$SECRET_NAME" -n "$NAMESPACE" \
  --type merge \
  -p "{\"stringData\":{\"github-token\":\"${GITHUB_TOKEN}\"}}"

kubectl apply -f "$DIR/applicationset-previews.yaml"

echo ""
echo "Argo CD ready in ${NAMESPACE}."
