/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";


export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
		fontFamily: {
			headings: ["CalSans", ...defaultTheme.fontFamily.sans],
        	sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
        	mono: ["DmSans", ...defaultTheme.fontFamily.sans],
      },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
