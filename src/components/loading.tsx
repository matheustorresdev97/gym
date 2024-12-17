import { colors } from "@/styles/colors";
import { Center } from "./ui/center";
import { Spinner } from "./ui/spinner";

export function Loading() {
    return (
        <Center className="flex-1 bg-colors-gray700">
            <Spinner color={colors.green500} />
        </Center>
    )
}