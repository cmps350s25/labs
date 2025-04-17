// import React from "react";
import Projects from "@/components/projects";
import { load, save } from "@/repos/projects";

export default async function Home() {
  const projects = await load();

  async function callback(_projects) {
    "use server";
    await save(_projects);
  }

  return <Projects projects={projects} callback={callback} />;
}
