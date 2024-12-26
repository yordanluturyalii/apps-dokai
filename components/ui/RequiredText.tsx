import { Image, Text, View } from "react-native";

export default function RequiredText({
	title,
}: {
	title: string;
}) {
	return (
		<View className="grid items-center justify-start grid-flow-col gap-x-1">
			<Image source={require("@/assets/images/icons/close-circle.svg")} />
			<Text>{title}</Text>
		</View>
	);
}
