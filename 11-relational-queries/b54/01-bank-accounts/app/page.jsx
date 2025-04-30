import prisma from "@/repos/prisma";
import { revalidatePath } from "next/cache";
import Accounts from "@/app/accounts";

export default async function Home() {
  const clients = await prisma.client.findMany();

  async function addClientAction(data) {
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

  async function increaseLikesActions(data) {
    "use server";
    console.log(data);

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
    <div className="p-5">
      {clients.map((client) => (
        <div key={client.id} className="my-5">
          <div className="flex gap-x-2">
            <span>{client.firstName}</span>
            <span>{client.lastName}</span>
            <span>{client.email}</span>
            <form action={increaseLikesActions}>
              <button className="border rounded-md p-1 cursor-pointer">
                Like {client.likes}
              </button>
              <input name="id" hidden readOnly value={client.id} />
            </form>
          </div>
          <Accounts client={client.id} />
        </div>
      ))}
      <form action={addClientAction} className="flex gap-x-2 items-center mt-5">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          className="border rounded-md p-1"
        />
      </form>
    </div>
  );
}
