import manifest from '@/data/images.json';
import { cn } from '@/lib/cn';

export type ImageName = keyof typeof manifest;

type Props = {
  name: ImageName;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/** Imagem responsiva AVIF/WebP gerada por `npm run images`. */
export function Picture({ name, alt, sizes = '100vw', priority, className }: Props) {
  const { widths, ratio } = manifest[name];
  const set = (ext: string) => widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(', ');
  const largest = widths[widths.length - 1];
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={`/img/${name}-${largest}.webp`}
        alt={alt}
        width={largest}
        height={Math.round(largest / ratio)}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={cn('h-full w-full object-cover', className)}
      />
    </picture>
  );
}
