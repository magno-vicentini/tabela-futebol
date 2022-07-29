
## Esse projeto foi desenvolvido em:

Aplicação dockerizada em `Node.js + Typescript` usando o pacote `sequelize` utilizando os principios SOLID.


### Para utilizar o repositório

1. Clone o repositório
  * `https://github.com/magno-vicentini/tabela-futebol`.
  * Entre na pasta do repositório que você acabou de clonar

2. Instale as dependências 
  * `npm install`

3. Testando localmente
  - Utilize os scripts de apoio `npm run compose:up` / `npm run compose:down`, para facilitar a execução do seu *compose*.


#### Variáveis:

Configure seu .env para executar o projeto

```
PORT=3004
DB_USER=seu-usuario-mySQL
DB_PASS=sua-senha-mySQL
DB_NAME=TRYBE_FUTEBOL_CLUBE
DB_HOST=localhost
DB_PORT=3306
```

## Linter

Para garantir a qualidade do código, usaremos o [ESLint](https://eslint.org/) para fazer a sua análise estática.

Este projeto já vem com as dependências relacionadas ao _linter_ configuradas nos arquivos `package.json` nos seguintes caminhos:

- `sd-015-a-trybe-futebol-clube/app/backend/package.json`

Para rodar o `ESLint` em um projeto, basta executar o comando `npm install` dentro do projeto e depois `npm run lint`. Se a análise do `ESLint` encontrar problemas no seu código, tais problemas serão mostrados no seu terminal. Se não houver problema no seu código, nada será impresso no seu terminal.

Você também pode instalar o plugin do `ESLint` no `VSCode`, bastar ir em extensions e baixar o [plugin `ESLint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

⚠ PULL REQUESTS COM ISSUES DE LINTER NÃO SERÃO AVALIADAS. ATENTE-SE PARA RESOLVÊ-LAS ANTES DE FINALIZAR O DESENVOLVIMENTO! ⚠

---





