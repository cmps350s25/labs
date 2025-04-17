"use client";

// import React from "react";
import Tasks from "@/components/tasks";

export default function Project({ children, project, callback }) {
  return (
    <div>
      <p className="font-semibold">{project.title}</p>
      <Tasks tasks={project.tasks} callback={callback}></Tasks>
    </div>
  );
}
