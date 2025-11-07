import Fastify from "fastify";
import { userRoutes } from "./routes/users.route.ts";

export const buildApp = () => {
  const app = Fastify({ logger: true });

  app.register(userRoutes, { prefix: "/users" });

  return app
};
