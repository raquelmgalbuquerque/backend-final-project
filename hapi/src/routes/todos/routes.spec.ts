import Hapi from "@hapi/hapi";
import { makeChance } from "../../lib/chance";
import routes from "./routes";
import * as service from "./service";

const chance = makeChance();
const server = Hapi.server();

const fakeGetAll = chance.string();
const fakeGetOne = chance.string();
const fakePostOne = chance.string();
const fakePutOne = chance.string();
const fakeDeleteOne = chance.string();
const fakeSearch = chance.string();

const testObject = {
  description: "Do a party",
  done: false,
  dueDate: "2023-02-21T17:00:00.000Z",
};

const stubs: Record<string, jest.SpyInstance | jest.Mock> = {};
beforeAll(() => {
  server.route(routes);

  stubs["getAll"] = jest.spyOn(service, "getAll");
  stubs["getOne"] = jest.spyOn(service, "getOne");
  stubs["create"] = jest.spyOn(service, "create");
  stubs["update"] = jest.spyOn(service, "update");
  stubs["remove"] = jest.spyOn(service, "remove");
  stubs["search"] = jest.spyOn(service, "search");
});

beforeEach(() => {
  stubs["getAll"].mockResolvedValue(fakeGetAll);
  stubs["getOne"].mockResolvedValue(fakeGetOne);
  stubs["create"].mockResolvedValue(fakePostOne);
  stubs["update"].mockResolvedValue(fakePutOne);
  stubs["remove"].mockResolvedValue(fakeDeleteOne);
  stubs["search"].mockResolvedValue(fakeSearch);
});

afterEach(() => {
  jest.resetAllMocks();
});
afterAll(() => {
  jest.restoreAllMocks();
});

describe("route GET /", () => {
  const method = "GET";
  const url = "/";

  it("tests default route", async () => {
    const res = await server.inject({ method, url });

    expect(res.statusCode).toEqual(200);
    expect(res.result).toEqual(fakeGetAll);
  });
});

describe("route POST /", () => {
  const method = "POST";
  const url = "/";

  it("tests the creation of a new resource given a payload", async () => {
    const res = await server.inject({
      method,
      url,
      payload: testObject,
      validate: true,
    });

    expect(res.statusCode).toEqual(201);
    expect(res.result).toEqual(fakePostOne);
  });
});

describe("route GET /{id}", () => {
  const id = chance.guid();
  const method = "GET";
  const url = `/${id}`;

  it("tests the route given an id", async () => {
    const res = await server.inject({ method, url });

    expect(res.statusCode).toEqual(200);
    expect(res.result).toEqual(fakeGetOne);
  });
});

describe("route PUT /{id}", () => {
  const id = chance.guid();
  const method = "PUT";
  const url = `/${id}`;

  it("tests the update given an id and a payload", async () => {
    const res = await server.inject({
      method,
      url,
      payload: testObject,
      validate: true,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.result).toEqual(fakePutOne);
  });
});

describe("route DELETE /{id}", () => {
  const id = chance.guid();
  const method = "DELETE";
  const url = `/${id}`;

  it("tests the removal given an id", async () => {
    const res = await server.inject({ method, url });

    expect(res.statusCode).toEqual(200);
    expect(res.result).toEqual(fakeDeleteOne);
  });
});

describe("route GET /search", () => {
  const description = "dog";
  const method = "GET";
  const url = `/search?description=${description}`;

  it("tests if description query parameter was provided", async () => {
    const res = await server.inject({ method, url });

    expect(res.statusCode).toEqual(200);
    expect(res.result).toEqual(fakeSearch);
  });
});
