import { Button as GluestackButton, ButtonText, ButtonSpinner } from '@/components/ui/button'
import { ComponentProps } from 'react'
import clsx from 'clsx'

type ButtonProps = ComponentProps<typeof GluestackButton> & {
    title: string
    variant?: 'solid' | 'outline'
    isLoading?: boolean
}

export function Button({
    title,
    variant = 'solid',
    isLoading = false,
    ...props
}: ButtonProps) {
    return (
        <GluestackButton
            className={clsx(
                'w-full h-14 rounded-sm border',
                {
                    'bg-colors-green700 border-0 data-[active=true]:border-green500': variant === 'solid',
                    'bg-transparent border border-colors-green500 data-[active=true]:border-colors-gray500': variant === 'outline',
                },
            )}
            disabled={isLoading}
            { ...props }
        >
            {isLoading ? (
                <ButtonSpinner color="$white" />
            ) : (
                <ButtonText
                    className={clsx(
                        'font-heading text-sm',
                        {
                            'text-white': variant === 'solid',
                            'text-colors-green500': variant === 'outline',
                        }
                    )}

                >
                    {title}
                </ButtonText>
            )}
        </GluestackButton>
    )
}
