import { Tabs } from "expo-router";

import HomeSvg from '@/assets/home.svg'
import HistorySvg from '@/assets/history.svg'
import ProfileSvg from '@/assets/profile.svg'

export default function RootLayout() {

    return (
        <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
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
            <Tabs.Screen name="exercise" />
        </Tabs>

    )
}