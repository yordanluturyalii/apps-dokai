import HeaderBack from "@/components/HeaderBack";
import { Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import OTPInput from "@/components/OtpInput";
import ThemedButton from "@/components/ThemedButton";
import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";

const VerifyTokenScreen = () => {
	const route = useRouter();
	const { data, error, isLoading, fetchData } = useApi();
	const [token, setToken] = useState("");
	const {email} = useLocalSearchParams();

	useEffect(() => {
		if (data) {
			route.push("/");
		}
	}, [data]);

	const onSubmit = async () => {
		await fetchData({
			method: "POST",
			uri: "/auth/forget/password/verify",
			data: {
				email: email,
				otp: token,
			},
		});

		if (error) {
			console.log(error);
			return;
		}
	};

	const handleOTPComplete = (otp: string) => {
		console.log("Valid OTP:", otp);
		setToken(otp);
	};

	return (
		<View>
			<HeaderBack
				handleNavigation={() => {
					route.back();
				}}
			/>
			<Text className="text-xl font-semibold text-grayscale-text-title mb-11">
				Enter verification code. We’ve sent a code to {email}
			</Text>

            {error && (
				<View className="mb-5">
					<Text className="text-xs text-center text-error-text-link bg-error-surface-default-subtle rounded-lg py-3 px-4 w-fit mx-auto border border-error-border-default">
						{error}
					</Text>
				</View>
			)}

			<View className="mb-5">
				<OTPInput onComplete={handleOTPComplete} />
			</View>
			<ThemedButton
				disabled={!token || isLoading}
				isLoading={isLoading}
				className="mb-5"
				onPress={onSubmit}
			>
				Verify
			</ThemedButton>
			<Text className="text-sm font-medium text-center text-grayscale-text-caption">
				Didn't receive the code?{" "}
				<Text className="text-primary-text-link font-bold">Resend</Text>
			</Text>
		</View>
	);
};

export default VerifyTokenScreen;
