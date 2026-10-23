import { SITE } from '../config/site';
export function pages<T>(items: T[], size = SITE.pageSize) {
  const last = Math.max(1, Math.ceil(items.length / size));
  return Array.from({ length: last }, (_, i) => ({ n: i + 1, last, items: items.slice(i * size, (i + 1) * size) }));
}
