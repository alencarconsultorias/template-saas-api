# template-saas-api

## ⚙️ Configuração do Ambiente 
1. Identificar o arquivo `docker-compose.yml` no projeto. 
2. Instalar o docker e subir o compose: 
```bash
docker-compose up -d 
```
3. Apos instalacao, identificar o container criado: 
```bash
docker ps 
```
4. Conferir instalação correta do docker-compose: 
```bash 
psql -h localhost -p 5433 -U admin -d tsaas_localhost_db 
```
5. Dica caso precise derrubar o serviço e/ou volume: 
```bash
docker-compose down #all services
docker-compose down -v #all volumes
```

## 🚩 Contribuindo
Consulte o arquivo [CONTRIBUTING.md](/docs-org/CONTRIBUTING.md) para instruções.

## ❤️ Código de Conduta
Ao interagir, siga nosso [Code of Conduct](/docs-org/CODE_OF_CONDUCT.md).

⚠️ Este projeto está licenciado sob uma Licença Proprietária. Para mais detalhes, consulte o arquivo [Clique aqui](LICENSE.txt).
