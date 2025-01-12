import Card from "@/components/Card";
import { useApi } from "@/hooks/useApi";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";

interface DrugRecommendationResponse {
	id: number;
	brand_name: string;
	name: string;
	price: number;
	description: string;
	image_url: string;
}

export default function CareConnectScreen() {
	const { data, error, isLoading, fetchData } =
		useApi<DrugRecommendationResponse[]>();

	const getData = async () => {
		await fetchData({
			method: "GET",
			uri: "/complaints/c118559b-b734-43fa-a0de-4b6943976333/recommendations",
		});
	};

	useEffect(() => {
		getData();
	}, []);

	//? Create Grid Rows for Card
	const createRows = (items: DrugRecommendationResponse[] | undefined) => {
		if (!items) {
			return [];
		}
		const rows: DrugRecommendationResponse[][] = [];
		for (let i = 0; i < items.length; i += 2) {
			rows.push(items.slice(i, i + 2));
		}
		return rows;
	};

	const route = useRouter();

	return (
		<ScrollView className="bg-white">
			<Text className="pb-4 title-30 text-grayscale-text-title">
				Drug recommendations
			</Text>

			<View className="flex-col gap-y-4">
				{!isLoading &&
					data?.data &&
					createRows(data?.data).map((row) => (
						<View key={`row-${row[0].id}`} className="flex-row justify-between">
							{row.map((drug) => (
								<Card
									key={drug.id}
									brand_name={drug.brand_name}
									item={drug.name}
									price={drug.price}
									className="w-[48%]"
									href={() =>
										route.push({
											pathname: "/ask-ai/product-detail",
											params: {
												id: drug.id,
												price: drug.price,
												brand_name: drug.brand_name,
												name: drug.name,
												description: drug.description,
												image_url: drug.image_url,
											},
										})
									}
								/>
							))}
							{row.length === 1 && <View className="w-[48%]" />}
						</View>
					))}
			</View>
		</ScrollView>
	);
}
