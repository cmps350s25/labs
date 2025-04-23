// import { create } from "@/app/actions";
import * as tasks from "@/repos/tasks";

async function create(data) {
  "use server";
  // revalidatePath(`/`);
  console.log("create");
  console.log(data);

  return await tasks.write(data);
}

export default function Home() {
  return (
    <div className="p-5">
      <form className="flex gap-x-2" action={create}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className="border rounded-md p-1"
        />
      </form>
    </div>
  );
}
