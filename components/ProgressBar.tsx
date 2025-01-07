import { View } from "react-native";

export default function ProgressBar({
	length,
	currentStep,
	className = "",
}: {
	length: number;
	currentStep: number;
	className?: string;
}) {
	return (
		<View className={`flex flex-row justify-between w-full gap-4 ${className}`}>
			{Array.from({ length }).map((_, index) => (
				<View
					key={index}
					className={`flex-1 h-2 rounded-full ${index < currentStep ? "bg-primary-border-default" : "bg-grayscale-border-disable"}`}
				/>
			))}
		</View>
	);
}
