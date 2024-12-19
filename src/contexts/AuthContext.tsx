import { api } from "@/services/api";
import { storageAuthTokenRemove, storageAuthTokenSave } from "@/storage/storageAuthToken";
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
    updateUserProfile: (userUpdated: UserProps) => Promise<void>;
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

    async function userAndTokenUpdate(userData: UserProps, token: string) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setUser(userData);
    }

    async function storageUserAndTokenSave(userData: UserProps, token: string) {
        try {
            setIsLoadingUserStorageData(true);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await storageUserSave(userData);
            await storageAuthTokenSave(token);

        } catch (error) {
            throw error
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function singIn(email: string, password: string) {
        try {
            const { data } = await api.post('/sessions', { email, password });

            if (data.user && data.token) {
                await storageUserAndTokenSave(data.user, data.token);
                userAndTokenUpdate(data.user, data.token)

                router.navigate('/(root)/home');
            }
        } catch (error) {
            throw error
        } finally {
            setIsLoadingUserStorageData(false);
            setIsLoading(false);
        }
    }

    async function signOut() {
        try {
            setIsLoadingUserStorageData(true);
            setUser({} as UserProps);
            await storageUserRemove();
            await storageAuthTokenRemove();
            router.navigate('/(auth)/sign-in');
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function updateUserProfile(userUpdated: UserProps) {
        try {
            setUser(userUpdated);
            await storageUserSave(userUpdated);
        } catch (error) {
            throw error;
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
        <AuthContext.Provider value={{ user, singIn, updateUserProfile, signOut, isLoading, setIsLoading, isLoadingUserStorageData }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}