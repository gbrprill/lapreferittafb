// The loading screen opens this gate as its curtain starts to lift, so the hero's
// own opening sequence plays into the reveal instead of behind the curtain.

let open = false;
const waiting = new Set<() => void>();

export function openLoaderGate() {
  if (open) return;
  open = true;
  waiting.forEach((run) => run());
  waiting.clear();
}

/** Runs `run` once the loader has lifted (immediately if it already has). Returns a cancel. */
export function afterLoader(run: () => void) {
  if (open) {
    run();
    return () => {};
  }
  waiting.add(run);
  return () => waiting.delete(run);
}
