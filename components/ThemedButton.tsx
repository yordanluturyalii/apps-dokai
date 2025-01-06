import type { ReactNode } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

export default function ThemedButton({
	children,
	disabled,
	isLoading,
	onPress,
}: {
	children?: ReactNode;
	disabled?: boolean;
	isLoading?: boolean;
	onPress?: (data: any) => void;
}) {
	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={disabled || isLoading}
			style={{
				backgroundColor: disabled || isLoading ? "#DDDDDD" : "#1738DC",
				padding: 10,
				borderRadius: 40,
				alignItems: "center",
			}}
		>
			{isLoading ? (
				<ActivityIndicator size="large" color="#FFFFFF" />
			) : (
				<Text
					style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "semibold" }}
				>
					{children}
				</Text>
			)}
		</TouchableOpacity>
	);
}
