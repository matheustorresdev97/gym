import { Text, TouchableOpacity } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from "@/styles/colors";
import { useAuth } from "@/contexts/AuthContext";
import { UserPhoto } from "./user-photo";

import defaulUserPhotoImg from '@/assets/userPhotoDefault.png';

export function Header() {

    const { user, signOut } = useAuth();

    return (
        <HStack className="bg-colors-gray600 pt-16 pb-5 px-8 items-center">
            <UserPhoto
                className="mr-4"
                source={user.avatar ? { uri: user.avatar } : defaulUserPhotoImg}
                height={16}
                width={16}
                alt="Imagem do usuário"
            />
            <VStack className="flex-1">
                <Text className="text-colors-gray100 text-sm">
                    Olá
                </Text>
                <Heading className="text-colors-gray100 text-base">
                    {user.name}
                </Heading>
            </VStack>
            <TouchableOpacity onPress={signOut}>
                <MaterialIcons
                    name="logout"
                    size={24}
                    color={colors.gray200}
                />
            </TouchableOpacity>
        </HStack>
    )
}