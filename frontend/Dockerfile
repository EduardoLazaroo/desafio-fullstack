FROM node:20-alpine

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o restante do código
COPY . .

EXPOSE 3000

# Rodar em modo dev, acessível de fora do container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
