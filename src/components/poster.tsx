import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A section that prints itself: its `.pass` layers register one at a time the
 * first time it scrolls into view. Content stays visible when it renders
 * already on screen, without JS, or with reduced motion.
 */
export function Poster({
  id,
  className = "",
  children,
  labelledBy,
  grain = true,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
  grain?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "pending" | "printed">("idle");

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    setState("pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setState("printed");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -18% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      data-print={state}
      className={`print relative ${grain ? "paper" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

export function Tricolor({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex ${className}`}>
      <span className="flex-1 bg-flag" />
      <span className="flex-1 bg-newsprint" />
      <span className="flex-1 bg-tomato" />
    </div>
  );
}
