/** @type {import('tailwindcss').Config} */

/* Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95" */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "#f5f5f5",
				"quill-border": "#cccccc",
			},
			keyframes: {
				"open-dropdown": {
					"0%": { opacity: 0 },
					"100%": { opacity: 1 },
				},
				"close-dropdown": {
					"0%": { opacity: 1 },
					"100%": { opacity: 0 },
				},
			},
			animation: {
				openDropdown: "open-dropdown 100ms ease-in-out",
				closeDropdown: "close-dropdown 0.15s ease-in-out",
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
