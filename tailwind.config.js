/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "#f5f5f5",
				"quill-border": "#cccccc",
			},
		},
	},
	variants: {
		extend: {
			display: ["group-hover"],
		},
	},
	plugins: [],
};

