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
                    'bg-green700 border-0 data-[active=true]:border-green500': variant === 'solid',
                    'bg-transparent border border-green500 data-[active=true]:border-gray500': variant === 'outline',
                },
                { ...props }
            )}
            disabled={isLoading}
        >
            {isLoading ? (
                <ButtonSpinner color="$white" />
            ) : (
                <ButtonText
                    className={clsx(
                        'font-heading text-sm',
                        {
                            'text-white': variant === 'solid',
                            'text-green500': variant === 'outline',
                        }
                    )}

                >
                    {title}
                </ButtonText>
            )}
        </GluestackButton>
    )
}
