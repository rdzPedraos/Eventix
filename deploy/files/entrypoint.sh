#!/bin/sh

# Iniciar Nginx
nginx &

# Iniciar PHP-FPM
php-fpm &

# Iniciar Scheduler
php artisan schedule:work &

# Iniciar Queue
php artisan queue:work
