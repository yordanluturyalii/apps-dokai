import ArrowLeft from "@/assets/images/icons/arrow-left.svg";
import HeaderBack from "@/components/HeaderBack";
import FormInput from "@/components/ui/FormInput";
import ThemedButton from "@/components/ui/ThemedButton";
import { zodResolver } from "@hookform/resolvers/zod";
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
			<HeaderBack />
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
