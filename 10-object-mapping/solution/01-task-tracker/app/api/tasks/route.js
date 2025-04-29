import * as tasks from "@/repos/tasks";

export async function GET(request, { params }) {
  try {
    const data = await tasks.get();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(
      { message: e.message },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const body = await request.json();
    const data = await tasks.add(body);

    return new Response(JSON.stringify(data), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(
      { message: e.message },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
