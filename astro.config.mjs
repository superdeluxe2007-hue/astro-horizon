import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import compress from "@playform/compress";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import AutoImport from "astro-auto-import";
import icon from "astro-icon"; // https://www.astroicon.dev/guides/upgrade/v1/

// https://astro.build/config
export default defineConfig({
	site: "https://enlee-fukuyama.com",
	integrations: [
		// example auto import component into blog post mdx files
		AutoImport({
			imports: [
				// https://github.com/delucis/astro-auto-import
				"@components/Admonition/Admonition.astro",
			],
		}),
		mdx(),
		icon({
			// I include only the icons I use. This is because if you use SSR, ALL icons will be included (no bueno)
			// https://www.astroicon.dev/reference/configuration#include
			include: {
				tabler: [
					"bulb",
					"alert-triangle",
					"flame",
					"info-circle",
					"arrow-narrow-left",
					"arrow-narrow-right",
					"menu-2",
					"x",
					"map-pin",
					"calendar",
					"chevron-down",
					"category",
					"calendar-event",
				],
			},
		}),
		sitemap({
			// 更新日を出す。無いと検索・AI側で「鮮度が判定できない」状態になるため
			serialize(item) {
				item.lastmod = new Date().toISOString();
				return item;
			},
		}),
		compress({
			// 属性の引用符を残す。外した状態だと、簡易パーサー（LLMO診断ツール等）が
			// 日本語の content 値を読み落とす事例があったため（2026-09-21 実測）
			HTML: {
				"html-minifier-terser": {
					removeAttributeQuotes: false,
				},
			},
			JavaScript: true,
			CSS: false,
			Image: false, // astro:assets handles this. Enabling this can dramatically increase build times
			SVG: false, // astro-icon handles this
		}),
	],
	vite: {
		plugins: [tailwindcss()],
		// stop inlining short scripts to fix issues with ClientRouter: https://github.com/withastro/astro/issues/12804
		build: {
			assetsInlineLimit: 0,
		},
	},
});
