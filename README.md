# Projeto (README temporário)

PHP 8.2.29 (cli)
Laravel 12.25.0
mysql 8.0.43
react 19.1.1
node 20.19.4
npm 10.8.2

Aviso rápido
- Este é um README simples e temporário com passos mínimos para subir a aplicação localmente.
- Presumo que você esteja usando Docker / Docker Compose para backend, banco e frontend.

Pré-requisitos
- Docker Desktop 4.44.3
- Docker version 28.3.2
- Docker Compose version v2.39.1-desktop.1

Passos rápidos
1. Subir containers
```bash
docker compose up -d --build
```

2. Verificar containers em execução
```bash
docker compose ps
```

3. Entrar no container do backend e rodar ajustes iniciais
```bash
# abrir um shell no container do backend
docker compose exec backend bash

# dentro do container (ou rodar diretamente com docker compose exec):
composer install
php artisan key:generate
php artisan jwt:secret  # tymon/jwt-auth
php artisan migrate --seed   # migrar e popular com seed (remova --seed se não quiser)
```

4. Frontend
```bash
# instalar dependências e rodar em modo dev (tem que mudar a porta pois esta na 3000!!)
docker compose exec frontend sh -c "npm run dev"
```

Como acessar
- Ajuste as portas conforme seu docker-compose.yml
- Backend API: http://localhost:8000/api
- Frontend: http://localhost:3000

- Parar e remover containers:
```bash
docker compose down
```

- Parar rodar individualmente ou restart:
```bash
docker compose start [nome_arquivo]
docker compose restart [nome_arquivo]
```
