#!/usr/bin/env bash
# simple load test against the web pods.
#   ./load-test.sh
#   ./load-test.sh http://pr-6.eventix.k8s.test/home eventix-pr-6

URL="${1:-http://eventix.k8s.test/home}"
NS="${2:-eventix}"
WORKERS=30
DURATION=120   # segundos

echo "Antes:"
kubectl get hpa web -n "$NS" 2>/dev/null || true
kubectl get pods -n "$NS" -l app=web

echo ""
echo "Golpeando $URL ($WORKERS workers, ${DURATION}s)..."
end=$(($(date +%s) + DURATION))

for _ in $(seq 1 "$WORKERS"); do
  (
    while (( $(date +%s) < end )); do
      curl -s -o /dev/null "$URL"
    done
  ) &
done
wait

echo ""
echo "Esperando 15s (el HPA tarda un poco en reaccionar)..."
sleep 15

echo ""
echo "Después:"
kubectl get hpa web -n "$NS" 2>/dev/null || true
kubectl get pods -n "$NS" -l app=web
