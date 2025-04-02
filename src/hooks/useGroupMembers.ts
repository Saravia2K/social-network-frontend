import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { API_URL } from "../utils/consts";
import { TGroupMember } from "../utils/types";

export const fetchGroupMembers = (id: number): Promise<TGroupMember[]> =>
  fetch(`${API_URL}/user-groups/${id}/my-groups`).then((res) => res.json());

export default function useGroupMembers(id: number) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user-groups", id],
    queryFn: () => fetchGroupMembers(id),
    initialData: keepPreviousData,
  });

  return {
    users: data as TGroupMember[],
    usersLoading: isLoading,
    reloadUsers: refetch,
  };
}
