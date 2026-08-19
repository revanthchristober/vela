import { ArrowLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function BrandStatement() {
  return (
    <Section size="loose">
      <Container>
        <Reveal className="max-w-3xl lg:mx-auto lg:text-center">
          <h2 className="font-display text-4xl font-light text-balance lg:text-5xl">
            Nine products. Every ingredient printed on the front.
          </h2>
          <p className="mt-8 max-w-xl text-lg text-ink-muted lg:mx-auto">
            Most skincare is either clinical or vague. We wanted neither: short lists you
            can read, textures described in words you would actually use, and no claim we
            cannot print on the bottle.
          </p>
          <div className="mt-8 lg:flex lg:justify-center">
            <ArrowLink href="/story">Read the story</ArrowLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
