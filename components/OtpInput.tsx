// OTPInput.tsx
import React, { useState, useRef, useEffect } from "react";
import {
	View,
	TextInput,
	Pressable,
	NativeSyntheticEvent,
	TextInputKeyPressEventData,
} from "react-native";

interface OTPInputProps {
	length?: number;
	onComplete?: (otp: string) => void;
	disabled?: boolean;
	isError?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({
	length = 4,
	onComplete,
	disabled = false,
	isError = false,
}) => {
	const [code, setCode] = useState<string[]>(Array(length).fill(""));
	const inputs = useRef<(TextInput | null)[]>([]);

	useEffect(() => {
		if (!disabled) {
			inputs.current[0]?.focus();
		}
	}, [disabled]);

	const handleChange = (text: string, index: number): void => {
		const newCode = [...code];
		newCode[index] = text;
		setCode(newCode);

		if (text.length === 1 && index < length - 1) {
			inputs.current[index + 1]?.focus();
		}

		const otp = newCode.join("");
		if (otp.length === length) {
			onComplete?.(otp);
		}
	};

	const handleKeyPress = (
		event: NativeSyntheticEvent<TextInputKeyPressEventData>,
		index: number,
	): void => {
		const key = event.nativeEvent.key;
		if (key === "Backspace" && !code[index] && index > 0) {
			inputs.current[index - 1]?.focus();
			const newCode = [...code];
			newCode[index - 1] = "";
			setCode(newCode);
		}
	};

	return (
		<View className="mt-6">
			<Pressable
				className="flex-row justify-center items-center space-x-4"
				onPress={() => !disabled && inputs.current[0]?.focus()}
			>
				{code.map((digit, index) => (
					<View
						key={index}
						className={`
              w-20 h-16
              border
              border-grayscale-border-default
              rounded-lg
              overflow-hidden
              bg-white
              justify-evenly
              items-center
			  mx-4
            `}
					>
						<TextInput
							ref={(ref) => (inputs.current[index] = ref)}
							className={`
                text-2xl
                font-semibold
				text-grayscale-text-title
              `}
							maxLength={1}
							keyboardType="number-pad"
							selectTextOnFocus
							onChangeText={(text) => handleChange(text, index)}
							onKeyPress={(event) => handleKeyPress(event, index)}
							value={digit}
							editable={!disabled}
						/>
					</View>
				))}
			</Pressable>
		</View>
	);
};

export default OTPInput;
