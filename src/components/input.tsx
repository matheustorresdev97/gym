import clsx from 'clsx'
import type { ComponentProps } from 'react'
import { Input as GluestackInput, InputField } from '@/components/ui/input'
import { colors } from '@/styles/colors'
import { FormControl, FormControlError, FormControlErrorText } from './ui/form-control'

type InputProps = ComponentProps<typeof InputField> & {
    errorMessage?: string | null
    isInvalid?: boolean
    isReadOnly?: boolean
    className?: string
}

export function Input({
    isReadOnly = false,
    className,
    errorMessage = null,
    isInvalid = false,
    ...props
}: InputProps) {

    const invalid = !!errorMessage || isInvalid

    return (
        <FormControl className='mb-4 w-full' isInvalid={invalid}>
            <GluestackInput
                className={clsx(
                    "h-14 border border-transparent rounded-md data-[focus=true]:border-colors-green500",
                    {
                        "opacity-50": isReadOnly,
                        "opacity-100": !isReadOnly
                    },
                    className
                )}
                focusable
            >
                <InputField
                    className="px-4 bg-colors-gray700 text-white font-regular"
                    placeholderTextColor={colors.gray300}
                    editable={!isReadOnly}
                    {...props}
                />
            </GluestackInput>

            <FormControlError>
                <FormControlErrorText className='text-colors-red500'>
                    {errorMessage}
                </FormControlErrorText>
            </FormControlError>
        </FormControl>
    )
}