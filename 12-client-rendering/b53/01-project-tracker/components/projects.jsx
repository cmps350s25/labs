"use client";

import { useState } from "react";
import Project from "@/components/project";

export default function Projects({ children, projects, callback }) {
  const [_projects, _setProjects] = useState(projects);

  function handle(event, title) {
    if (event === "toggle") {
      _setProjects(
        _projects.map((project) => ({
          ...project,
          tasks: project.tasks.map((task) => {
            if (task.title === title) {
              return {
                ...task,
                checked: !task.checked,
              };
            } else {
              return task;
            }
          }),
        }))
      );

      callback(_projects);
    } else if (event === "remove") {
      _setProjects(
        _projects.map((project) => ({
          ...project,
          tasks: project.tasks.filter((task) => task.title !== title),
        }))
      );

      callback(_projects);
    }
  }

  return (
    <div className="border rounded-md p-5 grid gap-y-2">
      {_projects.map((project) => (
        <Project key={project.title} project={project} callback={handle} />
      ))}
    </div>
  );
}
