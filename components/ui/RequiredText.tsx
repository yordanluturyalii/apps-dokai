import { Text, View } from "react-native";
import CloseCircle from "@/assets/images/icons/close-circle.svg"
import TickCirlce from "@/assets/images/icons/tick-circle.svg"
import { FieldError } from "react-hook-form";

export default function RequiredText({
	title,
	isValid
}: {
	title: string;
	isValid: boolean
}) {
	return (
		<View className="flex flex-row items-center gap-x-1">
			{isValid ? <TickCirlce width={14} height={14} /> : <CloseCircle width={14} height={14} />}
			<Text className="text-xs">{title}</Text>
		</View>
	);
}
