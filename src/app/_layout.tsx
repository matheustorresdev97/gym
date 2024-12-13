import { Stack } from "expo-router"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import {
    useFonts,
    Roboto_700Bold,
    Roboto_400Regular,
} from '@expo-google-fonts/roboto'

export default function RootLayout() {
    const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular })

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            />
        </GestureHandlerRootView>
    )
}