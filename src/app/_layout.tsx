import "@/styles/global.css"
import { Stack } from "expo-router"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { StatusBar } from "react-native"
import {
    useFonts,
    Roboto_700Bold,
    Roboto_400Regular,
} from '@expo-google-fonts/roboto'
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider"

import { Loading } from "@/components/loading"
import { AuthContextProvider } from "@/contexts/AuthContext"


export default function RootLayout() {
    const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular })

    if (!fontsLoaded) {
        return <Loading />
    }

    return (
        <GestureHandlerRootView className="flex-1">
            <AuthContextProvider>
                <GluestackUIProvider>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor="transparent"
                        translucent
                    />
                    <Stack
                        screenOptions={{
                            headerShown: false,
                        }}
                    />
                </GluestackUIProvider>
            </AuthContextProvider>
        </GestureHandlerRootView>
    )
}