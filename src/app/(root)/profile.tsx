import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native'
import { Controller, useForm } from 'react-hook-form';

import { VStack } from "@/components/ui/vstack";
import { Center } from '@/components/ui/center';

import { ScreenHeader } from "@/components/screen-header";
import { UserPhoto } from '@/components/user-photo';
import { Input } from '@/components/input';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/button';
import { useToast } from '@/components/ui/toast'

import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { ToastMessage } from '@/components/toast-message';
import { useAuth } from '@/contexts/AuthContext';

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    old_password: string;
    confirm_password: string;
}


export default function Profile() {
    const [userPhoto, setUserPhoto] = useState(
        'https://github.com/matheustorresdev97.png',
    )

    const toast = useToast()
    const { user } = useAuth();
    const { control, handleSubmit } = useForm<FormDataProps>({
        defaultValues: {
            name: user.name,
            email: user.email
        }
    });

    async function handleUserPhotoSelect() {
        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (photoSelected.canceled) {
                return
            }

            const photoUri = photoSelected.assets[0].uri
            if (photoUri) {
                const photoInfo = (await FileSystem.getInfoAsync(photoUri)) as {
                    size: number
                }

                if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
                    return toast.show({
                        placement: 'top',
                        render: ({ id }) => (
                            <ToastMessage
                                id={id}
                                action="error"
                                title="Essa imagem é muito grande. Escolha uma de até 5MB"
                                onClose={() => toast.close(id)}
                            />
                        ),
                    })
                }

                setUserPhoto(photoSelected.assets[0].uri)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function handleProfileUpdate(data: FormDataProps) {
        console.log(data);
    }

    return (
        <VStack className="flex-1 bg-colors-gray700">
            <ScreenHeader title="Perfil" />

            <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
                <Center className='mt-6 px-10'>
                    <UserPhoto
                        source={{ uri: userPhoto }}
                        alt="Imagem do usuário"
                        height={64}
                        width={64}
                    />
                    <TouchableOpacity onPress={handleUserPhotoSelect}>
                        <Text
                            className='text-colors-green500 font-heading text-base mt-2 mb-8'
                        >
                            Alterar Foto
                        </Text>
                    </TouchableOpacity>

                    <Center className='w-full gap-4'>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    className='bg-colors-gray600'
                                    placeholder='Nome'
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )} />

                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    className='bg-colors-gray600'
                                    placeholder="E-mail"
                                    isReadOnly
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )} />
                    </Center>

                    <Heading
                        className='self-start font-heading text-colors-gray200 text-base mt-12 mb-2'
                    >
                        Alterar senha
                    </Heading>
                    <Center className='w-full gap-4'>
                        <Controller
                            control={control}
                            name="old_password"
                            render={({ field: { onChange } }) => (
                                <Input
                                    className='bg-colors-gray600'
                                    placeholder="Senha antiga"
                                    secureTextEntry
                                    onChangeText={onChange}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange } }) => (
                                <Input
                                    className='bg-colors-gray600'
                                    placeholder="Nova senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="confirm_password"
                            render={({ field: { onChange } }) => (
                                <Input
                                    className='bg-colors-gray600'
                                    placeholder="Confirme a nova senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                />
                            )}
                        />

                        <Button
                            title="Atualizar"
                            className='mt-4'
                            onPress={handleSubmit(handleProfileUpdate)}
                        />
                    </Center>
                </Center>
            </ScrollView>
        </VStack>
    )
}