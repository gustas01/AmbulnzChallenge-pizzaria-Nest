<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Sobre
Projeto desenvolvido e testado como parte de um challenge de uma vaga na AmbulnzLLC, que se trata de um mini sistema monolítico backend de uma pizzaria.

## Principais tecnologias utilizadas
* NestJS (Node)
* Typescript
* TypeORM
* PostgreSQL
* Jest (para testes)

## Como executar
1º passo - Crie um arquivo na raiz do projeto chamado `.env` e coloque o conteúdo abaixo, e coloque todos os valores das variáveis de ambiente requisitada logo após o sinal de igualdade:
```bash
# A chave de segurança que será usada para gerar/verificar o token JWT de acesso de usuário
JWT_SECRET_KEY=

# O tempo de expiração do token JWT - ex: 7d, 1h, 10s
JWT_EXPIRATION_DATE=

# A porta em que a aplicação estará ouvindo as requisições
APP_PORT=


#  O local onde o banco de dados está hospedado. Caso seja no mesmo servidor onde a aplição está rodando, use 'localhost'
DB_HOST=

# A porta para conexão com o banco de dados
DB_PORT=

# O usuário para conexão com o banco
DB_USERNAME=

# A senha para conexão com o banco
DB_PASSWORD=

# O nome do banco de dados
DB_DATABASE=
```

2º passo - Com o terminal aberto na raiz do projeto, execute o comando `npm install` para que todas as dependências sejam baixadas. <br><br>
3º passo - No mesmo terminal, execute `npm run start:dev`para que o projeto seja executado em modos de desenvolvimento.

## Testes
Para os testes crie um arquivo também na raiz chamado `.env.test` e coloque o mesmo conteúdo do `.env` acima, e preencha os outros campos com os dados do BANCO DE TESTE.
E para rodar os testes, execute os comando abaixo:
```bash
# Testes unitários
$ npm run test

# Testes e2e
$ npm run test:e2e
```
