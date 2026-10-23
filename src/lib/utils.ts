const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix an internal path with the configured base path. */
export function url(path = '/'): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${clean}` || '/';
}

export function absoluteUrl(path: string, site: URL | undefined): string {
  return new URL(url(path), site ?? 'http://localhost:4321').toString();
}

const dateFmt = new Intl.DateTimeFormat('hi-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });
const shortFmt = new Intl.DateTimeFormat('hi-IN', { day: 'numeric', month: 'short', timeZone: 'Asia/Kolkata' });

export const formatDate = (iso: string) => dateFmt.format(new Date(iso));
export const formatShortDate = (iso: string) => shortFmt.format(new Date(iso));

export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 180));
}

export function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Tiny, safe block renderer for article bodies: `## ` headings, `> ` quotes, `- ` lists, paragraphs. */
export function renderBody(body: string): string {
  const inline = (s: string) => escapeHtml(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  return body
    .trim()
    .split(/\n\s*\n/)
    .map((block) => {
      const b = block.trim();
      if (b.startsWith('## ')) return `<h2>${inline(b.slice(3))}</h2>`;
      if (b.startsWith('> ')) return `<blockquote><p>${inline(b.replace(/^>\s?/gm, ''))}</p></blockquote>`;
      if (b.startsWith('- ')) {
        const items = b.split('\n').map((l) => `<li>${inline(l.replace(/^-\s*/, ''))}</li>`).join('');
        return `<ul>${items}</ul>`;
      }
      return `<p>${inline(b.replace(/\n/g, ' '))}</p>`;
    })
    .join('\n');
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}
