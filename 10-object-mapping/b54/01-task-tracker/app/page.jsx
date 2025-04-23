"use client";

import prisma from "@/repos/prisma";
import { toggle } from "@/app/actions";

export default async function Home() {
  const taskTitle = useRef();
  const tasks = await prisma.task.findMany();

  // taskTitle.current.value

  return (
    <div className="grid gap-y-2 p-5">
      {tasks.map((task) => (
        <form
          key={task.id}
          className="flex gap-x-2 items-center"
          action={toggle}
        >
          <span className="font-semibold">{task.title}</span>
          <button className="border rounded-md p-1" type="submit">
            {task.completed ? "Completed" : "Non-completed"}
            <input hidden type="text" name="id" value={task.id} />
            <input
              hidden
              type="checkbox"
              name="checked"
              checked={task.completed}
            />
          </button>
        </form>
      ))}
      <form className="flex gap-x-2 items-center">
        <label htmlFor="title">Title</label>
        <input
          ref={taskTitle}
          className="border rounded-md p-1"
          id="title"
          type="text"
        />
      </form>
    </div>
  );
}
