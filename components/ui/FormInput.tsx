import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import EyeOff from "@/assets/images/icons/eye-off.svg"
import Eye from "@/assets/images/icons/eye.svg"


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
					style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#DDD", borderRadius: 25, paddingHorizontal: 10, justifyContent: "space-between" }}
				>
					<TextInput
						placeholder={placeholder}
						textContentType={contentType}
						style={{flex: 1}}
						secureTextEntry={showPassword}
					/>
					<TouchableOpacity onPress={onTogglePassword}>
						{showPassword ? (
							<EyeOff width={20} height={20} />
						) : (
							<Eye width={20} height={20} />
						)}
					</TouchableOpacity>
				</View>
			) : (
				<TextInput
					placeholder={placeholder}
					textContentType={contentType}
					className="px-4 py-3 rounded-3xl"
					style={{ outline: "none", paddingRight: 8, borderStyle: "solid", borderColor: "#DDDD", borderRadius: 40, borderWidth: 1 }}
				/>
			)}
		</View>
	);
}
