// "use server";

import prisma from "@/repos/prisma";
import { revalidatePath } from "next/cache";
import Like from "@/app/like";
import Accounts from "@/app/accounts";

export default async function Home() {
  const clients = await prisma.client.findMany();

  async function addAction(data) {
    "use server";

    console.log(data);
    try {
      // await new Promise((res) => setTimeout(res, 10000));
      const client = await prisma.client.create({
        data: {
          firstName: "Sane",
          lastName: "Doe",
          email: data.get("email"),
        },
      });

      revalidatePath("/");
      return client;
    } catch (e) {}
  }

  return (
    <div className="p-5">
      <div className="grid gap-y-2">
        {clients.map((client) => (
          <div key={client.id}>
            <div className="flex gap-x-2">
              <span>{client.firstName}</span>
              <span>{client.lastName}</span>
              <span>{client.email}</span>
              <Like email={client.email} likes={client.likes} />
            </div>
            <Accounts client={client.id} />
          </div>
        ))}
      </div>
      <form action={addAction} className="flex gap-x-2 items-center mt-3">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          className="border rounded-md p-1.5"
        />
      </form>
    </div>
  );
}
