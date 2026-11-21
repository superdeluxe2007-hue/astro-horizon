/**
 * 募集要項（/recruit/jobs）の正本。
 *
 * 🔴 表示と Google しごと検索向けの構造化データ（JobPosting）は、この配列だけから作る。
 *    Indeed の求人票（2026-11-19 掲載）と同じ条件にしておく。条件を変えるときは Indeed・ハローワークも同時に直す
 *    → LLM-wiki wiki/businesses/enlee/recruiting-indeed.md §7
 *
 * 守っていること:
 *   - 採用ページ（/recruit）には条件を書かない（2026-11-13 本人判断）。条件はこのページだけに置く
 *   - 表記は writing-style（¥・〜・全角括弧）。時給は「¥1,141〜¥1,400」
 *   - 産休・卒業など、個人の事情は書かない
 */

export type Job = {
	/** URL と構造化データの識別子（変えない） */
	id: string;
	title: string;
	/** schema.org employmentType */
	employmentType: "PART_TIME" | "FULL_TIME";
	employmentLabel: string;
	datePosted: string; // YYYY-MM-DD
	validThrough: string; // YYYY-MM-DD（過ぎたら更新する。Google は期限切れの求人を落とす）
	salary: { min: number; max: number; unit: "HOUR" | "MONTH"; label: string };
	workHours: string;
	/** 表に出す行（上から順に表示） */
	rows: { label: string; value: string }[];
	/** 仕事内容（段落ごと）。構造化データの description にも使う */
	description: string[];
	/** 求める人 */
	wants: string[];
};

export const JOBS: Job[] = [
	{
		id: "hall-kitchen-2026-11",
		title: "カフェスタッフ（ホール・キッチン）",
		employmentType: "PART_TIME",
		employmentLabel: "アルバイト・パート",
		datePosted: "2026-11-21",
		validThrough: "2027-02-28",
		salary: { min: 1141, max: 1400, unit: "HOUR", label: "時給 ¥1,141〜¥1,400" },
		workHours: "15:00〜22:00の間で応相談（1日4時間〜／週3日〜）",
		description: [
			"福山市の中央公園の中、図書館の横にあるガーデンレストラン「Enlee（エンリー）」で、ホールとキッチンのスタッフを募集します。",
			"2027年に向けて、店を一緒に回していく仲間を増やします。アルバイトからはじめて、いずれ社員として働くことも考えてみたい方を探しています。",
			"ホールは、ご案内・オーダー・配膳・ドリンク・お会計。キッチンは、仕込み・調理・盛り付け・その日の段取り。慣れてきたら、店の開け閉めや貸切パーティーの進行もお願いします。最初はどちらか一方から。できることが増えたら、任せる範囲を広げます。",
			"平日の昼は人が足りています。夕方から夜（15:00〜22:00）と、土日のどちらかに入れる方を探しています。",
		],
		wants: [
			"長く働きたい方（ここが一番大事です）",
			"いずれ社員として働くことも考えてみたい方",
			"調理経験のある方（歓迎します）",
			"調理は未経験でも、やってみたい方",
			"土日のどちらかは入れる方",
			"フリーターの方",
		],
		rows: [
			{ label: "雇用形態", value: "アルバイト・パート" },
			{ label: "給与", value: "時給 ¥1,141〜¥1,400（経験・できることで決めます）" },
			{ label: "勤務時間", value: "15:00〜22:00の間で応相談（1日4時間〜／週3日〜）。シフト制・自己申告（アプリで提出）" },
			{ label: "休日", value: "定休日：火曜日。希望休の相談ができます" },
			{ label: "昇給", value: "あり。できることが増えると時給が上がる4つの段（基準を先に決めてあります）" },
			{ label: "社員登用", value: "あり（実績あり）" },
			{ label: "待遇", value: "まかない・食事補助／交通費支給／制服貸与" },
			{ label: "社会保険", value: "雇用保険・労災保険・健康保険・厚生年金（加入条件を満たす方）" },
			{ label: "試用期間", value: "3か月（条件は同じ）" },
			{ label: "勤務地", value: "〒720-0812 広島県福山市霞町1-10-2（中央公園内）／福山駅から徒歩7分／敷地内禁煙" },
			{ label: "採用予定", value: "2名" },
		],
	},
];
