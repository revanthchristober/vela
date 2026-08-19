import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design tokens",
  description: "The VELA token layer: colour, type, shape, elevation and motion.",
  robots: { index: false, follow: false },
};

const COLORS: ReadonlyArray<{ group: string; tokens: ReadonlyArray<[string, string]> }> =
  [
    {
      group: "Canvas",
      tokens: [
        ["canvas", "bg-canvas"],
        ["canvas-raised", "bg-canvas-raised"],
        ["canvas-sunken", "bg-canvas-sunken"],
      ],
    },
    {
      group: "Ink",
      tokens: [
        ["ink", "bg-ink"],
        ["ink-muted", "bg-ink-muted"],
        ["ink-subtle", "bg-ink-subtle"],
      ],
    },
    {
      group: "Accent",
      tokens: [
        ["accent", "bg-accent"],
        ["accent-hover", "bg-accent-hover"],
        ["accent-soft", "bg-accent-soft"],
      ],
    },
    {
      group: "Line & signal",
      tokens: [
        ["line", "bg-line"],
        ["line-strong", "bg-line-strong"],
        ["clay", "bg-clay"],
        ["moss", "bg-moss"],
      ],
    },
  ];

const TYPE_SCALE: ReadonlyArray<[string, string]> = [
  ["6xl", "text-6xl"],
  ["5xl", "text-5xl"],
  ["4xl", "text-4xl"],
  ["3xl", "text-3xl"],
  ["2xl", "text-2xl"],
  ["xl", "text-xl"],
  ["lg", "text-lg"],
  ["base", "text-base"],
  ["sm", "text-sm"],
  ["xs", "text-xs"],
];

const RADII: ReadonlyArray<[string, string]> = [
  ["xs", "rounded-xs"],
  ["sm", "rounded-sm"],
  ["md", "rounded-md"],
  ["lg", "rounded-lg"],
  ["xl", "rounded-xl"],
];

const SHADOWS: ReadonlyArray<[string, string]> = [
  ["hairline", "shadow-hairline"],
  ["sheet", "shadow-sheet"],
  ["pop", "shadow-pop"],
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-12">
      <h2 className="mb-8 eyebrow">{title}</h2>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <main id="main" className="px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-page">
        <p className="eyebrow">VELA</p>
        <h1 className="mt-4 font-display text-5xl font-light">Design tokens</h1>
        <p className="mt-6 max-w-xl text-ink-muted">
          Every value the interface is allowed to use. The default Tailwind palette is
          disabled, so anything not on this page cannot appear in the product.
        </p>

        <Section title="Colour">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {COLORS.map(({ group, tokens }) => (
              <div key={group}>
                <h3 className="mb-4 font-display text-lg">{group}</h3>
                <ul className="space-y-3">
                  {tokens.map(([name, className]) => (
                    <li key={name} className="flex items-center gap-3">
                      <span
                        className={`size-10 shrink-0 rounded-sm border border-line ${className}`}
                        aria-hidden="true"
                      />
                      <code className="text-sm text-ink-muted">{name}</code>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Type scale — Fraunces display, Inter text">
          <div className="space-y-6">
            {TYPE_SCALE.map(([name, className]) => (
              <div
                key={name}
                className="flex items-baseline gap-6 border-b border-line pb-5"
              >
                <code className="w-12 shrink-0 text-xs text-ink-subtle">{name}</code>
                <p className={`font-display font-light ${className}`}>
                  Modern rituals, engineered
                </p>
              </div>
            ))}
            <div className="flex items-baseline gap-6 pt-2">
              <code className="w-12 shrink-0 text-xs text-ink-subtle">body</code>
              <p className="max-w-prose text-base text-ink-muted">
                A short ingredient list, a considered texture, and a bottle you are not
                embarrassed to leave on the counter. Inter carries every paragraph, label
                and price on the site.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Shape">
          <div className="flex flex-wrap gap-8">
            {RADII.map(([name, className]) => (
              <div key={name} className="text-center">
                <div
                  className={`size-20 border border-line-strong bg-canvas-raised ${className}`}
                />
                <code className="mt-3 block text-xs text-ink-subtle">{name}</code>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Elevation — floating surfaces only">
          <div className="flex flex-wrap gap-8">
            {SHADOWS.map(([name, className]) => (
              <div key={name} className="text-center">
                <div className={`size-28 rounded-md bg-canvas-raised ${className}`} />
                <code className="mt-3 block text-xs text-ink-subtle">{name}</code>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Motion">
          <dl className="grid gap-x-10 gap-y-4 text-sm sm:grid-cols-2">
            {[
              ["ease-out-soft", "cubic-bezier(0.22, 1, 0.36, 1)"],
              ["ease-out-expo", "cubic-bezier(0.16, 1, 0.3, 1)"],
              ["ease-in-out-soft", "cubic-bezier(0.65, 0, 0.35, 1)"],
              ["--dur-fast / base / slow", "200ms / 320ms / 560ms"],
            ].map(([name, value]) => (
              <div
                key={name}
                className="flex justify-between gap-4 border-b border-line pb-3"
              >
                <code className="text-ink">{name}</code>
                <code className="text-ink-subtle">{value}</code>
              </div>
            ))}
          </dl>
          <p className="mt-6 max-w-prose text-sm text-ink-subtle">
            A global <code>prefers-reduced-motion</code> rule collapses every transition
            and animation to 0.01ms. GSAP timelines additionally check{" "}
            <code>matchMedia</code> before they are constructed, so a reduced-motion
            visitor never pays for the animation code path.
          </p>
        </Section>
      </div>
    </main>
  );
}
