import { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity } from 'react-native'

import { VStack } from "@/components/ui/vstack";
import { Center } from '@/components/ui/center';

import { ScreenHeader } from "@/components/screen-header";
import { UserPhoto } from '@/components/user-photo';
import { Input } from '@/components/input';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/button';

import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { ToastMessage } from '@/components/toast-message';


export default function Profile() {
    const [userPhoto, setUserPhoto] = useState(
        'https://github.com/matheustorresdev97.png',
    )

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
                    return Alert.alert(
                        'Essa imagem é muito grande. Escolha uma de até 5MB',
                    )
                }

                setUserPhoto(photoSelected.assets[0].uri)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <VStack className="flex-1 bg-colors-gray700">
            <ScreenHeader title="Perfil" />

            <ToastMessage
                id="1"
                title="Mensagem de exemplo"
                description="asdasdakjsd asdajksdbasjdhasd"
                action="success"
                onClose={() => { }}
            />

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
                        <Input placeholder="Nome" className='bg-colors-gray600' />
                        <Input value="matheus@email.com" className='bg-colors-gray600' isReadOnly />
                    </Center>

                    <Heading
                        className='self-start font-heading text-colors-gray200 text-base mt-12 mb-2'
                    >
                        Alterar senha
                    </Heading>
                    <Center className='w-full gap-4'>
                        <Input placeholder="Senha antiga" className='bg-colors-gray600' secureTextEntry />
                        <Input placeholder="Nova senha" className='bg-colors-gray600' secureTextEntry />
                        <Input
                            placeholder="Confirme a nova senha"
                            className='bg-colors-gray600'
                            secureTextEntry
                        />
                        <Button title="Atualizar" />
                    </Center>
                </Center>
            </ScrollView>
        </VStack>
    )
}