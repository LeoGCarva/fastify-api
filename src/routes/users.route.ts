import type { FastifyInstance } from "fastify";
import { createUser, deleteUserById, getUserById, getUsers, updateUserByID } from "../controllers/users.controller.ts";

export async function userRoutes(app: FastifyInstance) {
  app.get("/", getUsers);
  app.post("/create-user", createUser);
  app.get(`/getUserById/:id`, getUserById)
  app.post('/updateById/:id', updateUserByID)
  app.delete('/deleteById/:id', deleteUserById)
}
