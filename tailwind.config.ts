
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
				background: '#F1F0FB',     // Soft Gray
				foreground: '#222222',     // Dark Gray
				primary: {
					DEFAULT: '#8E9196',    // Neutral Gray
					foreground: '#FFFFFF'  // Pure White
				},
				secondary: {
					DEFAULT: '#C8C8C9',    // Light Gray
					foreground: '#1A1F2C'  // Dark Purple
				},
				accent: {
					DEFAULT: '#E5DEFF',    // Soft Purple
					foreground: '#222222'
				},
				muted: {
					DEFAULT: '#999',       // Medium Gray
					foreground: '#222'     // Dark Gray
				},
				gold: {
					DEFAULT: '#8E9196',    // Neutral Gray
					400: '#C8C8C9',        // Light Gray
					500: '#8E9196'         // Neutral Gray
				},
				navy: {
					DEFAULT: '#1A1F2C',    // Dark Purple
					700: '#1A1F2C'         // Dark Purple
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
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

