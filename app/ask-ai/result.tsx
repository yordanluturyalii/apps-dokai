import Accordion from "@/components/Accordion";
import { Text, View } from "react-native";

export default function AIResultScreen() {
	return (
		<View>
			<Text className="title-50 text-grayscale-text-title">Autoimmune</Text>
			<Text className="pt-1 pb-5 body-10 text-grayscale-text-caption">
				Here is the complete result of the diagnosis provided by Evia based on
				the information you shared.
			</Text>
			<View className="space-y-3">
				<Accordion
					title="Lupus"
					description="Lupus is a systemic autoimmune disease that occurs when your body's immune system attacks your own tissues and organs. Inflammation caused by lupus can affect many different body systems — including your joints, skin, kidneys, blood cells, brain, heart and lungs."
				/>
			</View>
		</View>
	);
}
