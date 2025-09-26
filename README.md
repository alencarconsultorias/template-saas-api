# template-saas-api

## ⚙️ Configuração do Ambiente 
1. Identificar o arquivo `docker-compose.yml` no projeto. 
2. Instalar o docker e subir o compose: 
```bash
# simulacao local de um banco de dados PostgreSQL 
docker-compose up -d 
```
3. Apos instalacao, identificar o container criado: 
```bash
docker ps 
```
4. Conferir instalação correta do docker-compose para teste localhost: 
```bash 
psql -h localhost -p 5433 -U admin -d tsaas_localhost_db 
```
5. Script para rodar o ambiente em localhost com a variavel de ambiente `.env.localhost.dev`: 
```bash
npm run start:dev 
``` 
Dica caso precise derrubar o serviço e/ou volume: 
```bash
docker-compose down #all services
docker-compose down -v #all volumes
```

🚨 Atenção: caso ja possua a variavel de ambiente `.env.aws` execute o script: 
```bash
npm run start:aws
```

## 📄 Confluence  
Acesse o hub da empresa para identificar documentaçōes tecnicas do projeto [Hub no Confluence](https://alencar-consultorias.atlassian.net/wiki/company-hub)

## 🚩 Contribuindo
Consulte o arquivo [CONTRIBUTING.md](/docs-org/CONTRIBUTING.md) para instruções.

## ❤️ Código de Conduta
Ao interagir, siga nosso [Code of Conduct](/docs-org/CODE_OF_CONDUCT.md).

⚠️ Este projeto está licenciado sob uma Licença Proprietária. Para mais detalhes, consulte o arquivo [Clique aqui](LICENSE.txt).
