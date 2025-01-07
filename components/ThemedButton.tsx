import { clsx } from "clsx";
import type { ReactNode } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

type ButtonType = "primary" | "secondary";

interface ThemedButtonProps {
	children?: ReactNode;
	disabled?: boolean;
	isLoading?: boolean;
	onPress?: () => void;
	type?: ButtonType;
	className?: string;
}

export default function ThemedButton({
	children,
	disabled = false,
	isLoading = false,
	onPress,
	type = "primary",
	className,
}: ThemedButtonProps) {
	const baseStyles = "py-3 px-4 rounded-3xl items-center justify-center";

	const buttonStyles = clsx(
		baseStyles,
		type === "primary" && !disabled && "bg-primary-surface-default",
		type === "secondary" &&
			!disabled &&
			"bg-grayscale-surface-default border border-grayscale-border-default",
		disabled && "bg-grayscale-surface-disable",
		className,
	);

	const textStyles = clsx(
		"link-20",
		type === "primary" && !disabled && "text-grayscale-text-negative",
		type === "secondary" && !disabled && "text-grayscale-text-title",
		disabled && "text-grayscale-text-disable",
	);

	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={disabled || isLoading}
			className={buttonStyles}
		>
			{isLoading ? (
				<ActivityIndicator
					size="small"
					className={type === "primary" ? "text-white" : "text-gray-900"}
				/>
			) : (
				<Text className={textStyles}>{children}</Text>
			)}
		</TouchableOpacity>
	);
}
