const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));

export function toast(msg: string) {
  const el = $('[data-toast]');
  if (!el) return;
  el.textContent = msg;
  el.hidden = false;
  clearTimeout((el as any)._t);
  (el as any)._t = setTimeout(() => (el.hidden = true), 2400);
}

/* Theme */
const themeBtn = $('[data-theme-toggle]');
const syncThemeLabel = () => {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeBtn?.setAttribute('aria-label', dark ? 'लाइट मोड चालू करें' : 'डार्क मोड चालू करें');
  themeBtn?.setAttribute('aria-pressed', String(dark));
};
syncThemeLabel();
themeBtn?.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch {}
  syncThemeLabel();
});

/* Categories dropdown */
const ddBtn = $<HTMLButtonElement>('[data-dd]');
const ddMenu = $('#cat-menu');
const setDd = (open: boolean) => { if (!ddBtn || !ddMenu) return; ddBtn.setAttribute('aria-expanded', String(open)); ddMenu.hidden = !open; };
ddBtn?.addEventListener('click', (e) => { e.stopPropagation(); setDd(ddBtn.getAttribute('aria-expanded') !== 'true'); });
document.addEventListener('click', (e) => { if (ddMenu && !ddMenu.contains(e.target as Node)) setDd(false); });
ddMenu?.addEventListener('focusout', (e) => { if (!ddMenu.contains(e.relatedTarget as Node) && e.relatedTarget !== ddBtn) setDd(false); });

/* Mobile drawer */
const drawer = $('#drawer');
const backdrop = $('.drawer-backdrop');
const openBtn = $<HTMLButtonElement>('[data-menu-open]');
const setDrawer = (open: boolean) => {
  if (!drawer || !backdrop) return;
  drawer.hidden = !open; backdrop.hidden = !open;
  openBtn?.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) $<HTMLElement>('input, a, button', drawer)?.focus(); else openBtn?.focus();
};
openBtn?.addEventListener('click', () => setDrawer(true));
$$('[data-menu-close]').forEach((b) => b.addEventListener('click', () => setDrawer(false)));
drawer?.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab') return;
  const f = $$<HTMLElement>('a, button, input', drawer);
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (drawer && !drawer.hidden) setDrawer(false);
  if (ddMenu && !ddMenu.hidden) { setDd(false); ddBtn?.focus(); }
});

/* Bookmarks */
const KEY = 'bookmarks';
export const getBookmarks = (): string[] => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };
const saveBookmarks = (b: string[]) => { try { localStorage.setItem(KEY, JSON.stringify(b)); } catch {} };
const syncBookmarkBtns = () => {
  const b = getBookmarks();
  $$<HTMLButtonElement>('[data-bookmark]').forEach((btn) => {
    const on = b.includes(btn.dataset.bookmark!);
    btn.setAttribute('aria-pressed', String(on));
    const label = btn.querySelector('.bm-label');
    if (label) label.textContent = on ? 'सेव किया' : 'सेव करें';
  });
};
syncBookmarkBtns();
document.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-bookmark]');
  if (!btn) return;
  e.preventDefault();
  const id = btn.dataset.bookmark!;
  const b = getBookmarks();
  const on = b.includes(id);
  saveBookmarks(on ? b.filter((x) => x !== id) : [id, ...b]);
  syncBookmarkBtns();
  toast(on ? 'सेव लिस्ट से हटाया गया' : 'लेख सेव हो गया');
  document.dispatchEvent(new CustomEvent('bookmarks:change'));
});

/* Share */
document.addEventListener('click', async (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-share]');
  if (!btn) return;
  const data = { title: btn.dataset.title || document.title, url: btn.dataset.url || location.href };
  if (btn.dataset.share === 'native' && navigator.share) { try { await navigator.share(data); } catch {} return; }
  try { await navigator.clipboard.writeText(data.url); toast('लिंक कॉपी हो गया'); } catch { toast('लिंक कॉपी नहीं हो सका'); }
});

/* Newsletter (client-side demo) */
$$<HTMLFormElement>('[data-newsletter]').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector<HTMLInputElement>('input[type=email]')!;
    const msg = form.querySelector('.nl-msg')!;
    if (!input.validity.valid || !input.value) { msg.textContent = 'कृपया सही ईमेल पता डालें।'; input.setAttribute('aria-invalid', 'true'); input.focus(); return; }
    input.removeAttribute('aria-invalid');
    msg.textContent = 'धन्यवाद! आप सब्सक्राइब हो गए हैं।';
    form.reset();
  });
});
