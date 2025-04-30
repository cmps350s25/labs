"use client";

import { increaseLikesAction } from "@/app/actions";

export default function Like({ id, likes }) {
  return (
    <button
      onClick={async () => await increaseLikesAction(id)}
      className="border rounded-md p-1 cursor-pointer me-2"
    >
      Like {likes}
    </button>
  );
}
