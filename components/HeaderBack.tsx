import { Text, TouchableOpacity } from "react-native";
import ArrowLeft from "../assets/images/icons/arrow-left.svg";

type HeaderBackProps = {
	className?: string;
	handleNavigation: () => void;
};

export default function HeaderBack({
	className = "",
	handleNavigation,
}: HeaderBackProps) {
	return (
		<TouchableOpacity
			className={`flex flex-row items-center gap-x-1 pb-6 ${className}`}
			onPress={handleNavigation}
		>
			<ArrowLeft width={20} height={20} />
			<Text className="link-20 text-primary-text-link">Back</Text>
		</TouchableOpacity>
	);
}
