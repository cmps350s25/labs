"use client";

// import React from "react";
import { useState } from "react";
import Task from "@/components/task";

export default function Tasks({ children, tasks, callback }) {
  const [_tasks, _setTasks] = useState(tasks);

  function childCallback(event, title) {
    if (event === "toggle") {
      _setTasks((oldTasks) =>
        oldTasks.map((t) => {
          if (t.title === title) {
            return { ...t, checked: !t.checked };
          } else {
            return t;
          }
        })
      );
    } else if (event === "remove") {
      _setTasks((oldTasks) => oldTasks.filter((t) => t.title !== title));
    }
  }

  return (
    <div className="grid gap-y-2 border rounded-md mt-2 p-5">
      {_tasks.map((t) => (
        <Task
          key={t.title}
          title={t.title}
          checked={t.checked}
          callback={childCallback}
        ></Task>
      ))}
    </div>
  );
}
