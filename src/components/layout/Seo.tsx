import { useLocation } from 'react-router-dom';
import { site } from '@/lib/site';

type Props = { title: string; description: string; image?: string };

/** Metadados por página (React 19 move <title>/<meta>/<link> para o <head>). */
export function Seo({ title, description, image = '/img/consultorio-2-960.webp' }: Props) {
  const { pathname } = useLocation();
  const url = `${site.url}${pathname === '/' ? '' : pathname}`;
  const img = image.startsWith('http') ? image : `${site.url}${image}`;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
    </>
  );
}
