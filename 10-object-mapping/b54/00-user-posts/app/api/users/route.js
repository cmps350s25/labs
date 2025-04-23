import * as users from "@/repos/users";

export async function GET(request) {
  return Response.json(await users.get());
}
