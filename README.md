# meuFilme.io

![PHP](https://img.shields.io/badge/PHP-8.2.29-blue)
![Laravel](https://img.shields.io/badge/Laravel-12.25.0-red)
![MySQL](https://img.shields.io/badge/MySQL-8.0.43-blue)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![Node](https://img.shields.io/badge/Node-20.19.4-green)
![npm](https://img.shields.io/badge/npm-10.8.2-red)
![Docker](https://img.shields.io/badge/Docker-informational?style=flat&logo=docker)
![Vitest](https://img.shields.io/badge/Vitest-passed-brightgreen)

---

## Aviso rápido
> Este é um README, com passos mínimos para subir a aplicação localmente e realizar testes.  
> Presumo que você esteja usando Docker / Docker Compose para backend, banco e frontend.

---

## Pré-requisitos
- Docker Desktop 4.44.3  
- Docker version 28.3.2  
- Docker Compose version v2.39.1-desktop.1  

---

## 1. Passos rápidos

### Subir os containers
```bash
docker compose up -d --build
```

### Parar e remover containers:
```bash
docker compose down
```

### Parar rodar individualmente ou restart:
```bash
docker compose start [nome_arquivo]
docker compose restart [nome_arquivo]
```

### Verificar containers em execução
```bash
docker compose ps
```

---


## 2. Backend
```bash
# Abrir um shell no container do backend
docker exec -it laravel_app sh

# Dentro do container (ou rodar diretamente com docker compose exec):
composer install
php artisan key:generate
php artisan jwt:secret  # tymon/jwt-auth

# Configurar no .env
JWT_ALGO=HS256

# Migrar banco e popular com seed
php artisan migrate --seed   # remova --seed se não quiser

# Usuário de teste:
# email: jacto@jacto
# password: jactoo (6 caracteres)

```

---


## 3. Frontend
```bash
# Frontend via docker
docker compose start frontend

# Instalar dependencias
docker compose exec frontend npm install
```

---


## 4. Como acessar
- Backend API: http://localhost:8000/api
- Frontend: http://localhost:3000
- Ajuste as portas conforme seu docker-compose.yml caso necessário


---


## 5. Testes unitários
```bash
# Antes de rodar os testes, inicie os containers:
docker compose up -d --build
```

- 5.1 Frontend
```bash
# jsdom, redux-mock-store, vitest.
docker compose exec frontend npm run test
```

- 5.2 Backend
```bash
# PHPUnit - Unit e Feature
docker exec -it laravel_app php artisan test
```