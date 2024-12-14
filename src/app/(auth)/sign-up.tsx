import { Image, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";

import { Input } from "@/components/input";
import { Button } from "@/components/button";


import Logo from '@/assets/logo.svg';

export default function SignUp() {
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
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
                    <Center className="flex-1 gap-2">
                        <Heading className="text-gray100">Crie sua conta</Heading>

                        <Input placeholder="Nome" />

                        <Input
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <Input placeholder="Senha" secureTextEntry />

                        <Button title="Criar e acessar" />
                    </Center>

                    <Button className="mt-12" title="Voltar para o login" variant="outline" />

                </VStack>
            </VStack>
        </ScrollView>
    )
}