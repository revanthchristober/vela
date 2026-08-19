import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main id="main">
      <Container className="flex min-h-[60vh] flex-col justify-center py-24">
        <p className="eyebrow">404</p>
        <h1 className="mt-6 max-w-xl font-display text-5xl font-light text-balance">
          That page doesn&rsquo;t exist.
        </h1>
        <p className="mt-6 max-w-md text-ink-muted">
          It may have moved, or it may never have been here. The range is nine products —
          you will find what you were after.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="/shop">Shop the range</ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Back home
          </ButtonLink>
        </div>
      </Container>
    </main>
  );
}
