import { ArrowLeft } from "lucide-react";
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { OrderTarja } from "@/components/tarja";
import { wineIntroVideo, wines } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;
const glide = { duration: 0.7, ease };

type Phase = "wait" | "pour" | "settle" | "done";

/**
 * Opening of the wine section, once per page load: the pour fades in slowly with the
 * title set in wine over it; the video fades away while the title warms to cream,
 * the stage settles to its normal height and the bottles appear.
 */
function useWineIntro() {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("wait");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData ===
      true;
    if (saveData) {
      setPhase("done");
      return;
    }
    const stage = stageRef.current;
    if (!stage) return;
    // Fetch the clip a little before the section arrives.
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoad(true);
          near.disconnect();
        }
      },
      { rootMargin: "900px 0px" },
    );
    near.observe(stage);
    return () => near.disconnect();
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!load || !stage || !video || phase !== "wait") return;
    const start = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        start.disconnect();
        video.currentTime = wineIntroVideo.start;
        video
          .play()
          .then(() => setPhase("pour"))
          .catch(() => setPhase("done"));
      },
      { threshold: 0.55 },
    );
    start.observe(stage);
    return () => start.disconnect();
  }, [load, phase]);

  // End of the pour: fade the video out, then settle.
  useEffect(() => {
    const video = videoRef.current;
    if (phase !== "pour" || !video) return;
    const toSettle = () => setPhase("settle");
    const onTime = () => video.currentTime >= wineIntroVideo.end && toSettle();
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("ended", toSettle);
    const fallback = window.setTimeout(
      toSettle,
      (wineIntroVideo.end - wineIntroVideo.start + 1) * 1000,
    );
    return () => {
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("ended", toSettle);
      window.clearTimeout(fallback);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "settle") return;
    const timer = window.setTimeout(() => {
      videoRef.current?.pause();
      setPhase("done");
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [phase]);

  return { stageRef, videoRef, phase, load };
}

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
  const intro = useWineIntro();

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
    <section
      id="vinhos"
      aria-labelledby="vinhos-titulo"
      data-phase={intro.phase}
      className="wine-section paper relative bg-wine text-newsprint"
    >
      <MotionConfig reducedMotion="never">
        <motion.div
          ref={intro.stageRef}
          layout
          transition={{ layout: { duration: 1.2, ease } }}
          className="wine-stage"
        >
          <div className="wine-intro" aria-hidden="true">
            {intro.load && (
              <video
                ref={intro.videoRef}
                className="wine-intro-video"
                src={wineIntroVideo.src}
                muted
                playsInline
                preload="auto"
              />
            )}
          </div>
          <div className="wine-head mx-auto max-w-screen-2xl px-4 md:px-8">
            <motion.h2
              id="vinhos-titulo"
              layout="position"
              transition={{ layout: { duration: 1.2, ease } }}
              className="section-title wine-title"
            >
              Pizza boa pede uma taça à altura
            </motion.h2>
            <p className="wine-lead max-w-[48ch] text-lg leading-relaxed text-newsprint/90">
              Nossa carta reúne vinhos tintos e brancos para acompanhar diferentes sabores e
              momentos — dos rótulos leves e frutados aos mais intensos e encorpados.
            </p>
          </div>
        </motion.div>
      </MotionConfig>

      <motion.div
        layout="position"
        transition={{ layout: { duration: 1.2, ease } }}
        className="wine-rest mx-auto max-w-screen-2xl px-4 pb-16 md:px-8 md:pb-24"
      >
        <MotionConfig reducedMotion="user">
          <LayoutGroup>
            <div
              ref={stageRef}
              className={`cellar mt-4 md:mt-8 ${chosen ? "has-choice" : ""}`}
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

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-newsprint/20 pt-8">
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
      </motion.div>
    </section>
  );
}
