/**
 * クリスマスのご予約（2026）。
 * 🔴 クリスマスの専用ページ・トップの案内・お弁当ページの案内・構造化データ・期限の判定は、
 *    すべてこのファイルだけを読む。値を変えるときはここだけを直す。
 *
 * 正本: LLM-wiki wiki/businesses/enlee/christmas-2026.md §6（2026-11-12 本人確定）
 *       値段は「月次振り返りの壁打ち」セッションで本人確定（「この価格でいきます」）
 * 予約フォーム・公式LINEの自動返信・リッチメニューとも同じ値にそろえている。
 */
import chickenImage from "@assets/images/xmas/chicken.jpg";
import horsDoeuvreImage from "@assets/images/xmas/hors-doeuvre.jpg";
import parisBrestHeroImage from "@assets/images/xmas/parisbrest-hero.jpg";
import parisBrestImage from "@assets/images/xmas/parisbrest.jpg";
import tartImage from "@assets/images/xmas/tart.jpg";

export interface XmasPrice {
	label?: string; // 「スタンダード（2〜3名様向け）」など。1種類だけなら無し
	price: number; // 税込の円
}

export interface XmasItem {
	id: string;
	name: string;
	badge?: string; // 「新作」など
	size?: string; // 「約20cm・4〜5名様向け」など
	description: string;
	prices: XmasPrice[];
	image: ImageMetadata;
	alt: string;
}

export const XMAS = {
	year: 2026,
	// 受付の期限。この時刻を過ぎたら、案内は自動で「受付終了」に切り替わる（ブラウザ側で判定）
	acceptFrom: "2026-11-12",
	until: "2026-12-17T23:59:59+09:00",
	deadlineLabel: "12月17日（木）",
	pickupDays: ["12月24日（木）", "12月25日（金）"],
	pickupDates: ["2026-12-24", "2026-12-25"],
	pickupHours: "11:00〜20:00",
	place: "Enlee（福山市霞町・中央公園内）の店頭",
	payment: "お受け取りの際に、店頭でお支払いください。",
	cancel: "ご予約の変更・キャンセルは、12月17日（木）まで承ります。お受け取りの時間に遅れる場合は、ご連絡ください。",
	// 予約フォーム。「ご予約の方法＝ホームページ」を事前に入れたリンク（HP からの予約数を数えるため）
	// 出典: LLM-wiki raw/businesses/enlee/christmas-2026-reservation-form/form_info.json の hpUri
	formUrl:
		"https://docs.google.com/forms/d/e/1FAIpQLScVDYwL8ZVUIzcK1DObLEza7ZninKsYQBA2GeXJEpJPVqkVtQ/viewform?usp=pp_url&entry.104595912=%E3%83%9B%E3%83%BC%E3%83%A0%E3%83%9A%E3%83%BC%E3%82%B8",
	lineUrl: "https://lin.ee/ngJUcCC",
	tel: "084-999-7006",
	heroImage: parisBrestHeroImage,
};

export const XMAS_ITEMS: XmasItem[] = [
	{
		id: "paris-brest",
		name: "パリブレスト",
		badge: "新作",
		size: "約20cm・4〜5名様向け",
		// なっちゃんの説明文（2026-11-12 エンリーサミット）をもとに
		description:
			"Enleeこだわりのシュークリームを、クリスマスケーキにアレンジしました。アーモンドやナッツの香ばしさ、サクサクの生地に、たっぷりのカスタードクリームといちご・ベリーをはさんでいます。",
		prices: [{ price: 5500 }],
		image: parisBrestImage,
		alt: "いちごとベリーをはさんだ、リング形のパリブレスト",
	},
	{
		id: "tart",
		name: "クリスマスタルト",
		size: "6号（約18cm）・4〜5名様向け",
		// 「昨年いちばん」は 2025年12月のレジ記録（47台・クリスマス商品の1位）に基づく
		description:
			"いちごとベリーを敷きつめた、Enleeのクリスマスの定番。昨年いちばんご好評をいただいたタルトです。",
		prices: [{ price: 4800 }],
		image: tartImage,
		alt: "いちごとブルーベリーを敷きつめたクリスマスタルト",
	},
	{
		id: "hors-doeuvre",
		name: "クリスマスオードブル",
		// 品目はなっちゃんの LINE（2026-11-12）のとおり
		description:
			"和牛ミスジステーキ、サーモンとアボカドのタルタルブルスケッタ、オムライス、グリル玉ねぎ、広島熟成鶏のからあげ、かぼちゃのグリル、エビのカダイフフライの7品。スタンダードとファミリーは、品数は同じで量がちがいます。",
		prices: [
			{ label: "スタンダード（2〜3名様向け）", price: 4200 },
			{ label: "ファミリー（4〜5名様向け）", price: 6800 },
		],
		image: horsDoeuvreImage,
		alt: "ミスジステーキやエビのフライを盛り合わせたクリスマスオードブル",
	},
	{
		id: "chicken",
		name: "クリスマスチキン",
		// 🔺 説明は写真から書いた仮の文。味付け・部位が分かれば直す
		description: "こんがりと焼き上げた、クリスマスのチキン。オードブルと一緒にどうぞ。",
		prices: [
			{ label: "1本", price: 680 },
			{ label: "4本セット", price: 2480 },
		],
		image: chickenImage,
		alt: "こんがり焼いた骨付きのクリスマスチキン",
	},
];

/** ¥5,500 の形にする（表記ルール: 半角¥・3桁区切り） */
export const yen = (n: number) => `¥${n.toLocaleString("ja-JP")}`;

/** クリスマスのページに出す「よくあるご質問」。表示と FAQPage 構造化データの両方に使う */
export const XMAS_FAQ = [
	{
		q: "クリスマスケーキ・オードブルの予約はいつまでですか？",
		a: `${XMAS.deadlineLabel}まで承ります。`,
	},
	{
		q: "受け取りはいつ、どこですか？",
		a: `${XMAS.pickupDays.join("・")}の${XMAS.pickupHours}に、${XMAS.place}でお渡しします。ご予約のときに、お受け取りの時間帯をお選びください。`,
	},
	{
		q: "どうやって予約できますか？",
		a: `このページの予約フォームのほか、公式LINE、お電話（${XMAS.tel}）、店頭でも承ります。公式LINEでは「クリスマス」と送っていただくと、予約フォームをお送りします。`,
	},
	{
		q: "支払いはいつですか？",
		a: XMAS.payment,
	},
	{
		q: "キャンセルや変更はできますか？",
		a: XMAS.cancel,
	},
];
