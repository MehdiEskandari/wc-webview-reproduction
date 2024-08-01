import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	// build: {
	// 	outDir: "./docs",
	// 	rollupOptions: {
	// 		output: {
	// 			inlineDynamicImports: true,
	// 		},
	// 	},
	// },
	// base: "/wc-webview-reproduction/",

	plugins: [react()],
});
