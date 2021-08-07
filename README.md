<h1 align="center">Conecta Café</h1>

```txt
   _____                                 _                _____            __        
  / ____|                               | |              / ____|          / _|       
 | |        ___    _ __     ___    ___  | |_    __ _    | |        __ _  | |_    ___ 
 | |       / _ \  | '_ \   / _ \  / __| | __|  / _` |   | |       / _` | |  _|  / _ \
 | |____  | (_) | | | | | |  __/ | (__  | |_  | (_| |   | |____  | (_| | | |   |  __/
  \_____|  \___/  |_| |_|  \___|  \___|  \__|  \__,_|    \_____|  \__,_| |_|    \___|

```

Para documentação dos endpoints, acesse o Swagger em `api/doc`.

## ☕ Sobre o projeto

- **[🤖 API](https://github.com/Brendhon/conecta-cafe-api)**

API Rest do projeto **Conecta Café**, criada para o trabalho de conclusão de curso (TCC) do curso de Engenharia de computação do [Instituto Nacional de Telecomunicações (INATEL)](https://inatel.br/home/).

---

## 💻 Tecnologias

As seguintes tecnologias foram utilizadas na construção do projeto:

 - **[NestJS](https://nestjs.com/)**
 - **[TypeORM](https://typeorm.io/#/)**
 - **[Docker](https://www.docker.com/)**
 - **[PostgreSQL](https://www.postgresql.org/)**
 - **[Class Validator](https://github.com/typestack/class-validator)**
 - **[Jest](https://jestjs.io/)**
 - **[SuperTest](https://github.com/visionmedia/supertest)**
 - **[Cross-env](https://github.com/kentcdodds/cross-env)**
 - **[Dotenv](https://github.com/motdotla/dotenv)**
 - **[ESlint](https://eslint.org/)**
 - **[Swagger](https://swagger.io/)**
> Veja o arquivo  **[package.json](https://github.com/Brendhon/conecta-cafe-api/blob/main/package.json)**

### Utilitários
- Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**
- Teste de API:  **[Insomnia](https://insomnia.rest/)**

---

## 👨‍💻 Como executar o projeto

### 💡 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
**[Git](https://git-scm.com)**, **[Node.js](https://nodejs.org/en/)** e **[Docker](https://www.docker.com/)**.<br> 


1. Clone o repositório
```bash
git clone https://github.com/Brendhon/conecta-cafe-api.git
```

2. Inicie o Banco de dados.

Para evitar que seja necessário a instalação do PostgresSQL na sua máquina, vamos utilizar uma imagem Docker. Foi criado um script `start-db.sh` para automatizar o processo, execute-o com o comando:

  ```bash
  npm run start:db
  ```

3. Instale as dependências
```bash
npm install
```

4. Com isso o projeto já estará pronto para ser executado.

Observações:
* Foi criado um script para apagar o container do postgres no docker, utilize o comando:
  ```bash
  npm run delete:db
  ```

### ⚽ Rodando o servidor

Execute a aplicação em modo de desenvolvimento

```bash
npm run start:dev
```
O servidor iniciará em [localhost:3000](localhost:3000).

### 🤖 Rodando os testes automatizados

```bash
npm run test
```

---

## 👥 Autores

<table  style="text-align:center; border: none" >
<tr>
<td align="center"> 
<a href="https://github.com/Brendhon" style="text-align:center;">
<img style="border-radius: 20%;" src="https://github.com/brendhon.png" width="120px;" alt="autor"/><br> <strong> Brendhon Moreira </strong>
</a>
</td>

<td align="center"> 
<a href="https://github.com/GabrielGSD" style="text-align:center;">
<img style="border-radius: 20%;" src="https://github.com/GabrielGSD.png" width="120px;" alt="autor"/><br><strong> Gabriel Daniel </strong>
</a>
</td>

<td align="center"> 
<a href="https://github.com/MoisesSDelmoro" styles="text-align:center;">
<img style="border-radius: 20%;" src="https://github.com/MoisesSDelmoro.png" width="120px;" alt="autor"/><br><strong> Moises Delmoro </strong>
</a>
</td>
</tr>
</table>

### Contato

[![Linkedin Badge](https://img.shields.io/badge/-Brendhon-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/brendhon-moreira)](https://www.linkedin.com/in/brendhon-moreira)
[![Linkedin Badge](https://img.shields.io/badge/-Gabriel-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/gabriel-souza-b1995b216/)](https://www.linkedin.com/in/gabriel-souza-b1995b216/)
[![Linkedin Badge](https://img.shields.io/badge/-Moises-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/moises-s-delmoro-8747651ba/)](https://www.linkedin.com/in/moises-s-delmoro-8747651ba/)

---
## 📝 License
[![License](https://img.shields.io/apm/l/vim-mode?color=blue)](http://badges.mit-license.org)

- **[MIT license](https://choosealicense.com/licenses/mit/)**
