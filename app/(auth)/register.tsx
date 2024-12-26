import FormInput from "@/components/ui/FormInput";
import RequiredText from "@/components/ui/RequiredText";
import ThemedButton from "@/components/ui/ThemedButton";
import { AccountRequiredText } from "@/constants";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function RegisterScreen() {
	return (
		<View className="">
			<TouchableOpacity className="grid justify-start grid-flow-col gap-x-1">
				<Image source={require("@/assets/images/icons/arrow-left.svg")} />
				<Text>Back</Text>
			</TouchableOpacity>
			<Text>Create an Evia account.</Text>
			<FormInput
				contentType="emailAddress"
				label="Email"
				placeholder="johndoe@gmail.com"
			/>
			<FormInput
				contentType="password"
				label="Password"
				placeholder="Password"
			/>
			<FormInput
				contentType="password"
				label="Confirm Password"
				placeholder="Confirm Password"
			/>
			<Text>Password must contain:</Text>
			{AccountRequiredText.map((text) => (
				<RequiredText key={text} title={text} />
			))}
			<ThemedButton title="Create an Account" />
		</View>
	);
}
