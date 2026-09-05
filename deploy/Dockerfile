#--- Stage: Build frontend assets ---
FROM node:20.18.0-slim AS frontend

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY vite.config.js tailwind.config.mjs postcss.config.js tsconfig.json ./
COPY public ./public
COPY resources ./resources

RUN npm run build


#--- Stage: Composer install ---
FROM composer:2.7.7 AS vendor

WORKDIR /app

COPY composer.json composer.lock ./

RUN composer install \
    --no-interaction \
    --no-plugins \
    --no-scripts \
    --prefer-dist \
    --no-autoloader \
    --ignore-platform-req=ext-gd


#--- PHP-FPM application (final image) ---
FROM php:8.3-fpm-alpine

RUN apk add --no-cache \
    zip \
    bash \
    curl \
    icu-dev \
    $PHPIZE_DEPS \
    && docker-php-ext-install pdo pdo_mysql opcache intl

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
COPY deploy/files/php.ini "$PHP_INI_DIR/conf.d/z-custom.ini"
COPY deploy/files/php-fpm.conf "$PHP_INI_DIR/../php-fpm.d/z-www.conf"

WORKDIR /var/www/

COPY --chown=www-data --from=vendor /app/vendor/ ./vendor/
COPY --chown=www-data --from=vendor /usr/bin/composer /usr/bin/composer
COPY --chown=www-data --from=frontend /app/public ./public
COPY --chown=www-data . .

RUN composer dump-autoload \
    && php artisan storage:link \
    && mkdir -p storage/app \
    && chown -R www-data:www-data storage

EXPOSE 9000

CMD ["php-fpm", "-F"]
