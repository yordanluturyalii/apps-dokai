import HeaderBack from "@/components/HeaderBack";
import ThemedButton from "@/components/ThemedButton";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Image, Linking, Text, View } from "react-native";

interface ProductDetailProps {
	id: number;
	brand_name: string;
	name: string;
	description: string;
	price: number;
	image_url: string;
}

export default function ProductDetail() {
	const route = useRouter();
	const { id } = useLocalSearchParams();
	const { data, error, isLoading, fetchData } = useApi<ProductDetailProps>();
	const {token} = useAuth();

	useEffect(() => {
		getProductDetail();
	}, [id]);

	const getProductDetail = async () => {
		await fetchData({
			uri: `/drugs/${id}`,
			method: "GET",
			headers: {
				Authorization: token,
			}
		});

		if (error) {
			console.log(error);
		}
	}

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
						{data?.data.brand_name}
					</Text>
					<Text className="title-30">{data?.data.name}</Text>
				</View>
				<Text className="flex-1 flex-shrink text-right display-60 text-grayscale-text-title">
					Rp {data?.data.price}
				</Text>
			</View>
			<Text className="pt-6 pb-3 title-20">Description</Text>
			<Text className="flex-1 body-10">
				{data?.data.description}
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
