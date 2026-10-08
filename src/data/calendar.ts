/**
 * * 営業カレンダー（お客様向け）
 *
 * 🔴 毎月ここだけを書き換える。コンポーネント側は触らない。
 *
 * 情報の流れ:
 *   「Enlee営業」Googleカレンダー／公式LINE／ebica
 *     → LLM-wiki の台帳 wiki/businesses/enlee/operations-calendar.md で公開可否を判断
 *     → 公開＝⭕ の行だけをここへ書き写す
 *
 * ⚠️「Enlee営業」Googleカレンダーには打合せ・面接・工事など**営業に関係しない予定も入っている**。
 *    そのまま写さない。お客様の来店可否に関わる日だけを拾う。
 *
 * ⚠️ 仮押さえ（人数・時間が未確定）の日は載せない。確定してから載せる。
 *    「載っていない日＝通常営業」とお客様が読むため、間違いは欠落より強く効く。
 */

export type DayTone =
	/** 来てほしい日（特別営業・イベント）。白抜きで最も目立つ */
	| "star"
	/** 一部ご案内できる日（夜だけ貸切・夜だけ休み 等） */
	| "part"
	/** ご来店いただけない日（終日貸切・臨時休業） */
	| "off";

export interface CalendarDay {
	/** 日 */
	day: number;
	tone: DayTone;
	/** グリッドのセルに出す短い語。**全角4文字まで**（それ以上は枠からはみ出す） */
	cell: string;
	/** 下のリストに出す見出し。制限からではなく、できることから書く（→ brand/enlee §1） */
	title: string;
	/** リストの補足。1〜2行 */
	note?: string;
	/**
	 * その日の実際の営業時間。構造化データ（specialOpeningHoursSpecification）に入る。
	 * 省略＝通常どおり ／ "closed"＝終日ご来店いただけない
	 */
	hours?: { opens: string; closes: string } | "closed";
}

export interface CalendarMonth {
	year: number;
	/** 1〜12 */
	month: number;
	/** 定休の曜日。0=日 1=月 2=火 … （Enlee は火曜） */
	closedWeekday: number;
	/** 通常の営業時間。構造化データと「今日」の表示に使う */
	hours: { opens: string; closes: string };
	days: CalendarDay[];
	/** カレンダー下の一言（無ければ省略） */
	footnote?: string;
}

/** 通常営業の表記。→ brand/writing-style §1（`〜` は U+301C・`L.O.` はピリオド2つ） */
export const HOURS_LABEL = "11:00〜21:00（L.O.20:00）";
export const LUNCH_LABEL = "11:00〜14:00（L.O.14:00）";
export const CLOSED_LABEL = "定休日：火曜日";

/**
 * 新しい月はこの配列の先頭に足す。先頭がページに出る月。
 * 過去の月は消してよい（履歴は LLM-wiki の台帳が持っている）。
 */
export const CALENDAR: CalendarMonth[] = [
	{
		year: 2026,
		month: 8,
		closedWeekday: 2,
		hours: { opens: "11:00", closes: "21:00" },
		days: [
			{
				day: 1,
				tone: "star",
				cell: "イベント",
				title: "PARK FROZEN PARTY",
				note: "17:00〜 中央公園にて。お店も通常どおり営業しています",
			},
			{
				day: 6,
				tone: "part",
				cell: "夜は貸切",
				title: "ランチ営業／夜は貸切",
				note: "11:00〜14:00 はいつもどおりご利用いただけます",
				hours: { opens: "11:00", closes: "14:00" },
			},
			{
				day: 8,
				tone: "off",
				cell: "貸切",
				title: "Wedding 貸切",
				note: "結婚式のため終日貸切です。会場のご相談も承ります",
				hours: "closed",
			},
			{
				day: 9,
				tone: "part",
				cell: "夜は貸切",
				title: "ランチ営業／夜は貸切",
				note: "11:00〜14:00 はいつもどおりご利用いただけます",
				hours: { opens: "11:00", closes: "14:00" },
			},
			{
				day: 11,
				tone: "star",
				cell: "特別営業",
				title: "特別営業（ランチのみ）",
				note: "山の日。ふだんは定休日ですが、11:00〜14:00 で開けています",
				hours: { opens: "11:00", closes: "14:00" },
			},
			{
				day: 15,
				tone: "part",
				cell: "夜休み",
				title: "ランチ営業／夜はお休み",
				note: "11:00〜14:00 はいつもどおりご利用いただけます",
				hours: { opens: "11:00", closes: "14:00" },
			},
			{
				day: 17,
				tone: "part",
				cell: "夜は貸切",
				title: "夜は貸切",
				note: "ランチ・ティータイムは通常どおり",
				hours: { opens: "11:00", closes: "17:00" },
			},
			{
				day: 20,
				tone: "part",
				cell: "夜は貸切",
				title: "ランチ営業／夜は貸切",
				hours: { opens: "11:00", closes: "14:00" },
			},
			{
				day: 22,
				tone: "part",
				cell: "夜は貸切",
				title: "ランチ営業／夜は貸切",
				hours: { opens: "11:00", closes: "14:00" },
			},
			{
				day: 29,
				tone: "off",
				cell: "貸切",
				title: "Wedding 貸切",
				note: "結婚式のため終日貸切です。会場のご相談も承ります",
				hours: "closed",
			},
		],
	},
];

export const currentMonth = (): CalendarMonth => CALENDAR[0];
