#!/bin/sh
set -e

MARKER="/var/www/storage/app/.docker-db-initialized"

echo "Waiting for MySQL..."
attempt=0
max_attempts=30

until php artisan db:show > /dev/null 2>&1; do
    attempt=$((attempt + 1))
    if [ "$attempt" -ge "$max_attempts" ]; then
        echo "MySQL did not become ready in time."
        exit 1
    fi
    sleep 2
done

if [ ! -f "$MARKER" ]; then
    echo "First start: resetting ephemeral database..."
    php artisan migrate:fresh --seed --force
    touch "$MARKER"
    echo "Database ready."
else
    echo "Database already initialized, skipping migrate:fresh --seed."
fi
