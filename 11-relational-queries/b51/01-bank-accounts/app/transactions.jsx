"use client";

import { useState, useEffect, useRef } from "react";

export default function Transactions({ client, account }) {
  const [transactions, setTransactions] = useState([]);
  const [stale, setStale] = useState(true);
  const tranType = useRef();
  const tranAmount = useRef();

  useEffect(() => {
    async function get() {
      const res = await fetch(`/api/${client}/${account}`);
      if (res.ok) {
        const data = await res.json();
        setTransactions(data);
      }
    }

    if (stale) {
      get().then();
      setStale(false);
    }
    // return () => {};
  }, [stale]);

  async function handleDelete(event, transaction) {
    // event.stopPropagation();
    // event.preventDefault();

    try {
      const res = await fetch(`/api/${client}/${account}/${transaction}`, {
        method: "DELETE",
      }); // mutation;
      if (res.ok) {
        const data = await res.json();
        setStale(true);
      }
    } catch (e) {}
  }

  async function handleAdd(event) {
    try {
      // alert(
      //   JSON.stringify({
      //     type: tranType.current.value,
      //     amount: tranAmount.current.value,
      //   })
      // );

      const res = await fetch(`/api/${client}/${account}`, {
        method: "POST",
        body: JSON.stringify({
          type: tranType.current.value,
          amount: tranAmount.current.value,
        }),
      }); // mutation;
      if (res.ok) {
        const data = await res.json();
        setStale(true);
      }
    } catch (e) {}
  }

  return (
    <>
      <div>
        {transactions.map((transaction) => (
          <div key={transaction.id}>
            <span>{transaction.type}</span>
            <span>{transaction.amount}</span>
            <button onClick={(e) => handleDelete(e, transaction.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <form>
        <label>Type</label>
        <select ref={tranType}>
          <option value="withdraw">Withdraw</option>
          <option value="deposit">Deposit</option>
        </select>
        <label>Amount</label>
        <input ref={tranAmount} type="numeric" />
        <button onClick={handleAdd}>Add</button>
      </form>
    </>
  );
}
