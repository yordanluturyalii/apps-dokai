import ProgressBar from "@/components/ProgressBar";
import ThemedButton from "@/components/ThemedButton";
import { type CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { launchImageLibraryAsync } from "expo-image-picker";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PhotoAIScreen() {
	const [image, setImage] = useState<string | null>(null);
	const [facing, setFacing] = useState<CameraType>("back");
	const [permissionCamera, requestPermissionCamera] = useCameraPermissions();
	const [step, setStep] = useState(0);
	const cameraRef = useRef(null);

	const router = useRouter();

	if (!permissionCamera) {
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

	const takePhoto = async () => {
		if (cameraRef.current) {
			try {
				const photo = await cameraRef.current.takePictureAsync();
				setImage(photo.uri);
				setStep(Math.min(3 - 1, step + 1));
			} catch (error) {
				console.error("Failed to take picture:", error);
			}
		}
	};

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
				<CameraView style={styles.camera} facing={facing} ref={cameraRef} />
			) : (
				<Image source={{ uri: image }} style={styles.image} />
			)}
			{image === null ? (
				<View className="flex flex-row justify-between pt-5 gap-x-11">
					<ThemedButton type="secondary" onPress={pickImage} className="flex-1">
						Upload a file
					</ThemedButton>
					<TouchableOpacity onPress={takePhoto}>
						<Image source={require("@/assets/images/shutter-button.png")} />
					</TouchableOpacity>
					<View className="flex-1" />
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
