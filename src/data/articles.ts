import { ARTICLES_A } from './articles-a';
import { ARTICLES_B } from './articles-b';
import type { Article } from './types';
import { readingTime } from '../lib/utils';

export const ARTICLES: Article[] = [...ARTICLES_A, ...ARTICLES_B]
  .map((a) => ({ ...a, readMins: readingTime(a.body), href: `/${a.category}/${a.slug}` }))
  .sort((a, b) => +new Date(b.date) - +new Date(a.date));

export const byCategory = (slug: string) => ARTICLES.filter((a) => a.category === slug);
export const byAuthor = (slug: string) => ARTICLES.filter((a) => a.author === slug);
export const featured = () => ARTICLES.filter((a) => a.featured);

export function related(article: Article, n = 3): Article[] {
  const score = (a: Article) =>
    (a.category === article.category ? 3 : 0) + a.tags.filter((t) => article.tags.includes(t)).length;
  return ARTICLES.filter((a) => a.slug !== article.slug)
    .map((a) => ({ a, s: score(a) }))
    .sort((x, y) => y.s - x.s || +new Date(y.a.date) - +new Date(x.a.date))
    .slice(0, n)
    .map((x) => x.a);
}
