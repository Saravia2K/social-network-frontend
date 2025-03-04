import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { API_URL } from "../utils/consts";
import { TMessage } from "../utils/types";

const fetchMyMessages = (id: number) =>
  fetch(`${API_URL}/api/messages/${id}/my-messages`).then((res) => res.json());

export default function useMyMessages(id: number) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => fetchMyMessages(id),
    initialData: keepPreviousData,
  });

  return {
    messages: (data ?? []) as TMessage[],
    messagesLoading: isLoading,
    reloadMessages: refetch,
  };
}
