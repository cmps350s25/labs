import { promises as fs } from "fs";

export async function get() {
  return JSON.parse(await fs.readFile("repos/data/projects.json"));
}
