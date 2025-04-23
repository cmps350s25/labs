// "use client";
import * as users from "@/repos/users";
import Sample from "@/components/sample";

export default async function Home() {
  //   useEffect(() => {
  //   const users = fetch("/api/users").then(res => res.json());
  // }) ;
  return (
    <div>
      <Sample users={await users.read()} />
    </div>
  );
}
