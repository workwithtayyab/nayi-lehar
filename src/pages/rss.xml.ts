import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { ARTICLES } from '../data/articles';
import { SITE, getCategory } from '../config/site';
import { getAuthor } from '../data/authors';
import { url } from '../lib/utils';

export function GET(context: APIContext) {
  return rss({
    title: `${SITE.name} — ${SITE.nameHi}`,
    description: SITE.description,
    site: new URL(url('/'), context.site),
    items: ARTICLES.map((a) => ({ title: a.title, description: a.excerpt, pubDate: new Date(a.date), link: url(a.href), categories: [getCategory(a.category)!.nameEn, ...a.tags], author: `${SITE.email} (${getAuthor(a.author).nameEn})` })),
    customData: '<language>hi-in</language>',
  });
}
