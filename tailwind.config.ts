
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
				background: '#f9fafb',  // Subtle offwhite
				foreground: "#1b2126",

				primary: {
					DEFAULT: '#243949', // modern navy blue
					foreground: '#f8fafc'
				},
				accent: {
					DEFAULT: '#f6f7fa', // light accent
					foreground: '#243949'
				},
				secondary: {
					DEFAULT: '#8E9196', // neutral gray
					foreground: '#fafafa'
				},
				muted: {
					DEFAULT: '#f2f3f5',
					foreground: '#6c6e77'
				},
				destructive: {
					DEFAULT: '#f44336', // elegant red
					foreground: '#f9fafb'
				},
				gold: {
					DEFAULT: '#E6B325',
					400: '#fbe898',
					500: '#E6B325',
				},
				success: "#7BC47F",
				card: {
					DEFAULT: "#ffffff",
					foreground: "#191d21",
				},
				navy: {
					DEFAULT: "#243949",
					100: "#f9fbfc",
					200: "#c8d4e4",
					400: "#5c95f5",
					500: "#3d7eeb",
					700: "#243949",
					900: "#16202a",
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

