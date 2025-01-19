// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			site: "https://hacc.natesworks.com/",
			title: 'HaccWiki',
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			sidebar: [
				{ text: 'Getting Started', link: '/guides/start-hacking/' },
				{ text: 'Categories', link: '/categories/' },
				{ text: 'Contribute', link: '/contribute/' },
				{ text: 'About', link: '/about/' },
			  ],
			head: {
				meta: [
				  { name: 'description', content: 'HaccWiki — Tutorials and Hacks for Everyone' },
				  { name: 'keywords', content: 'hacks, tutorials, programming, hacking, technology' },
				],
			  },
		}),
	],
});


