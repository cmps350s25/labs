"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function increaseLikesAction(id) {
  console.log(id);
  // await new Promise((res) => setTimeout(res, 5000));

  try {
    const client = await prisma.client.update({
      where: {
        id, //: id,
      },
      data: {
        likes: {
          increment: 1,
        },
      },
    });
    revalidatePath("/");
    return client;
  } catch (e) {}
}

export async function getClientAccounts(client) {
  return await prisma.account.findMany({
    where: {
      client,
    },
  });
}
