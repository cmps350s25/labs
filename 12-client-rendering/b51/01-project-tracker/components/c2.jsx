"use client";
import { useState, useEffect } from "react";

export default function C2({ children, color }) {
  console.log("render");
  const [value, setValue] = useState(1);
  const [dep, setDep] = useState(value * 2);

  const handleClick = function () {
    // value += 1;
    // setValue(value + 1);
    setValue((oldValue) => oldValue + 1);
    console.log("click");
  };

  useEffect(() => {
    console.log("loaded");

    return () => {
      console.log("unloaded");
    };
  }, []);

  useEffect(() => {
    setDep(value * 2);
    return () => {};
  }, [value]);

  return (
    <div className="border p-3 m-2 border-cyan-500">
      <h2 onClick={handleClick}>C2 {color}</h2>
      <p>{value}</p>
      <p>{dep}</p>
      {children}
    </div>
  );
}
