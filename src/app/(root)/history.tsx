import { useState } from 'react'
import { SectionList, Text } from 'react-native'

import { VStack } from "@/components/ui/vstack";

import { ScreenHeader } from "@/components/screen-header";
import { HistoryCard } from "@/components/history-card";
import { Heading } from '@/components/ui/heading';


export default function History() {
    const [exercises, setExercises] = useState([
        {
            title: '22.07.24',
            data: ['Puxada frontal', 'Remada unilateral'],
        },
        {
            title: '23.07.24',
            data: ['Puxada frontal'],
        },
    ])

    return (
        <VStack className="flex-1 bg-colors-gray700">
            <ScreenHeader title="Histórico" />
            <SectionList
                sections={exercises}
                keyExtractor={(item) => item}
                renderItem={({ item }) => <HistoryCard />}
                renderSectionHeader={({ section }) => (
                    <Heading className='text-colors-gray200 text-base mt-10 mb-3'>
                        {section.title}
                    </Heading>
                )}
                style={{ paddingHorizontal: 32 }}
                contentContainerStyle={
                    exercises.length === 0 && { flex: 1, justifyContent: 'center' }
                }
                ListEmptyComponent={() => (
                    <Text className='text-colors-gray200 text-center'>
                        Não há exercícios registrados ainda. {'\n'}
                        Vamos fazer execícios hoje?
                    </Text>
                )}
                showsVerticalScrollIndicator={false}
            />
        </VStack>
    )
}