#--- Stage: Composer install
FROM composer:2.7.7 as vendor
WORKDIR /app

COPY composer.json composer.lock ./ 

RUN composer install \
    --no-interaction \
    --no-plugins \
    --no-scripts \
    --prefer-dist \
    --no-autoloader


#--- Stage: Build the frontend assets ---
FROM node:20.18.0-slim as frontend
WORKDIR /app

COPY package*.json ./
RUN npm install

# Copia solo el archivo Ziggy necesario desde la capa vendor
COPY --from=vendor /app/vendor/tightenco/ziggy/src/js ./vendor/tightenco/ziggy/src/js
COPY vite.config.js tailwind.config.mjs postcss.config.js ./
COPY public ./public
COPY resources ./resources

RUN npm run build


#--- Stage: Final --- 
FROM php:8.3-fpm-alpine
ENV DEBIAN_FRONTEND=noninteractive

RUN apk add --no-cache \
    nginx \
    freetype \
    freetype-dev \
    zip \
    bash \
    vim \
    curl \
    $PHPIZE_DEPS

    
# Configurar PHP y extensiones
RUN docker-php-ext-install mysqli pdo pdo_mysql opcache

# Configurar PHP-FPM y Nginx
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
COPY deploy/files/php.ini "$PHP_INI_DIR/conf.d/z-custom.ini"
COPY deploy/files/php-fpm.conf "$PHP_INI_DIR/../php-fpm.d/z-www.cof"
COPY deploy/files/nginx.conf /etc/nginx/nginx.conf

WORKDIR /var/www/

COPY --chown=www-data --from=frontend /app/public/ ./public/
COPY --chown=www-data --from=vendor /app/vendor/ ./vendor/
COPY --chown=www-data --from=vendor /usr/bin/composer /usr/bin/composer
COPY --chown=www-data . .
RUN cp .env.example .env

RUN composer dump-autoload \
    && php artisan storage:link

# Agregar el script de entrada
COPY deploy/files/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Comando para iniciar Nginx, PHP-FPM, Scheduler y Queue
CMD ["sh", "/usr/local/bin/entrypoint.sh"]
