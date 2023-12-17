/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,jsx}"],
	theme: {
		extend: {},
	},
	plugins: [],
	corePlugins: {
		//禁用背景默认为透明色
		preflight: false
	}
}
