import { Tabs } from "expo-router";

export default function RootLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="home" />
            <Tabs.Screen name="history" />
            <Tabs.Screen name="profile" />
            <Tabs.Screen name="exercise" />
        </Tabs>

    )
}