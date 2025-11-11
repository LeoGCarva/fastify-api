import type { FastifyInstance } from "fastify";
import { createPostByUserId, createUser, deleteUserById, getPostById, getPostByUserId, getUserById, getUsers, updateUserByID } from "../controllers/users.controller.ts";

export async function userRoutes(app: FastifyInstance) {
  app.get("/", getUsers);
  app.get(`/getUserById/:id`, getUserById)
  app.get('/posts/:id', getPostById)
  app.get('/:id/posts', getPostByUserId)

  app.post("/create-user", createUser);
  app.post('/:id/posts', createPostByUserId)

  app.put('/updateById/:id', updateUserByID)
  
  app.delete('/deleteById/:id', deleteUserById)
}
