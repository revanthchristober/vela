"use client";

import { useCallback, useState, useSyncExternalStore } from "react";

const KEY = "vela.announcement.dismissed";

/**
 * Dismissal lives in sessionStorage, which is external state — so it is read
 * with useSyncExternalStore rather than copied into React state in an effect.
 *
 * The bar renders on the server and stays rendered until dismissal is known to
 * be true. Doing it the other way round — mounting the bar after reading
 * storage — would push the whole page down after first paint and register as
 * layout shift on the one page whose CLS is being measured.
 */
function subscribe(): () => void {
  return () => {};
}

function isDismissed(): boolean {
  try {
    return window.sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function AnnouncementBar({ children }: { children: React.ReactNode }) {
  const storedDismissal = useSyncExternalStore(subscribe, isDismissed, () => false);
  const [dismissedNow, setDismissedNow] = useState(false);

  const dismiss = useCallback(() => {
    try {
      window.sessionStorage.setItem(KEY, "1");
    } catch {
      /* the dismissal simply will not persist across pages */
    }
    setDismissedNow(true);
  }, []);

  if (storedDismissal || dismissedNow) return null;

  return (
    <div className="bg-accent text-accent-ink">
      <div className="mx-auto flex max-w-page items-center justify-center gap-4 px-5 py-2.5 xs:px-6 sm:px-10 lg:px-16">
        <p className="text-center text-xs tracking-eyebrow uppercase">{children}</p>
        <button
          type="button"
          onClick={dismiss}
          className="-my-2 -mr-2 flex size-9 shrink-0 items-center justify-center text-accent-ink/70 hover:text-accent-ink"
        >
          <span aria-hidden="true">×</span>
          <span className="sr-only">Dismiss announcement</span>
        </button>
      </div>
    </div>
  );
}
