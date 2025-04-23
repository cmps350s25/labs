"use client";

import { useState, useEffect, useRef } from "react";
import { getTasks, createTask } from "@/app/actions";

export default function Tasks({ tasks }) {
  const [counter, setCounter] = useState(0);
  const [_tasks, setTasks] = useState(tasks);
  // const [_tasks, setTasks] = useState([]);
  const [stale, setStale] = useState(false);
  const taskTitle = useRef();

  useEffect(() => {
    if (stale) {
      getTasks().then((data) => setTasks(data));
      setStale(false);
    }
  }, [stale]);

  return (
    <div>
      <button
        className="border rounded-md p-1"
        onClick={(e) => setCounter((oldCounter) => oldCounter + 1)}
      >
        {counter}
      </button>
      <div>
        {_tasks.map((task) => (
          <div key={task.id}>{task.title}</div>
        ))}
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();

          // await fetch("/api/tasks", {
          //   method: "POST",
          //   body: JSON.stringify({ title: taskTitle.current.value }),
          // });
          try {
            // const task = await createTask({ title: taskTitle.current.value });

            // if (task?.title) {
            //   setTasks((oldTasks) => [...oldTasks, task]);
            //   taskTitle.current.value = "";
            // }

            await createTask({ title: taskTitle.current.value });
            setStale(true);
          } catch (e) {}
        }}
        // action={createTask}
      >
        <div className="flex gap-x-2 items-center">
          <label htmlFor="title">Title</label>
          <input
            ref={taskTitle}
            type="text"
            id="title"
            name="title"
            className="border rounded-md p-1"
          />
        </div>
      </form>
    </div>
  );
}
