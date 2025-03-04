import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { API_URL } from "../utils/consts";
import { TPost } from "../utils/types";

export const fetchGroupPosts = (id: number): Promise<TPost[]> =>
  fetch(`${API_URL}/posts/${id}/group-posts`).then((res) => res.json());

export default function useGroupPosts(id: number) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchGroupPosts(id),
    initialData: keepPreviousData,
  });

  return {
    posts: data as TPost[],
    postsLoading: isLoading,
    reloadPosts: refetch,
  };
}
