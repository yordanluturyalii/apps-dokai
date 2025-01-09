import { Image, Text, View } from "react-native";
import ThemedButton from "./ThemedButton";

export default function Card({
	brand_name,
	price,
	item,
	className,
}: { brand_name: string; price: string; item: string; className?: string }) {
	return (
		<View
			className={`p-3 rounded-3xl bg-grayscale-surface-default-subtle ${className}`}
		>
			<Image
				source={require("@/assets/images/dokai-icon.svg")}
				className="object-contain w-36 h-36"
			/>
			<View className="flex-row justify-between w-full">
				<Text className="text-grayscale-text-caption subtitle-10">
					{brand_name}
				</Text>
				<Text className="title-20 text-grayscale-text-title">{price}</Text>
			</View>
			<Text className="text-grayscale-text-title subtitle-20">{item}</Text>
			<ThemedButton>Buy</ThemedButton>
		</View>
	);
}
