import EviaIcon from "@/assets/images/dokai-icon.svg";
import GoogleIcon from "@/assets/images/google-icon.svg";
import FormInput from "@/components/ui/FormInput";
import ThemedButton from "@/components/ui/ThemedButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { object, string } from "zod";

const schema = object({
	email: string().email(),
	password: string().min(8),
});

type FormData = {
	email: string;
	password: string;
};

export default function LoginScreen() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		mode: "onChange",
	});

	const onSubmit = (data: FormData) => {
		try {
			setIsLoading(true);
			setTimeout(() => {
				console.log(data);
			});
		} finally {
			setIsLoading(false);
		}
	};

	const [user, setUser] = useState(null);

	useEffect(() => {
		GoogleSignin.configure({
			scopes: ["profile", "email"],
		});
	}, []);

	const signIn = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const { idToken } = await GoogleSignin.signIn();
			const response = await fetch("https://example.com", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ idToken }),
			});
			const data = await response.json();
			setUser(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<View>
			<View className="flex flex-row items-center justify-center mt-11">
				<EviaIcon width={120} height={120} />
			</View>
			<Text className="pb-2 text-2xl font-semibold text-center pt-11">
				Welcome Back
			</Text>
			<Text className="text-center text-[#777777] text-sm">
				Simplify health solutions with Evia.
			</Text>
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
			<ThemedButton
				title="Login"
				disabled={!isValid || isLoading}
				isLoading={isLoading}
				onPress={handleSubmit(onSubmit)}
			/>
			<Text className="pt-5 text-[#777777] text-sm text-center">
				Don't have an account?{" "}
				<Link href="/register">
					<Text className="text-[#1738DC] underline decoration-[#1738DC]">
						Create an Account
					</Text>
				</Link>
			</Text>
		</View>
	);
}
