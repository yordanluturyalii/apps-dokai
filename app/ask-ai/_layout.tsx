import HeaderBack from "@/components/HeaderBack";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AILayout() {
	return (
		<SafeAreaView className="flex-1 px-5 py-3 bg-white">
			<HeaderBack className="pb-7" />
			<Slot />
		</SafeAreaView>
	);
}
