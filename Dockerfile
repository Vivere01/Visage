FROM node:20-alpine

WORKDIR /app

# Instala dependências do sistema para o Prisma
RUN apk add --no-cache libc6-compat

# Copia arquivos de configuração
COPY package*.json ./
COPY prisma ./prisma/

# Instala todas as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Gera o Prisma e faz o build do Next.js
RUN npx prisma generate
RUN npm run build

# Porta do app
EXPOSE 3000

# Comando para rodar
CMD ["npm", "start"]
