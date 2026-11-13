import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

// Type-check frontmatter using a schema
// portfolios
const portfolios = defineCollection({
	// type: "content",
	loader: glob({
		pattern: "**/[^_]*.{md,mdx}",
		base: "./src/data/portfolios",
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			heroImage: image(),
			clients: z.array(z.string()),
			location: z.string(),
			images: z.array(
				z.array(image()).refine((arr) => [1, 2, 3].includes(arr.length), {
					message: "Each sub-array must contain 1, 2, or 3 items",
				}),
			),
			// Transform string to Date object
			date: z.coerce.date(),
			order: z.number(),
			// will be excluded from build if draft is "true"
			draft: z.boolean().optional(),
		}),
});

// testimonials
const testimonials = defineCollection({
	// type: "content",
	loader: glob({
		pattern: "**/[^_]*.{md,mdx}",
		base: "./src/data/testimonials",
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			testimonial: z.string(),
			image: image(),
			order: z.number(),
			// will be excluded from build if draft is "true"
			draft: z.boolean().optional(),
		}),
});

// staff（スタッフ紹介・採用ページ用）
// 写真は「本人の同意が取れたもの」だけを置く（→ LLM Wiki brand/enlee §4）
const staff = defineCollection({
	// type: "content",
	loader: glob({
		pattern: "**/[^_]*.{md,mdx}",
		base: "./src/data/staff",
	}),
	schema: ({ image }) =>
		z.object({
			// 表示名。フルネームでもニックネームでも、本人が出してよい形で
			name: z.string(),
			// 役割（店長／ホール／キッチン／パティシエ など）
			role: z.string(),
			// 在籍のはじまり（「2021年のオープンから」など自由記述）
			since: z.string().optional(),
			// 顔写真。同意が取れるまでは未設定でよい（未設定ならイニシャルの枠を表示）
			image: image().optional(),
			// 写真の代替テキスト
			imageAlt: z.string().optional(),
			// 一言（カードに大きく出る）
			lead: z.string(),
			// 一問一答。設問は _template/index.md を参照
			questions: z.array(
				z.object({
					q: z.string(),
					a: z.string(),
				}),
			),
			order: z.number(),
			// true の間は公開されない（ヒアリング前・同意前はこれを付けておく）
			draft: z.boolean().optional(),
		}),
});

// other pages
const otherPages = defineCollection({
	// type: "content",
	loader: glob({
		pattern: "**/[^_]*.{md,mdx}",
		base: "./src/data/otherPages",
	}),
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			draft: z.boolean().optional(),
		}),
});

// guides（ご利用ガイド）
// 会社やグループの幹事さんが探す言葉（歓送迎会・セミナー・会議のお弁当 など）ごとに1本ずつ書く。
// 🔴 値段・人数・時間は、貸切プラン／お弁当のページに出しているものと同じ値だけを書く。
// faq は本文の下に「よくあるご質問」として表示し、同じ中身を FAQPage の構造化データにも出す（片方だけにしない）。
const guides = defineCollection({
	loader: glob({
		pattern: "**/[^_]*.{md,mdx}",
		base: "./src/data/guides",
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// 一覧のカードと、記事の冒頭に出す短い導入
			lead: z.string(),
			heroImage: image(),
			heroAlt: z.string(),
			date: z.coerce.date(),
			updated: z.coerce.date().optional(),
			faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
			order: z.number(),
			draft: z.boolean().optional(),
		}),
});

export const collections = {
	portfolios,
	testimonials,
	staff,
	otherPages,
	guides,
};
