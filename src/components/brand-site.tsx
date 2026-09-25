import { Clock, Instagram, MapPin, Menu, Pause, Play, ShoppingBag, X } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { brand, heroSlides, heroVideo, isFilled, mural, sizes } from "@/data/brand";
import { MenuSection } from "@/components/menu-section";
import { SiteLoader } from "@/components/site-loader";
import { OrderTarja, Roll, VisitTarja } from "@/components/tarja";
import { playHeroSequence } from "@/lib/hero-sequence";
import { afterLoader } from "@/lib/loader-gate";
import { installSmoothAnchors } from "@/lib/smooth-scroll";

const nav = [
  ["Sabores", "#sabores"],
  ["Tamanhos", "#tamanhos"],
  ["Salão", "#salao"],
] as const;

const weekdays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

/** The poster's date stamp: today's weekday, never a claim that the house is open. */
function useDateStamp() {
  const [day, setDay] = useState("Hoje");
  useEffect(() => setDay(weekdays[new Date().getDay()] ?? "Hoje"), []);
  return day;
}

/** `prefers-reduced-motion`, read on the client (false during SSR). */
function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return reduce;
}

/** Whether an element is on screen, so off-screen motion can stop costing CPU. */
function useOnScreen<T extends Element>(ref: RefObject<T | null>) {
  const [onScreen, setOnScreen] = useState(true);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) =>
      setOnScreen(Boolean(entry?.isIntersecting)),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);
  return onScreen;
}

/**
 * A section that prints itself: its `.pass` layers register one at a time the
 * first time it scrolls into view. Content stays visible when it renders
 * already on screen, without JS, or with reduced motion.
 */
function Poster({
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

function Tricolor({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex ${className}`}>
      <span className="flex-1 bg-flag" />
      <span className="flex-1 bg-newsprint" />
      <span className="flex-1 bg-tomato" />
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header data-sticky-header className="sticky top-0 z-50 bg-ink text-newsprint">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-3 px-4 md:h-[4.5rem] md:gap-6 md:px-8">
        <a
          href="#inicio"
          aria-label="La Preferitta Pizzaria — voltar ao início"
          className="logo-link shrink-0"
        >
          <img
            src={brand.logoMono}
            alt=""
            width={500}
            height={500}
            className="h-14 w-14 md:h-16 md:w-16"
          />
        </a>
        <nav aria-label="Navegação principal" className="hidden items-center gap-9 lg:flex">
          {nav.map(([label, href]) => (
            <a key={href} href={href} className="nav-link">
              {label}
            </a>
          ))}
          <a
            href={brand.instagram}
            target="_blank"
            rel="noreferrer"
            className="nav-link flex items-center gap-2"
          >
            <Instagram aria-hidden="true" size={15} /> Instagram
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <a href={brand.menu} target="_blank" rel="noreferrer" className="chip chip-solid">
            <ShoppingBag aria-hidden="true" />
            <Roll>Pedir agora</Roll>
          </a>
          <button
            type="button"
            className="menu-toggle lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <Tricolor className="h-[3px]" />
      <div
        id="menu-mobile"
        className={`grid overflow-hidden bg-ink transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.22,1,.36,1)] lg:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <nav
          aria-label="Navegação mobile"
          className={`min-h-0 px-4 transition-opacity duration-500 ${open ? "py-4 opacity-100" : "opacity-0"}`}
          inert={!open}
        >
          {nav.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="mobile-link">
              {label}
            </a>
          ))}
          <a
            href={brand.instagram}
            target="_blank"
            rel="noreferrer"
            className="mobile-link flex items-center gap-3"
          >
            <Instagram aria-hidden="true" size={22} /> Instagram
          </a>
        </nav>
      </div>
    </header>
  );
}

