import HeaderBack from "@/components/HeaderBack";
import ThemedButton from "@/components/ThemedButton";
import { type CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
	const [facing, setFacing] = useState<CameraType>("back");
	const [permissionCamera, requestPermissionCamera] = useCameraPermissions();

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

	return (
		<View style={styles.container} className="w-screen h-screen px-5 py-3">
			<HeaderBack />
			<Text className="title-50 text-grayscale-text-title ">Add image.</Text>
			<Text className="pt-1 pb-5 body-10 text-grayscale-text-caption">
				Add a clear picture of the part of your body that is in pain.
			</Text>
			<CameraView style={styles.camera} facing={facing} />
			<View className="flex flex-row justify-between pt-5">
				<ThemedButton type="secondary">Upload a file</ThemedButton>
				<TouchableOpacity>
					<Image source={require("@/assets/images/shutter-button.png")} />
				</TouchableOpacity>
			</View>
		</View>
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
});
