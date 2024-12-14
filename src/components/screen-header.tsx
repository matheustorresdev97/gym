import { Center } from "./ui/center"
import { Heading } from "./ui/heading"

type Props = {
    title: string
}
export function ScreenHeader({ title }: Props) {
    return (
        <Center className="bg-colors-gray600 pb-6 pt-16">
            <Heading className="text-colors-gray100 text-xl font-heading">
                {title}
            </Heading>
        </Center>
    )
}