import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import ArrowLeft from '@/assets/images/icons/arrow-left.svg'
import { Text, TouchableOpacity } from 'react-native'
import FormInput from '@/components/ui/FormInput'
import ThemedButton from '@/components/ui/ThemedButton'
import { z } from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
    email: z.string().email()
})

type FormData = {
    email: string
}

const ForgotPasswordScreen = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {
        control,
        handleSubmit,
        formState: { isValid }
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange'
    })

    const onSubmit = (data: any) => {
        try {
            setIsLoading(true)
            setTimeout(() => {
                console.log(data)
            }, 1000)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <TouchableOpacity
                className='flex flex-row items-center mt-11 gap-x-2'
                onPress={() => router.back()}
            >
                <ArrowLeft width={20} height={20} />
                <Text className='text-sm text-[#1738DC] font-semibold'>Back</Text>
            </TouchableOpacity>
            <Text className='text-2xl font-semibold text-[#111111] mt-7'>
                Enter your email and we'll send
                you a code to verify your email.
            </Text>
            <Controller
                control={control}
                name='email'
                render={({ field: { onChange, value } }) => (
                    <FormInput
                        className="mt-14 mb-6"
                        label='Email'
                        placeholder='johndoe@gmail.com'
                        contentType='emailAddress'
                        onChange={onChange}
                        value={value}
                    />
                )}
            />

            <ThemedButton
                title='Send link to email'
                disabled={!isValid || isLoading}
                isLoading={isLoading}
                onPress={handleSubmit(onSubmit)}
            />
        </>
    )
}


export default ForgotPasswordScreen