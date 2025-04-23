// import React from "react";
import * as users from "@/repos/users";

export default async function Home() {
  return (
    <div className="p-5 grid gap-y-3">
      {(await users.get()).map((user) => (
        <div key={user.id}>
          <div className="flex gap-x-2">
            <span className="font-semibold">{user.name}</span>
            <span className="font-mono">{user.email}</span>
          </div>
          <div>
            {user.posts.map((post) => (
              <div key={post.id}>
                <span>{post.title}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
