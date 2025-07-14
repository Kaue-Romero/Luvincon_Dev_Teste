FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www/html

# Install dependencies
RUN apt-get update && apt-get install -y \
    git gosu curl zip unzip libpng-dev libonig-dev libxml2-dev \
    libzip-dev libcurl4-openssl-dev libssl-dev gnupg ca-certificates \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl bcmath

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Install Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Copia os arquivos do projeto Laravel para dentro da imagem
COPY . .

# Copia o script de entrypoint
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["php-fpm"]
