import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { API_URL } from "../utils/consts";
import { TGroupMember, TModerator } from "../utils/types";

export const fetchModeratos = (id: number): Promise<TGroupMember[]> =>
  fetch(`${API_URL}/moderators/${id}/my-groups`).then((res) => res.json());

export default function useModerators(id: number) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["moderators", id],
    queryFn: () => fetchModeratos(id),
    initialData: keepPreviousData,
  });

  return {
    moderators: data as TModerator[],
    moderatorsLoading: isLoading,
    reloadModerators: refetch,
  };
}
