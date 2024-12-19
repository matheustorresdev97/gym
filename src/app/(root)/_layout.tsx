import { Tabs } from "expo-router";

import HomeSvg from '@/assets/home.svg'
import HistorySvg from '@/assets/history.svg'
import ProfileSvg from '@/assets/profile.svg'

import { Platform } from "react-native";
import { colors } from "@/styles/colors";
import { useAuth } from "@/contexts/AuthContext";
import { Loading } from "@/components/loading";

export default function RootLayout() {

    const { isLoadingUserStorageData } = useAuth();

    if (isLoadingUserStorageData) {
        return <Loading />
    }

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.green500,
            tabBarInactiveTintColor: colors.gray200,
            tabBarStyle: {
                backgroundColor: colors.gray600,
                borderTopWidth: 0,
                height: Platform.OS === 'android' ? 'auto' : 96,
                paddingBottom: 40,
                paddingTop: 28,
            },
        }}>
            <Tabs.Screen name="home"
                options={{
                    tabBarIcon: ({ color }) => (
                        <HomeSvg fill={color} width={18} height={18} />
                    ),
                }}
            />
            <Tabs.Screen name="history"
                options={{
                    tabBarIcon: ({ color }) => (
                        <HistorySvg fill={color} width={18} height={18} />
                    ),
                }}
            />
            <Tabs.Screen name="profile"
                options={{
                    tabBarIcon: ({ color }) => (
                        <ProfileSvg fill={color} width={18} height={18} />

                    ),
                }}
            />
            <Tabs.Screen
                name="exercise/[id]"
                options={{
                    href: null
                }}
            />
        </Tabs>

    )
}