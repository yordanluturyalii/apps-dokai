import type { ReactNode } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

export default function ThemedButton({
	children,
	disabled,
	isLoading,
	onPress,
	type,
}: {
	children?: ReactNode;
	disabled?: boolean;
	isLoading?: boolean;
	onPress?: (data: any) => void;
	type?: "primary" | "secondary";
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
			className={`py-3 rounded-3xl text-center ${type === "primary" ? "bg-primary-surface-default" : "bg-grayscale-surface-default"} rounded-lg`}
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
