import { Link } from "expo-router";
import { View } from "react-native";

export default function HomeScreen() {
	return (
		<View className="mt-10">
			<Link href="/(auth)/login">Login</Link>
			<Link href="/(auth)/register">Register</Link>
			<Link href="/(auth)/forgot-password">Forget Password</Link>
			<Link href="/(auth)/new-password">New Password</Link>
			<Link href="/(auth)/new-password/password-changed">
				New Password - success
			</Link>
			<Link href="/ask-ai">Ask AI</Link>
			<Link href="/+not-found">Not Found</Link>
		</View>
	);
}
