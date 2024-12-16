import { useState } from 'react'
import { Image, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";

import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";

import { Input } from "@/components/input";
import { Button } from "@/components/button";

import Logo from '@/assets/logo.svg';

import { Controller, useForm } from 'react-hook-form'

type FormDataProps = {
    name: string
    email: string
    password: string
    password_confirm: string
}

export default function SignUp() {
    const { control, handleSubmit } = useForm<FormDataProps>()

    function handleGoBack() {
        router.back()
    }

    function handleSignUp({
        name,
        email,
        password,
        password_confirm,
    }: FormDataProps) {
        console.log({ name, email, password, password_confirm })
    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            <VStack className="flex-1 bg-colors-gray700">
                <Image
                    className="w-full h-[624px] absolute"
                    source={require("@/assets/background.png")}
                    defaultSource={require("@/assets/background.png")}
                    alt="Pessoas treinando"
                />

                <VStack className="flex-1 px-10 pb-16">
                    <Center className="my-24">
                        <Logo />
                        <Text className="text-colors-gray100 text-sm">
                            Treine sua mente e seu corpo
                        </Text>
                    </Center>
                    <Center className="flex-1 gap-2">
                        <Heading className="text-colors-gray100">Crie sua conta</Heading>

                        <Controller
                            control={control}
                            name="name"
                            rules={{
                                required: 'Informe o nome',
                            }}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Nome"
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="E-mail"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password_confirm"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Confirme a Senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    value={value}
                                    onSubmitEditing={handleSubmit(handleSignUp)}
                                    returnKeyType="send"
                                />
                            )}
                        />


                        <Button
                            title="Criar e acessar"
                            onPress={handleSubmit(handleSignUp)}
                        />
                    </Center>


                    <Button
                        title="Voltar para o login"
                        variant="outline"
                        onPress={handleGoBack}
                    />
                </VStack>
            </VStack>
        </ScrollView>
    )
}