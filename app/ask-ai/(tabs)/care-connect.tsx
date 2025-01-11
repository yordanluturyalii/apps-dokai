import Card from "@/components/Card";
import { Drug } from "@/constants";
import { useApi } from "@/hooks/useApi";
import { ScrollView, Text, View } from "react-native";

interface CareConnectScreenResponse {
	messaage: string;
	data: {
		id: number;
		brand_name: string;
		name: string;
		price: string;
		image_url: string;
	};
}

export default function CareConnectScreen() {
	const { data, error, isLoading, fetchData } =
		useApi<CareConnectScreenResponse>();

	const getData = async () => {
		await fetchData({
			method: "GET",
			uri: "/complaints/c118559b-b734-43fa-a0de-4b6943976333/recommendations",
			data: {},
		});
	};

	const createRows = (items: typeof Drug) => {
		const rows: (typeof Drug)[] = [];
		for (let i = 0; i < items.length; i += 2) {
			rows.push(items.slice(i, i + 2));
		}
		return rows;
	};

	return (
		<ScrollView className="bg-white">
			<Text className="pb-4 title-30 text-grayscale-text-title">
				Drug recommendations
			</Text>

			<View className="flex-col gap-y-4">
				{createRows(Drug).map((row, rowIndex) => (
					<View key={`row-${rowIndex}`} className="flex-row justify-between">
						{row.map((card) => (
							<Card
								key={card.id}
								brand_name={card.brand_name}
								item={card.item}
								price={card.price}
								className="w-[48%]"
							/>
						))}
						{row.length === 1 && <View className="w-[48%]" />}
					</View>
				))}
			</View>
		</ScrollView>
	);
}
