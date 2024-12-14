import { Image, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";
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

export default function Exercise() {

    function handleGoBack() {
        router.back()
    }

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
                        Puxada frontal
                    </Heading>
                    <HStack className="items-center">
                        <BodySvg />
                        <Text className="text-colors-gray200 ml-1 capitalize">
                            Costas
                        </Text>
                    </HStack>
                </HStack>
            </VStack>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 32 }}
            >
                <VStack className="p-8">
                    <Image
                        source={{
                            uri: 'https://static.wixstatic.com/media/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp/v1/fill/w_350,h_375,al_c/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp',
                        }}
                        alt="Exercício"
                        className="mb-3 rounded-lg w-full h-4/5"
                        resizeMode="stretch"
                    />
                    <Box className="bg-colors-gray600 rounded-md pb-4 px-4">
                        <HStack
                            className="items-center justify-around mb-6 mt-5"
                        >
                            <HStack>
                                <SeriesSvg />
                                <Text className="text-colors-gray200 ml-2">
                                    3 séries
                                </Text>
                            </HStack>
                            <HStack>
                                <RepetitionsSvg />
                                <Text className="text-colors-gray200 ml-2">
                                    12 repetições
                                </Text>
                            </HStack>
                        </HStack>
                        <Button title="Marcar como realizado" />
                    </Box>
                </VStack>
            </ScrollView>
        </VStack>
    )
}