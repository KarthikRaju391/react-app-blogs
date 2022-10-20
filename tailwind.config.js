/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "#f5f5f5",
				personal: "#6b7280",
				tech: "#f87171",
				"self-help": "#16a34a",
				entertainment: "#0891b2",
				lifestyle: "#ea580c",
			},
		},
	},
	plugins: [],
};

