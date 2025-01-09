import HeaderBack from "@/components/HeaderBack";
import { Tabs } from "expo-router";
import { useRouter } from "expo-router";
export default function TabLayout() {
	const route = useRouter();
	return (
		<>
			<HeaderBack
				handleNavigation={() => {
					route.replace("/");
				}}
			/>
			<Tabs
				screenOptions={{
					tabBarPosition: "top",
					tabBarActiveBackgroundColor: "#FFFFFF",
					tabBarInactiveBackgroundColor: "#FAFAFA",
					tabBarActiveTintColor: "#191B29",
					tabBarIcon: ({ focused, color, size }) => null,
				}}
			>
				<Tabs.Screen name="overview" options={{ title: "Overview" }} />
				<Tabs.Screen name="care-connect" options={{ title: "CareConnect" }} />
			</Tabs>
		</>
	);
}
