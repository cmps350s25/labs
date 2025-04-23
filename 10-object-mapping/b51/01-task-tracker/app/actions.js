"use server";

// import { revalidatePath } from "next/cache";
import * as tasks from "@/repos/tasks";

export async function get() {
  // revalidatePath(`/`);
  return await tasks.read();
}

// export async function create(data) {
//   // revalidatePath(`/`);
//   console.log("create");
//   console.log(data);

//   return await tasks.write(data);
// }
