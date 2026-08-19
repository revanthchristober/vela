import { cn } from "@/lib/utils/cn";

/**
 * The page gutter. One component, so the horizontal rhythm cannot drift
 * section by section. 20px at 360, 24px from xs, 40px from sm, 64px from lg,
 * capped at --container-page (1440px).
 */
export function Container({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "section" | "header" | "footer" | "nav" | "main";
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-page px-5 xs:px-6 sm:px-10 lg:px-16",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Vertical rhythm. Sections breathe more as the viewport grows. */
export function Section({
  className,
  children,
  id,
  tone = "canvas",
  size = "base",
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
  tone?: "canvas" | "sunken" | "ink";
  size?: "tight" | "base" | "loose";
}) {
  return (
    <section
      id={id}
      className={cn(
        {
          canvas: "bg-canvas text-ink",
          sunken: "bg-canvas-sunken text-ink",
          ink: "bg-ink text-ink-inverse",
        }[tone],
        {
          tight: "py-14 sm:py-20",
          base: "py-20 sm:py-28 lg:py-36",
          loose: "py-24 sm:py-36 lg:py-48",
        }[size],
        className,
      )}
    >
      {children}
    </section>
  );
}

/** Small caps label above a section heading. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}
