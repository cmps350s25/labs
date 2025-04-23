"use server";

import prisma from "@/repos/prisma";
import { revalidatePath } from "next/cache";

export async function createAction(data) {
  console.log(data);
  await prisma.task.create({
    data: {
      title: data.get("title"),
    },
  });
  revalidatePath("/");
}

export async function toggleAction(data) {
  console.log(data);
}
