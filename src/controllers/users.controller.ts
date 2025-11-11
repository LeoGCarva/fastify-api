import { prisma } from "../prisma/client.ts";
import { userSchema } from "../schemas/user.schema.ts";
import { postSchema } from "../schemas/post.schema.ts";
import { FastifyReply, FastifyRequest } from "fastify";
import { searchContactsQuerySchema } from "../schemas/params.schema.ts";

export async function getUsers() {
  return await prisma.user.findMany();
}

export async function createUser(req: any, res: any) {
  const parsed = userSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).send(parsed.error);
  }

  const user = await prisma.user.create({
    data: parsed.data,
  });

  return res.status(200).send(user);
}

export async function getUserById({ params }: any, res: any) {
  if (!params) {
    return res.status(400).send("manda algo no req fi");
  }

  const userId = Number(params.id);

  return await prisma.user
    .findUniqueOrThrow({
      where: {
        id: userId,
      },
    })
    .catch(() => res.status(400).send("Não existe usuario com esse ID"));
}

export async function updateUserByID(req: any, res: any) {
  if (!req.body || !req.params) {
    return res.status(400).send("manda algo no req fi");
  }
  const userId = Number(req.params.id);
  const userBody = req.body;

  const user = await prisma.user
    .findUniqueOrThrow({
      where: {
        id: userId,
      },
    })
    .catch(() => res.status(400).send("Não existe usuario com esse ID"));

  if (userBody.name) {
    user.name = userBody.name;
  }

  if (userBody.email) {
    user.email = userBody.email;
  }

  return user;
}

export async function deleteUserById(req: any, res: any) {
  if (!req.params) {
    return res.status(400).send("manda algo no req fi");
  }

  const userId = Number(req.params.id);

  return await prisma.user.delete({
    where: {
      id: userId,
    },
  });
}

export async function getPostByUserId() {}

export async function createPostByUserId(
  req: FastifyRequest,
  res: FastifyReply
) {
  const { title, content } = postSchema.parse(req.body);
  const userId: {id: number} = searchContactsQuerySchema.parse(req.params);

  try {
    const user = await prisma.user
      .findUniqueOrThrow({
        where: {
          id: userId.id,
        },
      })
      .catch(() => res.status(400).send("Não existe usuario com esse ID"));

    console.log(user);

    const post = prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });

    return res.status(200).send(post);
  } catch (error) {}

  // user.posts
}

export async function getPostById() {}
