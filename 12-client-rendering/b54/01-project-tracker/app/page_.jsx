// import React from "react";
import C1 from "@/components/c1";

export default function Home() {
  return (
    <div>
      <C1 attr="hello" color="red">
        <C2></C2>
        <C2></C2>
        <C1 color="amber"></C1>
        {/* {C1()} */}
      </C1>
      {/* {C1({ attr: "hello", color: "amber" })} */}
    </div>
  );
}

function C2() {
  return <h3>C2</h3>;
}
