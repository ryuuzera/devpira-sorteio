# Etapa de build
FROM node:18 AS builder

WORKDIR /app

# Instalar dependências
COPY package.json yarn.lock ./
RUN yarn install
RUN yarn add sharp --ignore-engines

# Copiar o código-fonte e o .env
COPY . .
COPY .env .env

# Build do projeto
RUN yarn build

# Etapa de produção
FROM node:18

WORKDIR /app

# Copiar arquivos do build e o .env
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env ./
COPY --from=builder /app/public ./public

# Expor as portas e iniciar a aplicação
EXPOSE 3001
EXPOSE 3002
CMD ["yarn", "start"]
