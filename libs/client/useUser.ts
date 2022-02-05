import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";

export default function useUser() {
  const router = useRouter();
  const [user, setUser] = useState();
  console.log("user");

  useLayoutEffect(() => {
    fetch("/api/users/me")
      .then((response) => response.json())
      .then((data) => {
        if (!data.ok) {
          return router.push("/enter");
        }
        setUser(data.profile);
      });
  }, [router]);

  return user;
}
