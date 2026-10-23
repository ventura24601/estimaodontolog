import * as A from '@radix-ui/react-accordion';

/** FAQ em accordion (Radix), restilizado para a identidade. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <A.Root type="single" collapsible className="border-t border-stone">
      {items.map((it, i) => (
        <A.Item key={i} value={`item-${i}`} className="border-b border-stone">
          <A.Header>
            <A.Trigger className="group flex w-full items-center justify-between gap-6 py-7 text-left font-serif text-2xl leading-snug md:text-[1.75rem]">
              {it.q}
              <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/20 transition-colors duration-500 group-data-[state=open]:border-accent group-data-[state=open]:bg-accent" aria-hidden>
                <span className="absolute h-px w-3.5 bg-current" />
                <span className="absolute h-3.5 w-px bg-current transition-transform duration-500 ease-expo group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0" />
              </span>
            </A.Trigger>
          </A.Header>
          <A.Content className="overflow-hidden data-[state=closed]:animate-[accUp_.5s_cubic-bezier(.22,1,.36,1)] data-[state=open]:animate-[accDown_.6s_cubic-bezier(.22,1,.36,1)]">
            <p className="max-w-2xl pb-8 text-ink-soft">{it.a}</p>
          </A.Content>
        </A.Item>
      ))}
    </A.Root>
  );
}
