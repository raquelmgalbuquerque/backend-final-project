# Backend final project

This project was done my João Martinho and Raquel Albuquerque and makes use of an API template, developed by Gerardo Lima, available at [this repository](https://github.com/gerardolima/edit-2023-jan).

## Goal

Build an to do API able to perform CRUD requests, on a group of tasks (todos) stored at MongoDB Atlas, with the following specifications:

- GET /api/todos (optional query parameters: "page-size", "offset" and "order" [^1])
- GET /api/todos/{id}
- POST /api/todos/
- PUT /api/todos/{id}
- DELETE /api/todos/{id}
- GET /api/todos/search?description (optional query parameters: "page-size", "offset" and "order". "description" is mandatory! [^2])

[^1]: e.g. `http://localhost:3000/api/todos?page-size=4&offset=0&order=-1`
[^2]: e.g. `http://localhost:3000/api/todos/search?description=dog&page-size=2&offset=0&order=-1`

### Payload examples

#### POST /api/todos/

```
{
  "description": "Do the laundry",
  "done": true,
  "dueDate": "2023-02-12T12:00:00.000Z"
}
```

#### PUT /api/todos/{id}

```
{
  "_id": "63e1586aa05d59072eb26cf7",
  "description": "Teste 2",
  "done": true,
  "dueDate": "2023-02-10T21:00:00.000+00:00"
}
```

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
