import HeaderBack from "@/components/HeaderBack";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import OTPInput from "@/components/OtpInput";
import ThemedButton from "@/components/ThemedButton";
import { useState } from "react";

const VerifyTokenScreen = () => {
	const [isValid, setIsValid] = useState(false);
	const route = useRouter();
	const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(true);
	const onSubmit = (data: FormData) => {
		try {
			setIsLoading(true);
			setTimeout(() => {
				console.log(data);
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleOTPComplete = (otp: string) => {
		console.log("Valid OTP:", otp);
		setIsValid(true);
		setIsLoading(false);
	};

	return (
		<View>
			<HeaderBack
				handleNavigation={() => {
					route.back();
				}}
			/>
			<Text className="text-xl font-semibold text-grayscale-text-title mb-11">
				Enter verification code. We’ve sent a code to mateoandreas@gmail.com
			</Text>

            {error && (
				<View className="mb-5">
					<Text className="text-xs text-center text-error-text-link bg-error-surface-default-subtle rounded-lg py-3 px-4 w-fit mx-auto border border-error-border-default">
						Error
					</Text>
				</View>
			)}

			<View className="mb-5">
				<OTPInput onComplete={handleOTPComplete} />
			</View>
			<ThemedButton
				disabled={!isValid || isLoading}
				isLoading={isLoading}
				className="mb-5"
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
