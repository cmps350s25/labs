import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

// import { increaseLikesAction } from "@/app/actions";
import Accounts from "@/app/accounts";
import Like from "@/app/like";

const prisma = new PrismaClient();

export default async function Home() {
  const clients = await prisma.client.findMany({
    // include: {
    //   accounts: true,
    // },
  });

  async function createClientAction(data) {
    "use server";
    console.log(data);

    try {
      const client = await prisma.client.create({
        data: {
          firstName: "Dane",
          lastName: "Doe",
          email: data.get("email"),
        },
      });
      revalidatePath("/");
      return client;
    } catch (e) {}
  }

  async function increaseLikesAction(data) {
    "use server";
    console.log(data);
    // await new Promise((res) => setTimeout(res, 5000));

    try {
      const client = await prisma.client.update({
        where: {
          id: data.get("id"),
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

  return (
    <div className="p-5 grid gap-y-2">
      {clients.map((client) => (
        <div key={client.id}>
          <div className="flex gap-x-2 items-center">
            <span>{client.firstName}</span>
            <span>{client.lastName}</span>
            <span>{client.email}</span>
            <form action={increaseLikesAction}>
              <button className="border rounded-md p-1 cursor-pointer me-2">
                Like {client.likes}
              </button>
              <input type="text" name="id" value={client.id} readOnly hidden />
            </form>
            <Like id={client.id} likes={client.likes} />
          </div>
          <Accounts client={client.id} />
        </div>
      ))}
      <form
        action={createClientAction}
        className="flex gap-x-2 items-center mt-5"
      >
        <label>Email</label>
        <input
          id="email"
          name="email"
          type="email"
          className="border rounded-md p-1"
        />
      </form>
    </div>
  );
}