/** Mobile: both doors pinned to the thumb once the hero's own buttons scroll away. */
function DoorBar({ heroId }: { heroId: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setShow(!entry?.isIntersecting), {
      threshold: 0.05,
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [heroId]);

  return (
    <div className={`door-bar md:hidden ${show ? "door-bar-in" : ""}`} inert={!show}>
      <a href={brand.menu} target="_blank" rel="noreferrer" className="door door-paper">
        <ShoppingBag aria-hidden="true" /> Pedir agora
      </a>
      <a href={brand.google} target="_blank" rel="noreferrer" className="door door-flag">
        <MapPin aria-hidden="true" /> Como chegar
      </a>
    </div>
  );
}

/** Real photos taking turns in the frame. Rotates only while `playing`. */
function HeroFrame({ playing }: { playing: boolean }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!playing || hovered) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((index) => (index + 1) % heroSlides.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [playing, hovered]);

  const current = heroSlides[active] ?? heroSlides[0];

  return (
    <div
      className="frame"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className="frame-stage">
        {heroSlides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={index === active ? slide.alt : ""}
            aria-hidden={index !== active}
            width={382}
            height={510}
            decoding="async"
            fetchPriority={index === 0 ? "high" : "low"}
            loading={index === 0 ? "eager" : "lazy"}
            className={`frame-media ${index === active ? "is-active" : ""}`}
          />
        ))}
      </div>
      <div className="frame-foot">
        <p key={current.caption} className="frame-caption" aria-live={playing ? "off" : "polite"}>
          {current.caption}
        </p>
        <div className="flex items-center">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.src}
              data-seq="dot"
              type="button"
              className={`frame-dot ${index === active ? "is-active" : ""}`}
              aria-label={`Mostrar foto ${index + 1} de ${heroSlides.length}: ${slide.caption}`}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Background of the hero. The poster frame renders first (and on the server);
 * the video loads and autoplays on open, except when the visitor is saving data.
 */
