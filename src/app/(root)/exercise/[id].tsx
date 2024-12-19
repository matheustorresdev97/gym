import { Image, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { router, useLocalSearchParams } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from "@/styles/colors";

import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";

import BodySvg from '@/assets/body.svg'
import SeriesSvg from '@/assets/series.svg'
import RepetitionsSvg from '@/assets/repetitions.svg'


import { Button } from "@/components/button";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { ExerciseProps } from "../home";
import { AppError } from "@/utils/AppError";
import { useToast } from "@/components/ui/toast";
import { ToastMessage } from "@/components/toast-message";
import { Loading } from "@/components/loading";

export default function Exercise() {
    const [sendingRegister, setSendingRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [exercise, setExercise] = useState<ExerciseProps>({} as ExerciseProps);
    const params = useLocalSearchParams<{ id: string }>()
    const toast = useToast();


    function handleGoBack() {
        router.back()
    }

    async function fetchExerciseDetails() {
        try {
            const response = await api.get(`/exercises/${params.id}`);
            setExercise(response.data);
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

    async function handleExerciseHistoryRegister() {
        try {
            setSendingRegister(true);

            await api.post('/history', { exercise_id: params.id });
            toast.show({
                placement: 'top',
                render: ({ id }) => (
                    <ToastMessage
                        id={id}
                        action="success"
                        title='Parabéns! Exercício registrado no seu histórico.'
                        onClose={() => toast.close(id)}
                    />
                ),
            })
            router.navigate('/history');
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível registrar exercício.';
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
            setSendingRegister(false);
        }
    }

    useEffect(() => {
        fetchExerciseDetails();
    }, [params.id])

    return (
        <VStack className="flex-1 bg-colors-gray700">
            <VStack className="px-8 bg-colors-gray600 pt-12">
                <TouchableOpacity onPress={handleGoBack}>
                    <AntDesign name="arrowleft" size={24} color={colors.green500} />
                </TouchableOpacity>

                <HStack
                    className="justify-between items-center mt-4 mb-8"
                >
                    <Heading
                        className="text-colors-gray100 text-lg flex-shrink"
                    >
                        {exercise.name}
                    </Heading>
                    <HStack className="items-center">
                        <BodySvg />
                        <Text className="text-colors-gray200 ml-1 capitalize">
                            {exercise.group}
                        </Text>
                    </HStack>
                </HStack>
            </VStack>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 32 }}
            >
                {isLoading ? <Loading /> :
                    <VStack className="p-8">
                        <Box className="rounded-lg mb-3 overflow-hidden">
                            <Image
                                className="w-full h-80 rounded-lg"
                                source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise?.demo}` }}
                                alt="Nome do exercício"
                                resizeMode="cover"
                            />
                        </Box>
                        <Box className="bg-colors-gray600 rounded-md pb-4 px-4">
                            <HStack
                                className="items-center justify-around mb-6 mt-5"
                            >
                                <HStack>
                                    <SeriesSvg />
                                    <Text className="text-colors-gray200 ml-2">
                                        {exercise.series} séries
                                    </Text>
                                </HStack>
                                <HStack>
                                    <RepetitionsSvg />
                                    <Text className="text-colors-gray200 ml-2">
                                        {exercise.repetitions} repetições
                                    </Text>
                                </HStack>
                            </HStack>
                            <Button title="Marcar como realizado"
                                isLoading={sendingRegister}
                                onPress={handleExerciseHistoryRegister}
                            />
                        </Box>
                    </VStack>
                }
            </ScrollView>
        </VStack>
    )
}