import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { API_URL } from "../utils/consts";
import { TGroup } from "../utils/types";

const fetchGroups = () => fetch(`${API_URL}/groups`).then((res) => res.json());

export default function useGroups() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
    initialData: keepPreviousData,
  });

  return {
    groups: (data ?? []) as TGroup[],
    groupsLoading: isLoading,
    reloadGroups: refetch,
  };
}
