import FormInput from "@/components/ui/FormInput";
import ThemedButton from "@/components/ui/ThemedButton";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";

export default function LoginScreen() {
	return (
		<>
			<Image
				source={require("@/assets/images/dokai-icon.svg")}
				className="mx-auto"
			/>
			<Text className="pb-2 text-center pt-11">Welcome Back</Text>
			<Text className="text-center">Simplify health solutions with Evia.</Text>
			<TouchableOpacity className="grid justify-center grid-flow-col py-3 pb-5 gap-x-2 rounded-3xl pt-11">
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
			<Text className="pt-5">
				Forgot Password?
				<Link href={"/forgot-password"}>
					<Text className="text-blue-600">Click Here</Text>
				</Link>
			</Text>
		</>
	);
}
