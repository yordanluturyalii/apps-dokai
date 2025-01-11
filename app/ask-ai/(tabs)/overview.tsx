import Accordion from "@/components/Accordion";
import { useApi } from "@/hooks/useApi";
import { ScrollView, View } from "react-native";

export default function AIOverviewScreen() {
	const { data, error, fetchData, isLoading } = useApi();

	return (
		<ScrollView className="bg-white">
			<Accordion
				title="Condition Identified"
				description="Based on the symptoms described and the provided image, it is possible that you are experiencing a condition related to autoimmune skin diseases. Common conditions with similar symptoms include eczema (atopic dermatitis), psoriasis, or urticarial vasculitis."
			/>
			<Accordion
				title="Potential Causes"
				description="Autoimmune Response: The immune system may mistakenly attack healthy skin cells.
					Triggers: Environmental factors, stress, or allergens may exacerbate the condition.
					Infection Risk: Prolonged scratching could lead to skin breakage and secondary infection."
			/>
			<Accordion
				title="Recommended Actions"
				description={`Consult a Dermatologist or Rheumatologist:Seek a professional diagnosis to determine if the condition is related to autoimmune skin diseases.
Topical Treatments:
Prescription creams or ointments containing corticosteroids or calcinuerin inhibitors may help reduce inflammation and itching.
Oral Medications:
If symptoms persist, medications such as antihistamines or immunosuppressants might be necessary under medical supervision.
Lifestyle Modifications:
Use fragrance-free, hypoallergenic skin products.
Keep the affected area moisturized with emollients.
Avoid hot showers, which can worsen dryness and itching.
Further Investigation:
Conduct allergy testing or blood tests to identify potential autoimmune markers.`}
			/>
			<Accordion
				title="Urgency"
				description="If symptoms worsen or signs of infection (such as pus, fever, or increased redness) appear, seek immediate medical attention."
			/>
		</ScrollView>
	);
}
