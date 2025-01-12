import { Image, Text, View } from "react-native";
import ThemedButton from "./ThemedButton";

export default function Card({
	brand_name,
	price,
	item,
	className,
	href,
}: {
	brand_name: string;
	price: number;
	item: string;
	className?: string;
	href: () => void;
}) {
	return (
		<View
			className={`p-3 rounded-3xl bg-grayscale-surface-default-subtle ${className}`}
		>
			<View className="flex-row justify-center w-full">
				<Image
					source={require("@/assets/images/product-constant.png")}
					width={144}
					height={10}
				/>
			</View>
			<View className="flex-row justify-between w-full">
				<Text className="text-grayscale-text-caption subtitle-10">
					{brand_name}
				</Text>
				<Text className="title-20 text-grayscale-text-title">{price}</Text>
			</View>
			<Text className="text-grayscale-text-title subtitle-20">{item}</Text>
			<ThemedButton onPress={href}>Buy</ThemedButton>
		</View>
	);
}
