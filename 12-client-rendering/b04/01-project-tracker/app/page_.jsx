// import React from "react";
import C1 from "@/components/c1";

export default function Home() {
  return (
    <>
      <C1 color="blue">
        <C2></C2>
        <p>Paragraph</p>
        <C2></C2>
        <C2></C2>
      </C1>
      {/* {C1({color: "red"})} */}
      <C2></C2>
      <C1 color="red"></C1>
      <C1></C1>
    </>
  );
}

function C2() {
  return <h2>C2</h2>;
}

// f(props) => ui
