import ArrowLeft from "@/assets/images/icons/arrow-left.svg";
import FormInput from "@/components/FormInput";
import HeaderBack from "@/components/HeaderBack";
import RequiredText from "@/components/RequiredText";
import ThemedButton from "@/components/ThemedButton";
import { AccountRequiredText } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { object, string } from "zod";

const numberRegex = /[0-9]/;
const alphabetRegex = /[A-Z]/;

const schema = object({
	email: string().email(),
	password: string()
		.min(8)
		.regex(numberRegex, "Password must contain a number")
		.regex(alphabetRegex, "Password must contain an uppercase letter"),
	password_confirmation: string()
		.min(8)
		.regex(numberRegex, "Password must contain a number")
		.regex(alphabetRegex, "Password must contain an uppercase letter"),
}).refine((data) => data.password === data.password_confirmation, {
	message: "Passwords don't match",
	path: ["password_confirmation"],
});

type FormData = {
	email: string;
	password: string;
	password_confirmation: string;
};

export default function RegisterScreen() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const {
		control,
		handleSubmit,
		watch,
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

	const password = watch("password");

	const isLengthValid = password?.length >= 8;
	const containsNumber = numberRegex.test(password || "");
	const containsUpperCase = alphabetRegex.test(password || "");
	const route = useRouter();

	return (
		<View>
			<HeaderBack
				handleNavigation={() => {
					route.back();
				}}
			/>
			<Text className="text-xl font-semibold mb-11">
				Create an Evia account.
			</Text>
			<Controller
				control={control}
				name="email"
				render={({ field: { onChange, value } }) => (
					<FormInput
						className="mb-5"
						contentType="emailAddress"
						label="Email"
						placeholder="johndoe@gmail.com"
						onChange={onChange}
						value={value}
					/>
				)}
			/>
			<Controller
				control={control}
				name="password"
				render={({ field: { onChange, value } }) => (
					<FormInput
						className="mb-5"
						contentType="password"
						label="Password"
						placeholder="Password"
						onChange={onChange}
						value={value}
					/>
				)}
			/>
			<Controller
				control={control}
				name="password_confirmation"
				render={({ field: { onChange, value } }) => (
					<FormInput
						className="mb-5"
						contentType="password"
						label="Confirm Password"
						placeholder="Confirm Password"
						onChange={onChange}
						value={value}
					/>
				)}
			/>
			<Text className="mb-3 text-xs mt-7">Password must contain:</Text>
			<View className="mb-5">
				<RequiredText title="At least 8 characters" isValid={isLengthValid} />
				<RequiredText title="At least one number" isValid={containsNumber} />
				<RequiredText
					title="At least one uppercase letter"
					isValid={containsUpperCase}
				/>
			</View>

			<ThemedButton
				disabled={!isValid || isLoading}
				isLoading={isLoading}
				onPress={handleSubmit(onSubmit)}
			>
				Create an Account
			</ThemedButton>
		</View>
	);
}
