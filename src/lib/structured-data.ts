import siteData from "@config/siteData.json";
import type { CalendarMonth } from "@/data/calendar";

const SITE_URL = "https://enlee-fukuyama.com";

const absolute = (path = "/") => new URL(path, SITE_URL).toString();

/**
 * 店舗そのものを表す Restaurant。トップページで使う。
 * 🔴 schema.org の値は、サイト上に実際に表示されている情報だけで構成する
 *    （見えていない情報を構造化データに入れない）。
 *    出典: お問い合わせ欄（住所・電話・営業時間・予約リンク）／ランチページ（価格）
 */
export const restaurantSchema = () => ({
	"@type": "Restaurant",
	"@id": `${SITE_URL}/#restaurant`,
	name: "Enlee",
	alternateName: "エンリー",
	url: absolute("/"),
	image: absolute(siteData.defaultImage.src),
	description: siteData.description,
	telephone: "+81-84-999-7006",
	address: {
		"@type": "PostalAddress",
		postalCode: "720-0812",
		addressRegion: "広島県",
		addressLocality: "福山市",
		streetAddress: "霞町1-10-2（中央公園内）",
		addressCountry: "JP",
	},
	// 11:00〜21:00（L.O.20:00）／定休日：火曜日 — お問い合わせ欄の表示と一致させる
	openingHoursSpecification: [
		{
			"@type": "OpeningHoursSpecification",
			dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			opens: "11:00",
			closes: "21:00",
		},
	],
	servesCuisine: ["カフェ", "洋食"],
	// 宴会の最大人数。半立食のブッフェで70名（貸切プランのページに表示）。
	// 総席数（着席）は65席＝店内40席＋テラス25席。
	maximumAttendeeCapacity: 70,
	priceRange: "¥1,000〜2,000",
	acceptsReservations: "https://booking.ebica.jp/webrsv/search/e014121101/29492",
	hasMenu: absolute("/menu/"),
	// 運営会社（フッターに表示している）。姉妹店の KOKON と同じ会社であることを検索・AI に伝える
	parentOrganization: { "@type": "Organization", name: "株式会社SPDX" },
	// お問い合わせ欄に出している Google マップのリンクと同じもの。
	// Googleビジネスプロフィールと HP を結び付け、AI検索（AI Overview・ChatGPT 等）が
	// 同じ店だと判定できるようにする。place_id は GBP API で確定した値。
	hasMap: "https://www.google.com/maps/place/?q=place_id:ChIJj8ELtpMRUTUR7TeiSQD5ig8",
	sameAs: [
		"https://www.instagram.com/enlee_fukuyama/",
		"https://lin.ee/ngJUcCC",
		"https://www.google.com/maps/place/?q=place_id:ChIJj8ELtpMRUTUR7TeiSQD5ig8",
	],
});

/** サイト全体を表す WebSite。全ページで使う。 */
export const webSiteSchema = () => ({
	"@type": "WebSite",
	"@id": `${SITE_URL}/#website`,
	name: siteData.name,
	url: absolute("/"),
	description: siteData.description,
	inLanguage: "ja",
	publisher: { "@id": `${SITE_URL}/#restaurant` },
});

/**
 * 営業カレンダーの「いつもと違う日」を specialOpeningHoursSpecification にする。
 * 同じ @id の Restaurant に重ねる（schema.org は同一 @id のノードをマージする）。
 * 🔴 カレンダーのページに表示している日だけを出す。時間を書いていない日（通常営業）は含めない。
 */
export const specialHoursSchema = (months: CalendarMonth[]) => {
	const pad = (n: number) => String(n).padStart(2, "0");
	const spec = months.flatMap((m) =>
		m.days
			.filter((d) => d.hours)
			.map((d) => {
				const date = `${m.year}-${pad(m.month)}-${pad(d.day)}`;
				const h = d.hours === "closed" ? { opens: "00:00", closes: "00:00" } : d.hours!;
				return {
					"@type": "OpeningHoursSpecification",
					opens: h.opens,
					closes: h.closes,
					validFrom: date,
					validThrough: date,
				};
			})
	);
	if (spec.length === 0) return null;
	return {
		"@type": "Restaurant",
		"@id": `${SITE_URL}/#restaurant`,
		specialOpeningHoursSpecification: spec,
	};
};

/** パンくず。items は [{ label, to }]。 */
export const breadcrumbSchema = (items: { label: string; to?: string }[] = []) => ({
	"@type": "BreadcrumbList",
	itemListElement: items.map((item, index) => ({
		"@type": "ListItem",
		position: index + 1,
		name: item.label,
		...(item.to ? { item: absolute(item.to) } : {}),
	})),
});

