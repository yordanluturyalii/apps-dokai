import ThemedButton from "@/components/ThemedButton";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen() {
	const route = useRouter();

	return (
		<SafeAreaView className="items-center justify-center flex-1 bg-white">
			<View className="px-4 pt-8 bg-grayscale-surface-default-subtle rounded-2xl">
				<Image source={require("@/assets/images/not-found.png")} />
			</View>
			<Text className="pt-6 pb-3 title-50 text-grayscale-text-title">
				We're under maintenance
			</Text>
			<Text className="pb-6 body-10 text-grayscale-text-body">
				Sorry, this page is under maintenance
			</Text>
			<ThemedButton
				onPress={() => {
					route.back();
				}}
			>
				Go back
			</ThemedButton>
		</SafeAreaView>
	);
}
