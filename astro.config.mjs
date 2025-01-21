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
					label: 'Frida',
					items: [
						{ label: 'Attaching frida', slug: 'guides/frida/attaching' },
						{ label: 'Online battles', slug: 'guides/frida/online-battles' },
						{ label: 'Offline battles', slug: 'guides/frida/offline-battles' },
					],
				},
				{
				        label: 'Server development',
					items [
            					{ label: 'Introduction', slug: 'guides/server/introduction' },
						{ label: 'Socket', slug: 'guides/server/socket'}
					]
				}
			],
		}),
	],
});
