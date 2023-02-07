import type { ServerRoute, Request } from "@hapi/hapi";
import z from "zod";
import {
  Todo,
  getAll,
  getOne,
  create,
  update,
  remove,
  search,
} from "./service";

/**
 * Get all todos
 * @handle `GET /`
 */
const getAllTodos = Object.freeze<ServerRoute>({
  method: "GET",
  path: "/",
  handler: (req, _h) => {
    // get data from request
    const { mongo } = req;
    const offset = Number(req.query["offset"]) ?? 0;
    const limit = Number(req.query["page-size"]) ?? 5;

    type MySort = -1 | 1;
    const order: MySort = req.query["order"] ?? 1;

    // call handler (request-agnostic)
    return getAll(mongo, offset, limit, order);
  },
});

/**
 * Get one todo
 * @handle `GET /{id}`
 */
const getOneTodo = Object.freeze<ServerRoute>({
  method: "GET",
  path: "/{id}",
  handler: async (req, _h) => {
    // get data from request
    const { mongo } = req;
    const { id } = req.params;

    // call handler (request-agnostic)
    return getOne(mongo, id);
  },
});

/**
 * Add a new todo to the database
 * @handle `POST /`
 */
const postTodo = Object.freeze<ServerRoute>({
  method: "POST",
  path: "/",
  options: {
    validate: {
      payload: (v: unknown) => Todo.parseAsync(v),
    },
  },
  handler: async (req: Request<{ Payload: Todo }>, h) => {
    // get data from request
    const mongo = req.mongo;
    const todo = req.payload;

    // call handler (request-agnostic)
    const res = await create(mongo, todo);
    return h
      .response(res)
      .code(201)
      .header("location", `${req.url}/${res.insertedId}`);

    // refer to https://www.rfc-editor.org/rfc/rfc9110.html#name-location
  },
});

/**
 * Replace a todo
 * @handle `PUT /{id}`
 */
const putTodo = Object.freeze<ServerRoute>({
  method: "PUT",
  path: "/{id}",
  options: {
    validate: {
      payload: (v: unknown) => Todo.parseAsync(v),
    },
  },
  handler: async (req: Request<{ Payload: Todo }>, h) => {
    // get data from request
    const { mongo } = req;
    const { id } = req.params;
    const todo = req.payload;

    // call handler (request-agnostic)
    return update(mongo, id, todo);
  },
});

/**
 * Delete a todo from the database
 * @handle `DELETE /{id}`
 */
const deleteTodo = Object.freeze<ServerRoute>({
  method: "DELETE",
  path: "/{id}",
  handler: async (req, _h) => {
    // get data from request
    const { mongo } = req;
    const { id } = req.params;

    // call handler (request-agnostic)
    return remove(mongo, id);
  },
});

/**
 * Search todos
 * @handle `GET /search`
 */
const getSearch = Object.freeze<ServerRoute>({
  method: "GET",
  path: "/search",
  options: {
    validate: {
      query: (v: unknown) => Description.parseAsync(v),
    },
  },
  handler: async (req, _h) => {
    // get data from request
    const { mongo } = req;
    const description = req.query.description;

    const offset = Number(req.query["offset"]) ?? 0;
    const limit = Number(req.query["page-size"]) ?? 5;

    type MySort = -1 | 1;
    const order: MySort = req.query["order"] ?? 1;

    // call handler (request-agnostic)
    return search(mongo, description, offset, limit, order);
  },
});

/** Zod schema to validate one object with description */
const Description = z.object({
  description: z.string(),
});
type Description = z.infer<typeof Description>;

/**
 * Routes of the plugin `hello`
 */
export default [
  getAllTodos,
  getOneTodo,
  postTodo,
  putTodo,
  deleteTodo,
  getSearch,
];
