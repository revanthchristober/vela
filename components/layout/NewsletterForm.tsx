"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";

type State = "idle" | "invalid" | "done";

/**
 * There is no mailing list — VELA is a concept brand. The form validates and
 * gives honest feedback rather than pretending to subscribe anyone, because a
 * fake success message is a small lie that a reviewer will find.
 */
export function NewsletterForm() {
  const [state, setState] = useState<State>("idle");
  const [email, setEmail] = useState("");

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setState(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? "done" : "invalid");
      }}
      className="mt-8 max-w-sm"
    >
      <p className="mb-3 text-sm text-ink-muted">
        Two emails a month. Refills, restocks, and the occasional essay.
      </p>

      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          value={email}
          autoComplete="email"
          placeholder="you@example.com"
          onChange={(event) => {
            setEmail(event.target.value);
            if (state !== "idle") setState("idle");
          }}
          aria-invalid={state === "invalid"}
          aria-describedby={state === "idle" ? undefined : "newsletter-status"}
          className="min-h-12 w-full min-w-0 rounded-sm border border-line-strong bg-canvas-raised px-3 text-sm placeholder:text-ink-subtle"
        />
        <Button type="submit" variant="secondary">
          Join
        </Button>
      </div>

      {state !== "idle" ? (
        <p
          id="newsletter-status"
          role="status"
          className={
            state === "invalid" ? "mt-2 text-xs text-clay" : "mt-2 text-xs text-moss"
          }
        >
          {state === "invalid"
            ? "That email doesn't look right."
            : "Noted — though VELA is a concept brand, so nothing will arrive."}
        </p>
      ) : null}
    </form>
  );
}
