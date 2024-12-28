import { Slot } from "expo-router";
import { SafeAreaView, ScrollView, View } from "react-native";

export default function AuthLayout() {
	return (
		<SafeAreaView className="px-5 bg-white py-11 h-full">
			<ScrollView>
				<View>
					<Slot />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
