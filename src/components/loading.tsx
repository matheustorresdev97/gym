import { Center } from "./ui/center";
import { Spinner } from "./ui/spinner";

export function Loading() {
    return (
        <Center className="flex-1 bg-gray-700">
            <Spinner className="text-green-500" />
        </Center>
    )
}