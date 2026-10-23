import type { ReactElement, SVGProps } from 'react';
import type { IconKey } from '@/data/treatments';
import type { TechKey } from '@/data/content';

type P = SVGProps<SVGSVGElement>;

const base = (props: P) => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...props,
});

const Tooth = () => (
  <path d="M12 5.2c-1.6-1.3-4.2-1.9-5.7-.6C4.6 6 5 8.6 5.7 10.6c.6 1.7.6 3.4.9 5.2.3 1.8.8 4 1.9 4 1.3 0 1.4-2.6 1.8-4.1.3-1.2.8-1.9 1.7-1.9s1.4.7 1.7 1.9c.4 1.5.5 4.1 1.8 4.1 1.1 0 1.6-2.2 1.9-4 .3-1.8.3-3.5.9-5.2.7-2 1.1-4.6-.6-6-1.5-1.3-4.1-.7-5.7.6Z" />
);

export const icons: Record<IconKey | TechKey | 'care', (p: P) => ReactElement> = {
  checkup: (p) => (
    <svg {...base(p)}>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5 5M8 10.5h5M10.5 8v5" />
    </svg>
  ),
  general: (p) => (
    <svg {...base(p)}>
      <Tooth />
      <path d="M9 8.2c.9-.5 2-.5 3 0" />
    </svg>
  ),
  implant: (p) => (
    <svg {...base(p)}>
      <path d="M7.5 6.5c0-1.7 2-2.5 4.5-2.5s4.5.8 4.5 2.5S15 9.5 12 9.5 7.5 8.2 7.5 6.5Z" />
      <path d="M10 9.5v1.5h4V9.5M10.5 11h3l-.3 1.8h-2.4zM10.8 12.8h2.4l-.3 1.8h-1.8zM11.1 14.6h1.8l-.3 1.8h-1.2zM11.4 16.4h1.2L12 19" />
    </svg>
  ),
  ortho: (p) => (
    <svg {...base(p)}>
      <path d="M3 12c3-2 15-2 18 0" />
      <rect x="5" y="9.6" width="3" height="3" rx=".6" />
      <rect x="10.5" y="9" width="3" height="3" rx=".6" />
      <rect x="16" y="9.6" width="3" height="3" rx=".6" />
      <path d="M5 16c2.5 1.5 11.5 1.5 14 0" />
    </svg>
  ),
  aesthetic: (p) => (
    <svg {...base(p)}>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  ),
  endo: (p) => (
    <svg {...base(p)}>
      <Tooth />
      <path d="M12 7v7.5M10.2 9.5h3.6" />
    </svg>
  ),
  camera: (p) => (
    <svg {...base(p)}>
      <path d="M4 15.5 15.5 4a2.1 2.1 0 0 1 3 0l1.5 1.5a2.1 2.1 0 0 1 0 3L8.5 20" />
      <circle cx="17" cy="7" r="1.3" />
      <path d="M3 21l2-2M12 9.5l2.5 2.5" />
    </svg>
  ),
  xray: (p) => (
    <svg {...base(p)}>
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      <path d="M12 8c-.8-.6-2.1-.9-2.8-.3-.8.7-.6 2-.3 3 .3.9.3 1.7.4 2.6.2.9.4 2 1 2 .6 0 .7-1.3.9-2 .1-.6.4-1 .8-1s.7.4.8 1c.2.7.3 2 .9 2 .6 0 .8-1.1 1-2 .1-.9.1-1.7.4-2.6.3-1 .5-2.3-.3-3-.7-.6-2-.3-2.8.3Z" />
    </svg>
  ),
  sterile: (p) => (
    <svg {...base(p)}>
      <path d="M12 3 5 6v5.5c0 4.2 3 7.8 7 9.5 4-1.7 7-5.3 7-9.5V6z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  ),
  care: (p) => (
    <svg {...base(p)}>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
    </svg>
  ),
};

export const Arrow = (p: P) => (
  <svg {...base({ strokeWidth: 1.4, ...p })}>
    <path d="M4 12h15M14 7l5 5-5 5" />
  </svg>
);

export const WhatsAppIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor" aria-hidden {...p}>
    <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.4-.5.3-.5v-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.4 13.4 0 0 0 5.2 4.6c.7.3 1.3.5 1.7.6a4.2 4.2 0 0 0 1.9.1 3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.1-.3-.2-.6-.4ZM12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.9 9.9 0 1 1 12 21.8Zm8.4-18.3A11.8 11.8 0 0 0 1.7 17.8L0 24l6.3-1.7a11.8 11.8 0 0 0 5.7 1.4A11.9 11.9 0 0 0 20.4 3.5Z" />
  </svg>
);

export const PhoneIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5l1.5-2 4 1.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
  </svg>
);

export const InstagramIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
  </svg>
);

export const FacebookIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M14 8h2.5V4.5H14A3.5 3.5 0 0 0 10.5 8v2.5H8V14h2.5v6.5H14V14h2.5l.5-3.5h-3V8Z" />
  </svg>
);
