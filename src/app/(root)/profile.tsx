import { ScrollView } from 'react-native'

import { VStack } from "@/components/ui/vstack";
import { Center } from '@/components/ui/center';

import { ScreenHeader } from "@/components/screen-header";
import { UserPhoto } from '@/components/user-photo';


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
                </Center>
            </ScrollView>
        </VStack>
    )
}