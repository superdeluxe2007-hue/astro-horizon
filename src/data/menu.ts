/**
 * 店内メニューの一覧（/menu）。
 * 🔴 メニューのページの表示と、Menu 構造化データの両方をこのファイルから作る。値段はここだけを直す。
 *
 * 値段の正本: レジ（USEN）。2026-10-21 の改定後。
 *   照合元: LLM-wiki raw/businesses/enlee/menu-price-2026-10-21/regi-current-00004.csv（10/21 17:28 取得）
 *           ＋ 同フォルダ usen-regi-worklist.md（サラダランチ ¥1,640・ポテト ¥715 据え置き・アイス ダブル追加・
 *             ホットチョコレートへ改称・クラブハウスサンドとかぼちゃのチーズケーキは無し）
 * 載せていないもの（理由）:
 *   - ホールケーキ（2026-11-09 受付停止）／苺のフレンチトースト（春の季節商品）／ストロベリーカスタードパイ（掲載未決）
 *   - ボトルワイン・グラスワインの値段（紙のメニューと未照合）
 * 🔺 値段・提供の確認待ちで外している（2026-11-13 本人「3品を除いて今公開」）: シュークリーム／フライドポテト／季節のパフェ（モンブラン）
 */
export interface MenuItem {
	name: string;
	price: number; // 税込の円
	description?: string;
	note?: string; // 値段の横に添える短い補足
}

export interface MenuSection {
	id: string;
	title: string; // 日本語の見出し
	titleEn: string;
	hours?: string; // 提供時間
	lead?: string;
	items: MenuItem[];
	footnote?: string;
}

export const MENU: MenuSection[] = [
	{
		id: "lunch",
		title: "ランチ",
		titleEn: "Lunch",
		hours: "11:00〜14:00（L.O.14:00）",
		items: [
			{
				name: "Enlee食堂のおばんざい定食",
				price: 1550,
				description:
					"瀬戸内の旬を使った日替わりのおばんざいと、温かいお味噌汁。ごはんは雑穀米・白ごはんからお選びいただけます。",
			},
			{
				name: "自家製鶏ハムとアボカドの農園サラダランチ",
				price: 1640,
				description: "はっとりオーガニックの野菜に、塩麹に漬けた自家製の鶏ハムを合わせました。",
			},
			{
				name: "オムライスランチ 〜半熟卵のデミグラスソース〜",
				price: 1550,
				description: "世羅高原産のコスモス卵と、自家製のデミグラスソース。",
			},
			{
				name: "ピザランチ（ピザ・マルゲリータ）",
				price: 1600,
				description: "ご注文を受けてから焼き上げます。",
			},
		],
		footnote: "ドリンクセットは＋¥385（コーヒー・紅茶・カフェラテ・アップルジュース・オレンジジュース）。",
	},
	{
		id: "sweets",
		title: "スイーツ",
		titleEn: "Sweets",
		hours: "11:00〜21:00（L.O.20:00）",
		items: [
			// 🔺 シュークリームは値段の確認待ちで外している（紙の確定版 ¥495／レジの店内商品 ¥400）。
			//    決まったら戻す: 説明「毎朝焼き上げるサクサクのクッキーシュー。バニラビーンズ入りのカスタードは、ご注文をいただいてからお詰めします。」
			{ name: "季節のフルーツタルト", price: 720 },
			{ name: "ガトーショコラ", price: 650 },
			{
				name: "アイスクリーム ダブル",
				price: 580,
				description: "バニラ・ショコラ・ピスタチオから2つお選びください。",
			},
			// 🔺 季節のパフェ（モンブラン）¥1,580 は、提供中かの確認待ちで外している
			{
				name: "フォンティーヌブロー（フロマージュブラン）",
				price: 1680,
				description: "季節のフルーツを添えて。",
			},
		],
	},
	{
		id: "french-toast",
		title: "フレンチトースト",
		titleEn: "Brioche French Toast",
		hours: "11:00〜21:00（L.O.20:00）",
		lead: "福山市のパン屋「タートル」さんに特注で仕込んでいただいているブリオッシュを使っています。",
		items: [
			{ name: "クラシックフレンチトースト", price: 850 },
			{ name: "林檎とシナモンのフレンチトースト", price: 1380 },
			{ name: "ショコラバナナナッツのフレンチトースト", price: 1360 },
			{
				name: "ミックスベリーのフレンチトースト",
				price: 1490,
				description: "数種のベリーと冷たいバニラアイスを、ふんわりブリオッシュに。",
			},
		],
	},
	{
		id: "food",
		title: "お食事",
		titleEn: "Food",
		hours: "14:00〜21:00（L.O.20:00）",
		items: [
			{
				name: "夜ご飯プレート",
				price: 1780,
				note: "17:00から",
				description: "旬の野菜と日替わりのおばんざいを盛り合わせた、夜のプレートです。",
			},
			{ name: "半熟卵のデミグラスソースのオムライス", price: 1300 },
			{ name: "ピザ・マルゲリータ", price: 1600 },
			{ name: "自家製鶏ハムのシーザーサラダ", price: 1210 },
			// 🔺 フライドポテトは値段の確認待ちで外している（10/21 に ¥715 据え置きの記録／wiki menu.md は ¥770）
		],
	},
	{
		id: "kids",
		title: "キッズメニュー",
		titleEn: "Kids",
		lead: "小学生以下のお子様向けです。",
		items: [
			{ name: "キッズオムライス", price: 770 },
			{ name: "キッズカレーライス", price: 715 },
			// 🔺 フライドポテト（キッズ）も同じ理由で外している
			{ name: "ライス", price: 220 },
			{ name: "キッズジュース（アップル・オレンジ）", price: 330 },
		],
	},
	{
		id: "drink",
		title: "ドリンク",
		titleEn: "Drink",
		items: [
			{ name: "コーヒー", price: 520 },
			{ name: "紅茶", price: 520 },
			{ name: "カフェラテ", price: 600 },
			{ name: "ホットチョコレート", price: 680 },
			{ name: "オレンジアイスティー", price: 680 },
			{ name: "レモネード", price: 680 },
			{ name: "クリームソーダ", price: 680 },
			{ name: "ベリースムージー", price: 700 },
			{ name: "マンゴースムージー", price: 700 },
			{ name: "林檎のシードル", price: 650 },
			{ name: "アップルジュース", price: 550 },
			{ name: "オレンジジュース", price: 550 },
			{ name: "ジンジャーエール", price: 550 },
			{ name: "コーラ", price: 550 },
		],
	},
	{
		id: "alcohol",
		title: "アルコール",
		titleEn: "Alcohol",
		items: [
			{ name: "ビール（HEARTLAND）", price: 720 },
			{ name: "ハイボール", price: 700 },
			{ name: "レモンサワー", price: 700 },
			{ name: "ジントニック", price: 700 },
			{ name: "カシスオレンジ", price: 700 },
			{ name: "サングリア", price: 800 },
		],
		footnote: "ワインもご用意しています。",
	},
];

/** ¥1,550 の形にする（表記ルール: 半角¥・3桁区切り） */
export const yen = (n: number) => `¥${n.toLocaleString("ja-JP")}`;
