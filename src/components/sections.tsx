import { ChevronDown, Gift, PenLine, Phone, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Poster } from "@/components/poster";
import { OrderTarja, ReserveTarja, Tarja, VisitTarja } from "@/components/tarja";
import { brand, menuImage } from "@/data/brand";
import {
  deliveryFollowsSalon,
  formatHour,
  rodizioDaysText,
  schedule,
  site,
  telHref,
  weekOrder,
  weekdayNames,
} from "@/data/site";

// ---------------------------------------------------------------- experiência

const occasions = [
  {
    title: "Rodízio",
    text: "Uma sequência de sabores salgados e doces para experimentar a La Preferitta por completo.",
    detail: `${rodizioDaysText.replace(/^./, (c) => c.toUpperCase())}.`,
    images: ["americana", "raffaello-supremo", "costela-com-barbecue"],
  },
  {
    title: "À la carte",
    text: "Escolha seus sabores preferidos, o tamanho ideal e aproveite no seu ritmo.",
    detail: "Todos os dias de funcionamento.",
    images: ["file-com-gorgonzola"],
  },
  {
    title: "Delivery e retirada",
    text: "A experiência La Preferitta também chega até você, com pedidos pelo cardápio online.",
    detail: deliveryFollowsSalon ? "Nos mesmos horários do salão." : "Horários no cardápio online.",
    images: ["carne-seca-especial"],
  },
] as const;

export function Experience() {
  return (
    <Poster
      id="experiencia"
      labelledBy="experiencia-titulo"
      className="bg-ink text-newsprint"
      grain={false}
    >
      <div className="mx-auto max-w-screen-2xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
          <h2 id="experiencia-titulo" className="pass pass-3 section-title">
            Uma experiência para cada ocasião
          </h2>
          <p className="pass pass-3 max-w-[48ch] text-lg leading-relaxed text-newsprint/85">
            Da noite de rodízio ao jantar à la carte, a La Preferitta combina receitas marcantes,
            pizzas doces que viraram assinatura da casa e um ambiente preparado para reunir quem
            você gosta.
          </p>
        </div>

        <ul className="occasions mt-12 md:mt-16">
          {occasions.map((item, index) => (
            <li key={item.title} className={`pass pass-${(index % 3) + 1} occasion`}>
              <div className={`occasion-art occasion-art-${item.images.length}`} aria-hidden="true">
                {item.images.map((slug) => (
                  <img
                    key={slug}
                    src={menuImage(slug, "sm")}
                    alt=""
                    width={440}
                    height={473}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
              <h3 className="occasion-title">{item.title}</h3>
              <p className="occasion-text">{item.text}</p>
              <p className="occasion-detail">{item.detail}</p>
            </li>
          ))}
        </ul>

        <div className="pass pass-3 mt-12 grid gap-3 sm:grid-cols-2 lg:max-w-3xl">
          <ReserveTarja />
          <OrderTarja
            tone="line"
            label="Ver cardápio completo"
            note="Cardápio online"
            cta="cardapio"
          />
        </div>
      </div>
    </Poster>
  );
}

// ---------------------------------------------------------------- salão

export function Salon() {
  return (
    <Poster id="salao" labelledBy="salao-titulo" className="bg-ink text-newsprint" grain={false}>
      <div className="mx-auto grid max-w-screen-2xl items-center gap-10 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-12 lg:gap-14">
        <figure className="pass pass-1 salon-photo lg:col-span-7">
          <img
            src={brand.localWide}
            srcSet={`${brand.localWideSm} 800w, ${brand.localWide} 1376w`}
            sizes="(max-width: 1023px) 100vw, 58vw"
            alt="Fachada da La Preferitta à noite, com o letreiro iluminado, o salão aberto e a cidade ao fundo"
            width={1376}
            height={768}
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div className="lg:col-span-5">
          <h2 id="salao-titulo" className="pass pass-3 section-title">
            Uma noite para aproveitar sem pressa
          </h2>
          <p className="pass pass-3 mt-6 max-w-[44ch] text-lg leading-relaxed text-newsprint/85">
            Ambiente climatizado, vista de Francisco Beltrão e espaço para reunir família e amigos.
            Venha para o rodízio, escolha à la carte e complete a noite com um vinho da casa.
          </p>
          <div className="pass pass-3 mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <ReserveTarja />
            <VisitTarja tone="line" />
          </div>
        </div>
      </div>
    </Poster>
  );
}

// ---------------------------------------------------------------- avaliações

function Stars({ rating }: { rating: number }) {
  return (
    <span className="stars" aria-hidden="true">
      <span className="stars-base">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} strokeWidth={1} />
        ))}
      </span>
      <span className="stars-fill" style={{ width: `${(rating / 5) * 100}%` }}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} strokeWidth={1} />
        ))}
      </span>
    </span>
  );
}

