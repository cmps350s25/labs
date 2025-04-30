import prisma from "@/repos/prisma";
import { revalidatePath } from "next/cache";
import Transactions from "@/app/transactions";
import Comp from "@/app/comp";

export default async function Home() {
  // show the account with the largest balance

  const clients = await prisma.client.findMany({
    include: {
      accounts: true,
    },
  });

  async function addAction(data) {
    "use server";
    console.log(data);
    try {
      await prisma.account.create({
        data: {
          type: data.get("type"),
          client: data.get("client"),
        },
      });
      revalidatePath("/");
    } catch (e) {}
  }

  return (
    <div className="grid gap-y-2 p-5">
      <Comp data={clients} />
      {clients.map((client) => (
        <div key={client.id}>
          <div className="flex gap-x-2">
            <span>{client.firstName}</span>
            <span>{client.lastName}</span>
          </div>
          <div>
            {client.accounts.map((account) => (
              <div>
                <div key={account.id} className="flex gap-x-2">
                  <span>{account.type}</span>
                  <span>{account.balance}</span>
                </div>
                <div>
                  <Transactions client={client.id} account={account.id} />
                </div>
              </div>
            ))}
          </div>
          <form action={addAction}>
            {/* onSubmit={() => {}} */}
            <label htmlFor="type">Type</label>
            <input
              id="type"
              name="type"
              type="text"
              className="border rounded-md"
              required
            />
            <input
              type="text"
              hidden
              readOnly
              name="client"
              value={client.id}
            />
            {/* <button onClick={(e) => {}}>Like</button> */}
            <button>Add</button>
          </form>
        </div>
      ))}
    </div>
  );
}
