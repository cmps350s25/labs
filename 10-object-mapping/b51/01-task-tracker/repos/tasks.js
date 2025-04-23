import prisma from "@/repos/prisma";

export async function read() {
  return await prisma.task.findMany();
}

export async function write(data) {
  console.log(data);
  // return await prisma.task.create({ data });
}
