import raw from '@/assets/brand/logo.svg?raw';
import { cn } from '@/lib/cn';

// Azul do logo vira currentColor para adaptar a fundos claros e escuros; o dourado é mantido.
const svg = raw
  .replace(/fill="#(232b4f|111b3d)"/gi, 'fill="currentColor"')
  .replace('<svg ', '<svg role="img" aria-label="Estima Odontologia" width="100%" height="100%" ')
  .replace(/<path /g, '<path pathLength="1" ');

export function Logo({ className, draw }: { className?: string; draw?: boolean }) {
  return <span className={cn('block [&>svg]:block', draw && 'logo-draw', className)} dangerouslySetInnerHTML={{ __html: svg }} />;
}
