import { Center } from "./ui/center";
import { Spinner } from "./ui/spinner";

export function Loading() {
    return (
        <Center className="flex-1 bg-colors-gray700">
            <Spinner className="text-colors-green500" />
        </Center>
    )
}