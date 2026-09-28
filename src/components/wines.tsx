import { ArrowLeft } from "lucide-react";
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Poster } from "@/components/poster";
import { OrderTarja } from "@/components/tarja";
import { wines } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;
const glide = { duration: 0.7, ease };

/**
 * All bottles stand side by side on one shelf. Pointing at a bottle (hover, tap or
 * keyboard focus) fades the others away while the chosen one glides to the front
 * of the shelf, larger, with its description beside it.
 */
export function Wines() {
  const [active, setActive] = useState<string | null>(null);
  const [touch, setTouch] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const chosen = wines.find((wine) => wine.slug === active) ?? null;

  useEffect(() => {
    setTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  // Touch: tapping anywhere outside the stage puts the bottles back.
  useEffect(() => {
    if (!active || !touch) return;
    const onDown = (event: PointerEvent) => {
      if (!stageRef.current?.contains(event.target as Node)) setActive(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [active, touch]);

  return (
    <Poster id="vinhos" labelledBy="vinhos-titulo" className="bg-wine text-newsprint">
      <div className="mx-auto max-w-screen-2xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
          <h2 id="vinhos-titulo" className="pass pass-3 section-title">
            Pizza boa pede uma taça à altura
          </h2>
          <p className="pass pass-3 max-w-[48ch] text-lg leading-relaxed text-newsprint/90">
            Nossa carta reúne vinhos tintos e brancos para acompanhar diferentes sabores e momentos
            — dos rótulos leves e frutados aos mais intensos e encorpados.
          </p>
        </div>

        <MotionConfig reducedMotion="user">
          <LayoutGroup>
            <div
              ref={stageRef}
              className={`cellar pass pass-1 mt-12 md:mt-16 ${chosen ? "has-choice" : ""}`}
              onMouseLeave={() => !touch && setActive(null)}
              onKeyDown={(event) => {
                if (event.key === "Escape" && active) {
                  setActive(null);
                  stageRef.current
                    ?.querySelector<HTMLButtonElement>(`[data-wine="${active}"]`)
                    ?.focus();
                }
              }}
            >
              <ul className="cellar-row" aria-label="Carta de vinhos">
                {wines.map((wine) => {
                  const isActive = wine.slug === active;
                  return (
                    <li key={wine.slug} className="cellar-slot">
                      <button
                        type="button"
                        data-wine={wine.slug}
                        className={`bottle ${isActive ? "is-active" : ""}`}
                        aria-pressed={isActive}
                        aria-controls="vinho-detalhe"
                        aria-label={`${wine.name}, ${wine.style}`}
                        onMouseEnter={() => !touch && setActive(wine.slug)}
                        // Keyboard focus picks a bottle; a tap's own focus event is ignored so the
                        // click that follows can't undo the choice.
                        onFocus={(event) =>
                          event.currentTarget.matches(":focus-visible") && setActive(wine.slug)
                        }
                        onClick={() => setActive(wine.slug)}
                      >
                        {!isActive && (
                          <motion.img
                            layoutId={`bottle-${wine.slug}`}
                            transition={glide}
                            src={wine.image}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            className="bottle-img"
                          />
                        )}
                        <span className="bottle-name" aria-hidden="true">
                          {wine.name}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div id="vinho-detalhe" className="cellar-feature" aria-live="polite">
                <AnimatePresence>
                  {chosen && (
                    <motion.div
                      key={chosen.slug}
                      className="cellar-feature-inner"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: 0.35 } }}
                      exit={{ opacity: 0, transition: { duration: 0.25 } }}
                    >
                      {touch && (
                        <motion.button
                          type="button"
                          className="cellar-back"
                          onClick={() => setActive(null)}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            transition: { duration: 0.5, ease, delay: 0.3 },
                          }}
                        >
                          <ArrowLeft aria-hidden="true" strokeWidth={1} />
                          <span>Todos os vinhos</span>
                        </motion.button>
                      )}
                      <div className="cellar-feature-bottle">
                        <motion.img
                          layoutId={`bottle-${chosen.slug}`}
                          transition={glide}
                          src={chosen.image}
                          alt={`Garrafa de ${chosen.name}`}
                          decoding="async"
                          draggable={false}
                        />
                      </div>
                      <motion.div
                        className="cellar-feature-copy"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: { duration: 0.6, ease, delay: 0.2 },
                        }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      >
                        <p className="wine-style">
                          {chosen.style === "branco" ? "Branco" : "Tinto"}
                        </p>
                        <h3 className="wine-name">{chosen.name}</h3>
                        <p className="wine-grape">{chosen.grape}</p>
                        <p className="wine-note">{chosen.note}</p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </LayoutGroup>
        </MotionConfig>

        <div className="pass pass-3 mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-newsprint/20 pt-8">
          <p className="max-w-[40ch] text-newsprint/85">
            {touch
              ? "Toque em uma garrafa para conhecer o vinho. "
              : "Passe o mouse sobre uma garrafa para conhecer o vinho. "}
            Rótulos sujeitos à disponibilidade. Preços no cardápio online.
          </p>
          <OrderTarja
            tone="paper"
            label="Conhecer a carta de vinhos"
            note="No cardápio online"
            cta="vinhos"
            className="sm:w-auto sm:min-w-[22rem]"
          />
        </div>
      </div>
    </Poster>
  );
}
