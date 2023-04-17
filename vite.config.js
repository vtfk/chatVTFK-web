import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig({
	plugins: [
		sveltekit(),
		wasm(),
		topLevelAwait()
	],
	server: {
		fs: {
		  allow: [
			// search up for workspace root
			searchForWorkspaceRoot(process.cwd()),
			// your custom rules
			// '/path/to/custom/allow',
		  ],
		},
	},
});
