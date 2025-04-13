import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './components/**/*.{vue,js}',
        './pages/**/*.vue',
        './app.vue',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
export default config