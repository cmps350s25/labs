import prisma from "@/repos/prisma";

export async function get() {
  const users = await prisma.user.findMany({
    // where: {
    //   name: {
    //     contains: "J",
    //   },
    // },
    include: {
      posts: true,
    },
  });

  // await disconnect();
  return users;
}

// async function disconnect() {
//   try {
//     await prisma.$disconnect();
//   } catch (e) {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   }
// }