/**
 * よくある質問。🔴 ページに実際に表示している内容と同じものだけを出力する。
 * items は [{ q, a }]。FAQページを新設したときに使う。
 */
export const faqSchema = (items: { q: string; a: string }[] = []) => ({
	"@type": "FAQPage",
	mainEntity: items.map((item) => ({
		"@type": "Question",
		name: item.q,
		acceptedAnswer: { "@type": "Answer", text: item.a },
	})),
});

/**
 * 季節の持ち帰り商品（クリスマス等）を、店の OfferCatalog として出す。
 * AI検索・Google が「この店で、いつまでに、いくらで、何を予約できるか」を読めるようにする。
 * 🔴 クリスマスのページに表示している商品・値段・期限だけを入れる（→ src/data/christmas.ts）
 */
export const seasonalOffersSchema = (opts: {
	name: string;
	pageUrl: string;
	acceptFrom: string;
	until: string;
	items: { name: string; description: string; image: string; prices: { label?: string; price: number }[] }[];
}) => ({
	"@type": "Restaurant",
	"@id": `${SITE_URL}/#restaurant`,
	name: "Enlee",
	telephone: "+81-84-999-7006",
	address: {
		"@type": "PostalAddress",
		postalCode: "720-0812",
		addressRegion: "広島県",
		addressLocality: "福山市",
		streetAddress: "霞町1-10-2（中央公園内）",
		addressCountry: "JP",
	},
	hasOfferCatalog: {
		"@type": "OfferCatalog",
		name: opts.name,
		url: absolute(opts.pageUrl),
		itemListElement: opts.items.flatMap((item) =>
			item.prices.map((p) => ({
				"@type": "Offer",
				name: p.label ? `${item.name} ${p.label}` : item.name,
				price: p.price,
				priceCurrency: "JPY",
				availability: "https://schema.org/PreOrder",
				availabilityStarts: opts.acceptFrom,
				availabilityEnds: opts.until,
				priceValidUntil: opts.until.slice(0, 10),
				availableDeliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModePickUp",
				url: absolute(opts.pageUrl),
				seller: { "@id": `${SITE_URL}/#restaurant` },
				itemOffered: {
					"@type": "Product",
					name: item.name,
					description: item.description,
					image: absolute(item.image),
				},
			}))
		),
	},
});

/**
 * 店内メニュー。Restaurant の hasMenu が指す Menu を、メニューのページに出す。
 * 🔴 メニューのページに表示している品と値段だけを入れる（→ src/data/menu.ts）
 */
export const menuSchema = (
	sections: { title: string; hours?: string; items: { name: string; price: number; description?: string }[] }[]
) => ({
	"@type": "Menu",
	"@id": `${SITE_URL}/menu/#menu`,
	name: "Enlee メニュー",
	url: absolute("/menu/"),
	inLanguage: "ja",
	hasMenuSection: sections.map((s) => ({
		"@type": "MenuSection",
		name: s.title,
		...(s.hours ? { description: `提供時間 ${s.hours}` } : {}),
		hasMenuItem: s.items.map((i) => ({
			"@type": "MenuItem",
			name: i.name,
			...(i.description ? { description: i.description } : {}),
			offers: { "@type": "Offer", price: i.price, priceCurrency: "JPY" },
		})),
	})),
});

/**
 * ご利用ガイドの記事。書き手・発行元は店（Restaurant）そのもの。
 * 🔴 記事に表示している題・説明・日付・写真だけを入れる。
 */
export const articleSchema = (opts: {
	path: string;
	title: string;
	description: string;
	image: string;
	date: Date;
	updated?: Date;
}) => ({
	"@type": "Article",
	"@id": `${absolute(opts.path)}#article`,
	headline: opts.title,
	description: opts.description,
	image: absolute(opts.image),
	datePublished: opts.date.toISOString().slice(0, 10),
	dateModified: (opts.updated ?? opts.date).toISOString().slice(0, 10),
	inLanguage: "ja",
	mainEntityOfPage: absolute(opts.path),
	author: { "@id": `${SITE_URL}/#restaurant` },
	publisher: { "@id": `${SITE_URL}/#restaurant` },
	about: { "@id": `${SITE_URL}/#restaurant` },
});

/** 複数スキーマを 1 つの JSON-LD にまとめる。 */
export const graph = (...nodes: unknown[]) => ({
	"@context": "https://schema.org",
	"@graph": nodes.filter(Boolean),
});
