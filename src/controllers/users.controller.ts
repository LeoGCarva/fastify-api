import { prisma } from "../prisma/client.ts";
import { userSchema } from "../schemas/user.schema.ts";

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
  "";
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
  if(!req.params) {
    return res.status(400).send("manda algo no req fi");
  }

  const userId = Number(req.params.id);

  return await prisma.user.delete({
    where: {
      id: userId
    }
  })
}
