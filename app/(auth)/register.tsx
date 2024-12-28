import FormInput from "@/components/ui/FormInput";
import RequiredText from "@/components/ui/RequiredText";
import ThemedButton from "@/components/ui/ThemedButton";
import { AccountRequiredText } from "@/constants";
import { Text, TouchableOpacity, View } from "react-native";
import ArrowLeft from "@/assets/images/icons/arrow-left.svg"
import { z } from "zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(8).regex(/[0-9]/, "Password must contain a number").regex(/[A-Z]/, "Password must contain an uppercase letter"),
	password_confirmation: z.string().min(8).regex(/[0-9]/, "Password must contain a number").regex(/[A-Z]/, "Password must contain an uppercase letter")
}).refine((data) => data.password === data.password_confirmation, {
	message: "Passwords don't match",
	path: ["password_confirmation"]
})

type FormData = {
	email: string,
	password: string,
	password_confirmation: string
}

export default function RegisterScreen() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const {
		control,
		handleSubmit,
		watch,
		formState: { isValid }
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		mode: "onChange"
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

	const password = watch("password")

	const isLengthValid = password?.length >= 8
	const containsNumber = /[0-9]/.test(password || "")
	const containsUpperCase = /[A-Z]/.test(password || "")

	return (
		<View>
			<TouchableOpacity
				className='flex flex-row items-center mt-11 gap-x-2'
				onPress={() => router.back()}
			>
				<ArrowLeft width={20} height={20} />
				<Text className='text-sm text-[#1738DC] font-semibold'>Back</Text>
			</TouchableOpacity>
			<Text className="mt-6 mb-11 text-xl font-semibold">Create an Evia account.</Text>
			<Controller
				control={control}
				name="email"
				render={({ field: { onChange, value } }) => (
					<FormInput
						className="mb-5"
						contentType="emailAddress"
						label="Email"
						placeholder="johndoe@gmail.com"
						onChange={onChange}
						value={value}
					/>
				)}
			/>
			<Controller
				control={control}
				name="password"
				render={({ field: { onChange, value } }) => (
					<FormInput
						className="mb-5"
						contentType="password"
						label="Password"
						placeholder="Password"
						onChange={onChange}
						value={value}
					/>
				)}
			/>
			<Controller
				control={control}
				name="password_confirmation"
				render={({ field: { onChange, value } }) => (
					<FormInput
						className="mb-5"
						contentType="password"
						label="Confirm Password"
						placeholder="Confirm Password"
						onChange={onChange}
						value={value}
					/>
				)}
			/>
			<Text className="mt-7 mb-3 text-xs">Password must contain:</Text>
			<View className="mb-5">
				<RequiredText title="At least 8 characters" isValid={isLengthValid} />
				<RequiredText title="At least one number" isValid={containsNumber} />
				<RequiredText title="At least one uppercase letter" isValid={containsUpperCase} />
			</View>

			<ThemedButton title="Create an Account" disabled={!isValid || isLoading} isLoading={isLoading} onPress={handleSubmit(onSubmit)} />
		</View>
	);
}
