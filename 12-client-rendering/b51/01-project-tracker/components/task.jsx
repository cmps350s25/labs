"use client";

// import React from "react";
import { Square, SquareCheckBig, CircleX } from "lucide-react";

export default function Task({ title, checked, callback }) {
  function toggle() {
    callback("toggle", title);
    // fetch
  }

  function remove() {
    callback("remove", title);
  }

  return (
    <div className="flex justify-between">
      <p>{title}</p>
      <div className="flex gap-x-2">
        <button onClick={toggle}>
          {checked ? <SquareCheckBig /> : <Square />}
        </button>
        <button disabled={!checked} onClick={remove}>
          <CircleX />
        </button>
      </div>
    </div>
  );
}
