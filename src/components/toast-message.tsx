import { Pressable } from "react-native"
import { Toast, ToastDescription, ToastTitle } from "./ui/toast"
import { VStack } from "./ui/vstack"

import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from "@/styles/colors";

type Props = {
    id: string
    title: string
    description?: string
    action?: 'error' | 'success'
    onClose: () => void
}

export function ToastMessage({
    id,
    title,
    description,
    action = 'success',
    onClose,
}: Props) {
    return (
        <Toast
            nativeID={`toast-${id}`}
            action={action}
            className={`mt-10 ${action === 'success' ? 'bg-colors-green500' : 'bg-colors-red500'}`}
        >
            <VStack className="space-x-4 w-full">
                <Pressable className="self-end" onPress={onClose}>
                    <AntDesign name="close" size={16} color={colors.gray100} />
                </Pressable>
                <ToastTitle className="text-white font-heading">
                    {title}
                </ToastTitle>
                {description && (
                    <ToastDescription className="text-white font-body">
                        {description}
                    </ToastDescription>
                )}
            </VStack>
        </Toast>
    )
}