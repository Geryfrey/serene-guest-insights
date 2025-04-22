import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				background: '#F4F7F6',  // Soft off-white
				foreground: '#2C3E50',   // Deep charcoal blue

				primary: {
					DEFAULT: '#34495E',   // Elegant navy blue
					foreground: '#ECF0F1'  // Light gray
				},
				secondary: {
					DEFAULT: '#95A5A6',   // Soft gray
					foreground: '#2C3E50'
				},
				accent: {
					DEFAULT: '#3498DB',   // Soft blue
					foreground: '#FFFFFF'
				},
				muted: {
					DEFAULT: '#BDC3C7',   // Light gray
					foreground: '#34495E'
				},
				destructive: {
					DEFAULT: '#E74C3C',   // Soft red
					foreground: '#FFFFFF'
				},
				gold: {
					DEFAULT: '#F39C12',   // Warm gold
					400: '#F1C40F',
					500: '#F39C12'
				},
				navy: {
					DEFAULT: '#2C3E50',
					100: '#ECF0F1',
					200: '#BDC3C7',
					400: '#7F8C8D',
					500: '#34495E',
					700: '#2C3E50',
					900: '#233240'
				}
			},
			fontFamily: {
				'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
				'serif': ['Playfair Display', 'serif'],
			},
			borderRadius: {
				lg: '1rem',
				md: '0.75rem',
				sm: '0.5rem'
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					'0%': { opacity: 0, transform: 'translateY(40px)' },
					'100%': { opacity: 1, transform: 'translateY(0)' }
				}
			},
			animation: {
				'fade-in': 'fade-in 0.6s ease',
				'slide-up': 'slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
