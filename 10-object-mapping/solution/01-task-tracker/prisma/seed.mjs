import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.task.deleteMany();

  Array.from({ length: Math.floor(Math.random() * 30) }).forEach(
    async () =>
      await prisma.task.create({
        data: {
          title: faker.book.title(),
          completed: Math.random() > 0.5,
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
