import type { HapiMongo } from "hapi-mongodb";
import z from "zod";

/** Zod schema to validate one object with name and age */
export const Todo = z.object({
  description: z.string(),
  done: z.boolean(),
  dueDate: z.coerce.date(),
});

export type Todo = z.infer<typeof Todo>;

export const getAll = (mongo: HapiMongo) =>
  mongo.db.collection("todos").find({}).toArray();

export const getOne = (mongo: HapiMongo, id: string) =>
  mongo.db.collection("todos").findOne({ _id: new mongo.ObjectID(id) });

export const create = (mongo: HapiMongo, todo: Todo) =>
  mongo.db.collection("todos").insertOne(todo);

export const update = (mongo: HapiMongo, id: string, todo: Todo) =>
  mongo.db
    .collection("todos")
    .updateOne({ _id: new mongo.ObjectID(id) }, { $set: todo });

export const remove = (mongo: HapiMongo, id: string) =>
  mongo.db.collection("todos").deleteOne({ _id: new mongo.ObjectID(id) });

export const search = (mongo: HapiMongo, query: string) =>
  mongo.db
    .collection("todos")
    .find({ description: { $regex: new RegExp(query, "i") } })
    .limit(5)
    .toArray();
