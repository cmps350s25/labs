// import React from "react";

export default function C1({ children, attr, color }) {
  return (
    <div className={`border rounded-md mb-2 p-5 border-${color}-500`}>
      <h2>C1</h2>
      <p>{attr}</p>
      {children}
    </div>
  );
}
