import type { ComponentProps } from 'react'
import { Input as GluestackInput, InputField } from '@/components/ui/input'

import colors from 'tailwindcss/colors'


type InputProps = ComponentProps<typeof InputField>

export function Input({ ...props }: InputProps) {
    return (
        <GluestackInput
            className="bg-colors-gray700 h-14 px-4 border border-transparent rounded-md data-[focus=true]:border-green500"
            focusable
        >
            <InputField
                className="text-white font-regular"
                placeholderTextColor={colors.gray[300]}
                {...props}
            />
        </GluestackInput>
    )
}