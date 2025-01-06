import ThemedButton from "@/components/ThemedButton";
import { Image, Text, View } from "react-native";

export default function PasswordChangeScreen() {
	return (
		<View className="grid *:text-center">
			<View className="grid justify-center">
				<Image source={require("@/assets/images/password-changed.png")} />
			</View>
			<Text className="pb-6 pt-11">Password changed.</Text>
			<Text>
				Your password has been successfully changed. Please login to use Evia.
			</Text>
			<ThemedButton className="pt-11">Login</ThemedButton>
		</View>
	);
}
