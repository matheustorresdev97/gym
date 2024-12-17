import { Image, Text } from "react-native";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { Controller, useForm } from 'react-hook-form';

import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";

import { Input } from "@/components/input";
import { Button } from "@/components/button";

type FormData = {
    email: string;
    password: string;
}

import Logo from '@/assets/logo.svg';

import { useAuth } from "@/contexts/AuthContext";
import { AppError } from "@/utils/AppError";
import { useToast } from "@/components/ui/toast";
import { ToastMessage } from "@/components/toast-message";


export default function SignIn() {
    const { singIn } = useAuth();

    const toast = useToast();

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>()

    function handleNewAccount() {
        router.navigate('/(auth)/sign-up');
    }

    async function handleSignIn({ email, password }: FormData) {
        try {
            await singIn(email, password);
        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'

            toast.show({
                placement: 'top',
                render: ({ id }) => (
                    <ToastMessage
                        id={id}
                        action="error"
                        title={title}
                        onClose={() => toast.close(id)}
                    />
                ),
            })
        }
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

                    <Center className="gap-2">
                        <Heading className="text-colors-gray100">Acesse sua conta</Heading>
                        <Controller
                            control={control}
                            name="email"
                            rules={{ required: 'Informe o e-mail' }}
                            render={({ field: { onChange } }) => (
                                <Input
                                    placeholder="E-mail"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onChangeText={onChange}
                                    errorMessage={errors.email?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password"
                            rules={{ required: 'Informe a senha' }}
                            render={({ field: { onChange } }) => (
                                <Input
                                    placeholder="Senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    errorMessage={errors.password?.message}
                                />
                            )} />

                        <Button title="Acessar" onPress={handleSubmit(handleSignIn)} />
                    </Center>

                    <Center className="flex-1 justify-end mt-4">
                        <Text className="text-colors-gray100 text-sm mb-3 font-body">
                            Ainda não tem acesso?
                        </Text>
                        <Button
                            title="Criar conta"
                            variant="outline"
                            onPress={handleNewAccount}
                        />
                    </Center>
                </VStack>
            </VStack>
        </ScrollView>
    )
}