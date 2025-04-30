"use client";

import { getClientAccounts } from "@/app/actions";

import { useState, useEffect } from "react";

export default function Accounts({ client }) {
  const [accounts, setAccounts] = useState([]);
  const [stale, setStale] = useState(true);

  useEffect(() => {
    //do stuff

    async function get() {
      // const res = await fetch("path");
      // let data = [];
      // if (res.ok) {
      //   data = await res.json();
      //   setAccounts(data);
      // }

      setAccounts(await getClientAccounts(client));
    }

    if (stale) {
      get().then();
      setStale(false);
    }

    // cleanup
    return () => {};
  }, [stale]);

  return (
    <div>
      {accounts.map((account) => (
        <div key={account.id}>{account.type}</div>
      ))}
      <button onClick={(e) => setStale(true)}>Reload</button>
    </div>
  );
}
