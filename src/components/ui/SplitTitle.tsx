import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/cn';
import { EASE } from '@/lib/motion';

type Props = {
  /** Texto com trechos em itálico entre *asteriscos* e quebras de linha com \n */
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  /** 'word' (padrão) anima palavra a palavra; 'line' anima linha a linha */
  by?: 'word' | 'line';
  delay?: number;
  /** Controle manual (ex.: hero após o preloader). Indefinido = anima ao entrar na viewport */
  animate?: boolean;
  /** Renderiza já no estado final, sem animação de entrada */
  instant?: boolean;
};

const container = (delay: number, stagger: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const item: Variants = {
  hidden: { y: '110%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 1.1, ease: EASE } },
};

type Token = { text: string; italic: boolean };

function tokenize(line: string): Token[] {
  const out: Token[] = [];
  line.split(/(\*[^*]+\*)/g).forEach((chunk) => {
    if (!chunk) return;
    const italic = chunk.startsWith('*') && chunk.endsWith('*');
    const clean = italic ? chunk.slice(1, -1) : chunk;
    clean.split(/(\s+)/).forEach((w) => {
      if (w.trim()) out.push({ text: w, italic });
    });
  });
  return out;
}

export function renderRich(text: string) {
  return text.split(/(\*[^*]+\*)/g).map((c, i) =>
    c.startsWith('*') && c.endsWith('*') ? (
      <em key={i} className="font-serif italic text-accent-deep [.dark_&]:text-accent">{c.slice(1, -1)}</em>
    ) : (
      c
    ),
  );
}

/** Título com reveal por máscara (translateY) e stagger de 0.06s. */
export function SplitTitle({ text, as = 'h2', className, by = 'word', delay = 0, animate, instant }: Props) {
  const Tag = motion[as];
  const lines = text.split('\n');
  const plain = text.replace(/\*/g, '').replace(/\n/g, ' ');
  const trigger = animate !== undefined
    ? { initial: instant ? (false as const) : 'hidden', animate: animate || instant ? 'show' : 'hidden' }
    : { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '0px 0px -12% 0px' } };

  return (
    <Tag className={cn('font-serif font-normal', className)} aria-label={plain} variants={container(delay, by === 'line' ? 0.12 : 0.06)} {...trigger}>
      {lines.map((line, li) =>
        by === 'line' ? (
          <span key={li} aria-hidden className="block overflow-hidden pb-[0.08em]">
            <motion.span className="block" variants={item}>
              {renderRich(line)}
            </motion.span>
          </span>
        ) : (
          <span key={li} aria-hidden className="block">
            {tokenize(line).map((t, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-top">
                <motion.span
                  className={cn('inline-block', t.italic && 'italic text-accent-deep [.dark_&]:text-accent')}
                  variants={item}
                >
                  {t.text}
                  {' '}
                </motion.span>
              </span>
            ))}
          </span>
        ),
      )}
    </Tag>
  );
}
