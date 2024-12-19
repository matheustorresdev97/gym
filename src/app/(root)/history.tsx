import { useCallback, useState } from 'react'
import { SectionList, Text } from 'react-native'

import { VStack } from "@/components/ui/vstack";

import { ScreenHeader } from "@/components/screen-header";
import { HistoryCard } from "@/components/history-card";
import { Heading } from '@/components/ui/heading';
import { useToast } from '@/components/ui/toast';
import { useFocusEffect } from 'expo-router';
import { ToastMessage } from '@/components/toast-message';
import { AppError } from '@/utils/AppError';
import { api } from '@/services/api';

export type HistoryByDayProps = {
    title: string;
    data: HistoryProps[];
}

export type HistoryProps = {
    id: string;
    name: string;
    group: string;
    hour: string;
    created_at: string;
}


export default function History() {
    const [isLoading, setIsLoading] = useState(true);
    const [exercises, setExercises] = useState<HistoryByDayProps[]>([]);

    const toast = useToast();

    async function fetchHistory() {
        try {
            setIsLoading(true);
            const response = await api.get('/history');
            setExercises(response.data);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício';
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
        } finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchHistory()
        }, [])
    )


    return (
        <VStack className="flex-1 bg-colors-gray700">
            <ScreenHeader title="Histórico de Exercícios" />
            <SectionList
                sections={exercises}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <HistoryCard data={item} /> }
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