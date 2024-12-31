import ArrowLeft from "@/assets/images/icons/arrow-left.svg";
import FormInput from "@/components/ui/FormInput";
import ThemedButton from "@/components/ui/ThemedButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity } from "react-native";
import { object, string } from "zod";

const schema = object({
	email: string().email(),
});

type FormData = {
	email: string;
};

const ForgotPasswordScreen = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		mode: "onChange",
	});

	const onSubmit = (data: FormData) => {
		try {
			setIsLoading(true);
			setTimeout(() => {
				console.log(data);
			}, 1000);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<TouchableOpacity
				className="flex flex-row items-center mt-11 gap-x-2"
				onPress={() => router.back()}
			>
				<ArrowLeft width={20} height={20} />
				<Text className="text-sm text-[#1738DC] font-semibold">Back</Text>
			</TouchableOpacity>
			<Text className="text-2xl font-semibold text-[#111111] mt-7">
				Enter your email and we'll send you a code to verify your email.
			</Text>
			<Controller
				control={control}
				name="email"
				render={({ field: { onChange, value } }) => (
					<FormInput
						className="mb-6 mt-14"
						label="Email"
						placeholder="johndoe@gmail.com"
						contentType="emailAddress"
						onChange={onChange}
						value={value}
					/>
				)}
			/>

			<ThemedButton
				title="Send link to email"
				disabled={!isValid || isLoading}
				isLoading={isLoading}
				onPress={handleSubmit(onSubmit)}
			/>
		</>
	);
};

export default ForgotPasswordScreen;
