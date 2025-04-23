"use server";

// import { revalidatePath } from "next/cache";
import prisma from "@/repos/prisma";

export async function createTask(data) {
  // console.log("create");
  // console.log(data);

  // const title = data.get("title");
  const { title } = data;

  // console.log(title);
  // console.log(data.get("title"));
  try {
    // revalidatePath(`/`);
    return await prisma.task.create({ data: { title } });
  } catch (e) {
    console.error(e.message);
  }
}

export async function getTasks() {
  return await prisma.task.findMany();
}
