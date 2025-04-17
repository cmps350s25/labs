"use client";

// import React from "react";
import { useState, useRef } from "react";
import Task from "@/components/task";
import { CirclePlus } from "lucide-react";

export default function Tasks() {
  // const tasks = fetch
  const [tasks, setTasks] = useState([
    {
      title: "Task 1",
      checked: false,
    },
    {
      title: "Task 2",
      checked: true,
    },
  ]);

  function callback(event, title) {
    if (event === "toggle") {
      setTasks((_tasks) =>
        _tasks.map((task) =>
          task.title === title ? { ...task, checked: !task.checked } : task
        )
      );
    }
  }

  function submit(event) {
    event.stopPropagation();
    event.preventDefault();

    console.log("submit");
  }

  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.title}
          title={task.title}
          checked={task.checked}
          callback={callback}
        />
      ))}
      <form onSubmit={submit}>
        <div className="mt-2 flex justify-between">
          <input ref={taskName} className="border rounded-md" />
          <button>
            <CirclePlus size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
