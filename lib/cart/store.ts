import type { CartLine } from "@/lib/cart/types";

/**
 * The cart is external state that happens to live in localStorage, so it is
 * modelled as an external store and read with useSyncExternalStore rather than
 * mirrored into React state inside an effect.
 *
 * This is not style. Reading storage in an effect means the first paint is
 * always an empty cart, which then re-renders — a visible flash of "Bag" over
 * a bag that has three things in it. A store with an explicit server snapshot
 * gets the hydration boundary right by construction, and keeps persistence in
 * the mutation path where a failure can be reported honestly.
 */

const STORAGE_KEY = "vela.cart.v1";

export interface CartState {
  lines: readonly CartLine[];
  /** False until storage has been read. Distinguishes "empty" from "unknown". */
  loaded: boolean;
  /** Set when persistence failed — private mode, or a full quota. */
  persistFailed: boolean;
}

const SERVER_STATE: CartState = { lines: [], loaded: false, persistFailed: false };

let state: CartState = SERVER_STATE;
let hasReadStorage = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function setState(next: CartState) {
  state = next;
  emit();
}

function parseStored(raw: string | null): CartLine[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Shape-check rather than trust: a stale or hand-edited value must not take
    // the header down on first paint.
    return parsed.filter(
      (line): line is CartLine =>
        typeof line === "object" &&
        line !== null &&
        typeof (line as CartLine).id === "string" &&
        typeof (line as CartLine).quantity === "number" &&
        (line as CartLine).quantity > 0,
    );
  } catch {
    return [];
  }
}

function readStorage() {
  if (hasReadStorage || typeof window === "undefined") return;
  hasReadStorage = true;
  let lines: CartLine[] = [];
  try {
    lines = parseStored(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    lines = [];
  }
  setState({ lines, loaded: true, persistFailed: false });
}

function persist(lines: readonly CartLine[]): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    return true;
  } catch {
    return false;
  }
}

function commit(lines: readonly CartLine[]) {
  const ok = persist(lines);
  setState({ lines, loaded: true, persistFailed: !ok });
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  readStorage();
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): CartState {
  return state;
}

export function getServerSnapshot(): CartState {
  return SERVER_STATE;
}

export function addLine(line: CartLine): void {
  const existing = state.lines.find((candidate) => candidate.id === line.id);
  commit(
    existing
      ? state.lines.map((candidate) =>
          candidate.id === line.id
            ? { ...candidate, quantity: candidate.quantity + line.quantity }
            : candidate,
        )
      : [...state.lines, line],
  );
}

export function setQuantity(id: string, quantity: number): void {
  commit(
    quantity < 1
      ? state.lines.filter((line) => line.id !== id)
      : state.lines.map((line) => (line.id === id ? { ...line, quantity } : line)),
  );
}

export function removeLine(id: string): void {
  commit(state.lines.filter((line) => line.id !== id));
}

/** Test and story seam — resets the module store between cases. */
export function __resetForTests(): void {
  state = SERVER_STATE;
  hasReadStorage = false;
  emit();
}
