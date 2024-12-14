import { ComponentProps } from "react";
import { Image } from "react-native";

type Props = ComponentProps<typeof Image>;

export function UserPhoto({ ...props }: Props) {
    return <Image className="rounded-full border-2 border-colors-gray400 bg-colors-gray500" {...props} />
}