"use client";

// import React from "react";
import { useState } from "react";
import Project from "@/components/project";

export default function Projects({ children, projects, callback }) {
  return (
    <div className="border rounded-md p-5">
      {projects.map((project) => (
        <Project
          key={project.title}
          project={project}
          callback={callback}
        ></Project>
      ))}
    </div>
  );
}
