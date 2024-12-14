import { Text } from "react-native";
import { Heading } from "./ui/heading";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";

export function HistoryCard() {
    return (
        <HStack
            className="w-full px-5 py-4 mb-3 bg-colors-gray600 rounded-md items-center justify-between"
        >
            <VStack className="flex-1 mr-5">
                <Heading
                    className="text-white text-base font-heading capitalize"
                    numberOfLines={1}
                >
                    Costas
                </Heading>
                <Text className="text-colors-gray100 text-lg" numberOfLines={1}>
                    Puxada frontal
                </Text>
            </VStack>
            <Text className="text-colors-gray300 text-base">
                08:56
            </Text>
        </HStack>
    )
}