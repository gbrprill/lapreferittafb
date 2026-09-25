// Eased in-page navigation: fast departure, long deceleration into the section.
// Native `scroll-behavior: smooth` has no control over the curve, so the page drives it.

const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

let frame = 0;

function stickyOffset() {
  const header = document.querySelector<HTMLElement>("[data-sticky-header]");
  return (header?.offsetHeight ?? 0) + 12;
}

export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const startY = window.scrollY;
  const endY = Math.max(
    0,
    target.getBoundingClientRect().top + startY - (id === "inicio" ? 0 : stickyOffset()),
  );
  const distance = endY - startY;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const finish = () => {
    history.pushState(null, "", `#${id}`);
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  };

  cancelAnimationFrame(frame);
  if (reduce || Math.abs(distance) < 2) {
    window.scrollTo({ top: endY, behavior: "instant" });
    finish();
    return;
  }

  // Longer trips take longer, but never drag: 700ms to 1600ms.
  const duration = Math.min(1600, Math.max(700, Math.abs(distance) * 0.45));
  const start = performance.now();
  const stopOnInput = () => cancelAnimationFrame(frame);
  window.addEventListener("wheel", stopOnInput, { once: true, passive: true });
  window.addEventListener("touchstart", stopOnInput, { once: true, passive: true });

  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo({ top: startY + distance * easeOutQuint(t), behavior: "instant" });
    if (t < 1) {
      frame = requestAnimationFrame(step);
    } else {
      window.removeEventListener("wheel", stopOnInput);
      window.removeEventListener("touchstart", stopOnInput);
      finish();
    }
  };
  frame = requestAnimationFrame(step);
}

/** Routes every same-page `#anchor` click through the eased scroll. Returns a cleanup. */
export function installSmoothAnchors() {
  const onClick = (event: MouseEvent) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey
    )
      return;
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    const id = link?.getAttribute("href")?.slice(1);
    if (!id || !document.getElementById(id)) return;
    event.preventDefault();
    scrollToId(id);
  };
  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}
