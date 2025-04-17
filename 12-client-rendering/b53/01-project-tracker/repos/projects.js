import { promises as fs } from "fs";

export async function load() {
  return JSON.parse(await fs.readFile("repos/data/projects.json"));
}

export async function save(projects) {
  return await fs.writeFile(
    "repos/data/projects.json",
    JSON.stringify(projects)
  );
}
