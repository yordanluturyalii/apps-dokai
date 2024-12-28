import { Slot } from "expo-router";
import { SafeAreaView, ScrollView, View } from "react-native";

export default function AuthLayout() {
	return (
		<SafeAreaView className="px-5 bg-[#FAFAFA] py-11 h-full">
			<View>
				<Slot />
			</View>
		</SafeAreaView>
	);
}
