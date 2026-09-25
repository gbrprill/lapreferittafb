import { CalendarDays, Instagram, MapPin, Menu, Pause, Play, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { brand, heroSlides, heroVideo, mural } from "@/data/brand";
import { flavorsLabel, site, sizeInfo, telHref } from "@/data/site";
import { MenuSection } from "@/components/menu-section";
import { Poster, Tricolor } from "@/components/poster";
import { useOnScreen, useReducedMotion } from "@/hooks/use-motion";
import { ReservationProvider } from "@/components/reservation";
import { useReservation } from "@/lib/reservation-context";
import { Experience, Faq, Loyalty, Reviews, Salon, Visit, Wines } from "@/components/sections";
import { SiteLoader } from "@/components/site-loader";
import { OrderTarja, ReserveTarja, Roll, Tarja, VisitTarja } from "@/components/tarja";
import { playHeroSequence } from "@/lib/hero-sequence";
import { afterLoader } from "@/lib/loader-gate";
import { installSmoothAnchors } from "@/lib/smooth-scroll";

const nav = [
  ["Cardápio", "#cardapio"],
  ["Experiência", "#experiencia"],
  ["Vinhos", "#vinhos"],
  ["Avaliações", "#avaliacoes"],
  ["Visite-nos", "#visite"],
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

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { openReservation } = useReservation();

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
        <nav aria-label="Navegação principal" className="hidden items-center gap-8 xl:flex">
          {nav.map(([label, href]) => (
            <a key={href} href={href} className="nav-link">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="chip chip-line max-md:hidden"
            onClick={(event) => openReservation(event.currentTarget)}
            aria-haspopup="dialog"
            data-cta="reserva"
          >
            <CalendarDays aria-hidden="true" />
            <Roll>Reservar</Roll>
          </button>
          <a
            href={site.links.menu}
            target="_blank"
            rel="noopener noreferrer"
            className="chip chip-solid"
            data-cta="pedido"
          >
            <ShoppingBag aria-hidden="true" />
            <Roll>Pedir agora</Roll>
          </a>
          <button
            type="button"
            className="menu-toggle xl:hidden"
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
        className={`grid overflow-hidden bg-ink transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.22,1,.36,1)] xl:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <nav
          aria-label="Navegação mobile"
          className={`min-h-0 px-4 transition-opacity duration-500 md:px-8 ${open ? "py-4 opacity-100" : "opacity-0"}`}
          inert={!open}
        >
          {nav.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="mobile-link">
              {label}
            </a>
          ))}
          <button
            type="button"
            className="mobile-link w-full text-left"
            onClick={(event) => {
              setOpen(false);
              openReservation(
                event.currentTarget.closest("header")?.querySelector<HTMLElement>(".menu-toggle"),
              );
            }}
            aria-haspopup="dialog"
            data-cta="reserva"
          >
            Reservar uma mesa
          </button>
          <a
            href={site.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-link flex items-center gap-3"
            data-cta="instagram"
          >
            <Instagram aria-hidden="true" size={22} /> Instagram
          </a>
        </nav>
      </div>
    </header>
  );
}

/** Mobile: three quiet actions pinned to the thumb once the hero's own buttons scroll away. */
function ActionBar({ heroId }: { heroId: string }) {
  const [show, setShow] = useState(false);
  const { openReservation } = useReservation();

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
    <nav
      aria-label="Ações rápidas"
      className={`door-bar md:hidden ${show ? "door-bar-in" : ""}`}
      inert={!show}
    >
      <a
        href={site.links.menu}
        target="_blank"
        rel="noopener noreferrer"
        className="door door-paper"
        data-cta="pedido"
      >
        <ShoppingBag aria-hidden="true" /> Pedir
      </a>
      <button
        type="button"
        className="door door-ink"
        onClick={(event) => openReservation(event.currentTarget)}
        aria-haspopup="dialog"
        data-cta="reserva"
      >
        <CalendarDays aria-hidden="true" /> Reservar
      </button>
      <a
        href={site.links.google}
        target="_blank"
        rel="noopener noreferrer"
        className="door door-flag"
        data-cta="rotas"
      >
        <MapPin aria-hidden="true" /> Rotas
      </a>
    </nav>
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

const offer = ["Rodízio", "À la carte", "Delivery", "Pizzas doces", "Carta de vinhos"];

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
          <span data-seq="stamp">Francisco Beltrão · Paraná</span>
        </p>
      </div>

      <div className="relative mx-auto grid max-w-screen-2xl items-center gap-10 px-4 pb-16 pt-8 lg:grid-cols-12 lg:gap-8 md:px-8 md:pb-20 md:pt-14 lg:min-h-[calc(100svh-7.5rem)]">
        <div className="lg:col-span-7">
          <h1 id="titulo" className="hero-title">
            <span className="mask">
              <span data-seq="line" className="block">
                Mais que pizza.
              </span>
            </span>
            <span className="mask">
              <span data-seq="line" className="hero-and block">
                Uma experiência
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
          <p
            data-seq="body"
            className="mt-6 max-w-[52ch] text-base leading-relaxed text-newsprint/90 md:text-lg"
          >
            Rodízio, à la carte, pizzas doces que são assinatura da casa e uma carta de vinhos para
            completar a experiência. Venha para o salão ou peça para aproveitar em casa.
          </p>
          <div className="hero-ctas mt-8">
            <div data-seq="door" className="hero-cta-main">
              <ReserveTarja className="tarja-compact h-full" />
            </div>
            <div data-seq="door">
              <OrderTarja
                tone="flag"
                label="Pedir delivery"
                note="Cardápio online"
                className="tarja-compact h-full"
              />
            </div>
            <div data-seq="door">
              <VisitTarja tone="line" className="tarja-compact h-full" />
            </div>
          </div>
          <p data-seq="body" className="hero-facts mt-5">
            {offer.map((item, index) => (
              <span key={item} className="contents">
                {index > 0 && (
                  <span aria-hidden="true" className="max-sm:hidden">
                    •
                  </span>
                )}
                <span>{item}</span>
              </span>
            ))}
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
  const chosen = sizeInfo.find((item) => item.size === picked);

  return (
    <Poster id="tamanhos" labelledBy="tamanhos-titulo" className="bg-flag text-newsprint">
      <div className="mx-auto max-w-screen-2xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <h2 id="tamanhos-titulo" className="pass pass-3 section-title">
            Do tamanho da sua fome — e da sua companhia
          </h2>
          <p className="pass pass-3 max-w-[42ch] text-lg leading-relaxed text-newsprint/90 md:text-right">
            Escolha entre P, M, G e GG. A maior tem 40 centímetros, 16 fatias e permite combinar até
            quatro sabores.
          </p>
        </div>
        <ul className="pass pass-1 sizes mt-12 md:mt-16">
          {sizeInfo.map((item) => {
            const active = picked === item.size;
            return (
              <li key={item.size} className="size-cell">
                <button
                  type="button"
                  className={`size ${active ? "is-active" : ""}`}
                  aria-pressed={active}
                  aria-label={`Tamanho ${item.size}: ${item.diameter} cm, ${item.slices} fatias, ${flavorsLabel(item.flavors)}`}
                  onClick={() => setPicked(active ? null : item.size)}
                >
                  <span className="size-disc" style={{ "--d": item.diameter } as CSSProperties}>
                    <SizePizza letter={item.size} slices={item.slices} />
                  </span>
                  <span className="size-meta" aria-hidden="true">
                    <span className="size-cm">{item.diameter} cm</span>
                    <span className="size-slices">{item.slices} fatias</span>
                    <span className="size-flavors">{flavorsLabel(item.flavors)}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="size-pick mt-10 md:mt-14">
          <p className="font-label text-2xl uppercase tracking-[0.08em]" aria-live="polite">
            {chosen
              ? `Tamanho ${chosen.size} · ${chosen.diameter} cm · ${chosen.slices} fatias · ${flavorsLabel(chosen.flavors)}`
              : "Toque ou clique num tamanho para abrir as fatias"}
          </p>
          <OrderTarja
            tone="paper"
            label="Escolher minha pizza"
            note="Cardápio online"
            cta="escolher-pizza"
            className="sm:w-auto sm:min-w-[20rem]"
          />
        </div>
      </div>
    </Poster>
  );
}

function InstagramWall() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const [paused, setPaused] = useState(false);
  // The strip repeats once only so the loop looks seamless; the copy is hidden from assistive tech and keyboard.
  const strip = reduce ? mural : [...mural, ...mural];

  return (
    <Poster id="instagram" labelledBy="instagram-titulo" className="bg-newsprint text-ink">
      <div className="mx-auto max-w-screen-2xl px-4 pt-16 md:px-8 md:pt-24">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <h2 id="instagram-titulo" className="pass pass-3 section-title">
              Acompanhe a La Preferitta
            </h2>
            <p className="pass pass-3 mt-5 max-w-[48ch] text-lg leading-relaxed text-ink/80">
              Novos sabores, bastidores, rodízio e momentos que acontecem por aqui. Siga a La
              Preferitta e descubra a próxima vontade.
            </p>
          </div>
          <div className="pass pass-3 flex flex-wrap items-center gap-3">
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
            <Tarja
              href={site.links.instagram}
              icon={<Instagram />}
              label="Seguir no Instagram"
              note={site.links.instagramLabel}
              tone="ink"
              cta="instagram"
            />
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
                  href={site.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
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

export function HomePage() {
  useEffect(() => installSmoothAnchors(), []);

  return (
    <div className="poster-site bg-ink">
      <ReservationProvider>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <SiteLoader />
        <SiteHeader />
        <main id="conteudo" tabIndex={-1}>
          <Hero />
          <Experience />
          <MenuSection />
          <Sizes />
          <Wines />
          <Salon />
          <Reviews />
          <Visit />
          <InstagramWall />
          <Faq />
          <Loyalty />
        </main>
        <SiteFooter />
        <ActionBar heroId="inicio" />
      </ReservationProvider>
    </div>
  );
}

export function SiteFooter() {
  const { openReservation } = useReservation();
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
            {site.address.full}
          </p>
          <p className="mt-1 font-label text-xl tracking-[0.05em] text-newsprint/80">
            <a href={telHref} className="inline-link" data-cta="ligar">
              {site.phone.display}
            </a>
          </p>
        </div>
        <nav aria-label="Links do rodapé" className="grid gap-1 md:justify-items-end">
          <a
            className="nav-link footer-link"
            href={site.links.menu}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="pedido"
          >
            Pedir agora
          </a>
          <button
            type="button"
            className="nav-link footer-link"
            onClick={(event) => openReservation(event.currentTarget)}
            aria-haspopup="dialog"
            data-cta="reserva"
          >
            Reservar uma mesa
          </button>
          <a
            className="nav-link footer-link"
            href={site.links.google}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="rotas"
          >
            Como chegar
          </a>
          <a
            className="nav-link footer-link"
            href={site.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="instagram"
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
