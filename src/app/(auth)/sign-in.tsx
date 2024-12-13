import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { Image, Text } from "react-native";

import Logo from '@/assets/logo.svg'

export default function SignIn() {
    return (
        <VStack className="flex-1 bg-gray700">
            <Image
                className="w-full h-[624px] absolute"
                source={require("@/assets/background.png")}
                defaultSource={require("@/assets/background.png")}
                alt="Pessoas treinando"
            />

            <Center className="my-24">
                <Logo />

                <Text className="text-gray100 text-sm">
                    Treine sua mente e seu corpo
                </Text>
            </Center>
        </VStack>
    )
}