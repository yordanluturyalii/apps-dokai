import Card from "@/components/Card";
import { Drug } from "@/constants";
import { Text, View } from "react-native";

export default function CareConnectScreen() {
	return (
		<>
			<Text className="title-30 text-grayscale-text-title">
				Drug recommendations
			</Text>
			{Drug.map((card) => {
				return (
					<Card
						category={card.category}
						item={card.item}
						price={card.price}
						key={card.id}
					/>
				);
			})}
		</>
	);
}
