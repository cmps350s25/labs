"use client";

import { createAction, toggleAction } from "@/app/actions";
import prisma from "@/repos/prisma";

import { useState } from "react";

export default function Tasks({ tasks }) {
  const [counter, setCounter] = useState(0);

  return (
    <div className="p-5">
      {tasks.map((task) => (
        <div key={task.id} className="flex gap-x-2">
          <span className="font-semibold">{task.title}</span>
          <form action={toggleAction}>
            <button>{task.completed ? "Completed" : "Not completed"}</button>
            <input type="text" hidden name="title" value={task.title} />
          </form>
          <span>{task.date.toISOString()}</span>
        </div>
      ))}
      <form action={createAction} className="flex gap-x-2 items-center mt-5">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className="border rounded-md p-1"
        />
      </form>
      <button onClick={(e) => setCounter((oldCounter) => oldCounter + 1)}>
        {counter}
      </button>
    </div>
  );
}
