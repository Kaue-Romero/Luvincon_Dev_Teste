#!/bin/bash
set -e

# Ajusta permissões
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Garante que .env existe
if [ ! -f .env ]; then
  echo "Arquivo .env não encontrado. Copiando de .env.example..."
  cp .env.example .env
fi

# Instala dependências PHP
if [ ! -d "vendor" ]; then
  echo "Instalando dependências PHP (composer install)..."
  composer install
  composer dump-autoload
fi

# Instala dependências Node
if [ -f "package.json" ] && [ ! -d "node_modules" ]; then
  echo "Instalando dependências JS (npm install)..."
  npm install
fi
npm run build

# Verifica se Vite gerou o manifest.json
if [ ! -f "public/build/manifest.json" ]; then
  echo "Erro: Vite não gerou public/build/manifest.json"
  exit 1
fi

# Gera APP_KEY se estiver vazio
if [ -z "$(grep ^APP_KEY= .env | cut -d '=' -f2-)" ]; then
  echo "Gerando APP_KEY..."
  gosu www-data php artisan key:generate --force
fi

# Executa as migrations
gosu www-data php artisan migrate --force

# Roda comando principal
exec "$@"
