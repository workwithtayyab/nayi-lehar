export const SITE = {
  name: 'Nayi Lehar',
  nameHi: 'नई लहर',
  tagline: 'Gen-Z भारत की आवाज़',
  description:
    'नई लहर — Gen-Z भारत की आवाज़। हिंदी में खबरें, लाइफस्टाइल, टेक, करियर, एंटरटेनमेंट और वो कहानियां जो आपके लिए मायने रखती हैं।',
  locale: 'hi_IN',
  lang: 'hi',
  email: 'hello@nayilehar.example',
  social: {
    instagram: 'https://www.instagram.com/',
    x: 'https://x.com/',
    youtube: 'https://www.youtube.com/',
    linkedin: 'https://www.linkedin.com/',
    facebook: 'https://www.facebook.com/',
  },
  pageSize: 12,
} as const;

export interface Category {
  slug: string;
  name: string;
  nameEn: string;
  color: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  { slug: 'news', name: 'खबरें', nameEn: 'News', color: '#8b0000', description: 'देश-दुनिया की वो खबरें जो आपकी ज़िंदगी पर असर डालती हैं, आसान भाषा में।' },
  { slug: 'trending', name: 'सोशल/ट्रेंडिंग', nameEn: 'Trending', color: '#c2185b', description: 'इंटरनेट पर क्या वायरल है और क्यों — मीम्स से लेकर मूवमेंट्स तक।' },
  { slug: 'entertainment', name: 'एंटरटेनमेंट', nameEn: 'Entertainment', color: '#6a1b9a', description: 'फिल्में, OTT, म्यूज़िक और पॉप-कल्चर की हर ज़रूरी अपडेट।' },
  { slug: 'lifestyle', name: 'लाइफस्टाइल', nameEn: 'Lifestyle', color: '#ad5a00', description: 'फैशन, ट्रैवल, रिश्ते और रोज़मर्रा की ज़िंदगी को बेहतर बनाने के आइडियाज़।' },
  { slug: 'health', name: 'हेल्थ', nameEn: 'Health', color: '#00796b', description: 'फिटनेस, मेंटल हेल्थ और न्यूट्रिशन — एक्सपर्ट्स की सलाह के साथ।' },
  { slug: 'tech', name: 'टेक/गेमिंग', nameEn: 'Tech & Gaming', color: '#1546a0', description: 'AI, गैजेट्स, ऐप्स और गेमिंग की दुनिया की ताज़ा खबरें और गाइड्स।' },
  { slug: 'sports', name: 'खेल', nameEn: 'Sports', color: '#2e7d32', description: 'क्रिकेट से ई-स्पोर्ट्स तक, मैदान के अंदर और बाहर की कहानियां।' },
  { slug: 'career', name: 'करियर', nameEn: 'Career', color: '#37474f', description: 'नौकरी, इंटर्नशिप, स्किल्स और पैसों की समझ — पहली सैलरी से पहले और बाद।' },
  { slug: 'explainer', name: 'एक्सप्लेनर', nameEn: 'Explainer', color: '#4527a0', description: 'मुश्किल मुद्दे, आसान जवाब। हर बड़ी खबर के पीछे का "क्यों" और "कैसे"।' },
  { slug: 'utility', name: 'यूटिलिटी', nameEn: 'Utility', color: '#00838f', description: 'काम की बातें — सरकारी सेवाएं, पैसा, डॉक्यूमेंट्स और रोज़ के हैक्स।' },
  { slug: 'special', name: 'लहर स्पेशल', nameEn: 'Lehar Special', color: '#bf360c', description: 'हमारी खास रिपोर्ट्स, इंटरव्यू और लंबी कहानियां।' },
];

export const SECTION_LINKS = [
  { href: 'web-story', name: 'वेब स्टोरी', nameEn: 'Web Stories' },
  { href: 'photo-gallery', name: 'फोटो गैलरी', nameEn: 'Photo Gallery' },
  { href: 'videos', name: 'वीडियो', nameEn: 'Videos' },
];

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
