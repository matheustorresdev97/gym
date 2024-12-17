import { createContext, ReactNode, useContext, useState } from "react";

export type UserProps = {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

export type AuthContextDataProps = {
    user: UserProps;
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);


export function AuthContextProvider({ children }: AuthContextProviderProps) {

    const [user, setUser] = useState({
        id: '1',
        name: 'Matheus',
        email: 'matheus@email.com',
        avatar: 'matheus.png'
    })

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}