/**
 * * 営業カレンダー（お客様向け）
 *
 * 🔴 ここだけを書き換える。コンポーネントは触らない。
 *
 * ## いつ書き足すか — 月末にまとめてやらない
 *
 * **貸切・臨時休業が決まったその場で1行足す。** 公式LINE で受けて返信する瞬間が入力の瞬間。
 * 月次のバッチ作業を作ると続かない（2026-08 を最後に SNS 用カレンダーが2か月止まった実績がある）。
 *
 * ## 載せる / 載せない
 *
 * - 載せる … お客様の**来店可否や時間が変わる日**だけ
 * - 載せない … 打合せ・面接・工事・テラスのみの利用など、**店内が通常どおりの日**
 * - 載せない … **仮押さえ**（人数・時間が未確定）。確定してから載せる
 *
 * > 「載っていない日＝通常営業」とお客様が読むため、**間違いは欠落より強く効く。**
 *
 * ⚠️「Enlee営業」Googleカレンダーには営業に関係しない予定も入っている。そのまま写さない。
 * ⚠️ **婚礼は MAIA カレンダーと個人カレンダーにしかない。** Enlee営業カレンダーには入っていない。
 *
 * ## 古くなったときの振る舞い
 *
 * 今日の日付に合う月が無ければ、カレンダーは自動で引っ込み「通常営業＋定休日」だけになる。
 * 放置しても古い月が出続けることはない（→ Calendar.astro のスクリプト）。
 */

export type DayTone =
	/** 来てほしい日（特別営業・イベント）。白抜きで最も目立つ */
	| "star"
	/** 一部ご案内できる日（夜だけ貸切・早じまい 等） */
	| "part"
	/** ご来店いただけない日（終日貸切・臨時休業） */
	| "off";

export interface CalendarDay {
	day: number;
	tone: DayTone;
	/** グリッドのセルに出す短い語。**全角5文字まで**（それ以上は枠からはみ出す） */
	cell: string;
	/** リストの見出し。制限からではなく、できることから書く（→ brand/enlee §1） */
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
	/** 定休の曜日。0=日 1=月 2=火 …（Enlee は火曜） */
	closedWeekday: number;
	days: CalendarDay[];
	/** カレンダー下の一言（無ければ省略） */
	footnote?: string;
}

/** 通常営業の表記。→ brand/writing-style §1（`〜` は U+301C・`L.O.` はピリオド2つ） */
export const HOURS_LABEL = "11:00〜21:00（L.O.20:00）";
export const LUNCH_LABEL = "11:00〜14:00（L.O.14:00）";
export const CLOSED_LABEL = "定休日：火曜日";

const WEDDING = (day: number): CalendarDay => ({
	day,
	tone: "off",
	cell: "貸切",
	title: "Wedding 貸切",
	note: "結婚式のため終日貸切とさせていただきます。会場としてのご相談も承っております",
	hours: "closed",
});

/**
 * 先の月まで入れておいてよい。**今日の日付に合う月が、自動で表示される。**
 * 過ぎた月は消してよい（履歴は LLM-wiki の台帳が持っている）。
 */
export const CALENDAR: CalendarMonth[] = [
	{
		year: 2026,
		month: 10,
		closedWeekday: 2,
		days: [
			// 出典: gbp-roadmap §6-5（2026-09-21 本人判断ずみ）／個人カレンダー／monthly-budget
			WEDDING(3), // 稲又様
			WEDDING(4), // 菅田様
			WEDDING(11), // 鎌田様・柏原様
			{
				day: 24,
				tone: "part",
				cell: "ランチのみ",
				title: "ランチ営業／15:00閉店",
				note: "ご予約のため15:00に閉店いたします。ランチのご注文は14:00まで。14:00までにご入店いただければ、15:00までごゆっくりお過ごしいただけます",
				hours: { opens: "11:00", closes: "15:00" },
			},
			// 載せない: 10/25 ローズナチュレ婚活イベント（店内は一般のお客様をご案内・2026-10-08 本人判断）
			// 載せない: 10/31 坂本様 BBQ（テラス利用・2026-10-08 本人判断）
		],
	},
	{
		year: 2026,
		month: 11,
		closedWeekday: 2,
		days: [
			WEDDING(7), // 北川様
			WEDDING(14), // 水口様
		],
	},
];
