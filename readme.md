## International Greenhouse Gas emissions REST API

- Source - **Kaggle**
- [Docs](https://documenter.getpostman.com/view/9992993/U16kr53z)

## Tech Stack

- TypeScript
- Node.js & Express
- PostgreSQL
  - Prisma
- Redis

## Run

- PostgreSQL & Redis should be running on default ports
  
```sh
mv .env.example .env
yarn
yarn migrate
yarn generate
yarn build
yarn start
```
