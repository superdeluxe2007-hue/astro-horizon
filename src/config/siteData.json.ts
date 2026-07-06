export interface SiteDataProps {
	name: string;
	title: string;
	description: string;
	useViewTransitions?: boolean; // defaults to false. Set to true to enable some Astro 3.0 view transitions
	author: {
		name: string;
		email: string;
		twitter: string; // used for twitter cards when sharing a blog post on twitter
	};
	defaultImage: {
		src: string;
		alt: string;
	};
}

// Update this file with your site specific information
const siteData: SiteDataProps = {
	name: "Enlee",
	// Your website's title and description (meta fields)
	title: "Enlee（エンリー）| 福山・中央公園のガーデンレストラン｜団体宴会・お弁当・ケータリング",
	description:
		"福山市・中央公園内のガーデンレストランEnlee（エンリー）。団体様の宴会・BBQ・お弁当やオードブルのケータリングを承ります。図書館・ローズコム隣接で、会議後の懇親会にも最適です。",
	useViewTransitions: true,
	// Your information!
	author: {
		name: "Enlee",
		email: "info@enlee.example.com",
		twitter: "",
	},

	// default image for meta tags if the page doesn't have an image already
	defaultImage: {
		src: "/images/enlee-venue-night.jpg",
		alt: "Enlee ガーデンレストラン外観",
	},
};

export default siteData;
