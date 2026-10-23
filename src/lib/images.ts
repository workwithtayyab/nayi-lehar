import type { ImageMetadata } from 'astro';

const landscape = import.meta.glob<{ default: ImageMetadata }>('/src/assets/img/*.jpg', { eager: true });
const portrait = import.meta.glob<{ default: ImageMetadata }>('/src/assets/story/*.jpg', { eager: true });

export function img(key: string): ImageMetadata {
  const mod = landscape[`/src/assets/img/${key}.jpg`] ?? portrait[`/src/assets/story/${key}.jpg`];
  if (!mod) throw new Error(`Image not found: ${key}`);
  return mod.default;
}
