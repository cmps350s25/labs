"use client";

import { useState, useEffect } from "react";

export default function Sample({ users }) {
  const [loaded, setLoaded] = useState(0);
  const [_users, setUsers] = useState(users);
  // const [_users, setUsers] = useState([]);

  // useEffect(() => {
  //   fetch("/api/users")
  //     .then((res) => res.json())
  //     .then((data) => setUsers(data));
  // }, []);

  return (
    <div className="p-5">
      <button
        className="border rounded-md p-2"
        onClick={async () => {
          setLoaded((oldValue) => oldValue + 1);
          const res = await fetch("/api/users");
          let data = [];
          if (res.ok) {
            data = await res.json();
            setUsers(data);
          }
        }}
      >
        {loaded}
      </button>
      <div className="mt-5">
        {_users.map((user) => (
          <div className="mb-5" key={user.id}>
            <div className="flex gap-x-2 my-2">
              <span className="font-semibold">{user.name}</span>
              <span className="font-mono">{user.email}</span>
            </div>
            <div className="grid gap-y-1">
              {user.posts.map((post) => (
                <>
                  <div className="flex gap-x-2" key={post.id}>
                    <span>{post.title}</span>
                    <span>
                      {post.published ? "published" : "not published"}
                    </span>
                  </div>
                  <p className="text-sm">{post.content}</p>
                </>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
