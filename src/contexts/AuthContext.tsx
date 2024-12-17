import { api } from "@/services/api";
import { storageUserGet, storageUserRemove, storageUserSave } from "@/storage/storageUser";
import { router } from "expo-router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type UserProps = {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

export type AuthContextDataProps = {
    user: UserProps;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    singIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);


export function AuthContextProvider({ children }: AuthContextProviderProps) {

    const [user, setUser] = useState<UserProps>({} as UserProps)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

    async function singIn(email: string, password: string) {
        try {
            const { data } = await api.post('/sessions', { email, password });

            if (data.user && data.token) {
                setUser(data.user);
                storageUserSave(data.user)

                router.navigate('/(root)/home');
            }
        } catch (error) {
            throw error
        }
    }

    async function signOut() {
        try {
            setIsLoadingUserStorageData(true);
            setUser({} as UserProps);
            await storageUserRemove();
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function loadUserData() {
        try {
            const userLogged = await storageUserGet();

            if (userLogged) {
                setUser(userLogged);
            }
        } catch (error) {
            throw error
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }
    useEffect(() => {
        loadUserData()
    }, [])

    return (
        <AuthContext.Provider value={{ user, singIn, signOut, isLoading, setIsLoading, isLoadingUserStorageData }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}