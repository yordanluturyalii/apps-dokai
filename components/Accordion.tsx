import ArrowDown from "@/assets/images/icons/arrow-down.svg";
import { Text, TouchableOpacity, View } from "react-native";

export default function Accordion({
	title,
	description,
}: { title: string; description: string }) {
	return (
		<View className="p-5 bg-primary-surface-default-subtle rounded-3xl">
			<View className="flex-row items-center justify-between">
				<Text className="text-grayscale-text-title link-30">{title}</Text>
				<TouchableOpacity onPress={() => {}}>
					<ArrowDown width={20} height={20} />
				</TouchableOpacity>
			</View>
			<Text className="pt-3 body-10 text-grayscale-text-body">
				{description}
			</Text>
		</View>
	);
}
