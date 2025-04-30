"use client";

import { useState, useEffect } from "react";
import { getAccounts } from "@/app/actions";

export default function Accounts({ client }) {
  const [accounts, setAccounts] = useState([]);
  const [stale, setStale] = useState(true);

  useEffect(() => {
    // async function get() {
    //   const res = await fetch(`/{client}/accounts`);
    //   const data = await res.json();
    //   setAccounts(data);
    // }

    async function get() {
      setAccounts(await getAccounts(client));
    }

    if (stale) {
      get().then();
      setStale(false);
    }

    return () => {};
  }, [stale]);

  return (
    <div>
      {accounts.map((account) => (
        <>
          <div>
            <span>{account.type}</span>
            <span>{account.balance}</span>
          </div>
          <button
            onClick={() => {
              // mutation that modifies the state (accounts)
              // fetch("", {method: "POST"})
              setStale(true);
            }}
          ></button>
        </>
      ))}
    </div>
  );
}
