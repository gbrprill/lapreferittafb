import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/brand-site";
import { brand, pizzas } from "@/data/brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "La Preferitta Pizzaria | Pizzaria em Francisco Beltrão – PR" },
      {
        name: "description",
        content:
          "Massa artesanal, borda dourada e muito recheio. Peça delivery ou retirada, ou venha ao salão da La Preferitta Pizzaria, Av. Júlio Assis Cavalheiro, 2808, Francisco Beltrão – PR.",
      },
      { property: "og:site_name", content: "La Preferitta Pizzaria" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:type", content: "restaurant.restaurant" },
      { property: "og:title", content: "La Preferitta Pizzaria — Francisco Beltrão" },
      {
        property: "og:description",
        content:
          "Massa artesanal, borda dourada e muito recheio. Delivery, retirada e salão em Francisco Beltrão – PR.",
      },
      { property: "og:url", content: "/" },
      // Use URL absoluta com o domínio definitivo ([DOMÍNIO]) quando o site for publicado.
      { property: "og:image", content: "/images/hero-poster.webp" },
      { property: "og:image:width", content: "1920" },
      { property: "og:image:height", content: "1080" },
      { property: "og:image:alt", content: "Fatia de pizza com queijo derretido da La Preferitta" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#120f0d" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@400..600&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..600;1,6..96,400..600&family=Stint+Ultra+Condensed&display=swap",
      },
      { rel: "preload", as: "image", href: pizzas[0].image, fetchPriority: "high" },
      { rel: "preload", as: "image", href: "/images/hero-poster.webp" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: brand.name,
          description:
            "Pizzaria com massa artesanal, borda dourada e muito recheio. Delivery, retirada e atendimento no salão.",
          image: ["/images/hero-poster.webp", "/images/facade.webp"],
          logo: brand.logo,
          servesCuisine: ["Pizza"],
          hasMenu: brand.menu,
          hasMap: brand.google,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Avenida Júlio Assis Cavalheiro, 2808 – Bairro Industrial",
            addressLocality: "Francisco Beltrão",
            addressRegion: "PR",
            addressCountry: "BR",
          },
          areaServed: { "@type": "City", name: "Francisco Beltrão" },
          sameAs: [brand.instagram],
          potentialAction: {
            "@type": "OrderAction",
            target: brand.menu,
          },
        }),
      },
    ],
  }),
  component: HomePage,
});
