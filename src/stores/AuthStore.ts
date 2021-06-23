import create, { SetState } from "zustand";

export interface User {
  objectId?: string;
  address: string;
  clientid: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  role: "client" | "admin" | "user";
}

type ISet = {
  loginError: string;
  setLoginError: (error: string) => void;
  loggedInUser?: User;
  setLoginUser: (user: User) => void;
};

export const useAuthStore = create<ISet>((set: SetState<ISet>) => ({
  loginError: "",
  setLoginError: (error: string) =>
    set((state: ISet) => ({ loginError: error })),
  loggedInUser: undefined,
  setLoginUser: (user: User) => set((state: ISet) => ({ loggedInUser: user })),
}));
