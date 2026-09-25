// Fotos reais enviadas pela pizzaria (sem imagens geradas por IA).
const logo = "/images/logo.webp";
const logoMono = "/images/logo-mono.webp";
const facade = "/images/facade.webp";
const pizzaDoceMorango = "/images/pizza-doce-morango.webp";
const pizzaTomateManjericao = "/images/pizza-tomate-manjericao.webp";
const pizzaBaconPaddle = "/images/pizza-bacon-paddle.webp";
const pizza1 = { url: "/images/pizza1.webp" };
const pizza2 = { url: "/images/pizza2.webp" };
const pizza3 = { url: "/images/pizza3.webp" };
const pizza4 = { url: "/images/pizza4.webp" };

export const brand = {
  name: "La Preferitta Pizzaria",
  city: "Francisco Beltrão — Paraná",
  instagram: "https://www.instagram.com/lapreferittafb",
  instagramLabel: "@lapreferittafb",
  menu: "https://lapreferittafb.wabiz.delivery/",
  google: "https://share.google/zdNL5OHfrXSkkcTDO",
  address: "Avenida Júlio Assis Cavalheiro, 2808, Bairro Industrial, Francisco Beltrão — PR",
  logo,
  logoMono,
  local: facade,
  addressLines: ["Av. Júlio Assis Cavalheiro, 2808", "Bairro Industrial", "Francisco Beltrão — PR"],
  // Placeholders: preencha com a informação real. Enquanto começarem com "[", o site não os mostra.
  hours: "[HORÁRIO]",
  whatsapp: "[WHATSAPP]",
} as const;

/** True once a placeholder like "[HORÁRIO]" has been replaced with real information. */
export const isFilled = (value: string) => !value.startsWith("[");

// Escalação da noite. `toppings` são os ingredientes confirmados; `base` o que vai por baixo.
// O Filé do Chef ainda não tem foto oficial — aparece só com tipografia, nunca com foto de outro sabor.
export const pizzas = [
  {
    slug: "carne-seca",
    name: "Carne Seca Especial",
    base: "molho de tomate e muçarela",
    toppings: ["carne seca", "requeijão cremoso", "parmesão", "pimenta biquinho", "cebolinha"],
    ingredients:
      "Molho de tomate, muçarela, carne seca, requeijão cremoso, parmesão, pimenta biquinho e cebolinha.",
    image: pizza3.url,
    imageAlt:
      "Pizza Carne Seca Especial inteira, com cobertura generosa, na tábua da La Preferitta",
    width: 382,
    height: 510,
    price: "[PREÇO]",
  },
  {
    slug: "file-do-chef",
    name: "Filé do Chef",
    base: "molho de tomate, mussarela e orégano",
    toppings: ["filé mignon", "bacon ao molho branco com gorgonzola"],
    ingredients:
      "Molho de tomate, filé mignon, bacon ao molho branco com gorgonzola, mussarela e orégano.",
    price: "[PREÇO]",
  },
  {
    slug: "doce-da-casa",
    name: "Doce da casa",
    base: "para fechar a noite",
    toppings: ["morangos", "doces", "chocolate"],
    ingredients: "Morangos, doces e chocolate — para fechar a noite.",
    image: pizzaDoceMorango,
    imageAlt: "Pizza doce da La Preferitta com morangos, doces e chocolate",
    width: 1024,
    height: 737,
    price: "[PREÇO]",
  },
] as const;

export const gallery = [
  { src: pizzaDoceMorango, alt: "Pizza doce inteira com morangos, doces e chocolate" },
  { src: pizza2.url, alt: "Fatia doce com morangos e coco saindo da caixa da La Preferitta" },
  {
    src: pizzaBaconPaddle,
    alt: "Pizza de bacon e queijo servida na tábua com a marca La Preferitta",
  },
  { src: pizza4.url, alt: "Pizza doce com uvas verdes e chocolate" },
  { src: facade, alt: "Fachada iluminada da La Preferitta Pizzaria à noite" },
] as const;

