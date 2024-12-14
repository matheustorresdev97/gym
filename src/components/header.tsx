import { Text } from "react-native";

import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";

export function Header() {
    return (
        <HStack className="bg-colors-gray600 pt-16 pb-5 px-8 items-center">
            <VStack>
                <Text className="text-colors-gray100 text-sm">
                    Olá
                </Text>
                <Heading className="text-colors-gray100 text-base">
                    Matheus Torres
                </Heading>
            </VStack>
        </HStack>
    )
}