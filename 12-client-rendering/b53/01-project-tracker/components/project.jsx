"use client";

import Tasks from "@/components/tasks";

export default function Project({ children, project, callback }) {
  // function childCallback(event, title) {
  //   callback(event, project.title, title);
  // }

  return (
    <div>
      <p className="font-semibold mb-2">{project.title}</p>
      <Tasks tasks={project.tasks} callback={callback} />
    </div>
  );
}
