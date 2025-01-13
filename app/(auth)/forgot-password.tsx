import ArrowLeft from "@/assets/images/icons/arrow-left.svg";
import FormInput from "@/components/FormInput";
import HeaderBack from "@/components/HeaderBack";
import ThemedButton from "@/components/ThemedButton";
import { useApi } from "@/hooks/useApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text } from "react-native";
import { object, string } from "zod";

const schema = object({
	email: string().email(),
});

type FormData = {
	email: string;
};

const ForgotPasswordScreen = () => {
	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		mode: "onChange",
	});
	const route = useRouter();
	const { data, error, isLoading, fetchData } = useApi();
	const [email, setEmail] = useState("");

	useEffect(() => {
		if (data) {
			route.push({pathname: "/verify-token", params: {
				email: email
			}});
		}
	}, [data]);

	const onSubmit = async (formData: FormData) => {
		setEmail(formData.email);
		await fetchData({
			method: "POST",
			uri: "/auth/forget/password",
			data: formData,
		});

		if (error) {
			console.log(error);
			return;
		}
	};

	return (
		<>
			<HeaderBack
				handleNavigation={() => {
					route.back();
				}}
			/>
			<Text className="text-2xl font-semibold text-[#111111]">
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
				disabled={!isValid || isLoading}
				isLoading={isLoading}
				onPress={handleSubmit(onSubmit)}
			>
				Send link to email
			</ThemedButton>
		</>
	);
};

export default ForgotPasswordScreen;
