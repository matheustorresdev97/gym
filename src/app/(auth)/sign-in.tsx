import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Image, Text } from "react-native";

import Logo from '@/assets/logo.svg';

import { Input } from "@/components/input";

export default function SignIn() {
    return (
        <VStack className="flex-1 bg-gray700">
            <Image
                className="w-full h-[624px] absolute"
                source={require("@/assets/background.png")}
                defaultSource={require("@/assets/background.png")}
                alt="Pessoas treinando"
            />

            <VStack className="flex-1 px-10 pb-16">
                <Center className="my-24">
                    <Logo />
                    <Text className="text-gray100 text-sm">
                        Treine sua mente e seu corpo
                    </Text>
                </Center>

                <Center className="gap-2">
                    <Heading className="text-gray100">Acesse sua conta</Heading>
                    <Input placeholder="E-mail" />
                    <Input placeholder="Senha" />
                </Center>
            </VStack>
        </VStack>
    )
}