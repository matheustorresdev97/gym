import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { colors } from "@/styles/colors";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

import BodySvg from '@/assets/body.svg'

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
        </VStack>
    )
}