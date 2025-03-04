import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { API_URL } from "../utils/consts";
import { TPost } from "../utils/types";

export const fetchGeneralPosts = (): Promise<TPost[]> =>
  fetch(`${API_URL}/posts/without-group`).then((res) => res.json());

export default function useGeneralPosts() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchGeneralPosts,
    initialData: keepPreviousData,
  });

  return {
    posts: data as TPost[],
    postsLoading: isLoading,
    reloadPosts: refetch,
  };
}
