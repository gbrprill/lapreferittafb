import { createTimeline, stagger } from "animejs";

/**
 * Opening sequence for the hero, choreographed as one timeline:
 * date stamp → title lines rise → tricolor rule draws → tagline word by word
 * → body → both doors → the photo frame settles → carousel dots.
 * Elements carry `data-seq="<step>"`; CSS keeps them hidden only while `.js` is set,
 * so the page stays readable without JS or with reduced motion.
 */
export function playHeroSequence(root: HTMLElement) {
  const q = (step: string) => root.querySelectorAll<HTMLElement>(`[data-seq="${step}"]`);

  // Reduced motion: same order, fades only, nothing travels.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const calm = createTimeline({ defaults: { ease: "outQuad", duration: 700 } });
    ["video", "stamp", "line", "rule", "word", "body", "door", "frame", "dot"].forEach(
      (step, index) => {
        calm.add(q(step), { opacity: [0, 1], delay: stagger(60) }, index * 160);
      },
    );
    return () => {
      calm.pause();
    };
  }

  const tl = createTimeline({ defaults: { ease: "outExpo", duration: 1100 } });

  tl.add(q("video"), { opacity: [0, 1], scale: [1.08, 1], duration: 2400, ease: "outQuart" }, 0)
    .add(q("stamp"), { opacity: [0, 1], y: ["-60%", "0%"], duration: 700, delay: stagger(90) }, 0)
    .add(
      q("line"),
      { opacity: [0, 1], y: ["110%", "0%"], duration: 1300, delay: stagger(140) },
      120,
    )
    .add(
      q("rule"),
      { opacity: [0, 1], scaleX: [0, 1], duration: 900, ease: "inOutQuart", delay: stagger(110) },
      "-=700",
    )
    .add(
      q("word"),
      { opacity: [0, 1], y: ["0.6em", "0em"], rotate: [4, 0], duration: 800, delay: stagger(55) },
      "-=650",
    )
    .add(q("body"), { opacity: [0, 1], y: [14, 0], duration: 900 }, "-=600")
    .add(
      q("door"),
      { opacity: [0, 1], y: [22, 0], scale: [0.97, 1], duration: 900, delay: stagger(120) },
      "-=700",
    )
    .add(
      q("frame"),
      { opacity: [0, 1], y: [60, 0], rotate: [6, 0], duration: 1600, ease: "outQuart" },
      260,
    )
    .add(
      q("dot"),
      { opacity: [0, 1], scale: [0.4, 1], duration: 600, ease: "outBack(2)", delay: stagger(70) },
      "-=500",
    );

  return () => {
    tl.pause();
  };
}
