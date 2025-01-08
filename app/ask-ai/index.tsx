import ProgressBar from "@/components/ProgressBar";
import ThemedButton from "@/components/ThemedButton";
import { type CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { launchImageLibraryAsync } from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PhotoAIScreen() {
	const [image, setImage] = useState<string | null>(null);
	const [facing, setFacing] = useState<CameraType>("back");
	const [permissionCamera, requestPermissionCamera] = useCameraPermissions();
	const [step, setStep] = useState(0);

	const router = useRouter();

	if (!permissionCamera) {
		// Camera permissions are still loading.
		return <View />;
	}

	if (!permissionCamera.granted) {
		return (
			<View className="inset-0 flex items-center justify-center backdrop-blur-sm">
				<View>
					<Text>ALLOW EVIA TO ACCESS</Text>
					<Image source={require("@/assets/images/camera-permission.png")} />
				</View>
				<Text>Camera permission.</Text>
				<Text>Allow permission to access the camera on your device.</Text>
				<View>
					<ThemedButton>Deny</ThemedButton>
					<ThemedButton onPress={requestPermissionCamera}>Allow</ThemedButton>
				</View>
			</View>
		);
	}

	function toggleCameraFacing() {
		setFacing((current) => (current === "back" ? "front" : "back"));
	}

	const pickImage = async () => {
		const result = await launchImageLibraryAsync({
			mediaTypes: "images",
			allowsEditing: true,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
			setStep(Math.min(3 - 1, step + 1));
		}
	};

	return (
		<>
			<ProgressBar length={3} currentStep={step} className="pb-5" />
			<Text className="title-50 text-grayscale-text-title">Add image.</Text>
			<Text className="pt-1 pb-5 body-10 text-grayscale-text-caption">
				Add a clear picture of the part of your body that is in pain.
			</Text>
			{image === null ? (
				<CameraView style={styles.camera} facing={facing} />
			) : (
				<Image source={{ uri: image }} style={styles.image} />
			)}
			{image === null ? (
				<View className="flex flex-row justify-between pt-5">
					<ThemedButton type="secondary" onPress={pickImage}>
						Upload a file
					</ThemedButton>
					<TouchableOpacity>
						<Image source={require("@/assets/images/shutter-button.png")} />
					</TouchableOpacity>
				</View>
			) : (
				<ThemedButton onPress={() => router.push("/ask-ai/prompt-ai")}>
					Continue
				</ThemedButton>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	camera: {
		flex: 1,
		borderRadius: "1.5rem",
	},
	image: {
		flex: 1,
	},
});
