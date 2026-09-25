/**
 * Informações da La Preferitta que podem mudar.
 * Edite aqui: telefone, links, horários, rodízio, vinhos, avaliações, perguntas frequentes e reservas.
 * Nenhum componente repete estes valores.
 */

export const site = {
  name: "La Preferitta Pizzaria",
  /** URL oficial do site (canonical, Open Graph, sitemap). Troque quando houver domínio próprio. */
  url: "https://lapreferittafb.vercel.app",
  address: {
    street: "Avenida Júlio Assis Cavalheiro, 2808",
    district: "Bairro Industrial",
    city: "Francisco Beltrão",
    region: "PR",
    country: "BR",
    lines: ["Av. Júlio Assis Cavalheiro, 2808", "Bairro Industrial", "Francisco Beltrão — PR"],
    full: "Avenida Júlio Assis Cavalheiro, 2808, Bairro Industrial, Francisco Beltrão — PR",
  },
  phone: {
    /** Como aparece para o cliente. */
    display: "(46) 92001-9764",
    /** Formato internacional, só dígitos (tel: e wa.me). */
    international: "5546920019764",
    /** Confirmado pela casa em 25/09/2026: este número atende no WhatsApp. */
    isWhatsApp: true,
  },
  links: {
    /** Cardápio e pedidos (WAbiz). Preços, disponibilidade e carta de vinhos ficam lá. */
    menu: "https://lapreferittafb.wabiz.delivery/",
    instagram: "https://www.instagram.com/lapreferittafb/",
    instagramLabel: "@lapreferittafb",
    /** Perfil da empresa no Google: localização, rotas e avaliações. */
    google: "https://share.google/1w2GtWfZLS5JycqQ1",
    /** Formulário oficial do Google para escrever uma avaliação. */
    writeReview: "https://search.google.com/local/writereview?placeid=ChIJIXyCOgAN8JQRk2YbldDKnGc",
  },
  /** Nota pública no Google. Última conferência: 25/09/2026. Atualize os dois números juntos. */
  reviews: {
    rating: 4.6,
    count: 18,
    checkedAt: "2026-09-25",
  },
  payments: ["Pix", "cartão de crédito", "cartão de débito", "dinheiro"],
  /** Programa de fidelidade: fica escondido até as regras serem confirmadas. */
  loyalty: { enabled: false },
} as const;

export const telHref = `tel:+${site.phone.international}`;

// ---------------------------------------------------------------- horários

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = domingo (Date.getDay)

export type DaySchedule = {
  /** Horário do salão. `null` = fechado. Formato "HH:MM". */
  salon: { opens: string; closes: string } | null;
  /** Rodízio neste dia. Nos dias de rodízio o à la carte também funciona. */
  rodizio: boolean;
};

/**
 * Horários confirmados pela casa em 25/09/2026.
 * Delivery e retirada seguem os mesmos dias e horários do salão.
 * O Google ainda mostra a segunda aberta (18h–22h); o dono vai corrigir lá.
 */
export const schedule: Record<Weekday, DaySchedule> = {
  0: { salon: { opens: "18:00", closes: "22:30" }, rodizio: true },
  1: { salon: null, rodizio: false },
  2: { salon: { opens: "18:00", closes: "22:30" }, rodizio: false },
  3: { salon: { opens: "18:00", closes: "22:30" }, rodizio: false },
  4: { salon: { opens: "18:00", closes: "22:30" }, rodizio: false },
  5: { salon: { opens: "18:00", closes: "23:00" }, rodizio: true },
  6: { salon: { opens: "18:00", closes: "23:00" }, rodizio: true },
};

/** Delivery e retirada: mesmos horários do salão (confirmado). Troque aqui se um dia forem diferentes. */
export const deliverySchedule = schedule;

export const weekdayNames = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
] as const;

/** "18:00" -> "18h", "22:30" -> "22h30" */
export const formatHour = (hhmm: string) => {
  const [h, m] = hhmm.split(":");
  return m === "00" ? `${Number(h)}h` : `${Number(h)}h${m}`;
};

// ---------------------------------------------------------------- tamanhos

export const sizeInfo = [
  { size: "P", diameter: 25, slices: 4, flavors: 1 },
  { size: "M", diameter: 30, slices: 8, flavors: 2 },
  { size: "G", diameter: 35, slices: 12, flavors: 3 },
  { size: "GG", diameter: 40, slices: 16, flavors: 4 },
] as const;

export const flavorsLabel = (n: number) => (n === 1 ? "1 sabor" : `até ${n} sabores`);

// ---------------------------------------------------------------- vinhos

export type Wine = {
  slug: string;
  name: string;
  style: "tinto" | "branco";
  /** Foto da garrafa em /public/images/vinhos. */
  image: string;
  /** Só os destaques têm descrição na página. */
  note?: string;
};

