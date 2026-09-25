import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  type PanInfo,
  type Transition,
  type Variants,
  useInView,
} from "motion/react";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from "react";
import { OrderTarja } from "@/components/tarja";
import { cardapio, isFilled, menuImage, splitIngredients, type MenuItem } from "@/data/brand";

// One easing family for the whole menu: long, soft deceleration.
const ease = [0.22, 1, 0.36, 1] as const;
// Serving slide: every pizza enters (and is pushed out) with this curve over one second.
const slide: Transition = { duration: 1, ease: [0.17, 0.67, 0.14, 0.96] };

const salgadas = cardapio.filter((item) => item.kind === "salgada");
const doces = cardapio.filter((item) => item.kind === "doce");
const teaser = ["americana", "raffaello-supremo", "temaki"];

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Warm the browser cache so a pizza is already decoded when it slides in. */
function prefetch(slug: string | undefined) {
  if (!slug || typeof window === "undefined") return;
  const img = new Image();
  img.src = menuImage(slug);
}

/** Height of a node, kept in sync as its content changes. */
function useMeasuredHeight() {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  useIsoLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(() => setHeight(node.offsetHeight));
    observer.observe(node);
    setHeight(node.offsetHeight);
    return () => observer.disconnect();
  }, []);
  return [ref, height] as const;
}

// ---------------------------------------------------------------- list

const listVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.045, delayChildren: 0.12 } },
  gone: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
};
const rowVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  shown: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease } },
  gone: { opacity: 0, x: -28, transition: { duration: 0.45, ease: [0.4, 0, 1, 1] } },
};

function MenuRow({
  item,
  onPick,
  buttonRef,
}: {
  item: MenuItem;
  onPick: () => void;
  buttonRef: (node: HTMLButtonElement | null) => void;
}) {
  return (
    <motion.li variants={rowVariants}>
      <button
        ref={buttonRef}
        type="button"
        className="menu-row"
        onClick={onPick}
        onPointerEnter={() => prefetch(item.slug)}
        onFocus={() => prefetch(item.slug)}
      >
        <img
          src={menuImage(item.slug, "sm")}
          alt=""
          width={440}
          height={473}
          loading="lazy"
          decoding="async"
          className="menu-row-thumb"
        />
        <span className="menu-row-name">{item.name}</span>
        <ArrowRight aria-hidden="true" strokeWidth={1.1} className="menu-row-arrow" />
      </button>
    </motion.li>
  );
}

function MenuList({
  onPick,
  rowRefs,
  focusIndex,
}: {
  onPick: (index: number) => void;
  rowRefs: RefObject<(HTMLButtonElement | null)[]>;
  focusIndex: number | null;
}) {
  // Coming back from a flavor: return focus to the row that opened it.
  useEffect(() => {
    if (focusIndex === null) return;
    const frame = requestAnimationFrame(() =>
      rowRefs.current[focusIndex]?.focus({ preventScroll: true }),
    );
    return () => cancelAnimationFrame(frame);
  }, [focusIndex, rowRefs]);

  const row = (item: MenuItem) => {
    const index = cardapio.indexOf(item);
    return (
      <MenuRow
        key={item.slug}
        item={item}
        onPick={() => onPick(index)}
        buttonRef={(node) => {
          rowRefs.current[index] = node;
        }}
      />
    );
  };

  return (
    <motion.div
      key="list"
      className="menu-list"
      variants={listVariants}
      initial="hidden"
      animate="shown"
      exit="gone"
    >
      <div>
        <motion.h3 variants={rowVariants} className="menu-group">
          Salgadas
        </motion.h3>
        <ul className="menu-rows">{salgadas.map(row)}</ul>
      </div>
      <div className="flex flex-col">
        <motion.h3 variants={rowVariants} className="menu-group">
          Doces
        </motion.h3>
        <ul className="menu-rows">{doces.map(row)}</ul>
        <motion.p variants={rowVariants} className="menu-note">
          Escolha um sabor para ver a pizza na mesa. O pedido é feito pelo cardápio online, com
          delivery ou retirada.
        </motion.p>
        <motion.div variants={rowVariants} className="mt-6">
          <OrderTarja tone="ink" className="sm:max-w-sm" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------- detail

// The pizza is served from beyond the edge of the page and slides straight to its
// place on the table, no spin. When the flavor changes, the current board is pushed
// off the other side on the same curve and at the same time, one full screen apart,
// so the two never overlap.
const plateVariants: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100vw" : "-100vw" }),
  center: { x: 0, transition: slide },
  exit: (dir: number) => ({ x: dir > 0 ? "-100vw" : "100vw", transition: slide }),
  // Back to the list: the board slides off the table the way it came in.
  leave: { x: "100vw", transition: slide },
};

const copyVariants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.38 } },
  exit: { opacity: 0, transition: { duration: 0.28 } },
};
const copyLine: Variants = {
  enter: { opacity: 0, y: 16, filter: "blur(6px)" },
  center: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease } },
};

