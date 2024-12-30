import FormInput from "@/components/ui/FormInput";
import ThemedButton from "@/components/ui/ThemedButton";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";

export default function LoginScreen() {
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
		<>
			<Image
				source={require("@/assets/images/dokai-icon.svg")}
				className="mx-auto"
			/>
			<Text className="pb-2 text-center pt-11">Welcome Back</Text>
			<Text className="text-center">Simplify health solutions with Evia.</Text>
			<TouchableOpacity
				className="grid justify-center grid-flow-col py-3 pb-5 gap-x-2 rounded-3xl pt-11"
				onPress={signIn}
			>
				<Image source={require("@/assets/images/google-icon.svg")} />
				<Text>Login with Google</Text>
			</TouchableOpacity>
			<View className="h-1" />
			<FormInput
				contentType="emailAddress"
				label="Email"
				placeholder="johndoe@gmail.com"
				className="pt-5 pb-3"
			/>
			<FormInput
				contentType="password"
				label="Password"
				placeholder="Password"
			/>
			<Link href="/forgot-password" className="pt-1 pb-5 text-end">
				<Text>Forgot Password?</Text>
			</Link>
			<ThemedButton title="Login" />
			<Text className="pt-5">
				Don't have an account?{" "}
				<Link href="/register">
					<Text>Create an Account</Text>
				</Link>
			</Text>
		</>
	);
}
