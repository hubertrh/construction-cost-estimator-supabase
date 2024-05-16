"use client";

import { User } from "@supabase/supabase-js";
import { createContext } from "react";

type UserProviderProps = {
  userData: { user: User };
  children: React.ReactNode;
};

export const UserContext = createContext<User | null>(null);

export default function UserProvider({
  userData,
  children,
}: UserProviderProps) {
  return (
    <UserContext.Provider value={userData.user}>
      {children}
    </UserContext.Provider>
  );
}
