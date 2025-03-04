import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { API_URL } from "../utils/consts";
import { TGroup } from "../utils/types";

const fetchMyGroups = (id: number) =>
  fetch(`${API_URL}/groups/${id}/my-groups`).then((res) => res.json());

export default function useMyGroups(id: number) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["groups", id],
    queryFn: () => fetchMyGroups(id),
    initialData: keepPreviousData,
  });

  return {
    groups: (data ?? []) as TGroup[],
    groupsLoading: isLoading,
    reloadGroups: refetch,
  };
}
