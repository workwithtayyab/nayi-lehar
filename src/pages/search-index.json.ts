import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import { ARTICLES } from '../data/articles';
import { getCategory } from '../config/site';
import { getAuthor } from '../data/authors';
import { img } from '../lib/images';
import { url, formatShortDate } from '../lib/utils';

export const GET: APIRoute = async () => {
  const items = await Promise.all(
    ARTICLES.map(async (a) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      category: getCategory(a.category)!.name,
      author: getAuthor(a.author).name,
      tags: a.tags,
      date: formatShortDate(a.date),
      href: url(a.href),
      thumb: (await getImage({ src: img(a.image), width: 320, height: 200, format: 'webp', fit: 'cover' })).src,
    })),
  );
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json' } });
};
