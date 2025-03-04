import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { TUser } from "../services/UserServices/types";

const useUser = create(
  persist<UserStore>(
    (set) => ({
      user: undefined,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUser;

type UserStore = {
  user?: TUser;
  setUser: (user: TUser) => void;
};
