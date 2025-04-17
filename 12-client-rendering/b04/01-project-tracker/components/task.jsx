"use client";
// import React from "react";
import { SquareCheckBig, Square, CircleX } from "lucide-react";

export default function Task({ title, checked, remove, toggle }) {
  return (
    <div className="flex justify-between">
      <div>{title}</div>
      <div className="flex gap-x-1.5">
        <button
          onClick={(e) => {
            toggle(title);
          }}
        >
          {checked ? <SquareCheckBig size={18} /> : <Square size={18} />}
        </button>
        <button
          onClick={(e) => {
            remove(title);
          }}
        >
          <CircleX size={18} />
        </button>
      </div>
    </div>
  );
}
