import { api } from "@/services/api";
import { createContext, ReactNode, useContext, useState } from "react";

export type UserProps = {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

export type AuthContextDataProps = {
    user: UserProps;
    singIn: (email: string, password: string) => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);


export function AuthContextProvider({ children }: AuthContextProviderProps) {

    const [user, setUser] = useState<UserProps>({} as UserProps)

    async function singIn(email: string, password: string) {
        try {
            const { data } = await api.post('/sessions', { email, password });

            if (data.user) {
                setUser(data.user);
            }
        } catch (error) {
            throw error
        }
    }

    return (
        <AuthContext.Provider value={{ user, singIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}