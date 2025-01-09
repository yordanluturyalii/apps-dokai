import { Image, Text, View } from "react-native";
import ThemedButton from "./ThemedButton";

export default function Card({
	category,
	price,
	item,
}: { category: string; price: string; item: string }) {
	return (
		<View className="p-3 rounded-3xl bg-grayscale-surface-default-subtle ">
			<Image source={require("@/assets/images/dokai-icon.svg")} />
			<View className="flex-row justify-between w-full">
				<Text className="text-grayscale-text-caption subtitle-10">
					{category}
				</Text>
				<Text className="title-20 text-grayscale-text-title">{price}</Text>
			</View>
			<Text className="text-grayscale-text-title subtitle-20">{item}</Text>
			<ThemedButton>Buy</ThemedButton>
		</View>
	);
}
