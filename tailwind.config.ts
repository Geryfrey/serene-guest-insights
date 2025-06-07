
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
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: '#ffffff',  // Pure white
				foreground: "#000000",  // Pure black

				primary: {
					DEFAULT: '#000000', // Pure black
					foreground: '#ffffff' // White text on black
				},
				accent: {
					DEFAULT: '#ffd700', // Gold accent
					foreground: '#000000' // Black text on gold
				},
				secondary: {
					DEFAULT: '#f5f5f5', // Very light gray for subtle backgrounds
					foreground: '#000000'
				},
				muted: {
					DEFAULT: '#f8f8f8',
					foreground: '#666666'
				},
				destructive: {
					DEFAULT: '#ff0000', // Pure red for errors
					foreground: '#ffffff'
				},
				gold: {
					DEFAULT: '#ffd700',
					400: '#ffe55c',
					500: '#ffd700',
				},
				success: "#00ff00", // Pure green for success
				card: {
					DEFAULT: "#ffffff",
					foreground: "#000000",
				},
				navy: {
					DEFAULT: "#000000", // Replace navy with black
					100: "#f8f8f8",
					200: "#e0e0e0",
					400: "#808080",
					500: "#666666",
					700: "#000000",
					900: "#000000",
				},
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
