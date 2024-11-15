#--- Stage: Composer install
FROM composer:2.7.7 as vendor
WORKDIR /app

COPY composer.json composer.lock ./ 

RUN composer install \
    #--ignore-platform-reqs \
    --no-interaction \
    --no-plugins \
    --no-scripts \
 #   --no-dev \   
    --prefer-dist \
    --no-autoloader


#--- Stage: Build the frontend assets ---
FROM node:20.18.0-slim as frontend
WORKDIR /app

COPY package*.json ./
RUN npm install

# Copia solo el archivo Ziggy necesario desde la capa vendor
COPY --from=vendor /app/vendor/tightenco/ziggy/src/js ./vendor/tightenco/ziggy/src/js

# Compila los assets del frontend
COPY .env vite.config.js tailwind.config.js postcss.config.js ./
COPY public ./public
COPY resources ./resources
RUN npm run build
#--- Stage end ---


FROM php:8.3-fpm-alpine
ENV DEBIAN_FRONTEND=noninteractive

RUN apk add --no-cache \
    freetype \
    freetype-dev \
    zip \
    bash \
    vim \
    curl \
    $PHPIZE_DEPS

#RUN pecl install xdebug
#RUN docker-php-ext-configure zip
RUN docker-php-ext-install mysqli pdo pdo_mysql opcache
#RUN docker-php-ext-enable xdebug

# Add config custom for php-fpm
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
COPY deploy/files/php.ini "$PHP_INI_DIR/conf.d/z-custom.ini"
COPY deploy/files/php-fpm.conf "$PHP_INI_DIR/../php-fpm.d/z-www.cof"

# Nos movemos a /var/www/
WORKDIR /var/www/
RUN chown www-data:www-data .
USER www-data

# Copiamos los archivos a /var/www/
COPY --chown=www-data --from=frontend app/public/ ./public/
COPY --chown=www-data --from=vendor app/vendor/ ./vendor/
COPY --chown=www-data --from=vendor /usr/bin/composer /usr/bin/composer
COPY --chown=www-data . .

RUN composer dump-autoload \
    && php artisan storage:link
    #&& php artisan test --coverage-html coverage 
