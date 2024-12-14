import { Image, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { HStack } from './ui/hstack'
import { VStack } from './ui/vstack'
import { Heading } from './ui/heading'

import Entypo from '@expo/vector-icons/Entypo';
import { colors } from '@/styles/colors';

type Props = TouchableOpacityProps & {}

export function ExerciseCard({ ...props }: Props) {
    return (
        <TouchableOpacity {...props}>
            <HStack className='bg-colors-gray500 items-center p-2 pr-4 rounded-md mb-3'>
                <Image
                    source={{
                        uri: 'https://static.wixstatic.com/media/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp/v1/fill/w_350,h_375,al_c/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp',
                    }}
                    alt="Imagem do exercício"
                    className='w-16 h-16 rounded-md mr-4'
                    resizeMode="cover"
                />

                <VStack className='flex-1'>
                    <Heading className='text-lg text-white font-heading'>
                        Puxada frontal
                    </Heading>
                    <Text className='text-sm text-colors-gray200 mt-1' numberOfLines={2}>
                        3 séries x 12 repetições
                    </Text>
                </VStack>
                <Entypo name="chevron-right" size={24} color={colors.gray300} />
            </HStack>
        </TouchableOpacity>
    )
}