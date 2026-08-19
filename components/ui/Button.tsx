import Link from "next/link";

import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "quiet";
type Size = "sm" | "base" | "lg";

/* Opacity is deliberately NOT in the transition list. GSAP animates opacity on
   the hero CTAs, and a CSS transition on the same property fights it — the two
   write to the same value on different clocks. Colour transitions only. */
const BASE =
  "inline-flex items-center justify-center gap-2 rounded-sm font-sans font-medium " +
  "transition-[background-color,color,border-color] duration-200 ease-out-soft " +
  "disabled:cursor-not-allowed disabled:opacity-45";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-accent-hover",
  secondary:
    "border border-line-strong bg-transparent text-ink hover:border-ink hover:bg-canvas-raised",
  quiet:
    "text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink",
};

/** Minimum 44px tall at every size — the §11 touch-target rule is enforced here
 *  rather than remembered at each call site. */
const SIZES: Record<Size, string> = {
  sm: "min-h-11 px-4 text-sm",
  base: "min-h-12 px-6 text-sm",
  lg: "min-h-14 px-8 text-base",
};

export function buttonClass(
  variant: Variant = "primary",
  size: Size = "base",
  className?: string,
): string {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

export function Button({
  variant = "primary",
  size = "base",
  className,
  fullWidth,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}) {
  return (
    <button
      {...props}
      className={buttonClass(variant, size, cn(fullWidth && "w-full", className))}
    />
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "base",
  className,
  fullWidth,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}) {
  return (
    <Link
      href={href}
      {...props}
      className={buttonClass(variant, size, cn(fullWidth && "w-full", className))}
    >
      {children}
    </Link>
  );
}

/** A text link with an arrow. Used wherever a section hands off to another page. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-sm text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink",
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-200 ease-out-soft group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