/** Rótulos da carta (a disponibilidade muda; preços ficam no cardápio online). */
export const wines: readonly Wine[] = [
  {
    slug: "oveja-chardonnay",
    name: "Oveja Chardonnay",
    style: "branco",
    image: "/images/vinhos/oveja-chardonnay.webp",
    note: "Branco fresco e expressivo, com notas cítricas, maçã verde e pêssego.",
  },
  {
    slug: "oveja-malbec",
    name: "Oveja Malbec",
    style: "tinto",
    image: "/images/vinhos/oveja-malbec.webp",
    note: "Tinto elegante, com frutas negras maduras, especiarias e toque de chocolate.",
  },
  {
    slug: "dv-catena-malbec",
    name: "DV Catena Malbec",
    style: "tinto",
    image: "/images/vinhos/dv-catena-malbec.webp",
    note: "Complexo e aveludado, elaborado com uvas de vinhedos de altitude em Mendoza.",
  },
  {
    slug: "buenos-hermanos",
    name: "Buenos Hermanos",
    style: "tinto",
    image: "/images/vinhos/buenos-hermanos.webp",
  },
  {
    slug: "alma-negra",
    name: "Alma Negra",
    style: "tinto",
    image: "/images/vinhos/alma-negra.webp",
  },
  {
    slug: "cordero-con-piel-de-lobo",
    name: "Cordero con Piel de Lobo",
    style: "tinto",
    image: "/images/vinhos/cordero-con-piel-de-lobo.webp",
  },
  {
    slug: "dv-catena-cabernet",
    name: "DV Catena Cabernet Sauvignon",
    style: "tinto",
    image: "/images/vinhos/dv-catena-cabernet.webp",
  },
];

// ---------------------------------------------------------------- reservas

/** Regras do painel de reserva. O site só pede disponibilidade; a equipe confirma pelo WhatsApp. */
export const reservationConfig = {
  whatsappNumber: site.phone.international,
  minPeople: 1,
  maxPeople: 12,
  /** Acima disto aparece "consulte nossa equipe". */
  largeGroupThreshold: 10,
  /** Quantos dias à frente o calendário libera. */
  bookingWindowDays: 14,
  /** Antecedência mínima para reservar no mesmo dia. */
  minAdvanceMinutes: 30,
  /** Intervalo entre horários. */
  slotStepMinutes: 60,
  /** Último horário = fechamento menos este valor. */
  lastSlotBeforeCloseMinutes: 60,
} as const;

// ---------------------------------------------------------------- textos derivados

/** Semana começando na segunda, como no calendário brasileiro. */
export const weekOrder: Weekday[] = [1, 2, 3, 4, 5, 6, 0];

const plural = (d: Weekday) => `${weekdayNames[d].replace("-feira", "")}s`;
const joinPt = (items: string[]) =>
  items.length <= 1 ? (items[0] ?? "") : `${items.slice(0, -1).join(", ")} e ${items.at(-1)}`;

export const rodizioDays = weekOrder.filter((d) => schedule[d].rodizio);

/** "sextas, sábados e domingos" */
export const rodizioDaysText = joinPt(rodizioDays.map(plural));

/** "às sextas e aos sábados, das 18h às 23h, e aos domingos, das 18h às 22h30" */
export const rodizioHoursText = (() => {
  const groups: { days: Weekday[]; hours: string }[] = [];
  for (const d of rodizioDays) {
    const s = schedule[d].salon!;
    const hours = `das ${formatHour(s.opens)} às ${formatHour(s.closes)}`;
    const last = groups.at(-1);
    if (last && last.hours === hours) last.days.push(d);
    else groups.push({ days: [d], hours });
  }
  return groups
    .map(
      (g) =>
        `${joinPt(g.days.map((d) => `${d === 0 || d === 6 ? "aos" : "às"} ${plural(d)}`))}, ${g.hours}`,
    )
    .join(", e ");
})();

export const closedDaysText = joinPt(weekOrder.filter((d) => !schedule[d].salon).map(plural));
export const deliveryFollowsSalon = deliverySchedule === schedule;

// ---------------------------------------------------------------- perguntas frequentes

export type Faq = { q: string; a: string; link?: { label: string; href: string } };

const sizesText = sizeInfo
  .map((s) => `${s.size} (${s.diameter} cm, ${s.slices} fatias): ${flavorsLabel(s.flavors)}`)
  .join("; ");

/** Respostas confirmadas pela casa em 25/09/2026. Sem resposta confirmada: "Consulte a equipe". */
export const faq: Faq[] = [
  {
    q: "Quais são os dias do rodízio?",
    a: `O rodízio acontece ${rodizioHoursText}.`,
  },
  {
    q: "É necessário reservar?",
    a: "Não é obrigatório. Se quiser garantir sua mesa, peça uma reserva pelo WhatsApp: escolha a data, o horário e o número de pessoas, e a equipe confirma a disponibilidade.",
  },
  {
    q: "A La Preferitta possui opções à la carte?",
    a: "Sim. O à la carte funciona em todos os dias de funcionamento, inclusive nas noites de rodízio.",
  },
  {
    q: "Há delivery e retirada?",
    a: `Sim. Os pedidos são feitos pelo cardápio online${deliveryFollowsSalon ? ", nos mesmos dias e horários do salão" : ""}.`,
    link: { label: "Abrir o cardápio online", href: site.links.menu },
  },
  { q: "Quantos sabores posso escolher em cada tamanho?", a: `${sizesText}.` },
  {
    q: "A pizzaria possui pizzas doces?",
    a: "Sim. As pizzas doces são uma especialidade da casa, como a Raffaello Supremo e a Uvas e Avelã.",
  },
  {
    q: "Há carta de vinhos?",
    a: `Sim. A carta reúne tintos e brancos, como ${joinPt(wines.map((w) => w.name))}. A disponibilidade e os preços estão no cardápio online.`,
  },
  {
    q: "Quais são as formas de pagamento?",
    a: `${joinPt([...site.payments]).replace(/^./, (c) => c.toUpperCase())}.`,
  },
  {
    q: "Como funciona o programa de fidelidade?",
    a: "Consulte a equipe para confirmar as regras e os benefícios do programa de fidelidade.",
  },
  {
    q: "Onde fica a La Preferitta?",
    a: `${site.address.full}.`,
    link: { label: "Ver no mapa", href: site.links.google },
  },
];
