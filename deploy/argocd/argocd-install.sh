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

require_var() {
  if [[ -z "${!1:-}" ]]; then
    echo "Missing $1 (set in deploy/argocd/.env)" >&2
    exit 1
  fi
}

require_var GITHUB_APP_ID
require_var GITHUB_APP_INSTALLATION_ID
require_var GITHUB_APP_PRIVATE_KEY_PATH

if [[ "$GITHUB_APP_PRIVATE_KEY_PATH" != /* ]]; then
  GITHUB_APP_PRIVATE_KEY_PATH="$DIR/$GITHUB_APP_PRIVATE_KEY_PATH"
fi

if [[ ! -f "$GITHUB_APP_PRIVATE_KEY_PATH" ]]; then
  echo "Private key not found: $GITHUB_APP_PRIVATE_KEY_PATH" >&2
  exit 1
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

kubectl create secret generic "$SECRET_NAME" \
  -n "$NAMESPACE" \
  --from-literal=githubAppID="$GITHUB_APP_ID" \
  --from-literal=githubAppInstallationID="$GITHUB_APP_INSTALLATION_ID" \
  --from-file=githubAppPrivateKey="$GITHUB_APP_PRIVATE_KEY_PATH" \
  --dry-run=client -o yaml \
  | kubectl apply -f -

kubectl apply -f "$DIR/applicationset-previews.yaml"
kubectl apply -f "$DIR/application-main.yaml"

echo ""
echo "Argo CD ready in ${NAMESPACE}."
