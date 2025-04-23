import Tasks from "@/components/tasks";
import prisma from "@/repos/prisma";

export default async function Home() {
  const tasks = await prisma.task.findMany();

  return <Tasks tasks={tasks} />;
}
