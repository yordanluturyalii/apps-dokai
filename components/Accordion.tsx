import ArrowDown from "@/assets/images/icons/arrow-down.svg";
import { useState } from "react";
import {
	Animated,
	LayoutAnimation,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

type AccordionProps = {
	title: string;
	description: string;
	initiallyExpanded?: boolean;
	className?: string;
};

export default function Accordion({
	title,
	description,
	initiallyExpanded = true,
	className = "",
}: AccordionProps) {
	const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
	const [rotateAnimation] = useState(new Animated.Value(0));

	const toggleAccordion = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

		Animated.timing(rotateAnimation, {
			toValue: isExpanded ? 0 : 1,
			duration: 200,
			useNativeDriver: true,
		}).start();

		setIsExpanded(!isExpanded);
	};

	const arrowRotation = rotateAnimation.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "180deg"],
	});

	return (
		<View
			className={`p-5 mb-3 bg-primary-surface-default-subtle rounded-3xl ${className}`}
		>
			<TouchableOpacity
				onPress={toggleAccordion}
				className="flex-row items-center justify-between"
			>
				<Text className="text-grayscale-text-title link-30">{title}</Text>
				<Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
					<ArrowDown width={20} height={20} />
				</Animated.View>
			</TouchableOpacity>
			{isExpanded && (
				<Text className="pt-3 body-10 text-grayscale-text-body">
					{description}
				</Text>
			)}
		</View>
	);
}
