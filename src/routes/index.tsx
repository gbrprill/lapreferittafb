import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/brand-site";
import { cardapio, heroSlides, menuImage } from "@/data/brand";
import { schedule, site, weekOrder, type Weekday } from "@/data/site";

const title = "La Preferitta Pizzaria | Rodízio, à la carte e delivery em Francisco Beltrão";
const description =
  "La Preferitta Pizzaria em Francisco Beltrão: rodízio, à la carte, delivery, pizzas salgadas e doces, salão e carta de vinhos. Conheça o cardápio e reserve sua mesa.";
const abs = (path: string) => new URL(path, site.url).href;
const ogImage = abs("/images/og-image.jpg");

const schemaDays: Record<Weekday, string> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

/** Only confirmed facts, and only what the page also shows. */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${abs("/")}#restaurante`,
  name: site.name,
  url: abs("/"),
  description,
  image: [ogImage, abs("/images/local.webp")],
  logo: abs("/images/logo.webp"),
  telephone: `+${site.phone.international}`,
  servesCuisine: ["Pizza"],
  acceptsReservations: true,
  paymentAccepted: site.payments.join(", "),
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.street} – ${site.address.district}`,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  hasMap: site.links.google,
  sameAs: [site.links.instagram],
  openingHoursSpecification: weekOrder
    .filter((day) => schedule[day].salon)
    .map((day) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${schemaDays[day]}`,
      opens: schedule[day].salon!.opens,
      closes: schedule[day].salon!.closes,
    })),
  hasMenu: {
    "@type": "Menu",
    url: site.links.menu,
    hasMenuSection: [
      { kind: "salgada", name: "Pizzas salgadas" },
      { kind: "doce", name: "Pizzas doces" },
    ].map((section) => ({
      "@type": "MenuSection",
      name: section.name,
      hasMenuItem: cardapio
        .filter((item) => item.kind === section.kind)
        .map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          description: item.ingredients,
          image: abs(menuImage(item.slug)),
        })),
    })),
  },
  potentialAction: { "@type": "OrderAction", target: site.links.menu },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:site_name", content: site.name },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: abs("/") },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Fachada da La Preferitta Pizzaria à noite, com o letreiro iluminado",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
      { name: "theme-color", content: "#120f0d" },
    ],
    links: [
      { rel: "canonical", href: abs("/") },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@400..600&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..600;1,6..96,400..600&family=Stint+Ultra+Condensed&display=swap",
      },
      { rel: "preload", as: "image", href: heroSlides[0].src, fetchPriority: "high" },
      { rel: "preload", as: "image", href: "/images/hero-poster.webp" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(structuredData) }],
  }),
  component: HomePage,
});
