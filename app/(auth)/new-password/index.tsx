import FormInput from "@/components/FormInput";
import RequiredText from "@/components/RequiredText";
import ThemedButton from "@/components/ThemedButton";
import { AccountRequiredText } from "@/constants";
import { Text, View } from "react-native";

export default function NewPasswordScreen() {
	return (
		<View>
			<Text>Create a new password.</Text>
			<FormInput
				label="New Password"
				placeholder="New Password"
				contentType="newPassword"
			/>
			<FormInput
				label="Confirm New Password"
				placeholder="Confirm New Password"
				contentType="newPassword"
			/>
			<Text>Password must contain:</Text>
			{AccountRequiredText.map((text) => (
				<RequiredText key={text} title={text} />
			))}
			<ThemedButton isLoading={false}>Confirm</ThemedButton>
		</View>
	);
}
