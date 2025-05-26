# Imagem base
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

# Copie os arquivos do projeto
COPY package*.json ./
RUN npm install

COPY . .

# Compile (se necessário)
RUN npm run build

# Exponha a porta usada pela sua API
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:aws"]
