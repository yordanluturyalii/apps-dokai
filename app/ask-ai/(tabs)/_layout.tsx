import HeaderBack from "@/components/HeaderBack";
import { Tabs } from "expo-router";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function TabLayout() {
	const route = useRouter();
	return (
		<>
			<HeaderBack
				handleNavigation={() => {
					route.replace("/");
				}}
			/>
			<Text className="title-50 text-grayscale-text-title">Autoimmune</Text>
			<Text className="pt-1 pb-5 body-10 text-grayscale-text-caption">
				Here is the complete result of the diagnosis provided by Evia based on
				the information you shared.
			</Text>
			<Tabs
				screenOptions={{
					tabBarPosition: "top",
					tabBarActiveBackgroundColor: "#FFFFFF",
					tabBarInactiveBackgroundColor: "#FAFAFA",
					tabBarActiveTintColor: "#191B29",
					tabBarIcon: ({ focused, color, size }) => null,
					animation: "shift",
				}}
			>
				<Tabs.Screen name="overview" options={{ title: "Overview" }} />
				<Tabs.Screen name="care-connect" options={{ title: "CareConnect" }} />
			</Tabs>
		</>
	);
}
