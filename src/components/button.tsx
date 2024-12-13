import { Button as GluestackButton, ButtonText, ButtonSpinner } from '@/components/ui/button'
import { ComponentProps } from 'react'
import { Text } from 'react-native'

type ButtonProps = ComponentProps<typeof ButtonText> & {
    title: string
    isLoading?: boolean
}

export function Button({ title, isLoading = false, ...props }: ButtonProps) {
    return (
        <GluestackButton className='w-full h-14 bg-green700 border-0 border-green500 rounded-sm data-[active=true]:border-green500' disabled={isLoading}>
            {isLoading ? (
                <ButtonSpinner color="$white" />
            ) : (
                <Text className='text-white font-heading text-sm'>
                    {title}
                </Text>
            )}
        </GluestackButton>
    )
}