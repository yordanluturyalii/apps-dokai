import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarPosition: "top",
				tabBarActiveBackgroundColor: "#FFFFFF",
				tabBarInactiveBackgroundColor: "#FAFAFA",
				tabBarActiveTintColor: "#191B29",
			}}
		>
			<Tabs.Screen name="overview" options={{ title: "Overview" }} />
			<Tabs.Screen name="care-connect" options={{ title: "CareConnect" }} />
		</Tabs>
	);
}
