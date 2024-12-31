/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				grayscale: {
					surface: {
						"default-subtle": "#F2F3F7",
						default: "#D9D9D9",
						disable: "#F2F2F2",
					},
					border: {
						default: "#D3D5E4",
						disable: "#F2F2F2",
					},
					text: {
						title: "#191B29",
						body: "#333652",
						subtitle: "#656B9F",
						caption: "#A4A7C6",
						negative: "#D9D9D9",
						disable: "#BFBFBF",
					},
				},
				primary: {
					surface: {
						"default-subtle": "#EBF0FF",
						"default-light": "#477BFF",
						default: "#1B5BFF",
						"default-dark": "#0030A8",
					},
					border: {
						"default-light": "#759CFF",
						default: "#1B5BFF",
						"default-dark": "#002070",
					},
					text: {
						link: "#0040E0",
					},
				},
				secondary: {
					surface: {
						"default-subtle": "#EFFEFA",
						"default-light": "#BDFEEF",
						default: "#BDFEEF",
						"default-dark": "#087D72",
					},
					border: {
						"default-light": "#BDFEEF",
						default: "#BDFEEF",
						"default-dark": "#087D72",
					},
					text: {
						link: "#09C3AC",
					},
				},
				error: {
					surface: {
						"default-subtle": "#FFEBEF",
						"default-light": "#FF4772",
						default: "#FF1A51",
						"default-dark": "#A80027",
					},
					border: {
						"default-light": "#FF7595",
						default: "#FF1A51",
						"default-dark": "#70001A",
					},
					text: {
						link: "#E00034",
					},
				},
				warning: {
					surface: {
						"default-subtle": "#FFF4EB",
						"default-light": "#FFAB5C",
						default: "#FF9736",
						"default-dark": "#B85900",
					},
					border: {
						"default-light": "#FFC085",
						default: "#FF9736",
						"default-dark": "#7A3B00",
					},
					text: {
						link: "#F57600",
					},
				},
				success: {
					surface: {
						"default-subtle": "#EDFCF3",
						"default-light": "#6EE899",
						default: "#4AE27E",
						"default-dark": "#199A46",
					},
					border: {
						"default-light": "#91EDB1",
						default: "#4AE27E",
						"default-dark": "#116A30",
					},
					text: {
						link: "#199A46",
					},
				},
			},
		},
	},
	plugins: [],
};
