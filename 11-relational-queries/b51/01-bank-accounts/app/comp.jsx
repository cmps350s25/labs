"use client";

import { useState } from "react";

export default function Comp({ data }) {
  const [clients, setClients] = useState(data);
  return (
    <div>
      {clients.map((client) => (
        <div key={client.id}>{client.email}</div>
      ))}
    </div>
  );
}
