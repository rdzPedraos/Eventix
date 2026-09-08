#!/usr/bin/env bash
set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)"

if [[ -f "$DIR/.env" ]]; then
  set -a
  source "$DIR/.env"
  set +a
fi

require_var() {
  if [[ -z "${!1:-}" ]]; then
    echo "Missing $1 (set in deploy/argocd/.env)" >&2
    exit 1
  fi
}

######################################
echo ""
echo "### INSTALLING EXTERNAL SECRETS ###"

require_var AWS_ACCESS_KEY_ID
require_var AWS_SECRET_ACCESS_KEY

EXT_SECRETS="external-secrets"

helm repo add $EXT_SECRETS https://charts.external-secrets.io 2>/dev/null || true

helm upgrade --install "$EXT_SECRETS" $EXT_SECRETS/external-secrets \
  -n "$EXT_SECRETS" \
  --create-namespace \
  --wait

kubectl create secret generic awssm-secret \
  -n "$EXT_SECRETS" \
  --from-literal=access-key="$AWS_ACCESS_KEY_ID" \
  --from-literal=secret-access-key="$AWS_SECRET_ACCESS_KEY" \
  --dry-run=client -o yaml \
  | kubectl apply -f -

kubectl apply -f "$DIR/$EXT_SECRETS"

######################################
echo ""
echo "### INSTALLING ARGO CD ###"

ARGOCD="argocd"

helm repo add $ARGOCD https://argoproj.github.io/argo-helm 2>/dev/null || true

helm upgrade --install $ARGOCD $ARGOCD/argo-cd \
  -n $ARGOCD \
  --create-namespace \
  -f "$DIR/$ARGOCD/values.yaml" \
  --wait

kubectl apply -f "$DIR/$ARGOCD/manifest"

echo "All resource were installed successfully."
