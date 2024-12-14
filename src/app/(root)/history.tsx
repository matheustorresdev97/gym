import { VStack } from "@/components/ui/vstack";

import { ScreenHeader } from "@/components/screen-header";


export default function History() {
    return (
        <VStack className="flex-1 bg-colors-gray700">
            <ScreenHeader title="Histórico" />
        </VStack>
    )
}