function MenuDetail({
  index,
  dir,
  onStep,
  onBack,
  leaving,
}: {
  index: number;
  dir: number;
  leaving: boolean;
  onStep: (step: 1 | -1) => void;
  onBack: () => void;
}) {
  const item = cardapio[index] ?? cardapio[0]!;
  const total = cardapio.length;
  const prev = cardapio[(index - 1 + total) % total]!;
  const next = cardapio[(index + 1) % total]!;
  const [swiped, setSwiped] = useState(false);

  useEffect(() => {
    prefetch(prev.slug);
    prefetch(next.slug);
  }, [prev.slug, next.slug]);

  // Each new flavor title takes focus as it mounts, unless the visitor is using the pager buttons.
  const focusTitle = (node: HTMLHeadingElement | null) => {
    if (!node || document.activeElement?.closest(".menu-pager")) return;
    node.focus({ preventScroll: true });
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const push = info.offset.x + info.velocity.x * 0.2;
    if (push < -90) onStep(1);
    else if (push > 90) onStep(-1);
    else return;
    setSwiped(true);
  };

  return (
    <motion.div
      key="detail"
      className="menu-detail"
      role="group"
      aria-label="Sabor escolhido"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <motion.button
        type="button"
        className="menu-back"
        onClick={onBack}
        initial={{ opacity: 0, x: -14 }}
        animate={
          leaving
            ? { opacity: 0, x: -14, transition: { duration: 0.3 } }
            : { opacity: 1, x: 0, transition: { duration: 0.8, ease, delay: 0.5 } }
        }
        exit={{ opacity: 0, x: -14, transition: { duration: 0.3 } }}
      >
        <ArrowLeft aria-hidden="true" strokeWidth={0.9} className="menu-back-arrow" />
        <span>Todos os sabores</span>
      </motion.button>

      <div className="menu-table">
        <AnimatePresence initial={true} custom={dir} mode="popLayout">
          <motion.img
            key={item.slug}
            src={menuImage(item.slug)}
            srcSet={`${menuImage(item.slug, "sm")} 440w, ${menuImage(item.slug)} 720w`}
            sizes="(max-width: 1023px) 78vw, 32rem"
            width={720}
            height={774}
            alt={`Pizza ${item.name} sobre a tábua da La Preferitta, vista de cima`}
            decoding="async"
            draggable={false}
            className="menu-plate"
            custom={dir}
            variants={plateVariants}
            initial="enter"
            animate={leaving ? "leave" : "center"}
            exit="exit"
            drag={leaving ? false : "x"}
            dragSnapToOrigin
            dragElastic={0.55}
            whileDrag={{ scale: 0.97, cursor: "grabbing" }}
            onDragEnd={onDragEnd}
          />
        </AnimatePresence>
        <p className={`menu-swipe-hint ${swiped ? "is-done" : ""}`} aria-hidden="true">
          <ArrowLeft strokeWidth={1} /> arraste a pizza <ArrowRight strokeWidth={1} />
        </p>
      </div>

      <div className="menu-copy" aria-live="polite">
        {/* Old and new copy cross-fade in one grid cell, so the height never collapses. */}
        <div className="menu-copy-stack">
          <AnimatePresence initial={true}>
            <motion.div
              key={item.slug}
              className="menu-copy-item"
              variants={copyVariants}
              initial="enter"
              animate={leaving ? "exit" : "center"}
              exit="exit"
            >
              <motion.h3 ref={focusTitle} tabIndex={-1} variants={copyLine} className="menu-name">
                {item.name}
              </motion.h3>
              <motion.p variants={copyLine} className="menu-kind">
                Pizza {item.kind}
              </motion.p>
              <ul className="menu-ingredients" aria-label="Ingredientes">
                {splitIngredients(item.ingredients).map((ingredient) => (
                  <motion.li key={ingredient} variants={copyLine}>
                    {ingredient}
                  </motion.li>
                ))}
              </ul>
              {isFilled(item.price) && (
                <motion.p variants={copyLine} className="menu-price">
                  {item.price}
                </motion.p>
              )}
              <motion.div variants={copyLine} className="mt-8">
                <OrderTarja
                  tone="ink"
                  label="Pedir esta pizza"
                  ariaLabel={`Pedir esta pizza: ${item.name}`}
                  className="sm:max-w-sm"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="menu-pager">
          <button type="button" className="menu-step" onClick={() => onStep(-1)}>
            <ArrowLeft aria-hidden="true" strokeWidth={1} />
            <span className="sr-only">Sabor anterior: </span>
            <span className="menu-step-name max-sm:sr-only">{prev.name}</span>
          </button>
          <span className="menu-count" aria-hidden="true">
            {String(index + 1).padStart(2, "0")} / {total}
          </span>
          <button type="button" className="menu-step menu-step-next" onClick={() => onStep(1)}>
            <span className="sr-only">Próximo sabor: </span>
            <span className="menu-step-name max-sm:sr-only">{next.name}</span>
            <ArrowRight aria-hidden="true" strokeWidth={1} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------- section

export function MenuSection() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState<number | null>(null);
  const [dir, setDir] = useState(1);
  const [leaving, setLeaving] = useState(false);
  const [contentRef, contentHeight] = useMeasuredHeight();
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastPicked = useRef<number | null>(null);
  const [returnFocus, setReturnFocus] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const teaserRef = useRef<HTMLDivElement>(null);
  const teaserInView = useInView(teaserRef, { once: true, amount: 0.3 });

  const pick = (next: number) => {
    lastPicked.current = next;
    setReturnFocus(null);
    setDir(1);
    setIndex(next);
  };
  const step = (delta: 1 | -1) => {
    if (leaving) return;
    setDir(delta);
    setIndex((current) => ((current ?? 0) + delta + cardapio.length) % cardapio.length);
  };
  const back = () => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => {
      setLeaving(false);
      setReturnFocus(lastPicked.current);
      setIndex(null);
    }, 620);
  };
  // Arrow keys step through flavors and Escape returns to the list, wherever focus sits in the panel.
  const onPanelKeyDown = (event: KeyboardEvent) => {
    if (index === null) return;
    if (event.key === "ArrowRight") step(1);
    else if (event.key === "ArrowLeft") step(-1);
    else if (event.key === "Escape") back();
    else return;
    event.preventDefault();
  };
  const toggle = () => {
    setOpen((value) => !value);
    setReturnFocus(null);
    setIndex(null);
  };

  // Keep the chosen pizza on screen as the panel changes height.
  useEffect(() => {
    if (index === null) return;
    const panel = sectionRef.current?.querySelector<HTMLElement>(".menu-panel");
    if (!panel) return;
    // Scroll below the sticky header, so the back arrow is never hidden under it.
    const header = document.querySelector<HTMLElement>("[data-sticky-header]")?.offsetHeight ?? 0;
    const top = panel.getBoundingClientRect().top;
    if (top < header || top > window.innerHeight * 0.4) {
      window.scrollTo({ top: top + window.scrollY - header - 16, behavior: "smooth" });
    }
  }, [index === null]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MotionConfig reducedMotion="never">
      <section
        ref={sectionRef}
        id="sabores"
        aria-labelledby="cardapio-titulo"
        className="menu-section paper relative bg-newsprint text-ink"
      >
        <div className="mx-auto grid max-w-screen-2xl items-end gap-10 px-4 pb-10 pt-16 md:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] md:px-8 md:pb-14 md:pt-24">
          <div>
            <h2 id="cardapio-titulo" className="section-title">
              Nosso cardápio
            </h2>
            <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-ink/80">
              Dez sabores da casa, oito salgados e dois doces. Abra o cardápio e escolha um para ver
              a pizza chegar à mesa.
            </p>
            <button
              type="button"
              className={`menu-open ${open ? "is-open" : ""}`}
              aria-expanded={open}
              aria-controls="cardapio-painel"
              onClick={toggle}
            >
              <span className="menu-open-label">{open ? "Fechar cardápio" : "Abrir cardápio"}</span>
              <ChevronDown aria-hidden="true" strokeWidth={1.2} className="menu-open-icon" />
            </button>
          </div>

          <div ref={teaserRef} className="menu-teaser" aria-hidden="true">
            <AnimatePresence initial={false}>
              {!open &&
                teaser.map((slug, i) => (
                  <motion.img
                    key={slug}
                    src={menuImage(slug, "sm")}
                    alt=""
                    width={440}
                    height={473}
                    loading="lazy"
                    decoding="async"
                    className={`menu-teaser-plate menu-teaser-${i}`}
                    initial={{ x: "100vw" }}
                    animate={teaserInView ? { x: 0 } : { x: "100vw" }}
                    transition={{ ...slide, delay: 0.15 + i * 0.18 }}
                    exit={{ x: "100vw", transition: { ...slide, delay: i * 0.08 } }}
                  />
                ))}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          id="cardapio-painel"
          className="menu-panel"
          initial={false}
          animate={{ height: open ? contentHeight : 0 }}
          transition={{ duration: 0.95, ease }}
          inert={!open}
          onKeyDown={onPanelKeyDown}
        >
          <div ref={contentRef}>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="stage"
                  className="mx-auto max-w-screen-2xl px-4 pb-16 md:px-8 md:pb-24"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.4 } }}
                  exit={{ opacity: 0, transition: { duration: 0.35 } }}
                >
                  <AnimatePresence mode="wait" initial={true}>
                    {index === null ? (
                      <MenuList
                        key="list"
                        onPick={pick}
                        rowRefs={rowRefs}
                        focusIndex={returnFocus}
                      />
                    ) : (
                      <MenuDetail
                        key="detail"
                        index={index}
                        dir={dir}
                        leaving={leaving}
                        onStep={step}
                        onBack={back}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
