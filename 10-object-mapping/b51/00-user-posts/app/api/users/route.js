import * as users from "@/repos/users.js";

export async function GET(request) {
  return Response.json(await users.read());
}
