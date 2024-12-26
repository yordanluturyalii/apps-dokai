import { Text, TouchableOpacity } from "react-native";

export default function ThemedButton({
	title,
	className,
}: { title: string; className?: string }) {
	return (
		<TouchableOpacity
			className={`py-3 rounded-3xl ${className}`}
			style={{ alignItems: "center" }}
		>
			<Text>{title}</Text>
		</TouchableOpacity>
	);
}
