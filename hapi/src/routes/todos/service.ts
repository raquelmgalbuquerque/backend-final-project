import type { HapiMongo } from "hapi-mongodb";
import z from "zod";

/** Zod schema to validate one object with description, done and dueDate keys */
export const Todo = z.object({
  description: z.string().min(2).max(50),
  done: z.boolean(),
  dueDate: z.coerce.date(),
});

export type Todo = z.infer<typeof Todo>;

type MySort = -1 | 1;

export const getAll = (
  mongo: HapiMongo,
  offset: number,
  limit: number,
  order: MySort
) =>
  mongo.db
    .collection("todos")
    .find({})
    .sort({ dueDate: order })
    .skip(offset)
    .limit(limit)
    .toArray();

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

export const search = (
  mongo: HapiMongo,
  query: string,
  offset: number,
  limit: number,
  order: MySort
) =>
  mongo.db
    .collection("todos")
    .find({ description: { $regex: new RegExp(query, "i") } })
    .sort({ dueDate: order })
    .skip(offset)
    .limit(limit)
    .toArray();

// mongo.db
//   .collection("todos")
//   .aggregate([
//     {
//       $searchBeta: {
//         search: {
//           query: query,
//           path: "description",
//         },
//       },
//     },
//     { $sort: { dueDate: order } },
//     { $skip: offset },
//     { $limit: limit },
//   ])
//   .toArray();
