"use client";

import { useState, useEffect, useRef } from "react";
import { readAccounts } from "@/app/actions";

export default function Accounts({ client }) {
  const [accounts, setAccounts] = useState([]);
  const [stale, setStale] = useState(true);
  const accountType = useRef();

  useEffect(() => {
    async function get() {
      // const res = await fetch(`/api/client/${client}/accounts`);
      // let data = [];
      // if (res.ok) {
      // data = await res.json();
      // }
      // return data;
      const data = await readAccounts(client);
      setAccounts(data);
      return data;
    }

    if (stale) {
      // get().then((data) => setAccounts(data));
      get().then();
      setStale(false);
    }

    return () => {};
  }, [stale]);

  return (
    <div>
      {accounts.map((account) => (
        <div key={account.id} className="flex gap-x-2">
          <span>{account.type}</span>
          <span>{account.balance}</span>
        </div>
      ))}
      <form
        onSubmit={async (event) => {
          // event.stopPropagation();
          event.preventDefault();
          const res = await fetch(`/api/clients/${client}`, {
            method: "POST",
            body: JSON.stringify({
              type: accountType.current.value,
            }),
          });
          let account;
          if (res.ok) {
            account = await res.json();
          }
          // setAccounts([...accounts, account]);
          // fetch back again
          setStale(true);
          console.log(account);
          accountType.current.value = "";
        }}
      >
        <input
          ref={accountType}
          type="text"
          name="type"
          required
          className="border rounded-md p-1"
        />
      </form>
    </div>
  );
}
