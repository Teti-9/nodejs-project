# BACKEND API - Node.JS Express.JS Prisma PostgreSQL & Docker

Esse projeto é um conjunto de API's RESTful's dentro da framework escolhida (Express.JS) para um back-end rápido e eficiente.

## Funcionalidades

Esse é um aplicativo **Dockerizado** e protegido por autenticação usando **Node.js**, **Express.js**, **bcrypt**, **JWT Auth**, **Prisma**, e **PostgreSQL**. O aplicativo permite o usuário ao seguinte:

- **Registrar**: Criar uma nova conta.
- **Logar**: Autenticar e receber um JWT Token.
- **Gerenciar Exercícios**: Realizar operações nos seus exercícios adicionados.
  - **CRUD** (Criar, Ler, Atualizar, Deletar) de exercícios por nome ou músculo.
  - **Progressão:** Calcule se houve progressão no exercício baseado em atualizações anteriores na database.
  - **Cálculo de Volume de Treino:** Volume semanal total ou filtrado por músculo.

## Estrutura do projeto

```
nodejs-project/
│
├── prisma/
│   ├── schema.prisma           # A conexão e modelo da database atráves do prisma.
│   └── migrations/             #
│
├── src/
│   └── middlewares/
│       └── authMiddleware.js    # Middleware para verificação dos tokens JWT e rotas protegidas.
│   └── rest/
│       └── arquivos.rest        # Arquivos .rest (Extensão vscode) que emulam um front-end para realizar as operações.
│   └── routes/
│       └── authApi.js           # Rotas para autenticação do usuário.
│       └── exerciciosApi.js     # Rotas para realizar operações CRUD nos exercícios.
│       └── progressaoApi.js     # Rotas para calcular a progressão nos exercícios.
│       └── volumeApi.js         # Rotas para calcular o volume de treino.
│   └── utils/
│       └── capitalize.js        # Função que retorna uma string capitalizada corretamente.
│       └── prog.js              # Função que retorna o cálculo da progressão.
│       └── residual.js          # Função que retorna o músculo residual do músculo principal.
│   └── prismaClient.js          # Client do prisma.
│   └── server.js                # Arquivo principal com o servidor e rotas.
│
├── Dockerfile                   # Instruções docker container.
├── docker-compose.yaml          # Configuração do docker.
├── package.json                 # Dependências do projeto.
└── package-lock.json            # Lockfile para as corretas versões das dependências.
```

## Instalação

0. **Instale o Docker Desktop**

1. **Clone o repositório**:

```bash
git clone https://github.com/Teti-9/nodejs-project.git
cd nodejs-project
```

2. **Gere o client do Prisma**:

`npx prisma generate`

3. **Construa a imagem do Docker**:

`docker compose build`

4. **Aplique as migrations**:

`docker compose run app npx prisma migrate dev --name init`

5. **Suba os containers do Docker**:

`docker compose up`

6. **Pode se utilizar de uma ferramente como Dbeaver para acessar a database postgres diretamente caso necessário!**:

7. **Acesse o APP e suas rotas**:

Dentro da pasta rest, os **Arquivos REST** (Extensão VSCODE) possuem todas as rotas prontas para serem testadas, também é possível utilizar algum outro software como postman ou insomnia, por exemplo: `http://localhost:8000/api/registrar`
