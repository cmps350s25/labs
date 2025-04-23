import * as users from "@/repos/users";
// import prisma from "@/repos/prisma";
import Users from "@/components/users";

export default async function Home() {
  // const data = await prisma.user.findMany({
  //   include: {
  //     posts: true,
  //   },
  // });
  const data = await users.get();
  return (
    <div className="p-5">
      <Users data={data} />
    </div>
  );
}
