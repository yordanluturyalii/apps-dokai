import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function FormInput({
	label,
	placeholder,
	className,
	contentType,
}: {
	label: string;
	placeholder: string;
	className?: string;
	contentType:
		| "none"
		| "URL"
		| "addressCity"
		| "addressCityAndState"
		| "addressState"
		| "countryName"
		| "creditCardNumber"
		| "creditCardExpiration"
		| "creditCardExpirationMonth"
		| "creditCardExpirationYear"
		| "emailAddress"
		| "familyName"
		| "fullStreetAddress"
		| "givenName"
		| "jobTitle"
		| "location"
		| "middleName"
		| "name"
		| "namePrefix"
		| "nameSuffix"
		| "nickname"
		| "organizationName"
		| "postalCode"
		| "streetAddressLine1"
		| "streetAddressLine2"
		| "sublocality"
		| "telephoneNumber"
		| "username"
		| "password"
		| "newPassword"
		| "oneTimeCode"
		| undefined;
}) {
	const [showPassword, setShowPassword] = useState(true);
	const onTogglePassword = () => setShowPassword(!showPassword);

	return (
		<View className={className}>
			<Text className="pb-1">{label}</Text>
			{contentType === "password" || contentType === "newPassword" ? (
				<View
					className="grid grid-flow-col px-4 py-3 rounded-3xl"
					style={{ gridTemplateColumns: "1fr auto" }}
				>
					<TextInput
						placeholder={placeholder}
						textContentType={contentType}
						style={{ outline: "none", paddingRight: 8 }}
						secureTextEntry={showPassword}
					/>
					<TouchableOpacity onPress={onTogglePassword}>
						{showPassword ? (
							<Image source={require("@/assets/images/icons/eye-off.svg")} />
						) : (
							<Image source={require("@/assets/images/icons/eye.svg")} />
						)}
					</TouchableOpacity>
				</View>
			) : (
				<TextInput
					placeholder={placeholder}
					textContentType={contentType}
					className="px-4 py-3 rounded-3xl"
				/>
			)}
		</View>
	);
}
