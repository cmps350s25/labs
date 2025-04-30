"use server";

import prisma from "@/repos/prisma";

export async function readAccounts(client) {
  return await prisma.account.findMany({
    where: {
      client: client,
    },
  });
}