// Mural: 7 fotos reais, todas diferentes. O carrossel duplica a lista só para o loop visual.
export const mural = [
  {
    src: pizzaTomateManjericao,
    alt: "Pizza com tomate, manjericão e queijos gratinados",
    width: 341,
    height: 512,
  },
  {
    src: pizza2.url,
    alt: "Fatia doce com morangos e coco saindo da caixa da La Preferitta",
    width: 382,
    height: 510,
  },
  {
    src: pizzaBaconPaddle,
    alt: "Pizza de bacon e queijo na tábua com a marca La Preferitta",
    width: 384,
    height: 512,
  },
  { src: pizza4.url, alt: "Pizza doce com uvas verdes e chocolate", width: 680, height: 424 },
  { src: pizza1.url, alt: "Pizza doce inteira vista de cima", width: 668, height: 480 },
  {
    src: pizza3.url,
    alt: "Pizza Carne Seca Especial na tábua da La Preferitta",
    width: 382,
    height: 510,
  },
  {
    src: pizzaDoceMorango,
    alt: "Pizza doce com morangos, doces e chocolate",
    width: 1024,
    height: 737,
  },
] as const;

// Hero: vídeo em tela cheia ao fundo (null desliga) e fotos reais que se revezam no quadro.
export const heroVideo: { src: string; poster: string } | null = {
  src: "/videos/hero.mp4",
  poster: "/images/hero-poster.webp",
};

export const heroSlides = [
  {
    src: pizza3.url,
    alt: "Pizza Carne Seca Especial inteira na tábua da La Preferitta",
    caption: "Carne Seca Especial",
  },
  {
    src: pizzaBaconPaddle,
    alt: "Pizza de bacon e queijo servida na tábua com a marca La Preferitta",
    caption: "Direto do forno",
  },
  {
    src: pizzaTomateManjericao,
    alt: "Pizza com tomate, manjericão e queijos gratinados",
    caption: "Salgadas da casa",
  },
  {
    src: pizzaDoceMorango,
    alt: "Pizza doce com morangos, doces e chocolate",
    caption: "Doce da casa",
  },
] as const;

export const sizes = [
  ["P", "25 cm", "4 fatias"],
  ["M", "30 cm", "8 fatias"],
  ["G", "35 cm", "12 fatias"],
  ["GG", "40 cm", "16 fatias"],
] as const;

export const palette = [
  {
    token: "Primary",
    hex: "#CA7034",
    rgb: "202, 112, 52",
    use: "Chamadas principais, detalhes e destaques da marca.",
    avoid: "Grandes fundos atrás de textos longos.",
  },
  {
    token: "Primary Dark",
    hex: "#A65A3A",
    rgb: "166, 90, 58",
    use: "Estados ativos e detalhes de contraste.",
    avoid: "Texto pequeno sobre o grafite.",
  },
  {
    token: "Primary Light",
    hex: "#E6AD82",
    rgb: "230, 173, 130",
    use: "Fundos suaves e detalhes editoriais.",
    avoid: "Botão principal sobre fundo claro.",
  },
  {
    token: "Secondary",
    hex: "#3D3C3A",
    rgb: "61, 60, 58",
    use: "Fundo inverso, cabeçalhos e base da identidade.",
    avoid: "Áreas longas sem fotografia ou respiro.",
  },
  {
    token: "Secondary Dark",
    hex: "#242321",
    rgb: "36, 35, 33",
    use: "Rodapé e contraste máximo.",
    avoid: "Bordas ou divisórias delicadas.",
  },
  {
    token: "Secondary Light",
    hex: "#625F5A",
    rgb: "98, 95, 90",
    use: "Textos secundários em fundos escuros.",
    avoid: "Texto sobre fundo claro.",
  },
  {
    token: "Accent Green",
    hex: "#5F7430",
    rgb: "95, 116, 48",
    use: "Acento mínimo inspirado na faixa italiana da logo.",
    avoid: "Grandes áreas ou CTA principal.",
  },
  {
    token: "Accent Red",
    hex: "#C83D46",
    rgb: "200, 61, 70",
    use: "Acento mínimo inspirado na faixa italiana da logo.",
    avoid: "Competir visualmente com o laranja.",
  },
  {
    token: "Background",
    hex: "#F4F0E8",
    rgb: "244, 240, 232",
    use: "Fundo editorial principal.",
    avoid: "Sobrepor diretamente às fotos.",
  },
  {
    token: "Surface",
    hex: "#FFFDF8",
    rgb: "255, 253, 248",
    use: "Superfícies claras e áreas de leitura.",
    avoid: "Criar cartões em todas as seções.",
  },
  {
    token: "Text",
    hex: "#242321",
    rgb: "36, 35, 33",
    use: "Texto principal em superfícies claras.",
    avoid: "Texto sobre imagens escuras.",
  },
  {
    token: "Muted",
    hex: "#736F68",
    rgb: "115, 111, 104",
    use: "Legenda, apoio e metadados.",
    avoid: "Informações essenciais pequenas.",
  },
] as const;

