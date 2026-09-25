---
version: 1
slug: "src-components-brand-site-tsx"
primary_target: "src/components/brand-site.tsx"
related_targets: ["src/routes/index.tsx"]
---

# Home — La Preferitta

Scope: página inicial (`/`), `src/components/brand-site.tsx`. Visitor mode: **Persuade**.

Audience/job: moradores de Francisco Beltrão no celular, decidindo a pizza de hoje à noite. Ações de peso igual: **Pedir agora** (cardápio wabiz) e **Como chegar** (salão). Prova: fotos reais, sabores com ingredientes, tamanhos em cm/fatias, endereço e fachada. Não inventar horários, preços, telefone, avaliações.

## Direction contract

THESIS: A noite de pizza anunciada como o evento da cidade — um cartaz lambe-lambe de baile do sudoeste do Paraná. Recusa o hero escuro com foto + título serifado + botão laranja da categoria.

OWN-WORLD: Papel de cartaz vermelho-tomate (≥⅓ de toda tela), verde-bandeira e papel branco jornal, tinta preta de chave. Tipo de madeira condensado em larguras variadas (Anybody), Clarendon de cartaz (Alfa Slab One) para linhas de apoio, Archivo no texto. Fotos reais como clichês com moldura de papel. Faixa tricolor do logo como fio. Botões são tarjas carimbadas retas, sem raio.

STORY: O visitante vê a pizza real e o nome gigante, entende "farta e caprichada", lê a escalação de sabores como atrações da noite, compara os tamanhos em escala real e escolhe uma das duas portas: em casa ou no salão.

FIRST VIEWPORT: Faixa de data no topo do cartaz ("Sexta à noite · Francisco Beltrão · PR"). "TEM PIZZA." e "LA PREFERITTA" ocupando ~60% da largura em tipo de madeira, clichê da Carne Seca Especial girado à direita, "Muito sabor. Muito recheio." em Clarendon. Pedir agora e Como chegar lado a lado, mesmo tamanho, acima da dobra; no celular, barra fixa inferior com as duas portas.

FORM: Cartaz de Baile (lambe-lambe), candidato 5 de 7 da lista, seed b50cd3f4. Raises: impressão cor a cor (Đông Hồ), uma tinta dominante (mesa de corte), dia da semana real (luz do dia), cada sabor com âncora própria (HyperCard).

Signature interaction: passadas de impressão — ao entrar cada cartaz, vermelho, verde e preto registram em sequência a partir de um leve desalinhamento.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Revisão 2026-09-23

Mudanças pedidas pela usuária depois do primeiro build. Onde divergem do contrato acima, valem estas.

- **Tipo:** saem Anybody e Alfa Slab One. Títulos em Bodoni Moda (`--font-didone`; `.font-didone`, `.section-title`, `.hero-title`), com o "e tem" do hero em itálico `--tomato-light`. Rótulos, navegação, botões e endereços em Stint Ultra Condensed (`--font-label`), caixa alta, espacejamento .06–.14em, escolhida por lembrar o letreiro do logo. Texto corrido continua em Archivo 400–600.
- **Cor:** bem menos vermelho, pizzaria chique. Hero, cabeçalho, ficha da atração principal, seção das portas e rodapé são tinta (`--ink`); seções claras são papel jornal; a de tamanhos é verde-bandeira. O vermelho fica só no vinho `--tomato-deep` do cartão "Em casa", no acento `--tomato-light` e na faixa tricolor. A regra "tomate ≥ ⅓ de toda tela" está **revogada**, e com ela a recusa do hero escuro com título serifado: o hero agora é tinta com título em Didone e foto emoldurada (nunca sangrada).
- **Hero animado:** linhas do título sobem de máscaras; fotos reais se revezam no clichê a cada ~5.2s com fusão e aproximação lenta, legenda e pontos de controle. Suporta vídeo opcional (`heroVideo` em `src/data/brand.ts`).
- **Hovers:** longos e suaves (`--ease-out` `cubic-bezier(.22,1,.36,1)`, 600–1600ms) e simétricos na saída: preenchimento circular nas tarjas, rótulos que rolam (`.roll`), sublinhado que desenha da esquerda e recolhe para a direita, cortina nos chips do cabeçalho, zoom lento nas fotos, lambes do mural que se endireitam e revelam "Ver no Instagram".
- **Rolagem de âncora:** JS com `easeOutQuint`, 700–1600ms, descontando o cabeçalho fixo (`src/lib/smooth-scroll.ts`).
- **Removidos:** passada fora de registro (text-shadow) nos títulos; botões "Copiar link"; grão na seção das portas (tinta lisa). A assinatura de passadas de impressão vira uma entrada simples (18px, sem desalinhamento lateral).
- **Logo:** versão sem fundo (`public/images/logo-mono.webp`) no cabeçalho e no rodapé.
