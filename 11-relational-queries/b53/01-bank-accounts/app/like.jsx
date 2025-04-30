"use client";

import { useState, useEffect } from "react";
import { like } from "@/app/actions";

export default function Like({ email, likes }) {
  // const [_likes, setLikes] = useState(likes);

  // useEffect(() => {
  //   setLikes(likes);
  // }, [likes]);

  return (
    <button
      className="border rounded-md p-1 cursor-pointer"
      onClick={async () => {
        console.log("like", email);
        // setLikes(_likes + 1);

        const newLikes = await like({ email: email });
        // const res = await fetch("/api/like", {
        //   method: "PUT",
        //   body: JSON.stringify({ email: email }),
        // });
        // const newLikes = await res.json();
        console.log(newLikes);
        // setLikes(newLikes);
      }}
    >
      Like {likes}
    </button>
  );
}
