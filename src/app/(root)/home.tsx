import { Header } from "@/components/header";
import { VStack } from "@/components/ui/vstack";

export default function Home() {
    return (
        <VStack className="flex-1 bg-gray700">
            <Header />
        </VStack>
    )
}