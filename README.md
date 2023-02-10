# Backend final project

This project was done by [João Martinho](https://github.com/3ntix) and [Raquel Albuquerque]https://github.com/raquelmgalbuquerque) and makes use of an API template, developed by [Gerardo Lima](https://github.com/gerardolima), available at [this repository](https://github.com/gerardolima/edit-2023-jan).

## Goal

Build a todo API able to perform CRUD (Create &rarr; POST, Read &rarr; GET, Update &rarr; PUT, Delete &rarr; DELETE) requests, on a group of tasks (todos) stored at MongoDB Atlas, with the following specifications:

- GET /api/todos (optional query parameters: "page-size", "offset" and "order" [^1])
- GET /api/todos/{id}
- POST /api/todos/
- PUT /api/todos/{id}
- DELETE /api/todos/{id}
- GET /api/todos/search?description (optional query parameters: "page-size", "offset" and "order". Parameter "description" is mandatory! [^2])

[^1]: e.g. `http://localhost:3000/api/todos?page-size=4&offset=0&order=-1`
[^2]: e.g. `http://localhost:3000/api/todos/search?description=dog&page-size=2&offset=0&order=-1`

## Examples to test on Postman

[Postman](https://www.postman.com/) enables a user to test requests without the need of a front-end. Here we give examples of the URLs (Uniform Resource Locators) tested. They can be composed by:

- Protocol (http or https): allows the communication between a client and a server
- Host: identifies the machine in the network
- Port
- Path
- Query/Search parameters

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

### 4. Update a todo through id

PUT /api/todos/{id}: [http://localhost:3000/api/todos/63e1586aa05d59072eb26cf7](http://localhost:3000/api/todos/63e1586aa05d59072eb26cf7)

```
{
  "_id": "63e1586aa05d59072eb26cf7",
  "description": "Do the groceries",
  "done": true,
  "dueDate": "2023-02-10T21:00:00.000+00:00"
}
```

### 5. Delete a todo through id

DELETE /api/todos/{id}: [http://localhost:3000/api/todos/63e157b7a05d59072eb26cf5](http://localhost:3000/api/todos/63e157b7a05d59072eb26cf5)

### 6. Search todos

GET /api/todos/search?description: [http://localhost:3000/api/todos/search?description=dog&page-size=2&offset=0&order=-1](http://localhost:3000/api/todos/search?description=dog&page-size=2&offset=0&order=-1)

## MongoDB

### Database and collection

Since during the classes we already created the project _edit-backend-jan-2023_ at [MongoDB Atlas](https://www.mongodb.com/atlas/database), we just added a database named _final_project_ and created a new collection named _todos_.

### Document format

The documents stored at MongoDB collection _todos_ should have the following format:

```
{
  _id: ObjectId,
  description: string (2 to 50 characters),
  done: boolean,
  dueDate: Date
}
```

## Tests

Tests are useful to test the behavior of the API and avoid problems when the API goes to production. It clears up the intention of the code.

There are different types of tests. You can test a small and specific function (unit tests), test more complex logics in the service (integration tests) or the app (end-to-end tests).
Tests will be performed with Jest, a test runner. When we run the command `npm run test:w`, the tests, which can be configured at `\hapi\tsconfig.json`, are executed.
We performed the tests of the routes with the file `routes.spec.ts`.

## Code flow

- app.ts: where we define the port and start the server;
- server.ts: where the plugins are registered;
- routes/todos/index.ts: the routes are registered;
- routes/todos/routes.ts: where the routes are defined and the service is called;
- routes/todos/service.ts: where all the business logic can be found.

The routes are responsible for reading the request, make the validation, call the service and get the necessary data.

### Crucial folders

- `src/lib`: here we can find transversal code of our API. For example, here is where we provide all the necessary code to connect to MongoDB Atlas. This way, we do not need to duplicate it every time we create a new plugin.
- `src/routes`: all the API routes can be found here and they are organized by subject. For this exercise, all the todo related routes can be found at `src/routes/todos`. The entry point is the `index.ts` file followed by `routes.ts` and `service.ts`. The remaining files ending with `*.spec.ts` are test files for the routes and the service.

## Main struggles and solutions

- Validation with [Zod](https://zod.dev/) when implementing routes (mainly with date objects). An upgrade of the package solved the issue;
- We found problems while trying to make `description` parameter mandatory in route with search, so we left it optional due to the lack of time;
- Tests: we didn't know where to begin, so we started by following each line of the test file `routes.spec.ts` along with [Jest](https://jestjs.io/), [hapi](https://hapi.dev/) and [chance](https://chancejs.com/) documentation, as well as comparing with examples we did with Gerardo during the lectures;
- How can we isolate tests only for `todos` plugin? When running the command `npm run test:w`, click on p-key and they type `/routes/todos`.

## Presentation setup

- Open VSCode;
- Login [MongoDB Atlas](https://account.mongodb.com/account/login?signedOut=true) and open collection page;
- Open Postman;
- Open GitHub [repository](https://github.com/raquelmgalbuquerque/backend-final-project)

## Presentation

Explain in 30 minutes, at most, the code we did, namely problems found and corresponding solutions.

1. (João) Intro and mention that we used a template and adapted it to include a new plugin named `todos`;
2. (João) MongoDB: lib/mongo.ts
3. (João) Code flow: app.ts + server.ts
4. (Raquel) Code flow: routes/todos/index.ts + 3 routes (getAllTodos, getOneTodo, postTodo)
5. (João) Code flow: 3 routes (putTodo, deleteTodo, getSearch)
6. (Raquel) Code flow: routes/todos/service.ts
7. (Raquel) Run API in VS Code and demo in Postman: 3 routes (getAllTodos, getOneTodo, postTodo)
8. (João) Demo in Postman: 3 routes (putTodo, deleteTodo, getSearch)
9. (Raquel) Tests: we only performed tests for the routes. Do the demo with the command `npm run test:w`
10. Main struggles and solutions

## Useful commands

To run API after git clone, make sure you are inside `/hapi` folder before typing the commands below:

```
# Clean install
npm ci
# Compiles the code
npm run build
# Starts the server
npm run start:w
```

While testing, run the following commands:

```
# Compiles the code
npm run build:w
# Helps formatting the code (e.g. remove all the semicolons)
npm run lint:w
# Runs the tests
npm run test:w
```

To clear cache (it can be handy sometimes):

```
npm run clean
```
