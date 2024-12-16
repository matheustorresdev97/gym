import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Image, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { router } from 'expo-router';

import { Center } from '@/components/ui/center';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { useToast } from '@/components/ui/toast';

import { Input } from '@/components/input';
import { Button } from '@/components/button';

import Logo from '@/assets/logo.svg';

import { api } from '@/services/api';
import { AppError } from '@/utils/AppError';
import { ToastMessage } from '@/components/toast-message';


const signUpSchema = z
    .object({
        name: z.string().nonempty('Informe o nome'),
        email: z.string().nonempty('Informe o e-mail').email('E-mail inválido'),
        password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
        password_confirm: z.string().nonempty('Confirme a senha'),
    })
    .superRefine(({ password, password_confirm }, ctx) => {
        if (password !== password_confirm) {
            ctx.addIssue({
                code: 'custom',
                path: ['password_confirm'],
                message: 'As senhas não coincidem',
            });
        }
    });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {

    const toast = useToast();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    });

    function handleGoBack() {
        router.back()
    }

    async function handleSignUp({ name, email, password }: SignUpFormData) {
        try {
            const response = await api.post('/users', { name, email, password });
            console.log(response.data);
        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError
                ? error.message
                : 'Não foi possível criar a conta. Tente novamente mais tarde';

            return toast.show({
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
                    <Center className="flex-1 gap-2">
                        <Heading className="text-colors-gray100">Crie sua conta</Heading>

                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Nome"
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.name?.message}
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
                                    errorMessage={errors.email?.message}
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
                                    errorMessage={errors.password?.message}
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
                                    errorMessage={errors.password_confirm?.message}
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