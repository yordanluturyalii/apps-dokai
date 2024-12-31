import EyeOff from "@/assets/images/icons/eye-off.svg";
import Eye from "@/assets/images/icons/eye.svg";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function FormInput({
	label,
	placeholder,
	className,
	contentType,
	onChange,
	value,
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
	onChange?: (text: string) => void;
	value?: string;
}) {
	const [showPassword, setShowPassword] = useState(true);
	const onTogglePassword = () => setShowPassword(!showPassword);

	const handleChange = (text: string) => {
		if (onChange) onChange(text);
	};

	return (
		<View className={className}>
			<Text className="pb-1 text-xs font-semibold">{label}</Text>
			{contentType === "password" || contentType === "newPassword" ? (
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						borderWidth: 1,
						borderColor: "#DDD",
						borderRadius: 25,
						paddingHorizontal: 10,
						justifyContent: "space-between",
						backgroundColor: "#ffff",
					}}
				>
					<TextInput
						placeholder={placeholder}
						textContentType={contentType}
						style={{ flex: 1, fontSize: 12 }}
						secureTextEntry={showPassword}
						onChangeText={handleChange}
						value={value}
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
					onChangeText={handleChange}
					className="px-4 py-3 rounded-3xl"
					style={{
						outline: "none",
						paddingRight: 8,
						borderStyle: "solid",
						borderColor: "#DDDD",
						borderRadius: 40,
						borderWidth: 1,
						backgroundColor: "#ffff",
						fontSize: 12,
					}}
				/>
			)}
		</View>
	);
}
