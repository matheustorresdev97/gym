import { ScrollView, Text, TouchableOpacity } from 'react-native'

import { VStack } from "@/components/ui/vstack";
import { Center } from '@/components/ui/center';

import { ScreenHeader } from "@/components/screen-header";
import { UserPhoto } from '@/components/user-photo';
import { Input } from '@/components/input';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/button';


export default function Profile() {
    return (
        <VStack className="flex-1 bg-colors-gray700">
            <ScreenHeader title="Perfil" />

            <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
                <Center className='mt-6 px-10'>
                    <UserPhoto
                        source={{ uri: 'https://github.com/matheustorresdev97.png' }}
                        alt="Imagem do usuário"
                        height={64}
                        width={64}
                    />
                    <TouchableOpacity>
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