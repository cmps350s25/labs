import * as repo from "@/repos/tasks";
import Tasks from "@/components/tasks";

export default async function Home() {
  return (
    <main className="p-5">
      <Tasks tasks={await repo.read()} />
    </main>
  );
}
