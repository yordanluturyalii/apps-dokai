import FormInput from "@/components/ui/FormInput";
import ThemedButton from "@/components/ui/ThemedButton";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import EviaIcon from "@/assets/images/dokai-icon.svg"
import GoogleIcon from "@/assets/images/google-icon.svg"
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
})

type FormData = {
	email: string,
	password: string
}

export default function LoginScreen() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const {
		control,
		handleSubmit,
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
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<View>
			<View className="flex flex-row items-center justify-center mt-11">
				<EviaIcon width={120} height={120} />
			</View>
			<Text className="pb-2 text-center pt-11 font-semibold text-2xl">Welcome Back</Text>
			<Text className="text-center text-[#777777] text-sm">Simplify health solutions with Evia.</Text>
			<TouchableOpacity className="flex flex-row items-center justify-center py-3 pb-5 gap-x-2 rounded-3xl mt-11 border border-[#EEEEEE] bg-white">
				<GoogleIcon width={20} height={20} />
				<Text className="text-sm font-semibold">Login with Google</Text>
			</TouchableOpacity>
			<View className="h-[1px] w-full bg-[#EBEBEB] my-5" />
			<Controller
				control={control}
				name="email"
				render={({ field: { onChange, value } }) => (
					<FormInput
						contentType="emailAddress"
						label="Email"
						placeholder="johndoe@gmail.com"
						className="pb-3"
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
						contentType="password"
						label="Password"
						placeholder="Password"
						onChange={onChange}
						value={value}
					/>
				)}
			/>
			<View className="flex flex-row justify-end pt-1 pb-5">
				<Link
					href="/forgot-password"
					className="text-sm text-[#1738DC] underline decoration-[#1738DC]"
				>
					<Text>Forgot Password?</Text>
				</Link>
			</View>
			<ThemedButton title="Login" disabled={!isValid || isLoading} isLoading={isLoading} onPress={handleSubmit(onSubmit)} />
			<Text className="pt-5 text-[#777777] text-sm text-center">
				Don't have an account?{" "}
				<Link href="/register">
					<Text className="text-[#1738DC] underline decoration-[#1738DC]">Create an Account</Text>
				</Link>
			</Text>
		</View>
	);
}
