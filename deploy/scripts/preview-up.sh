#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: preview-up.sh PR_NUMBER [--skip-build]"
  exit 1
fi

PR="$1"
SKIP_BUILD=false
if [[ "${2:-}" == "--skip-build" ]]; then
  SKIP_BUILD=true
fi

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
CHART="$ROOT/deploy/helm"
DOCKERFILE="$ROOT/deploy/Dockerfile"

RELEASE="eventix-pr-${PR}"
IMAGE="rdzpedraos/eventix:pr-${PR}"

APP_KEY="base64:$(openssl rand -base64 32)"
DB_PASSWORD="$(openssl rand -hex 16)"

if [[ "$SKIP_BUILD" == false ]]; then
  echo "Building ${IMAGE}..."
  docker build -t "$IMAGE" -f "$DOCKERFILE" "$ROOT"
  echo "Loading image..."
  minikube image load "$IMAGE"
fi

echo "Deploying ${RELEASE} to its own namespace..."
helm upgrade --install "$RELEASE" "$CHART" \
  --namespace "$RELEASE" \
  --create-namespace \
  -f "$CHART/values.yaml" \
  -f "$CHART/values-preview.yaml" \
  --set "pr.number=${PR}" \
  --set "image.tag=pr-${PR}" \
  --set "secrets.APP_KEY=${APP_KEY}" \
  --set "secrets.DB_PASSWORD=${DB_PASSWORD}" \
  --wait \
  --timeout 10m

NODE_IP="$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[0].address}' 2>/dev/null || true)"
INGRESS_HOST="pr-${PR}.eventix.local"

echo ""
echo "Preview ready: http://${INGRESS_HOST}"
if [[ -n "$NODE_IP" ]]; then
  echo "Add to /etc/hosts: ${NODE_IP} ${INGRESS_HOST}"
fi
