"use client";
import { useState, useEffect } from "react";

export default function C1({ children, prop }) {
  const [value, setValue] = useState(1);
  const [dep, setDep] = useState(value * 2);

  function increment() {
    console.log("increment");
    // setValue(value + 1);
    setValue((oldValue) => oldValue + 1);

    // setValue((oldValue) => {
    //   setDep(2 * value + 2);
    //   return value + 1;
    // });
  }

  useEffect(() => {
    console.log("loaded");

    return () => {}; // cleanup
  }, []);

  useEffect(() => {
    setDep(value * 2);
  }, [value]);

  console.log("render");

  return (
    <div className="border border-cyan-500 p-5 rounded-md my-2">
      <h2 onClick={increment}>C1 {prop}</h2>
      <div className="bold">{value}</div>
      <div className="bold">{dep}</div>
      {children}
    </div>
  );
}
