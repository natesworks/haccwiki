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
						{ label: 'Best way to code', slug: 'guides/frida/correct-way' },
						{ label: 'Reverse Engineering - Making Brawl Stars offline', slug: 'https://peterr.dev/re/brawl-stars-offline/' },
					],
				},
				{
					label: 'Server development',
					items: [
						{ label: 'Socket', slug: 'guides/server/socket' },
						{ label: 'Packets', slug: 'guides/server/packets' },
					]
				}
			],
		}),
	],
});
