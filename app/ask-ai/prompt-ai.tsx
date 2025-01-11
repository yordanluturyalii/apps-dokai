import HeaderBack from "@/components/HeaderBack";
import ProgressBar from "@/components/ProgressBar";
import ThemedButton from "@/components/ThemedButton";
import { useApi } from "@/hooks/useApi";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import EviaIcon from "@/assets/images/dokai-icon.svg";
import { useAuth } from "@/hooks/useAuth";

interface SimplifyResponse {
	message: string;
	data: {
		complaint: string;
		simplified_msg: string;
	};
	errors: string | null;
}

export default function PromptAIScreen() {
	const [message, setMessage] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const router = useRouter();
	const { data, error, isLoading, fetchData } = useApi<SimplifyResponse>();
	const { token } = useAuth();

	useEffect(() => {
		if (data) {
			let text = data.data.simplified_msg;
			console.log(text);
			setMessage("");
			let index = 0;

			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}

			intervalRef.current = setInterval(() => {
				if (index < text.length) {
					setIsTyping(true);
					setMessage((prev) => prev + text[index]);
					index++;
				} else {
					clearInterval(intervalRef.current!);
					intervalRef.current = null;
					setIsTyping(false);
				}
			}, 85);

			return () => {
				if (intervalRef.current) {
					clearInterval(intervalRef.current);
					intervalRef.current = null;
				}
			};
		}
	}, [data]);

	const simplifiedText = async () => {	
		await fetchData({
			method: "POST",
			uri: "/ai/simplify",
			data: { message },
			headers: {
				Authorization: token,
			},
		});

		if (error) {
			console.log(error);
			return;
		}
	};

	return (
		<>
			<HeaderBack handleNavigation={() => router.back()} />
			<ProgressBar length={3} currentStep={2} className="pb-5" />
			<Text className="title-50 text-grayscale-text-title">
				Pain complaint.
			</Text>
			<Text className="pt-1 pb-5 body-10 text-grayscale-text-caption border-b border-grayscale-border-default">
				Add the pain complaints you feel.
			</Text>
			{isTyping && (
				<View className="flex-row items-center justify-between bg-grayscale-surface-default border border-primary-border-default-light/50 rounded-[40px] py-1 pr-2 mt-6 shadow-xl shadow-primary-surface-default-light">
					<View className="flex-row items-center gap-x-2 px-3">
						<EviaIcon width={20} height={20} />
						<Text className="text-sm font-semibold text-grayscale-text-body">
							Language Simplifier
						</Text>
					</View>
					<ThemedButton
						type="secondary"
						onPress={() => {
							if (intervalRef.current) {
								clearInterval(intervalRef.current);
								intervalRef.current = null;
								setIsTyping(false);
							}
						}}
						className="flex-row items-center gap-x-2 py-2"
					>
						<View className="flex-row items-center gap-x-2">
							<View className="bg-primary-surface-default rounded-full w-4 h-4"></View>
							<Text className="text-sm font-semibold text-grayscale-text-body">
								Stop Generating
							</Text>
						</View>
					</ThemedButton>
				</View>
			)}
			<TextInput
				placeholder="Type here..."
				className="flex-1 py-6"
				value={message}
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
				disabled={message === "" || isTyping}
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
				disabled={message === "" || isTyping}
				onPress={() => {
					router.replace({
						pathname: "/ask-ai/(tabs)/overview",
						params: {
							message: message,
						},
					});
				}}
			>
				Continue
			</ThemedButton>
		</>
	);
}
