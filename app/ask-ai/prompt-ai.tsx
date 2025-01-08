import ProgressBar from "@/components/ProgressBar";
import ThemedButton from "@/components/ThemedButton";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput } from "react-native";

export default function PromptAIzScreen() {
	const [value, setValue] = useState("");
	const router = useRouter();

	return (
		<>
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
				onChangeText={(value) => {
					setValue(value);
				}}
				multiline={true}
				textAlignVertical="top"
			/>
			<ThemedButton
				className="flex items-end self-end my-5 shadow-lg w-fit"
				type="secondary"
			>
				Language Simplifier
			</ThemedButton>
			<ThemedButton
				disabled={value === ""}
				onPress={() => {
					router.replace("/ask-ai/result");
				}}
			>
				Continue
			</ThemedButton>
		</>
	);
}
