"use server";

import prisma from "@/repos/prisma";
import { revalidatePath } from "next/cache";

export async function like(data) {
  // await new Promise((res) => setTimeout(res, 2000));
  const { email } = data;
  try {
    const client = await prisma.client.update({
      where: {
        email: email,
      },
      data: {
        likes: {
          increment: 1,
        },
      },
    });
    revalidatePath("/");
    return client.likes;
  } catch (e) {}
}

export async function getAccounts(client) {
  const accounts = await prisma.account.findMany({
    where: {
      client: client,
    },
  });
  // console.log(accounts);
  return accounts;
}
