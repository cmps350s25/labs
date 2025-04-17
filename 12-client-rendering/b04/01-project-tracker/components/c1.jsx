// import React from "react";

export default function C1({ children, color }) {
  // console.log(children);
  return (
    <div className="border rounded-md p-5">
      <h2 className={`text-2xl font-semibold text-${color}-500`}>C1</h2>
      {children}
    </div>
  );
}
