import { createTimeline } from "animejs";
import { useEffect, useRef, useState } from "react";
import { brand } from "@/data/brand";
import { openLoaderGate } from "@/lib/loader-gate";

// The logo is one transparent raster (500×500). Each part below is the same image
// clipped to one region, so the pieces can enter separately without redrawing the mark.
// Values are insets in % of the square: top right bottom left.
const parts = {
  pizza: "inset(0% 27% 49% 26.6%)",
  stripe: "inset(53.2% 7.6% 44.4% 7%)",
  word: "inset(57.6% 7% 29% 7%)",
  left: "inset(72% 66% 22.6% 7%)",
  name: "inset(72% 36% 22.6% 35.2%)",
  right: "inset(72% 7.6% 22.6% 65.4%)",
} as const;

// Collapsed starting shapes for the parts that draw on.
const from = {
  stripe: "inset(53.2% 50% 44.4% 50%)",
  word: "inset(71% 7% 29% 7%)",
  left: "inset(72% 66% 22.6% 34%)",
  right: "inset(72% 34.6% 22.6% 65.4%)",
} as const;

const pageReady = () =>
  new Promise<void>((resolve) => {
    if (document.readyState === "complete") return resolve();
    window.addEventListener("load", () => resolve(), { once: true });
  });

const atMost = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

export function SiteLoader() {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const $ = (name: keyof typeof parts) =>
      root.querySelector<HTMLElement>(`[data-part="${name}"]`)!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("is-loading");

    const intro = createTimeline({ defaults: { ease: "outExpo" } });
    if (reduce) {
      intro.add(root.querySelectorAll("[data-part]"), {
        opacity: [0, 1],
        duration: 900,
        ease: "outQuad",
      });
    } else {
      intro
        .add(
          $("pizza"),
          {
            opacity: [0, 1],
            scale: [0.55, 1],
            rotate: [-140, 0],
            filter: ["blur(10px)", "blur(0px)"],
            duration: 1500,
          },
          0,
        )
        .add(
          $("stripe"),
          {
            opacity: [0, 1],
            clipPath: [from.stripe, parts.stripe],
            duration: 1000,
            ease: "inOutQuart",
          },
          420,
        )
        .add(
          $("word"),
          {
            opacity: [0, 1],
            clipPath: [from.word, parts.word],
            translateY: ["6%", "0%"],
            duration: 1200,
          },
          700,
        )
        .add(
          $("left"),
          { opacity: [0, 1], clipPath: [from.left, parts.left], duration: 900, ease: "inOutQuart" },
          1050,
        )
        .add(
          $("right"),
          {
            opacity: [0, 1],
            clipPath: [from.right, parts.right],
            duration: 900,
            ease: "inOutQuart",
          },
          1050,
        )
        .add(
          $("name"),
          {
            opacity: [0, 1],
            translateY: ["3%", "0%"],
            filter: ["blur(6px)", "blur(0px)"],
            duration: 1000,
          },
          1250,
        );
    }

    let cancelled = false;
    // Hold the mark until the logo has landed and the page is ready (never longer than ~4s).
    Promise.all([intro.then(() => undefined), Promise.race([pageReady(), atMost(2200)])]).then(
      () => {
        if (cancelled) return;
        const out = createTimeline({ defaults: { ease: "inOutQuart" } });
        out
          .add(
            root.querySelector(".loader-mark")!,
            { opacity: [1, 0], scale: reduce ? [1, 1] : [1, 0.94], duration: 600 },
            250,
          )
          .add(
            root,
            reduce
              ? { opacity: [1, 0], duration: 700 }
              : { clipPath: ["inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"], duration: 1100 },
            500,
          )
          .call(() => {
            document.documentElement.classList.remove("is-loading");
            openLoaderGate();
          }, 700)
          .then(() => setGone(true));
      },
    );

    return () => {
      // Only a finished curtain opens the gate; a dev StrictMode remount must not start the hero early.
      cancelled = true;
      intro.pause();
      document.documentElement.classList.remove("is-loading");
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={ref} className="site-loader" role="status" aria-live="polite">
      <span className="sr-only">Carregando La Preferitta Pizzaria</span>
      <div className="loader-mark" aria-hidden="true">
        {(Object.keys(parts) as (keyof typeof parts)[]).map((name) => (
          <span
            key={name}
            data-part={name}
            className="loader-part"
            style={{ backgroundImage: `url(${brand.logoMono})`, clipPath: parts[name] }}
          />
        ))}
      </div>
    </div>
  );
}
