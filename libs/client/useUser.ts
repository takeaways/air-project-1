import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

const fetcher = (url: string) => {
  return fetch(url).then((response) => response.json());
};

export default function useUser() {
  const { data, error } = useSWR("/api/users/me", fetcher);
  const router = useRouter();

  useEffect(() => {
    if (data && !data.ok) {
      router.push("/enter");
    }
  }, [router, data]);
  return {
    user: data?.profile,
    isLoading: !data && !error,
  };
}
