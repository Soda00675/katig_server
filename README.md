<h1>KATIG App Server (API/Database)
<hr />

<h3>Tech Stack used:</h3>
<ul>
  <li>[TypeScript](https://www.typescriptlang.org/)</li>
  <li>[NestJS](https://nestjs.com/)</li>
  <li>[Docker](https://www.docker.com/)</li>
  <li>[PostgreSQL](https://www.postgresql.org/)</li>
  <li>[pgAdmin](https://www.pgadmin.org/)</li>
</ul>

<h3>Setup guide</h3>
<p>You must have these installed:</p>

<ul>
  <li>Docker Desktop</li>
  <li>Git</li>
  <li>Visual Studio Code</li>
</ul>

<p>Proceed to setup</p>

```bash

git clone https://github.com/itsmenoahpoli/katig-server.git

cd katig-server

cp .env.example .env # After doing this, open the .env file and provide the needed values

npm install

# You must ensure that docker desktop is running
docker compose up --build -d

# Once the container is running, proceed to execute the commands below:
npx primsa db push # To migrate and create tables for the database

```

To open Swagger API documentation, go to `http://localhost:3000/docs/api`
To open PgAdmin, open your browser and go to `http://localhost:5555`
