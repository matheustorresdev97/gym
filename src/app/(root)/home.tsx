import { useEffect, useState } from 'react'
import { FlatList, Text } from 'react-native';

import { VStack } from "@/components/ui/vstack";
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';

import { Group } from "@/components/group";
import { Header } from "@/components/header";
import { ExerciseCard } from '@/components/exercise-card';
import { router } from 'expo-router';
import { api } from '@/services/api';
import { AppError } from '@/utils/AppError';
import { useToast } from '@/components/ui/toast';
import { ToastMessage } from '@/components/toast-message';

export default function Home() {
    const [exercises, setExercises] = useState([
        'Puxada frontal',
        'Remada curvada',
        'Remada unilateral',
        'Levantamento terra',
        'Levantamento terra',
        'Levantamento terra',
        'Levantamento terra',
    ])
    const [groups, setGroups] = useState<string[]>([]);
    const [groupSelected, setGroupSelected] = useState('costas')

    const toast = useToast();

    function handleOpenExerciseDetails() {
        router.navigate('/exercise')
    }

    async function fetchGroups() {
        try {
            const response = await api.get('/groups');
            setGroups(response.data);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares';
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
        }
    }
    useEffect(() => {
        fetchGroups();
    }, [])

    return (
        <VStack className="flex-1 bg-colors-gray700">
            <Header />

            <FlatList
                data={groups}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Group
                        name={item}
                        isActive={groupSelected.toLowerCase() === item.toLowerCase()}
                        onPress={() => setGroupSelected(item)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 32 }}
                style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
            />

            <VStack className='px-8 flex-1'>
                <HStack className='justify-between mb-5 items-center'>
                    <Heading className='text-colors-gray200 text-base'>
                        Exercícios
                    </Heading>
                    <Text className='text-colors-gray200 text-sm font-body'>
                        {exercises.length}
                    </Text>
                </HStack>

                <FlatList
                    data={exercises}
                    keyExtractor={(item) => item}
                    renderItem={() => (
                        <ExerciseCard onPress={handleOpenExerciseDetails} />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </VStack>
        </VStack>
    )
}