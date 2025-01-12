import HeaderBack from "@/components/HeaderBack";
import ThemedButton from "@/components/ThemedButton";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { Image, Linking, Text, View } from "react-native";

export default function ProductDetail() {
	const route = useRouter();
	const { id, price, brand_name, item } = useLocalSearchParams();

	return (
		<View className="flex-1">
			<HeaderBack
				handleNavigation={() => {
					route.back();
				}}
			/>
			<View className="flex-col items-center justify-center mb-5 bg-grayscale-surface-default-subtle py-11">
				<Image source={require("@/assets/images/product-constant.png")} />
			</View>
			<View className="flex-row justify-between">
				<View className="flex-1">
					<Text className="text-grayscale-text-caption subtitle-20">
						Brand Name
					</Text>
					<Text className="title-30">Product Name</Text>
				</View>
				<Text className="flex-1 flex-shrink text-right display-60 text-grayscale-text-title">
					Price
				</Text>
			</View>
			<Text className="pt-6 pb-3 title-20">Description</Text>
			<Text className="flex-1 body-10">
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
				reiciendis illo rerum quia autem repudiandae quae laudantium, beatae,
				dolorum veniam perspiciatis expedita? Asperiores, voluptas repudiandae.
				Iure, laboriosam dolores? Veritatis, delectus.
			</Text>
			<ThemedButton
				onPress={() =>
					Linking.openURL("whatsapp://send?text=hello&phone=+6289670288120")
				}
			>
				Buy
			</ThemedButton>
		</View>
	);
}
