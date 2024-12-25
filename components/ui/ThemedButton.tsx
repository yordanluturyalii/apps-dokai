import { Text, TouchableOpacity } from "react-native";

export default function ThemedButton({ title }: { title: string }) {
	return (
		<TouchableOpacity
			className="py-3 rounded-3xl"
			style={{ alignItems: "center" }}
		>
			<Text>{title}</Text>
		</TouchableOpacity>
	);
}
