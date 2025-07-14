<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# 🛍️ Vitrine de Produtos – Laravel + React + Inertia

Uma aplicação web moderna que exibe uma **vitrine de produtos** e permite a **simulação de compras com envio de pedido**, construída com tecnologias de ponta e pensada para uma ótima experiência do usuário.

---

## 🚀 Tecnologias Utilizadas

- ⚙️ **Laravel** – backend robusto e rápido  
- ⚛️ **React** – frontend moderno e reativo  
- 🔗 **Inertia.js** – integração fluida entre Laravel e React  
- 🐳 **Docker** – ambiente padronizado e fácil de subir  
- ✅ **Testes Automatizados** – garantia de qualidade  
- ✨ **Flash Messages** – feedback visual para ações do usuário  

---

## 📸 Funcionalidades

- Listagem de produtos em uma vitrine elegante  
- Simulação de compra com preenchimento de dados  
- Envio de pedido (sem pagamento real)  
- Feedback visual com flash messages (UX aprimorado)  
- Testes automatizados para manter a confiabilidade  

---

## 🧪 Como rodar localmente

Com Docker configurado, é muito simples:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
cp .env.example .env
docker-compose up -d --build
```

Acesse: [http://localhost](http://localhost)

---

## 🛠️ Comandos úteis

```bash
# Instalar dependências (caso necessário dentro do container)
docker exec -it laravel-app composer install
docker exec -it laravel-app npm install && npm run build

# Rodar testes
docker exec -it laravel-app php artisan test
```

---

## 📂 Estrutura do Projeto

```
├── app/                    # Código backend Laravel
├── resources/js/Pages/     # Páginas React via Inertia
├── tests/                  # Testes automatizados
├── docker/                 # Configurações de Docker
├── public/                 # Arquivos acessíveis publicamente
└── ...
```

---

## ✅ Requisitos

- Docker e Docker Compose  
- Porta 80 e 5173 livres (NGINX + Vite)  
- Permissões corretas para `storage/` e `bootstrap/cache`  

---

## 🤝 Contribuição

Sinta-se à vontade para abrir issues ou pull requests. Toda sugestão é bem-vinda!

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Feito com 💙 usando Laravel + React.
