import type { Plugin } from "@hapi/hapi";
import routes from "./routes";

/**
 * `todos@1.0.0`
 * Recommended route prefix 'api/todos'
 */
export default Object.freeze<Plugin<void>>({
  name: "todos",
  version: "1.0.0",
  register: (server) => server.route(routes),
});
