import siteData from "@config/siteData.json";

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
	// 店内40席＋テラス25席（宴会・貸切プランのページに表示）
	maximumAttendeeCapacity: 65,
	priceRange: "¥1,000〜2,000",
	acceptsReservations: "https://booking.ebica.jp/webrsv/search/e014121101/29492",
	hasMenu: absolute("/lunch/"),
	sameAs: ["https://www.instagram.com/enlee_fukuyama/"],
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

/** 複数スキーマを 1 つの JSON-LD にまとめる。 */
export const graph = (...nodes: unknown[]) => ({
	"@context": "https://schema.org",
	"@graph": nodes.filter(Boolean),
});
