"use client";

// import React from "react";
import { CircleCheckBig, Circle, Trash2 } from "lucide-react";

export default function Task({ children, title, checked, callback }) {
  function toggle() {
    callback("toggle", title);
  }

  function remove() {
    callback("remove", title);
  }

  return (
    <>
      <div className="flex justify-between">
        <div>{title}</div>
        <div className="flex gap-x-2">
          <button onClick={toggle}>
            {checked ? <CircleCheckBig size={18} /> : <Circle size={18} />}
          </button>
          <button onClick={remove}>
            <Trash2 size={18} />
          </button>
        </div>
        {/* <div>{children}</div> */}
      </div>
    </>
  );
}
