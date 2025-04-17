// import React from "react";
import C1 from "@/components/c1";

export default function Home() {
  return (
    <>
      <C1 prop="cool">
        <C2></C2>
      </C1>
      <C1 prop="super"></C1>
      {/* {C1({ prop: "amazing" })} */}
      <C2>
        <C1></C1>
      </C2>
    </>
  );
}

function C2({ children }) {
  return (
    <div className="border border-amber-500 p-5 rounded-md my-2">
      <p>C2</p>
      {children}
    </div>
  );
}
