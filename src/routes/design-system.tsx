import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Instagram, MapPin, MousePointer2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brand, gallery, palette, pizzas, sizes } from "@/data/brand";

export const Route = createFileRoute("/design-system")({
  head: () => ({
    meta: [
      { title: "Identidade Digital — La Preferitta Pizzaria" },
      {
        name: "description",
        content: "Design system e diretrizes da identidade digital da La Preferitta Pizzaria.",
      },
      { property: "og:title", content: "Identidade Digital — La Preferitta Pizzaria" },
      {
        property: "og:description",
        content: "Cores, tipografia, componentes e direção fotográfica da marca La Preferitta.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/design-system" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/design-system" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700;9..144,900&family=Manrope:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: DesignSystemPage,
});

const typeScale = [
  ["Display XL", "9rem / 700 / 0.82", "Preferitta"],
  ["Display L", "6rem / 700 / 0.88", "Muito recheio"],
  ["H1", "4.5rem / 700 / 0.9", "Sua próxima pizza"],
  ["H2", "3.75rem / 700 / 0.95", "Premium da casa"],
  ["H3", "2.25rem / 700 / 1", "Carne Seca Especial"],
  [
    "Body Large",
    "1.25rem / 400 / 1.6",
    "Combinações que entram em cena antes da primeira mordida.",
  ],
  ["Body", "1rem / 400 / 1.6", "Uma identidade direta, humana e com apetite."],
  ["Caption", "0.75rem / 700 / 1.4", "FRANCISCO BELTRÃO — PARANÁ"],
] as const;

function Chapter({
  number,
  label,
  children,
  inverse = false,
}: {
  number: string;
  label: string;
  children: React.ReactNode;
  inverse?: boolean;
}) {
  return (
    <section
      className={`ds-section ${inverse ? "bg-brand-charcoal text-brand-ivory" : "bg-background"}`}
    >
      <div className="mx-auto max-w-screen-2xl px-5 md:px-10 lg:px-16">
        <header className="mb-12 flex items-center gap-4 border-b border-current/20 pb-4">
          <span className="text-xs font-bold text-primary">{number}</span>
          <h2 className="text-xs font-bold uppercase">{label}</h2>
        </header>
        {children}
      </div>
    </section>
  );
}

function DesignSystemPage() {
  return (
    <main className="bg-background text-foreground">
      <div className="fixed left-0 right-0 top-0 z-40 border-b border-brand-ivory/15 bg-brand-charcoal/95 text-brand-ivory backdrop-blur">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-5 md:px-10">
          <Link to="/" className="flex items-center gap-2 text-xs font-bold uppercase">
            <ArrowLeft size={16} /> Voltar ao site
          </Link>
          <span className="hidden text-xs font-bold uppercase text-brand-ivory/60 sm:block">
            La Preferitta / Identidade digital
          </span>
        </div>
      </div>

      <section className="flex min-h-[85svh] items-end bg-brand-charcoal px-5 pb-12 pt-28 text-brand-ivory md:px-10 lg:px-16">
        <div className="mx-auto grid w-full max-w-screen-2xl gap-10 lg:grid-cols-[3fr_2fr] lg:items-end">
          <div>
            <p className="mb-6 text-xs font-bold uppercase text-brand-orange">
              Digital brand system / v1.0
            </p>
            <h1 className="font-display text-[clamp(4rem,12vw,11rem)] uppercase leading-[0.78]">
              La
              <br />
              <span className="text-brand-orange">Preferitta</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-brand-ivory/65">
              Uma identidade gastronômica artesanal, contemporânea, autêntica e feita para abrir o
              apetite.
            </p>
          </div>
          <img
            src={brand.logo}
            alt="Logo oficial La Preferitta Pizzaria"
            className="w-full max-w-lg justify-self-end"
          />
        </div>
      </section>

      <Chapter number="01" label="Brand overview">
        <div className="grid gap-10 lg:grid-cols-2">
          <h3 className="font-display text-6xl uppercase leading-none md:text-8xl">
            Generosa.
            <br />
            Urbana.
            <br />
            Preferitta.
          </h3>
          <div className="flex flex-col justify-end">
            <p className="max-w-xl text-xl leading-relaxed">
              A identidade une o apetite visual do laranja, a força urbana do grafite e uma
              referência italiana reduzida ao essencial. A fotografia mostra o produto de perto, sem
              disfarces.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
              {["Artesanal", "Contemporânea", "Apetitosa", "Autêntica"].map((item) => (
                <span key={item} className="bg-background p-4 text-xs font-bold uppercase">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Chapter>

      <Chapter number="02" label="Logo" inverse>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex min-h-[420px] items-center justify-center bg-brand-deep p-10">
            <img
              src={brand.logo}
              alt="Logo La Preferitta em fundo escuro"
              className="w-full max-w-sm"
            />
          </div>
          <div className="flex min-h-[420px] items-center justify-center bg-brand-ivory p-10">
            <img
              src={brand.logo}
              alt="Logo oficial La Preferitta aplicada em fundo claro"
              className="w-full max-w-sm"
            />
          </div>
        </div>
        <div className="mt-8 grid gap-8 border-t border-brand-ivory/20 pt-8 md:grid-cols-3">
          <div>
            <p className="ds-label">Área de proteção</p>
            <p className="mt-3 text-sm text-brand-ivory/65">
              Mantenha ao redor da arte um respiro equivalente à altura da palavra “PIZZARIA”.
            </p>
          </div>
          <div>
            <p className="ds-label">Tamanho mínimo</p>
            <p className="mt-3 text-sm text-brand-ivory/65">
              Digital: 64 px de largura. Abaixo disso, prefira apenas aplicações maiores da arte
              oficial.
            </p>
          </div>
          <div>
            <p className="ds-label">Integridade</p>
            <p className="mt-3 text-sm text-brand-ivory/65">
              Não distorcer, recolorir, inclinar, recortar ou reconstruir o arquivo.
            </p>
          </div>
        </div>
      </Chapter>

      <Chapter number="03" label="Color palette">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {palette.map((color, index) => (
            <article key={color.token} className="border border-border bg-surface">
              <div
                className={`h-40 ${["bg-brand-orange", "bg-primary-dark", "bg-brand-orange-light", "bg-brand-charcoal", "bg-brand-deep", "bg-brand-gray", "bg-brand-green", "bg-brand-red", "bg-background", "bg-surface", "bg-foreground", "bg-muted-foreground"][index]}`}
              />
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl uppercase">{color.token}</h3>
                  <p className="text-right font-mono text-xs">
                    {color.hex}
                    <br />
                    RGB {color.rgb}
                  </p>
                </div>
                <p className="mt-5 text-sm">
                  <strong>Usar:</strong> {color.use}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Evitar:</strong> {color.avoid}
                </p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          A paleta foi extraída visualmente da logo oficial enviada. Verde e vermelho são acentos,
          nunca cores dominantes.
        </p>
      </Chapter>

      <Chapter number="04" label="Typography" inverse>
        <div className="grid gap-14 lg:grid-cols-[1fr_3fr]">
          <div>
            <p className="ds-label text-brand-orange">Famílias</p>
            <p className="mt-4 font-display text-4xl uppercase">Fraunces</p>
            <p className="mt-1 text-sm text-brand-ivory/60">
              Display / títulos — inspirada na serifada do logotipo
            </p>
            <p className="mt-8 text-2xl">Manrope</p>
            <p className="mt-1 text-sm text-brand-ivory/60">UI / corpo / navegação</p>
          </div>
          <div className="divide-y divide-brand-ivory/15">
            {typeScale.map(([name, spec, sample], index) => (
              <div key={name} className="grid gap-3 py-6 md:grid-cols-[12rem_1fr]">
                <div>
                  <p className="text-xs font-bold uppercase text-brand-orange">{name}</p>
                  <p className="mt-1 font-mono text-[0.68rem] text-brand-ivory/45">{spec}</p>
                </div>
                <p
                  className={`${index < 5 ? "font-display uppercase" : ""} ${["text-7xl", "text-6xl", "text-5xl", "text-4xl", "text-3xl", "text-xl", "text-base", "text-xs font-bold uppercase"][index]}`}
                >
                  {sample}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Chapter>

      <Chapter number="05" label="Spacing & shape">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h3 className="ds-title">Escala de 4 px</h3>
            <div className="mt-8 space-y-4">
              {[4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128].map((space) => (
                <div key={space} className="flex items-center gap-5">
                  <code className="w-10 text-xs">{space}</code>
                  <span
                    className="h-3 bg-primary"
                    style={{ width: `${Math.min(space * 2.5, 320)}px` }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="ds-title">Raios e sombras</h3>
            <div className="mt-8 grid grid-cols-2 gap-5">
              {[
                ["sm", "4 px"],
                ["md", "6 px"],
                ["lg", "8 px"],
                ["xl", "12 px"],
              ].map(([name, value], index) => (
                <div
                  key={name}
                  className={`flex aspect-square items-end border border-border bg-surface p-4 shadow-subtle ${["rounded-sm", "rounded-md", "rounded-lg", "rounded-xl"][index]}`}
                >
                  <span className="text-xs font-bold uppercase">
                    {name} / {value}
                  </span>
                </div>
              ))}
              <div className="col-span-2 rounded-full border border-border bg-surface p-6 text-center text-xs font-bold uppercase shadow-subtle">
                pill / 999 px — somente controles compactos
              </div>
            </div>
          </div>
        </div>
      </Chapter>

      <Chapter number="06" label="Buttons & states" inverse>
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <p className="ds-label">Primary</p>
            <div className="mt-5 flex flex-col items-start gap-3">
              <Button variant="brand" size="xl">
                Ver cardápio <ArrowRight />
              </Button>
              <Button variant="brand" size="xl" className="[--btn-liquid-bg:var(--primary-dark)]">
                Hover / active
              </Button>
              <Button variant="brand" size="xl" disabled>
                Disabled
              </Button>
            </div>
          </div>
          <div>
            <p className="ds-label">Secondary</p>
            <div className="mt-5 flex flex-col items-start gap-3">
              <Button variant="inverse" size="xl">
                Conhecer
              </Button>
              <Button
                variant="inverse"
                size="xl"
                className="ring-2 ring-brand-orange ring-offset-2 ring-offset-brand-charcoal"
              >
                Focus
              </Button>
            </div>
          </div>
          <div>
            <p className="ds-label">Ghost</p>
            <div className="mt-5 flex flex-col items-start gap-3">
              <Button variant="outlineInverse" size="xl">
                Instagram <Instagram />
              </Button>
              <button className="nav-link p-3 text-xs font-bold uppercase">Navigation link</button>
            </div>
          </div>
          <div>
            <p className="ds-label">Icon</p>
            <div className="mt-5 flex gap-3">
              <Button variant="iconInverse" size="icon" aria-label="Localização">
                <MapPin />
              </Button>
              <Button variant="iconInverse" size="icon" aria-label="Instagram">
                <Instagram />
              </Button>
              <Button variant="iconInverse" size="icon" aria-label="Cursor">
                <MousePointer2 />
              </Button>
            </div>
          </div>
        </div>
      </Chapter>

      <Chapter number="07" label="UI components">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="border-t border-border pt-4">
            <span className="inline-block bg-primary px-3 py-1 text-[0.65rem] font-bold uppercase text-primary-foreground">
              Premium da casa
            </span>
            <img
              src={pizzas[0].image}
              alt={pizzas[0].imageAlt}
              className="mt-4 aspect-[16/10] w-full object-cover"
            />
            <h3 className="mt-5 font-display text-4xl uppercase">{pizzas[0].name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{pizzas[0].ingredients}</p>
          </article>
          <div className="grid gap-6">
            <div className="border border-border bg-surface p-6">
              <p className="ds-label">Information tag</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {sizes.map(([size, cm]) => (
                  <span
                    key={size}
                    className="rounded-full border border-border px-4 py-2 text-xs font-bold"
                  >
                    {size} • {cm}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-brand-charcoal p-7 text-brand-ivory">
              <p className="text-xs font-bold uppercase text-brand-orange">CTA</p>
              <h3 className="mt-8 font-display text-5xl uppercase">Já escolheu sua Preferitta?</h3>
              <Button variant="brand" size="xl" className="mt-6">
                Ver cardápio <ArrowRight />
              </Button>
            </div>
            <div className="border-l-4 border-primary bg-surface p-6">
              <p className="text-xs font-bold uppercase text-primary">Informação</p>
              <p className="mt-4 font-display text-3xl uppercase">Francisco Beltrão • PR</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Informações curtas, verificadas e fáceis de localizar.
              </p>
            </div>
          </div>
        </div>
      </Chapter>

      <Chapter number="08" label="Photography" inverse>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-12">
          {gallery.slice(0, 4).map((image, index) => (
            <figure
              key={image.src}
              className={`${index === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5"} overflow-hidden`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`${index === 0 ? "aspect-[4/5] md:aspect-auto md:h-full" : "aspect-[4/3]"} w-full object-cover`}
              />
              <figcaption className="mt-3 text-xs font-bold uppercase text-brand-ivory/55">
                {
                  [
                    "Hero / produto inteiro",
                    "Close up / textura",
                    "Produto / vista superior",
                    "Detalhe / ingredientes",
                  ][index]
                }
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-base text-brand-ivory/65">
          Priorizar textura, borda, recheio e gesto. Usar crops consistentes, luz real e contraste
          suficiente. Evitar filtros pesados, saturação artificial e imagens genéricas de banco.
        </p>
      </Chapter>

      <Chapter number="09" label="Iconography">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="ds-title">Lucide / 1,5 px</h3>
            <div className="mt-8 flex flex-wrap gap-8">
              <Instagram size={32} strokeWidth={1.5} />
              <MapPin size={32} strokeWidth={1.5} />
              <ArrowRight size={32} strokeWidth={1.5} />
              <Check size={32} strokeWidth={1.5} />
              <X size={32} strokeWidth={1.5} />
            </div>
          </div>
          <p className="max-w-xl text-lg leading-relaxed">
            Ícones funcionais, lineares e sem ornamento. Tamanhos principais: 16 px em texto, 20 px
            em botões e 32 px em destaques. Nunca substituir a marca por um ícone genérico.
          </p>
        </div>
      </Chapter>

      <Chapter number="10" label="Do / Don't" inverse>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="border-t-4 border-brand-green bg-brand-deep p-7">
            <div className="flex items-center gap-3 text-brand-green">
              <Check />
              <h3 className="font-display text-4xl uppercase">Fazer</h3>
            </div>
            <ul className="mt-8 space-y-4 text-sm text-brand-ivory/70">
              <li>Usar fotografia oficial em grande escala.</li>
              <li>Dar respiro à tipografia e ao produto.</li>
              <li>Respeitar a paleta e manter alto contraste.</li>
              <li>Usar o laranja como gesto de marca.</li>
            </ul>
          </div>
          <div className="border-t-4 border-brand-red bg-brand-deep p-7">
            <div className="flex items-center gap-3 text-brand-red">
              <X />
              <h3 className="font-display text-4xl uppercase">Não fazer</h3>
            </div>
            <ul className="mt-8 space-y-4 text-sm text-brand-ivory/70">
              <li>Distorcer ou reconstruir a logo.</li>
              <li>Adicionar cores sem função.</li>
              <li>Aplicar sombras exageradas ou gradientes genéricos.</li>
              <li>Encher a tela com cartões e informações.</li>
            </ul>
          </div>
        </div>
      </Chapter>

      <Chapter number="11" label="Brand in action">
        <div className="grid gap-5 lg:grid-cols-12">
          <div className="relative min-h-[520px] overflow-hidden bg-brand-charcoal lg:col-span-8">
            <img
              src={gallery[2].src}
              alt={gallery[2].alt}
              className="absolute inset-0 h-full w-full object-cover opacity-65"
            />
            <div className="hero-shade absolute inset-0" />
            <div className="relative flex min-h-[520px] flex-col justify-end p-7 text-brand-ivory md:p-12">
              <p className="text-xs font-bold uppercase text-brand-orange">
                Francisco Beltrão • PR
              </p>
              <h3 className="mt-5 max-w-2xl font-display text-7xl uppercase leading-[0.85]">
                Tem pizza. E tem La Preferitta.
              </h3>
              <Button variant="brand" size="xl" className="mt-7 self-start">
                Ver cardápio
              </Button>
            </div>
          </div>
          <div className="flex min-h-[520px] flex-col bg-brand-charcoal p-6 text-brand-ivory lg:col-span-4">
            <img
              src={gallery[1].src}
              alt={gallery[1].alt}
              className="aspect-square w-full object-cover"
            />
            <p className="mt-6 text-xs font-bold uppercase text-brand-orange">Mobile UI</p>
            <h3 className="mt-3 font-display text-4xl uppercase">Recheio sem timidez.</h3>
            <Button variant="outlineInverse" size="xl" className="mt-auto">
              Conhecer
            </Button>
          </div>
        </div>
      </Chapter>

      <footer className="bg-brand-deep px-5 py-10 text-brand-ivory md:px-10">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <img src={brand.logo} alt="La Preferitta Pizzaria" className="h-16 w-16 object-cover" />
          <p className="text-xs uppercase text-brand-ivory/50">
            Identidade digital baseada nos materiais oficiais fornecidos.
          </p>
          <Link to="/" className="nav-link text-xs font-bold uppercase">
            Ver site <ArrowRight className="ml-2 inline" size={16} />
          </Link>
        </div>
      </footer>
    </main>
  );
}
