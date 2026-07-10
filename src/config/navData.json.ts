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
		text: "Enleeについて",
		link: "/#concept",
	},
	{
		text: "ランチ",
		link: "/#lunch",
	},
	{
		text: "夜カフェ",
		link: "/#evening-cafe",
	},
	{
		text: "ギャラリー",
		link: "/#gallery",
	},
	{
		text: "パーティー・お弁当",
		dropdown: [
			{
				text: "貸切・パーティー",
				link: "/#portfolio",
			},
			{
				text: "お弁当・オードブル",
				link: "/#pricing",
			},
		],
	},
];

export default navConfig;
