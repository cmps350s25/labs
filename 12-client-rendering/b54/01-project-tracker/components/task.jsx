// "use client";

// import React from "react";
// import { useState, useEffect } from "react";
import { CircleCheckBig, Circle, CircleX } from "lucide-react";

export default function Task({ title, checked, callback }) {
  // const [_checked, setChecked] = useState(checked);

  function toggle() {
    console.log("toggle");
    // setChecked(oldValue => newValue)
    // setChecked(newValue);
    // setChecked((oldChecked) => !oldChecked);
    // setChecked(!_checked);
    // console.log(_checked);

    callback("toggle", title);
    // "use server";
  }

  // useEffect(async () => {
  //   console.log("mounted", title);
  //   // function listener() {}
  //   // addEventListener("keydown", listener);
  //   // return () => {
  //   //   removeEventListener("keydown", listener);
  //   // };
  //   // const something = await fetch();
  //   // setState(await something.json());
  // }, []);

  // useEffect(() => {
  //   console.log("effect: ", checked);
  // }, [checked]);

  return (
    <div className="flex justify-between">
      <p>{title}</p>
      <div className="flex gap-x-1.5">
        <button onClick={toggle}>
          {checked ? <CircleCheckBig size={18} /> : <Circle size={18} />}
        </button>
        <button disabled={!checked}>
          <CircleX size={18} />
        </button>
      </div>
    </div>
  );
}
