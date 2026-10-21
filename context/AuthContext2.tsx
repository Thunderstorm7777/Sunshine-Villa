"use client"

import { createContext, ReactNode, useContext, useState } from "react";

    type AuthUser = {
  id: number;
  FirstName?: string;
  LastName?: string;
  email: string;
  age: number;
  role: string;
  phone:string
  password:string
}


type AuthContentType = {
  user: AuthUser | null,
  setUser: (user: AuthUser | null) => void
}

 const AuthContext = createContext<AuthContentType | undefined>(undefined)

export default function AuthContext2 ({
  children,
}: {
  children: ReactNode;
}){
      const [user, setUser] = useState<AuthUser | null>(null)
      return (
       <AuthContext.Provider value={{ user, setUser }}>
          {children}
        </AuthContext.Provider>
      )
}

export function useAuth(){
    const context = useContext(AuthContext)
    if(!context)
    {
        throw new Error("useAuth must be used inside AuthProvider")
    }
    return context
}