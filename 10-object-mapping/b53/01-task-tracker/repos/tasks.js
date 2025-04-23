import prisma from "@/repos/prisma";

export async function read() {
  return await prisma.task.findMany();
}