// Cardápio da casa: 10 sabores com a foto real de cada um sobre a tábua (recortada no aro de madeira).
// `price` fica como placeholder até a casa informar; o site não mostra valores entre colchetes.
export type MenuItem = {
  slug: string;
  name: string;
  kind: "salgada" | "doce";
  ingredients: string;
  price: string;
};

export const cardapio: readonly MenuItem[] = [
  {
    slug: "americana",
    name: "Americana",
    kind: "salgada",
    ingredients: "Molho de tomate, mussarela, calabresa, bacon, catupiry e orégano.",
    price: "[PREÇO]",
  },
  {
    slug: "calabresa-caramell",
    name: "Calabresa Caramell",
    kind: "salgada",
    ingredients: "Molho de tomate, calabresa, queijo coalho e cebola caramelizada.",
    price: "[PREÇO]",
  },
  {
    slug: "carne-seca-especial",
    name: "Carne Seca Especial",
    kind: "salgada",
    ingredients:
      "Molho de tomate, muçarela, carne seca, requeijão cremoso, parmesão, pimenta biquinho e cebolinha.",
    price: "[PREÇO]",
  },
  {
    slug: "costela-com-barbecue",
    name: "Costela com Barbecue",
    kind: "salgada",
    ingredients:
      "Molho de tomate, mussarela, costela bovina desfiada, requeijão cremoso e barbecue.",
    price: "[PREÇO]",
  },
  {
    slug: "file-americano",
    name: "Filé Americano",
    kind: "salgada",
    ingredients: "Molho de tomate, filé mignon, mussarela, cheddar e orégano.",
    price: "[PREÇO]",
  },
  {
    slug: "file-com-gorgonzola",
    name: "Filé com Gorgonzola",
    kind: "salgada",
    ingredients: "Molho de tomate, filé mignon, mussarela, gorgonzola e orégano.",
    price: "[PREÇO]",
  },
  {
    slug: "mignon-crispy",
    name: "Mignon Crispy",
    kind: "salgada",
    ingredients: "Molho de tomate, filé mignon, requeijão, mussarela e cebola crispy.",
    price: "[PREÇO]",
  },
  {
    slug: "temaki",
    name: "Temaki",
    kind: "salgada",
    ingredients: "Molho branco, cream cheese, salmão grelhado, molho tarê e cebolinha.",
    price: "[PREÇO]",
  },
  {
    slug: "raffaello-supremo",
    name: "Raffaello Supremo",
    kind: "doce",
    ingredients: "Molho branco, chocolate branco, coco ralado, Raffaello e morangos.",
    price: "[PREÇO]",
  },
  {
    slug: "uvas-e-avela",
    name: "Uvas e Avelã",
    kind: "doce",
    ingredients: "Molho branco, chocolate branco, uvas sem sementes e creme de avelã.",
    price: "[PREÇO]",
  },
];

export const menuImage = (slug: string, size: "lg" | "sm" = "lg") =>
  `/images/menu/${slug}${size === "sm" ? "-sm" : ""}.webp`;

/** "A, b, c e d." -> ["A", "b", "c", "d"] */
export const splitIngredients = (text: string) => text.replace(/\.$/, "").split(/, | e (?=[^,]+$)/);
