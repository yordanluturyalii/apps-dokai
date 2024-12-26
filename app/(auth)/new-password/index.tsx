import FormInput from "@/components/ui/FormInput";
import RequiredText from "@/components/ui/RequiredText";
import ThemedButton from "@/components/ui/ThemedButton";
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
			<ThemedButton title="Confirm" />
		</View>
	);
}
