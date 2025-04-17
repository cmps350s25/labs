"use client";

// import React from "react";
import { useState, useEffect } from "react";
import Task from "@/components/task";
import { CirclePlus } from "lucide-react";

export default function Tasks() {
  const [tasks, setTasks] = useState([
    { title: "Task 1", checked: false },
    { title: "Task 2", checked: true },
    { title: "Task 3", checked: true },
    { title: "Task 4", checked: false },
  ]);
  const [tt, setTt] = useState(tasks.length);

  function toggle(title) {
    console.log("toggle");
    setTasks(
      tasks.map((task) =>
        task.title === title ? { ...task, checked: !task.checked } : task
      )
    );
  }

  function remove(title) {
    console.log("remove");
    setTasks(tasks.filter((t) => t.title !== title));
  }

  useEffect(() => {
    console.log("render");
  });

  useEffect(() => {
    console.log("mount (first render)");
    // window.addEventListener("click", something);
    // window.setInterval() // set timer

    return () => {
      // window.removeEventListener("click", something);
      // window.setInterav // remove timer
    };
  }, []);

  useEffect(() => {
    console.log("update");
    setTt(tasks.length);
  }, [tasks]);

  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.title}
          title={task.title}
          checked={task.checked}
          remove={remove}
          toggle={toggle}
        />
      ))}
      {<p>{tt}</p>}
      <form className="flex gap-x-1.5 mt-4">
        <input
          type="text"
          className="grow border rounded-md p-1"
          placeholder="Task"
        />
        <button>
          <CirclePlus size={18} />
        </button>
      </form>
    </div>
  );
}
