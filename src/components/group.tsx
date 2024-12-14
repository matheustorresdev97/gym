import { ComponentProps } from "react"
import { Button, ButtonText } from "./ui/button"
import clsx from "clsx"

type Props = ComponentProps<typeof Button> & {
    name: string
    isActive: boolean
}

export function Group({ name, isActive, ...props }: Props) {
    return (
        <Button className={clsx(
            "mr-3 min-w-24 h-10 bg-colors-gray600 rounded-md justify-center items-center",
            {
                "border border-colors-green500": isActive
            }
        )}
            {...props}>
            <ButtonText className={clsx(
                "uppercase text-xs font-heading",
                {
                    "text-colors-green500": isActive,
                    "text-colors-gray200": !isActive
                }
            )}>
                {name}
            </ButtonText>
        </Button>
    )
}