import HeaderBack from "@/components/HeaderBack";
import ProgressBar from "@/components/ProgressBar";
import ThemedButton from "@/components/ThemedButton";
import { useApi } from "@/hooks/useApi";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import EviaIcon from "@/assets/images/dokai-icon.svg";

//! API Endpoint still cannot be used
interface SimplifyResponse {
	message: string;
	data: {
		complaint: string;
		simplified_message: string;
	};
	errors: string | null;
}

export default function PromptAIScreen() {
	const [message, setMessage] = useState("");
	const router = useRouter();
	const { data, error, isLoading, fetchData } = useApi<SimplifyResponse>();
	const simplifiedText = async () => {
		await fetchData({
			method: "POST",
			uri: "/api/simplify",
			data: { message },
		});
		if (data) {
			setMessage(data.data.complaint);
		}
	};

	return (
		<>
			<HeaderBack handleNavigation={() => router.back()} />
			<ProgressBar length={3} currentStep={2} className="pb-5" />
			<Text className="title-50 text-grayscale-text-title">
				Pain complaint.
			</Text>
			<Text className="pt-1 pb-5 body-10 text-grayscale-text-caption">
				Add the pain complaints you feel.
			</Text>
			<TextInput
				placeholder="Type here..."
				className="flex-1 py-6 border-t border-grayscale-border-default"
				onChangeText={(message) => {
					setMessage(message);
				}}
				multiline={true}
				textAlignVertical="top"
			/>
			<ThemedButton
				className="flex items-end self-end my-5 shadow-lg w-fit"
				type="secondary"
				onPress={simplifiedText}
				isLoading={isLoading}
				disabled={message === ""}
			>
				<View className="flex-row items-center gap-x-2">
					<EviaIcon width={20} height={20} />
					<Text
						className={`${message === "" ? "text-grayscale-text-disable" : "text-grayscale-text-title"}`}
					>
						Language Simplifier
					</Text>
				</View>
			</ThemedButton>
			<ThemedButton
				disabled={message === ""}
				onPress={() => {
					router.replace("/ask-ai/(tabs)/overview");
				}}
			>
				Continue
			</ThemedButton>
		</>
	);
}
