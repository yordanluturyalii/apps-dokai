import HeaderBack from "@/components/HeaderBack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useRouter } from "expo-router";
import { Text } from "react-native";
import CareConnectScreen from "./care-connect";
import OverviewScreen from "./overview";

const Tab = createMaterialTopTabNavigator();

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
			<Tab.Navigator
				screenOptions={{
					tabBarActiveTintColor: "#191B29",
					tabBarInactiveTintColor: "#A4A7C6",
					animationEnabled: true,
					tabBarPressColor: "#F7F7FC",
					tabBarIndicatorStyle: {
						backgroundColor: "#FFFFFF",
						height: "80%",
						borderRadius: 40,
						marginBottom: "10%",
					},
					tabBarStyle: {
						backgroundColor: "#F7F7FC",
						borderRadius: 40,
						marginBottom: 20,
						elevation: 0,
					},
				}}
			>
				<Tab.Screen
					name="Overview"
					component={OverviewScreen}
					options={{
						tabBarLabel: ({ focused }) => (
							<Text
								style={{
									color: focused ? "#191B29" : "#A4A7C6",
								}}
							>
								Overview
							</Text>
						),
					}}
				/>
				<Tab.Screen
					name="CareConnect"
					component={CareConnectScreen}
					options={{
						tabBarLabel: ({ focused }) => (
							<Text
								style={{
									color: focused ? "#191B29" : "#A4A7C6",
								}}
							>
								CareConnect
							</Text>
						),
					}}
				/>
			</Tab.Navigator>
		</>
	);
}