export function Reviews() {
  const { rating } = site.reviews;
  const ratingText = rating.toLocaleString("pt-BR", { minimumFractionDigits: 1 });

  return (
    <Poster id="avaliacoes" labelledBy="avaliacoes-titulo" className="bg-newsprint text-ink">
      <div className="mx-auto grid max-w-screen-2xl gap-10 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <h2 id="avaliacoes-titulo" className="pass pass-3 section-title">
            Quem prova, recomenda
          </h2>
          <p className="pass pass-3 mt-6 max-w-[44ch] text-lg leading-relaxed text-ink/80">
            Clientes destacam os sabores, o atendimento, a experiência do rodízio e a qualidade
            tanto no salão quanto no delivery.
          </p>
        </div>
        <div className="pass pass-1 rating lg:col-span-6 lg:col-start-7">
          <p className="rating-number">
            <span className="sr-only">Nota </span>
            {ratingText}
            <span className="rating-of"> de 5 no Google</span>
          </p>
          <Stars rating={rating} />
          <p className="rating-count">Com base em avaliações públicas.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Tarja
              href={site.links.google}
              icon={<Star />}
              label="Ver avaliações no Google"
              note="Perfil da La Preferitta"
              tone="ink"
              cta="avaliacoes"
            />
            <Tarja
              href={site.links.writeReview}
              icon={<PenLine />}
              label="Avaliar a La Preferitta"
              note="Deixe sua opinião no Google"
              tone="line"
              className="tarja-on-light"
              cta="avaliar"
            />
          </div>
        </div>
      </div>
    </Poster>
  );
}

// ---------------------------------------------------------------- visite-nos

function HoursTable() {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(new Date().getDay()), []);

  return (
    <table className="hours">
      <caption className="hours-caption">Horários da casa</caption>
      <thead className="sr-only">
        <tr>
          <th scope="col">Dia</th>
          <th scope="col">Horário</th>
          <th scope="col">Rodízio</th>
        </tr>
      </thead>
      <tbody>
        {weekOrder.map((day) => {
          const item = schedule[day];
          const isToday = today === day;
          return (
            <tr
              key={day}
              className={isToday ? "is-today" : ""}
              aria-current={isToday ? "date" : undefined}
            >
              <th scope="row">
                {weekdayNames[day].replace(/^./, (c) => c.toUpperCase())}
                {isToday && <span className="hours-today"> · hoje</span>}
              </th>
              <td>
                {item.salon
                  ? `${formatHour(item.salon.opens)} – ${formatHour(item.salon.closes)}`
                  : "Fechado"}
              </td>
              <td>
                {item.rodizio ? (
                  <span className="hours-tag">Rodízio</span>
                ) : (
                  <span className="sr-only">Sem rodízio</span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function Visit() {
  return (
    <Poster id="visite" labelledBy="visite-titulo" className="bg-flag text-newsprint">
      <div className="mx-auto grid max-w-screen-2xl gap-12 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 id="visite-titulo" className="pass pass-3 section-title">
            Escolha a sua noite Preferitta
          </h2>
          <p className="pass pass-3 mt-6 max-w-[42ch] text-lg leading-relaxed text-newsprint/90">
            Estamos na Avenida Júlio Assis Cavalheiro, no Bairro Industrial, em Francisco Beltrão.
          </p>
          <address className="pass pass-3 mt-8 font-label text-2xl uppercase leading-snug tracking-[0.06em] not-italic">
            {site.address.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="pass pass-3 mt-4 font-label text-2xl tracking-[0.06em]">
            <a href={telHref} className="inline-link" data-cta="ligar">
              {site.phone.display}
            </a>
          </p>
          <div className="pass pass-3 mt-8 grid gap-3 sm:grid-cols-2 lg:max-w-xl">
            <ReserveTarja />
            <Tarja
              href={telHref}
              icon={<Phone />}
              label="Ligar"
              note={site.phone.display}
              tone="line"
              cta="ligar"
            />
            <VisitTarja tone="line" className="sm:col-span-2" />
          </div>
        </div>
        <div className="pass pass-2 lg:col-span-5 lg:col-start-8">
          <HoursTable />
          <p className="mt-4 text-sm leading-relaxed text-newsprint/85">
            {deliveryFollowsSalon && "Delivery e retirada nos mesmos horários. "}
            Horários podem sofrer alterações. Consulte o cardápio ou fale com a equipe.
          </p>
        </div>
      </div>
    </Poster>
  );
}

// ---------------------------------------------------------------- fidelidade

/** Hidden until the loyalty rules are confirmed (`site.loyalty.enabled`). */
export function Loyalty() {
  if (!site.loyalty.enabled) return null;
  return (
    <section aria-labelledby="fidelidade-titulo" className="bg-newsprint text-ink">
      <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-6 border-t border-ink/15 px-4 py-10 md:px-8">
        <div className="flex items-start gap-4">
          <Gift aria-hidden="true" className="mt-1 h-6 w-6 text-tomato-deep" strokeWidth={1.2} />
          <div>
            <h2 id="fidelidade-titulo" className="font-didone text-3xl">
              Seu pedido também pode valer recompensa
            </h2>
            <p className="mt-2 max-w-[56ch] text-ink/80">
              Consulte o programa de fidelidade da La Preferitta e acompanhe os benefícios
              disponíveis pelo cardápio online.
            </p>
          </div>
        </div>
        <OrderTarja
          tone="ink"
          label="Conhecer o programa"
          note="No cardápio online"
          cta="fidelidade"
        />
      </div>
    </section>
  );
}
