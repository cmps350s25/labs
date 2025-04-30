import prisma from "@/repos/prisma";
import { revalidatePath } from "next/cache";

export async function POST(request, { params }) {
  // await new Promise((res) => setTimeout(res, 5000));

  const { client } = await params;
  const { type } = await request.json();

  let account;
  try {
    account = await prisma.account.create({
      data: {
        type, //: type,
        client, //: type,
      },
    });
    // revalidatePath("/");
    return Response.json(account, { status: 201 });
  } catch (e) {
    // send an error
    console.error(e);
    return Response.json({}, { status: 500 });
  }
}
