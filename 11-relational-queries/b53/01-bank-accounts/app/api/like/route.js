import prisma from "@/repos/prisma";
import { revalidatePath } from "next/cache";

export async function PUT(request, { params }) {
  const { email } = await request.json();
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
  return Response.json(client.likes);
}
