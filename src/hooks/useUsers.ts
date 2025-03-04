import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { API_URL } from "../utils/consts";
import { TUser } from "../services/UserServices/types";

const fetchUsers = () => fetch(`${API_URL}/usuarios`).then((res) => res.json());

export default function useUsers() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["usuarios"],
    queryFn: fetchUsers,
    initialData: keepPreviousData,
  });

  return {
    users: (data ?? []) as TUser[],
    usersLoading: isLoading,
    reloadUsers: refetch,
  };
}
