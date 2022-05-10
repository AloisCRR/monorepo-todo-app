# Monorepo To Do App

Basic implementation to test integration between multiple frameworks and GraphQL using code generation and shared types, interfaces, hooks, etc.

## Run Locally

1. Install [Node.js](https://nodejs.org), [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/)

2. Clone the project

   ```bash
   git clone https://github.com/AloisCRR/monorepo-todo-app
   ```

3. Install all dependencies with `npm i`

4. Spin up the database with `docker-compose up -d`

5. Run the API using

   ```bash
   npx nx serve todo-api
   ```

6. Run the frontend using

   ```bash
   npx nx serve todo --configuration=development
   ```

7. To generate hooks, interfaces or types on the fly while coding run

   **To make code generation work properly you need to have the API server running and without (webpack/compilation/type) errors**

   ```bash
   npm run generate-types:watch
   ```

---

> If you make changes to the database schema (`schema.prisma`) run `npx prisma migrate dev --name migration_name` to sync changes with database.
> Then run `npx prisma generate` to generate all TypeScript interfaces.

## Environment Variables

| Variable                 | Example                                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| DATABASE_URL             | postgresql://monorepo_todo_app:development@localhost:5432/monorepo_todo_app?schema=public |
| JWT_SECRET               | development                                                                               |
| NEXT_PUBLIC_API_ENDPOINT | http://localhost:3333/graphql                                                             |

## Screenshots

![Landing page](/screenshots/landing.png?raw=true 'Landing')

![Loading or register page](/screenshots/login-register.png?raw=true 'Login / Register')

![App](/screenshots/app.png?raw=true 'Main UI')

## Tech Stack

| Name                   | Description                                                                                                                             | Website                                 |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| Next.js                | Production grade React applications that scale                                                                                          | https://nextjs.org/                     |
| Mantine                | Mantine core library includes all essential components: inputs, buttons, modals, popovers, typography elements, layout management, etc. | https://mantine.dev/                    |
| NestJS                 | A progressive Node.js framework for building efficient, reliable and scalable server-side applications.                                 | https://nestjs.com/                     |
| Prisma                 | Next-generation Node.js and TypeScript ORM                                                                                              | https://www.prisma.io/                  |
| Nx                     | Next generation build system with first class monorepo support and powerful integrations.                                               | https://nx.dev/                         |
| GraphQL                | GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.                                | https://graphql.org/                    |
| GraphQL Code Generator | Generate code from your GraphQL schema and operations with a simple CLI                                                                 | https://www.graphql-code-generator.com/ |

## Roadmap

- [ ] Add better authentication flow
- [ ] Add other login OAuth providers
