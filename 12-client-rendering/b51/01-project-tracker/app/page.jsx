// import C1 from "@/components/c1";
// import C2 from "@/components/c2";

import Projects from "@/components/projects";
import { get } from "@/repos/projects";

export default async function Home() {
  const projects = await get();

  // console.log(projects);

  async function callback(event, title) {
    "use server";
    // await save();
  }

  return (
    <div className="max-w-[600px] mx-auto">
      <Projects projects={projects} callback={callback} />
    </div>
  );
}
