import { Link } from 'expo-router'
import React from 'react'
import ArrowLeft from '@/assets/images/icons/arrow-left.svg'
import { Image, Text } from 'react-native'
import { View } from 'react-native'

const ForgotPasswordPage = () => {
    return (
        <>
            <View className='mt-11'>
                <Link href={"/login"}>
                    <ArrowLeft width={16} height={16} />
                    <Text className={"text-[#1738DC]"}>
                        Back
                    </Text>
                </Link>
            </View>
        </>
    )
}


export default ForgotPasswordPage