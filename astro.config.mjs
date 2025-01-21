// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Hacc Wiki',
			social: {
				github: 'https://github.com/allbrawl/haccwiki',
			},
			sidebar: [
				{
					label: 'Frida tutorials ',
					items: [
						{ label: 'Attaching frida', slug: 'guides/frida/attaching' },
						{ label: 'Online battles', slug: 'guides/frida/online-battles' },
						{ label: 'Offline battles', slug: 'guides/frida/offline-battles' },
					],
				}
			],
		}),
	],
});
