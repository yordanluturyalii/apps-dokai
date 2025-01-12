import Accordion from "@/components/Accordion";
import { useApi } from "@/hooks/useApi";
import { useEffect } from "react";
import { ScrollView } from "react-native";

interface ComplaintResponse {
	complaint_id: string;
	title: string;
	response: {
		suggested_title: string;
		condition_identified: string;
		potential_causes: string;
		recommended_actions: string;
		urgency: string;
	};
	image_url: string;
}

export default function AIOverviewScreen() {
	const { data, error, fetchData, isLoading } = useApi<ComplaintResponse>();

	const handleGetData = async () => {
		await fetchData({
			method: "GET",
			uri: "/complaints/e7c83890-b14d-426e-8b60-bb1e5828c59c",
			headers: {
				// Temporary
				Authorization:
					"s2frOorq8L9h34G8L5SLAJvu2J880WIC088dEx3JzUj0v5gow0RNu7edPGGb1uYx",
			},
		});
	};

	useEffect(() => {
		handleGetData();
	}, []);

	return (
		<ScrollView className="bg-white">
			<Accordion
				title="Condition Identified"
				description={data?.data?.response.condition_identified || ""}
			/>
			<Accordion
				title="Potential Causes"
				description={data?.data?.response.potential_causes || ""}
			/>
			<Accordion
				title="Recommended Actions"
				description={data?.data?.response.recommended_actions || ""}
			/>
			<Accordion
				title="Urgency"
				description={data?.data?.response.urgency || ""}
			/>
		</ScrollView>
	);
}
