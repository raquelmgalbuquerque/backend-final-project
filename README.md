# Backend final project

This project makes use of an API template, developed by Gerardo Lima, available at [this repository](https://github.com/gerardolima/edit-2023-jan).

## Goal

Build an to do API able to perform CRUD requests, on a group of tasks (todos) stored at MongoDB Atlas, with the following specifications:

- GET /api/todos (optional query parameters: "page-size", "offset" and "order" [^1])
- GET /api/todos/{id}
- POST /api/todos/
- PUT /api/todos/{id}
- DELETE /api/todos/{id}
- GET /api/todos/search?description (optional query parameters: "page-size", "offset" and "order". "description" is mandatory! [^2])

[^1]: `/api/todos/?pagesize=x&offset=y`
[^2]: `/api/todos/search?description=abc&order=dueDate`

## MongoDB document format

The documents stored at MongoDB should have the following format:

```
{
  _id: ObjectId,
  description: string (2 to 50 characters),
  done: boolean,
  dueDate: Date
}
```

## Tests

(...)

## Presentation

Explain in 30 minutes, at most, the code we did, namely problems found and corresponding solutions.

### Code flow

1. app.ts
2. server.ts
3. routes/todos/index.ts
4. routes/todos/routes.ts
5. routes/todos/service.ts

## Useful commands

To run API after git clone, make sure you are inside `/hapi` folder before typing the commands below:

```
npm ci
npm run build
npm run start:w
```

While testing, run the following commands:

```
npm run build:w
npm run lint:w
npm run test:w
```

To clear cache (it can be handy sometimes):

```
npm run clean
```
