import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		dts({
			include: ['src/**/*.ts'],
			exclude: ['src/**/*.test.ts', 'node_modules'],
		}),
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			formats: ['es'],
			fileName: 'index',
		},
	},
})
