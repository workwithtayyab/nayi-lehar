export interface IndexItem { slug: string; title: string; excerpt: string; category: string; author: string; tags: string[]; date: string; href: string; thumb: string }
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
export async function loadIndex(): Promise<IndexItem[]> {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const r = await fetch(`${base}/search-index.json`);
  return r.json();
}
export function renderResults(items: IndexItem[], removable = false): string {
  return items.map((a) => `
    <li class="r">
      <img src="${a.thumb}" alt="" width="160" height="100" loading="lazy" decoding="async" />
      <div>
        <span class="chip">${esc(a.category)}</span>
        <h2><a href="${a.href}">${esc(a.title)}</a></h2>
        <p class="clamp-2">${esc(a.excerpt)}</p>
        <p class="meta">By <strong>${esc(a.author)}</strong> · ${esc(a.date)}</p>
        ${removable ? `<button type="button" class="btn btn-ghost rm" data-bookmark="${a.slug}" aria-pressed="true"><span class="bm-label">सेव किया</span> — हटाएं</button>` : ''}
      </div>
    </li>`).join('');
}
