/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  "./pages/**/*.{js,jsx}",
	  "./components/**/*.{js,jsx}",
	  "./app/**/*.{js,jsx}",
	  "./src/**/*.{js,jsx}",
	],
	prefix: "",
	theme: {
	  container: {
		center: true,
		padding: "2rem",
		screens: {
		  sm: "640px",
		  md: "768px",
		  lg: "1024px",
		  xl: "1280px",
		  "2xl": "1400px",
		},
	  },
	  extend: {
		colors: {
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  primary: {
			DEFAULT: "hsl(var(--primary))",
			foreground: "hsl(var(--primary-foreground))",
		  },
		  secondary: {
			DEFAULT: "hsl(var(--secondary))",
			foreground: "hsl(var(--secondary-foreground))",
		  },
		  destructive: {
			DEFAULT: "hsl(var(--destructive))",
			foreground: "hsl(var(--destructive-foreground))",
		  },
		  muted: {
			DEFAULT: "hsl(var(--muted))",
			foreground: "hsl(var(--muted-foreground))",
		  },
		  accent: {
			DEFAULT: "hsl(var(--accent))",
			foreground: "hsl(var(--accent-foreground))",
		  },
		  popover: {
			DEFAULT: "hsl(var(--popover))",
			foreground: "hsl(var(--popover-foreground))",
		  },
		  card: {
			DEFAULT: "hsl(var(--card))",
			foreground: "hsl(var(--card-foreground))",
		  },
		  luxury: {
			black: "#121212",
			gray: "#f5f5f7",
			silver: "#e0e0e0",
			gold: "#d4af37",
			blue: "#0071e3",
		  },
		},
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
		fontFamily: {
		  sans: ["Inter", "sans-serif"],
		  display: ["SF Pro Display", "Inter", "sans-serif"],
		  mono: ["SF Mono", "monospace"],
		},
		keyframes: {
		  "accordion-down": {
			from: { height: "0" },
			to: { height: "var(--radix-accordion-content-height)" },
		  },
		  "accordion-up": {
			from: { height: "var(--radix-accordion-content-height)" },
			to: { height: "0" },
		  },
		  "fade-in": {
			"0%": { opacity: "0" },
			"100%": { opacity: "1" },
		  },
		  "fade-out": {
			"0%": { opacity: "1" },
			"100%": { opacity: "0" },
		  },
		  "scale-in": {
			"0%": { transform: "scale(0.95)", opacity: "0" },
			"100%": { transform: "scale(1)", opacity: "1" },
		  },
		  "slide-in": {
			"0%": { transform: "translateX(100%)" },
			"100%": { transform: "translateX(0)" },
		  },
		  "slide-out": {
			"0%": { transform: "translateX(0)" },
			"100%": { transform: "translateX(100%)" },
		  },
		  "rotate-watch": {
			"0%": { transform: "rotateY(0deg)" },
			"100%": { transform: "rotateY(360deg)" },
		  },
		  float: {
			"0%, 100%": { transform: "translateY(0)" },
			"50%": { transform: "translateY(-10px)" },
		  },
		  "pulse-subtle": {
			"0%, 100%": { opacity: "1" },
			"50%": { opacity: "0.8" },
		  },
		},
		animation: {
		  "accordion-down": "accordion-down 0.2s ease-out",
		  "accordion-up": "accordion-up 0.2s ease-out",
		  "fade-in": "fade-in 0.6s ease-out",
		  "fade-out": "fade-out 0.6s ease-out",
		  "scale-in": "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
		  "slide-in": "slide-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
		  "slide-out": "slide-out 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
		  "rotate-watch": "rotate-watch 20s linear infinite",
		  float: "float 5s ease-in-out infinite",
		  "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
		},
		boxShadow: {
		  product:
			"0 50px 100px -20px rgba(0, 0, 0, 0.15), 0 30px 60px -30px rgba(0, 0, 0, 0.1)",
		  card: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.01)",
		  button:
			"0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.01)",
		  nav: "0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.01)",
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  };
  