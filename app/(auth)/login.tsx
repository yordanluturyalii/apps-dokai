import EviaIcon from "@/assets/images/dokai-icon.svg";
import GoogleIcon from "@/assets/images/google-icon.svg";
import FormInput from "@/components/FormInput";
import ThemedButton from "@/components/ThemedButton";
import { useApi } from "@/hooks/useApi";
import { zodResolver } from "@hookform/resolvers/zod";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { object, string } from "zod";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

const schema = object({
	email: string().email(),
	password: string().min(8),
});

type FormData = {
	email: string;
	password: string;
};

interface LoginResponse {
	id: number;
	email: string;
	token: string;
}

export default function LoginScreen() {
	const router = useRouter();
	const { data, error, isLoading, fetchData } = useApi<LoginResponse>();
	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		mode: "onChange",
	});

	useEffect(() => {
		console.log(data?.data);
		if (data?.data) {
			SecureStore.setItemAsync("token", data.data.token);
			router.push("/");
		}
	}, [data?.data]);

	const onSubmit = async (formData: FormData) => {
		await fetchData({
			method: "POST",
			uri: "/auth/login",
			data: formData,
		});

		if (error) {
			console.log(error);
			return;
		}
	};

	// const [user, setUser] = useState(null);

	// useEffect(() => {
	// 	GoogleSignin.configure({
	// 		scopes: ["profile", "email"],
	// 	});
	// }, []);

	// const signIn = async () => {
	// 	try {
	// 		await GoogleSignin.hasPlayServices();
	// 		const response = await GoogleSignin.signIn();
	// 		console.log(response);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

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
			{error && (
				<View className="mb-5">
					<Text className="text-xs text-center text-error-text-link bg-error-surface-default-subtle rounded-lg py-3 px-4 w-fit mx-auto border border-error-border-default">
						{"Incorrect Email or Password"}
					</Text>
				</View>
			)}
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
				disabled={!isValid || isLoading}
				isLoading={isLoading}
				onPress={handleSubmit(onSubmit)}
			>
				Login
			</ThemedButton>
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
