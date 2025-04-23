"use client";

import { useState, useEffect } from "react";

export default function Users({ data }) {
  const [counter, setCounter] = useState(0);
  const [users, setUsers] = useState(data);
  const [stale, setStale] = useState(false);

  useEffect(() => {
    if (stale) {
      fetch("http://localhost:3000/api/users")
        .then((res) => res.json())
        .then((data) => setUsers(data));

      // window.localStorage.set("updated", "true");
      // document.addEventListener(type, listener)

      setStale(false);
    }
  }, [stale]);

  return (
    <div>
      <button
        className="border rounded-md p-2"
        onClick={(e) => {
          setCounter((oldCounter) => oldCounter + 1);
          // const user = fetch("/api/users", {method: "POST"}) // mutation
          // setUsers((oldUsers) => [...oldUsers, user]);
          setStale(true);
        }}
      >
        {counter}
      </button>

      <div className="grid gap-y-5">
        {users.map((user) => (
          <div key={user.id} className="flex gap-x-2">
            <span>{user.name}</span>
            <span>{user.email}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
