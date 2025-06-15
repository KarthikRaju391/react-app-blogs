/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				background: "#f5f5f5",
				"quill-border": "#cccccc",
				gray: {
					50: '#f9fafb',
					100: '#f3f4f6',
					200: '#e5e7eb',
					300: '#d1d5db',
					400: '#9ca3af',
					500: '#6b7280',
					600: '#4b5563',
					700: '#374151',
					800: '#1f2937',
					900: '#111827',
					950: '#030712',
				},
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme('colors.gray.800'),
						maxWidth: 'none',
						'h1, h2, h3, h4': {
							color: theme('colors.gray.900'),
						},
						a: {
							color: theme('colors.blue.600'),
							'&:hover': {
								color: theme('colors.blue.800'),
							},
						},
						code: {
							backgroundColor: theme('colors.gray.100'),
							color: theme('colors.gray.800'),
							padding: '0.25rem 0.5rem',
							borderRadius: '0.25rem',
							fontSize: '0.875rem',
						},
						'code::before': {
							content: '""',
						},
						'code::after': {
							content: '""',
						},
						pre: {
							backgroundColor: theme('colors.gray.900'),
							color: theme('colors.gray.100'),
						},
						'pre code': {
							backgroundColor: 'transparent',
							color: 'inherit',
							padding: '0',
						},
						blockquote: {
							borderLeftColor: theme('colors.blue.500'),
							backgroundColor: theme('colors.gray.50'),
							padding: '1rem',
							borderRadius: '0.5rem',
						},
					},
				},
				invert: {
					css: {
						color: theme('colors.gray.200'),
						'h1, h2, h3, h4': {
							color: theme('colors.white'),
						},
						a: {
							color: theme('colors.blue.400'),
							'&:hover': {
								color: theme('colors.blue.300'),
							},
						},
						code: {
							backgroundColor: theme('colors.gray.800'),
							color: theme('colors.gray.200'),
						},
						pre: {
							backgroundColor: theme('colors.gray.950'),
						},
						blockquote: {
							borderLeftColor: theme('colors.blue.400'),
							backgroundColor: theme('colors.gray.800'),
						},
					},
				},
			}),
			keyframes: {
				"fade-in": {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"slide-in": {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(0)" },
				},
				"scale-in": {
					"0%": { transform: "scale(0.95)", opacity: "0" },
					"100%": { transform: "scale(1)", opacity: "1" },
				},
				"open-dropdown": {
					"0%": { opacity: 0, transform: "scale(0.95)" },
					"100%": { opacity: 1, transform: "scale(1)" },
				},
				"close-dropdown": {
					"0%": { opacity: 1, transform: "scale(1)" },
					"100%": { opacity: 0, transform: "scale(0.95)" },
				},
			},
			animation: {
				"fade-in": "fade-in 0.3s ease-out",
				"slide-in": "slide-in 0.3s ease-out",
				"scale-in": "scale-in 0.2s ease-out",
				openDropdown: "open-dropdown 100ms ease-in-out",
				closeDropdown: "close-dropdown 0.15s ease-in-out",
			},
			backdropBlur: {
				xs: '2px',
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
			},
			borderRadius: {
				'4xl': '2rem',
			},
			boxShadow: {
				'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
				'soft-lg': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
			},
		},
	},
	variants: {
		extend: {
			display: ["group-hover"],
			scale: ["group-hover"],
			translate: ["group-hover"],
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
};