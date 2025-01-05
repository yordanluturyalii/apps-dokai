import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import ArrowLeft from "../assets/images/icons/arrow-left.svg";

export default function HeaderBack() {
	const router = useRouter();
	return (
		<TouchableOpacity
			className="flex flex-row items-center gap-x-1"
			onPress={() => router.back()}
		>
			<ArrowLeft width={20} height={20} />
			<Text className="link-20 text-primary-text-link">Back</Text>
		</TouchableOpacity>
	);
}
