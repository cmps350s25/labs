import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.client.deleteMany();

  await Promise.all(
    Array.from({ length: 1 + Math.floor(Math.random() * 32) }).map(
      async () =>
        await prisma.client.create({
          data: {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            accounts: {
              create: Array.from({
                length: 1 + Math.floor(Math.random() * 8),
              }).map(() => ({
                type: Math.random() < 0.7 ? "current" : "savings",
                transactions: {
                  create: Array.from({
                    length: 1 + Math.floor(Math.random() * 16),
                  }).map(() => ({
                    type: Math.random() < 0.8 ? "deposit" : "withdrawal",
                    amount: Math.floor(Math.random() * 128),
                  })),
                },
              })),
            },
          },
        })
    )
  );

  const accounts = await prisma.account.findMany();
  accounts.forEach(
    async (account) =>
      await prisma.account.update({
        where: {
          id: account.id,
        },
        data: {
          balance:
            (
              await prisma.transaction.aggregate({
                _sum: {
                  amount: true,
                },
                where: {
                  type: "deposit",
                  account: account.id,
                },
              })
            )["_sum"].amount ??
            0 -
              (
                await prisma.transaction.aggregate({
                  _sum: {
                    amount: true,
                  },
                  where: {
                    type: "withdrawal",
                    account: account.id,
                  },
                })
              )["_sum"].amount ??
            0,
        },
      })
  );
};

try {
  await seed();
  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}