function HeroMedia({ playing }: { playing: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [useVideo, setUseVideo] = useState(false);

  useEffect(() => {
    if (!heroVideo) return;
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData ===
      true;
    setUseVideo(!saveData);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (playing) void video.play().catch(() => undefined);
    else video.pause();
  }, [playing, useVideo]);

  if (!heroVideo) return null;

  return (
    <>
      <div data-seq="video" className="hero-media" aria-hidden="true">
        {useVideo ? (
          <video
            ref={ref}
            className="hero-video"
            src={heroVideo.src}
            poster={heroVideo.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        ) : (
          <img
            className="hero-video"
            src={heroVideo.poster}
            alt=""
            aria-hidden="true"
            width={1920}
            height={1080}
            decoding="async"
          />
        )}
      </div>
      <div className="hero-veil" aria-hidden="true" />
    </>
  );
}

const tagline = ["Muito", "sabor.", "Muito", "recheio."];

function Hero() {
  const today = useDateStamp();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const onScreen = useOnScreen(ref);
  // The video always plays while the hero is on screen; the photo carousel still respects reduced motion.
  const photosPlaying = !reduce && onScreen;

  useEffect(() => {
    let stop: (() => void) | undefined;
    const cancel = afterLoader(() => {
      if (ref.current) stop = playHeroSequence(ref.current);
    });
    return () => {
      cancel();
      stop?.();
    };
  }, []);

  return (
    <section
      ref={ref}
      id="inicio"
      aria-labelledby="titulo"
      className="hero relative isolate overflow-hidden bg-ink text-newsprint"
    >
      <HeroMedia playing={onScreen} />
      <div className="relative border-b border-newsprint/12">
        <p className="mx-auto flex max-w-screen-2xl items-center justify-between gap-6 px-4 py-2.5 font-label text-[0.95rem] uppercase tracking-[0.14em] text-newsprint/80 md:px-8">
          <span data-seq="stamp">{today}</span>
          <span data-seq="stamp" className="hidden sm:inline">
            Francisco Beltrão · Paraná
          </span>
          <span data-seq="stamp">Salgadas &amp; doces</span>
        </p>
      </div>

      <div className="relative mx-auto grid max-w-screen-2xl items-center gap-10 px-4 pb-16 pt-8 lg:grid-cols-12 lg:gap-8 md:px-8 md:pb-20 md:pt-14 lg:min-h-[calc(100svh-7.5rem)]">
        <div className="lg:col-span-7">
          <h1 id="titulo" className="hero-title">
            <span className="mask">
              <span data-seq="line" className="block">
                Tem pizza.
              </span>
            </span>
            <span className="mask">
              <span data-seq="line" className="hero-and block">
                e tem
              </span>
            </span>
            <span className="mask">
              <span data-seq="line" className="block">
                La Preferitta
              </span>
            </span>
          </h1>
          <div aria-hidden="true" className="mt-6 flex h-[3px] w-40 md:w-56">
            <span data-seq="rule" className="flex-1 origin-left bg-flag" />
            <span data-seq="rule" className="flex-1 origin-left bg-newsprint" />
            <span data-seq="rule" className="flex-1 origin-left bg-tomato" />
          </div>
          <p className="mt-6 font-label text-2xl uppercase tracking-[0.08em] text-newsprint md:text-[1.7rem]">
            <span className="sr-only">Muito sabor. Muito recheio.</span>
            {tagline.map((word, index) => (
              <span
                key={index}
                data-seq="word"
                aria-hidden="true"
                className="mr-[0.3em] inline-block"
              >
                {word}
              </span>
            ))}
          </p>
          <p
            data-seq="body"
            className="mt-3 max-w-[44ch] text-base leading-relaxed text-newsprint/90 md:text-lg"
          >
            Massa artesanal, borda dourada e muito recheio. Peça em casa ou venha viver a La
            Preferitta em Francisco Beltrão.
          </p>
          <div className="mt-8 grid max-w-xl grid-cols-2 gap-2 sm:gap-3">
            <div data-seq="door">
              <OrderTarja className="tarja-compact h-full" />
            </div>
            <div data-seq="door">
              <VisitTarja className="tarja-compact h-full" />
            </div>
          </div>
          <p data-seq="body" className="hero-facts mt-5">
            <span>Delivery e retirada</span>
            <span aria-hidden="true" className="max-sm:hidden">
              •
            </span>
            <span>Atendimento no salão</span>
            <span aria-hidden="true" className="max-sm:hidden">
              •
            </span>
            <span>Francisco Beltrão</span>
          </p>
        </div>

        <div
          data-seq="frame"
          className="relative mx-auto w-[78%] max-w-[21rem] md:max-w-[22rem] lg:col-span-5 lg:w-full lg:justify-self-end lg:mr-6"
        >
          <HeroFrame playing={photosPlaying} />
        </div>
      </div>
    </section>
  );
}

/** One wedge of the drawn pizza. */
function wedgePath(radius: number, start: number, end: number) {
  const x0 = Math.cos(start) * radius;
  const y0 = Math.sin(start) * radius;
  const x1 = Math.cos(end) * radius;
  const y1 = Math.sin(end) * radius;
  return `M0 0 L${x0.toFixed(3)} ${y0.toFixed(3)} A${radius} ${radius} 0 0 1 ${x1.toFixed(3)} ${y1.toFixed(3)} Z`;
}

/** A pizza drawn to scale that opens into its real number of slices when chosen. */
function SizePizza({ letter, slices }: { letter: string; slices: number }) {
  const step = (Math.PI * 2) / slices;
  const offset = -Math.PI / 2;

  return (
    <svg viewBox="-54 -54 108 108" className="pizza-svg" aria-hidden="true">
      {Array.from({ length: slices }, (_, index) => {
        const start = offset + index * step;
        const mid = start + step / 2;
        const style = {
          "--dx": Math.cos(mid).toFixed(3),
          "--dy": Math.sin(mid).toFixed(3),
          "--i": index,
        } as CSSProperties;
        return (
          <g key={index} className={`wedge ${index === 0 ? "wedge-lead" : ""}`} style={style}>
            <path d={wedgePath(48, start, start + step)} className="wedge-crust" />
            <path d={wedgePath(41, start, start + step)} className="wedge-top" />
          </g>
        );
      })}
      <g className="pizza-badge">
        <circle r="11" />
        <text textAnchor="middle" dominantBaseline="central">
          {letter}
        </text>
      </g>
    </svg>
  );
}

function Sizes() {
  const [picked, setPicked] = useState<string | null>(null);
  const chosen = sizes.find(([size]) => size === picked);

  return (
    <Poster id="tamanhos" labelledBy="tamanhos-titulo" className="bg-flag text-newsprint">
      <div className="mx-auto max-w-screen-2xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <h2 id="tamanhos-titulo" className="pass pass-3 section-title">
            Escolha o tamanho da fome
          </h2>
          <p className="pass pass-3 max-w-[42ch] text-lg leading-relaxed text-newsprint/90 md:text-right">
            Desenhadas em escala: a GG tem 40 cm e 16 fatias. Toque, clique ou use o teclado para
            abrir as fatias.
          </p>
        </div>
        <ul className="pass pass-1 sizes mt-12 md:mt-16">
          {sizes.map(([size, diameter, slices]) => {
            const d = Number.parseInt(diameter, 10);
            const n = Number.parseInt(slices, 10);
            const active = picked === size;
            return (
              <li key={size} className="size-cell">
                <button
                  type="button"
                  className={`size ${active ? "is-active" : ""}`}
                  aria-pressed={active}
                  aria-label={`Tamanho ${size}: ${diameter}, ${slices}`}
                  onClick={() => setPicked(active ? null : size)}
                >
                  <span className="size-disc" style={{ "--d": d } as CSSProperties}>
                    <SizePizza letter={size} slices={n} />
                  </span>
                  <span className="size-meta" aria-hidden="true">
                    <span className="size-cm">{diameter}</span>
                    <span className="size-slices">{slices}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="size-pick mt-10 md:mt-14" aria-live="polite">
          {chosen ? (
            <>
              <p className="font-label text-2xl uppercase tracking-[0.08em]">
                Tamanho {chosen[0]} · {chosen[1]} · {chosen[2]}
              </p>
              <OrderTarja
                tone="paper"
                label="Pedir neste tamanho"
                className="sm:w-auto sm:min-w-[20rem]"
              />
            </>
          ) : (
            <p className="text-lg text-newsprint/85">
              Escolha um tamanho para ver as fatias. O pedido é feito pelo cardápio online.
            </p>
          )}
        </div>
      </div>
    </Poster>
  );
}

function Mural() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const [paused, setPaused] = useState(false);
  // The strip repeats once only so the loop looks seamless; the copy is hidden from assistive tech and keyboard.
  const strip = reduce ? mural : [...mural, ...mural];

  return (
    <Poster id="mural" labelledBy="mural-titulo" className="bg-newsprint text-ink">
      <div className="mx-auto max-w-screen-2xl px-4 pt-16 md:px-8 md:pt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="mural-titulo" className="pass pass-3 section-title">
            Mural da Preferitta
          </h2>
          <div className="pass pass-3 flex items-center gap-3">
            {!reduce && (
              <button
                type="button"
                className="marquee-toggle"
                onClick={() => setPaused((value) => !value)}
                aria-pressed={paused}
                aria-controls="mural-fotos"
              >
                {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
                <span>{paused ? "Retomar" : "Pausar"}</span>
              </button>
            )}
            <a
              href={brand.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-link flex min-h-11 items-center gap-2 font-label text-2xl tracking-[0.06em]"
            >
              <Instagram aria-hidden="true" size={20} /> {brand.instagramLabel}
            </a>
          </div>
        </div>
      </div>
      <div
        ref={ref}
        className={`pass pass-1 marquee mt-8 pb-16 md:mt-12 md:pb-24 ${paused || !onScreen ? "is-paused" : ""}`}
      >
        <ul
          id="mural-fotos"
          className="marquee-track"
          aria-label="Fotos do Instagram da La Preferitta"
        >
          {strip.map((photo, index) => {
            const copy = index >= mural.length;
            return (
              <li
                key={`${photo.src}-${index}`}
                className="tile"
                aria-hidden={copy || undefined}
                inert={copy || undefined}
              >
                <a
                  href={brand.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${photo.alt} — ver no Instagram`}
                >
                  <img
                    src={photo.src}
                    alt=""
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="tile-cta" aria-hidden="true">
                    <Instagram /> Ver no Instagram
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </Poster>
  );
}

function Doors() {
  return (
    <Poster id="portas" labelledBy="portas-titulo" className="bg-ink text-newsprint" grain={false}>
      <div className="mx-auto max-w-screen-2xl px-4 pt-16 md:px-8 md:pt-24">
        <h2 id="portas-titulo" className="pass pass-3 section-title max-w-[16ch]">
          Hoje é em casa ou no salão?
        </h2>
      </div>
      <div className="mx-auto mt-10 grid max-w-screen-2xl gap-px pb-10 md:mt-14 md:grid-cols-2 md:px-8 md:pb-24">
        <article
          id="delivery"
          aria-labelledby="delivery-titulo"
          className="pass pass-1 paper anchor-target relative flex flex-col gap-6 bg-tomato-deep p-6 md:p-10 lg:p-14"
        >
          <h3
            id="delivery-titulo"
            className="font-didone text-[clamp(3rem,6vw,5.5rem)] leading-none"
          >
            Em casa
          </h3>
          <p className="max-w-[38ch] text-lg leading-relaxed text-newsprint/90">
            Delivery ou retirada pelo cardápio online. Horários de atendimento e sabores do dia
            aparecem por lá.
          </p>
          {isFilled(brand.whatsapp) && (
            <p className="font-label text-xl tracking-[0.06em]">WhatsApp: {brand.whatsapp}</p>
          )}
          <OrderTarja className="mt-auto sm:max-w-sm" />
        </article>
        <article
          id="salao"
          aria-labelledby="salao-titulo"
          className="pass pass-2 paper anchor-target relative grid gap-6 bg-flag p-6 sm:grid-cols-[minmax(0,1fr)_10rem] md:p-10 lg:grid-cols-[minmax(0,1fr)_13rem] lg:p-14"
        >
          <div className="flex flex-col gap-6">
            <h3
              id="salao-titulo"
              className="font-didone text-[clamp(3rem,6vw,5.5rem)] leading-none"
            >
              No salão
            </h3>
            <address className="font-label text-2xl uppercase leading-snug tracking-[0.06em]">
              {brand.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            {isFilled(brand.hours) && (
              <p className="flex items-center gap-2 font-label text-xl tracking-[0.06em]">
                <Clock aria-hidden="true" size={18} /> {brand.hours}
              </p>
            )}
            <VisitTarja tone="paper" className="mt-auto sm:max-w-sm" />
          </div>
          <img
            src={brand.local}
            alt="Fachada da La Preferitta à noite, com o letreiro iluminado"
            width={382}
            height={510}
            loading="lazy"
            decoding="async"
            className="cliche-plain aspect-[382/510] w-40 justify-self-end rotate-[-1.5deg] object-cover sm:w-full sm:justify-self-auto"
          />
        </article>
      </div>
    </Poster>
  );
}

export function HomePage() {
  useEffect(() => installSmoothAnchors(), []);

  return (
    <div className="poster-site bg-ink">
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <SiteLoader />
      <SiteHeader />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <MenuSection />
        <Sizes />
        <Mural />
        <Doors />
      </main>
      <SiteFooter />
      <DoorBar heroId="inicio" />
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink pb-24 text-newsprint md:pb-0">
      <Tricolor className="h-[3px]" />
      <div className="mx-auto grid max-w-screen-2xl gap-10 px-4 py-12 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:px-8 md:py-16">
        <img
          src={brand.logoMono}
          alt="La Preferitta Pizzaria"
          width={500}
          height={500}
          loading="lazy"
          decoding="async"
          className="w-36 md:w-44"
        />
        <div>
          <p className="font-didone text-4xl leading-tight md:text-5xl">La Preferitta Pizzaria</p>
          <p className="mt-3 font-label text-xl tracking-[0.05em] text-newsprint/80">
            {brand.address}
          </p>
        </div>
        <nav aria-label="Links do rodapé" className="grid gap-1 md:justify-items-end">
          <a className="nav-link footer-link" href={brand.menu} target="_blank" rel="noreferrer">
            Pedir agora
          </a>
          <a className="nav-link footer-link" href={brand.google} target="_blank" rel="noreferrer">
            Como chegar
          </a>
          <a
            className="nav-link footer-link"
            href={brand.instagram}
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </nav>
      </div>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-2 border-t border-newsprint/12 px-4 py-6 text-sm text-newsprint/75 md:flex-row md:justify-between md:px-8">
        <p>© {new Date().getFullYear()} La Preferitta Pizzaria</p>
        <p>Francisco Beltrão — Paraná</p>
      </div>
    </footer>
  );
}
