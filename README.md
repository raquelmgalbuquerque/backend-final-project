# Backend final project

This project was done by João Martinho and Raquel Albuquerque and makes use of an API template, developed by Gerardo Lima, available at [this repository](https://github.com/gerardolima/edit-2023-jan).

## Goal

Build a todo API able to perform CRUD requests, on a group of tasks (todos) stored at MongoDB Atlas, with the following specifications:

- GET /api/todos (optional query parameters: "page-size", "offset" and "order" [^1])
- GET /api/todos/{id}
- POST /api/todos/
- PUT /api/todos/{id}
- DELETE /api/todos/{id}
- GET /api/todos/search?description (optional query parameters: "page-size", "offset" and "order". Parameter "description" is mandatory! [^2])

[^1]: e.g. `http://localhost:3000/api/todos?page-size=4&offset=0&order=-1`
[^2]: e.g. `http://localhost:3000/api/todos/search?description=dog&page-size=2&offset=0&order=-1`

## Examples to test at Postman

### 1. Get multiple todos

GET /api/todos: [http://localhost:3000/api/todos?page-size=4&offset=0&order=-1](http://localhost:3000/api/todos?page-size=4&offset=0&order=-1)

### 2. Get one todo through id

GET /api/todos/{id}: [http://localhost:3000/api/todos/63deab1f956c6e0ea9604e82](http://localhost:3000/api/todos/63deab1f956c6e0ea9604e82)

### 3. Create a todo

POST /api/todos/: [http://localhost:3000/api/todos](http://localhost:3000/api/todos)

**Note:** Do not forget about the payload at Postman (Body &rarr; Raw &rarr; JSON). We leave an example below.

```
{
  "description": "Do the laundry",
  "done": true,
  "dueDate": "2023-02-12T12:00:00.000Z"
}
```

### 4. Update a todo

PUT /api/todos/{id}: [http://localhost:3000/api/todos/63e1586aa05d59072eb26cf7](http://localhost:3000/api/todos/63e1586aa05d59072eb26cf7)

```
{
  "_id": "63e1586aa05d59072eb26cf7",
  "description": "Do the groceries",
  "done": true,
  "dueDate": "2023-02-10T21:00:00.000+00:00"
}
```

### 5. Delete a todo

DELETE /api/todos/{id}: [http://localhost:3000/api/todos/63e157b7a05d59072eb26cf5](http://localhost:3000/api/todos/63e157b7a05d59072eb26cf5)

### 6. Search todos

GET /api/todos/search?description: [http://localhost:3000/api/todos/search?description=dog&page-size=2&offset=0&order=-1](http://localhost:3000/api/todos/search?description=dog&page-size=2&offset=0&order=-1)

## MongoDB

### Database and collection

Since during the classes we already created the project _edit-backend-jan-2023_ at MongoDB Atlas, we just added a database named _final_project_ and created a new collection named _todos_.

### Document format

The documents stored at MongoDB collection _todo_ should have the following format:

```
{
  _id: ObjectId,
  description: string (2 to 50 characters),
  done: boolean,
  dueDate: Date
}
```

## Tests

Tests will be performed with Jest, a test runner. The tests are configured at `\hapi\tsconfig.json`.

## Presentation

Explain in 30 minutes, at most, the code we did, namely problems found and corresponding solutions.

### Code flow

1. app.ts
2. server.ts
3. routes/todos/index.ts
4. routes/todos/routes.ts
5. routes/todos/service.ts

### Crucial folders

- `src/lib`: here we can find transversal code of our API (e.g., authentication, database connection, etc.). For example, here is where we provide all the necessary code to connect to MongoDB Atlas. We do not need to duplicate it every time we create a new plugin.
- `src/routes`: all the API routes can be found here and they are organized by subject. The entry point is the `index.ts` file followed by `routes.ts` and `service.ts`. The remaining files ending with `*.spec.ts` are test files.

### Main struggles

- Zod validation when implementing routes (mainly with date objects)
- Tests

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
