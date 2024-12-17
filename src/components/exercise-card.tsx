import { Image, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { HStack } from './ui/hstack'
import { VStack } from './ui/vstack'
import { Heading } from './ui/heading'

import Entypo from '@expo/vector-icons/Entypo';
import { colors } from '@/styles/colors';
import { ExerciseProps } from '@/app/(root)/home';
import { api } from '@/services/api';

type Props = TouchableOpacityProps & {
    data: ExerciseProps;
}

export function ExerciseCard({ data, ...props }: Props) {
    return (
        <TouchableOpacity {...props}>
            <HStack className='bg-colors-gray500 items-center p-2 pr-4 rounded-md mb-3'>
                <Image
                     source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}` }}
                    alt="Imagem do exercício"
                    className='w-16 h-16 rounded-md mr-4'
                    resizeMode="cover"
                />

                <VStack className='flex-1'>
                    <Heading className='text-lg text-white font-heading'>
                        {data.name}
                    </Heading>
                    <Text className='text-sm text-colors-gray200 mt-1' numberOfLines={2}>
                        {data.series} séries x {data.repetitions} repetições
                    </Text>
                </VStack>
                <Entypo name="chevron-right" size={24} color={colors.gray300} />
            </HStack>
        </TouchableOpacity>
    )
}