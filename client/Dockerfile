# Etapa de build
FROM node:18 AS builder

WORKDIR /app

# Instalar dependências
COPY package.json yarn.lock ./
RUN yarn install

# Copiar o código-fonte e o .env
COPY . .
COPY .env.local .env.local

# Build do projeto
RUN yarn build

# Etapa de produção
FROM node:18

WORKDIR /app

# Copiar arquivos do build e o .env
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env.local ./

# Expor a porta e iniciar a aplicação
EXPOSE 3000
CMD ["yarn", "start"]