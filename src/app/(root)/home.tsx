import { useState } from 'react'
import { Group } from "@/components/group";
import { Header } from "@/components/header";
import { VStack } from "@/components/ui/vstack";
import { FlatList, Text } from 'react-native';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';

export default function Home() {
    const [groups, setGroups] = useState(['Costas', 'Bíceps', 'Tríceps', 'Ombro'])
    const [groupSelected, setGroupSelected] = useState('costas')

    return (
        <VStack className="flex-1 bg-colors-gray700">
            <Header />

            <FlatList
                data={groups}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Group
                        name={item}
                        isActive={groupSelected === item}
                        onPress={() => setGroupSelected(item)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 32 }}
                style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
            />

            <VStack className='px-8'>
                <HStack className='justify-between mb-5 items-center'>
                    <Heading className='text-colors-gray200 text-base'>
                        Exercícios
                    </Heading>
                    <Text className='text-colors-gray200 text-sm font-body'>
                        4
                    </Text>
                </HStack>
            </VStack>
        </VStack>
    )
}