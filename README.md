## Description

Api demo e-commerce to Yaydoo

https://github.com/abelhOrihuela

## Installation

```bash
$ npm install
```

## Setup DB

* Create file .env
* Set variable DATABASE_URL

DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

```bash
# Push the Prisma schema state to the database
$ npx prisma db push

```

## Running the app

```bash
# prisma setup
$ npx prisma generate

# optional execute seed for initial products
$ npx prisma db seed

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
Api url: http://localhost:3000

Api documentation: http://localhost:3000/api-doc
## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```




## License

Nest is [MIT licensed](LICENSE).
