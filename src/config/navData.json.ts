export interface navLinkItem {
	text: string;
	link: string;
	newTab?: boolean; // adds target="_blank" rel="noopener noreferrer" to link
}

export interface navDropdownItem {
	text: string;
	dropdown: navLinkItem[];
}

export type navItem = navLinkItem | navDropdownItem;

// note: 1 level of dropdown is supported
const navConfig: navItem[] = [
	{
		text: "ホーム",
		link: "/",
	},
	{
		text: "ご利用シーン・プラン",
		link: "/portfolio/",
	},
	{
		text: "お弁当・オードブル",
		link: "/#pricing",
	},
	{
		text: "Enleeについて",
		link: "/#about",
	},
	{
		text: "ご予約・お問い合わせ",
		link: "/#contact",
	},
];

export default navConfig;
