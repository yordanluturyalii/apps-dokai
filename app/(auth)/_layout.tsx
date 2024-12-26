import { Slot } from "expo-router";
import { View } from "react-native";

export default function AuthLayout() {
	return (
		<View className="px-5 bg-white py-11">
			<Slot />
		</View>
	);
}
