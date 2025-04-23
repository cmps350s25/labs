import { read } from "@/repos/users";

export default async function Home() {
  const users = await read();

  return (
    <div className="p-5 grid gap-y-5">
      {users.map((user) => (
        <div key={user.id}>
          <div className="flex gap-x-2">
            <span className="font-semibold">{user.name}</span>
            <span className="font-mono">{user.email}</span>
          </div>
          <div className="mt-2 grid gap-y-2">
            {user.posts.map((post) => (
              <div key={post.id}>
                <div className="flex gap-x-2">
                  <span className="underline">{post.title}</span>
                  <span>{post.date.toISOString()}</span>
                </div>
                <p>{post.content}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
