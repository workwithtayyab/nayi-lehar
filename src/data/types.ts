export interface ArticleInput {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
  imageAlt: string;
  caption?: string;
  tags: string[];
  featured?: boolean;
  body: string;
}

export interface Article extends ArticleInput {
  readMins: number;
  href: string;
}

export interface StorySlide {
  image: string;
  alt: string;
  heading: string;
  text: string;
}

export interface WebStory {
  slug: string;
  title: string;
  author: string;
  date: string;
  cover: string;
  coverAlt: string;
  slides: StorySlide[];
}

export interface GalleryPhoto {
  image: string;
  alt: string;
  caption: string;
}

export interface Gallery {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  photos: GalleryPhoto[];
}

export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  duration: string;
  date: string;
  thumb: string;
}
