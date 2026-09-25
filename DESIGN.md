---
name: La Preferitta Pizzaria
description: A noite de pizza anunciada como cartaz de gala — tinta preta, papel jornal, verde-bandeira e um vinho discreto.
colors:
  flag: "oklch(0.42 0.085 152)"
  flag-deep: "oklch(0.33 0.07 152)"
  tomato-deep: "oklch(0.38 0.115 22)"
  tomato-light: "oklch(0.78 0.09 40)"
  tomato: "oklch(0.5 0.155 25)"
  ink: "oklch(0.17 0.006 50)"
  newsprint: "oklch(0.965 0.01 85)"
typography:
  display:
    fontFamily: "Bodoni Moda, Didot, serif"
    fontSize: "clamp(3.4rem, 8.2vw, 7.5rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.012em"
  display-lead:
    fontFamily: "Bodoni Moda, Didot, serif"
    fontSize: "clamp(3.1rem, 7vw, 6.5rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.012em"
  connective:
    fontFamily: "Bodoni Moda, Didot, serif"
    fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.012em"
  headline:
    fontFamily: "Bodoni Moda, Didot, serif"
    fontSize: "clamp(2.6rem, 5.6vw, 5.25rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  title-door:
    fontFamily: "Bodoni Moda, Didot, serif"
    fontSize: "clamp(3rem, 6vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.005em"
  title-feature:
    fontFamily: "Bodoni Moda, Didot, serif"
    fontSize: "clamp(2.6rem, 5vw, 4.5rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Bodoni Moda, Didot, serif"
    fontSize: "3rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.005em"
  caption:
    fontFamily: "Bodoni Moda, Didot, serif"
    fontSize: "1.2rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.005em"
  label:
    fontFamily: "Stint Ultra Condensed, Arial Narrow, sans-serif"
    fontSize: "1.55rem"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "0.06em"
  label-door:
    fontFamily: "Stint Ultra Condensed, Arial Narrow, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.06em"
  label-nav:
    fontFamily: "Stint Ultra Condensed, Arial Narrow, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.08em"
  label-chip:
    fontFamily: "Stint Ultra Condensed, Arial Narrow, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.07em"
  label-stamp:
    fontFamily: "Stint Ultra Condensed, Arial Narrow, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.14em"
  body:
    fontFamily: "Archivo, Helvetica Neue, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  note:
    fontFamily: "Archivo, Helvetica Neue, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "normal"
rounded:
  none: "0px"
  full: "999px"
spacing:
  gutter: "16px"
  gutter-md: "32px"
  section: "64px"
  section-md: "96px"
  plate: "24px"
  plate-md: "40px"
  plate-lg: "56px"
  container: "1536px"
components:
  tarja-paper:
    backgroundColor: "{colors.newsprint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.7rem 1rem 0.7rem 1.1rem"
    height: "4.25rem"
  tarja-paper-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.newsprint}"
  tarja-flag:
    backgroundColor: "{colors.flag}"
    textColor: "{colors.newsprint}"
    rounded: "{rounded.none}"
    padding: "0.7rem 1rem 0.7rem 1.1rem"
    height: "4.25rem"
  tarja-flag-hover:
    backgroundColor: "{colors.newsprint}"
    textColor: "{colors.flag-deep}"
  tarja-line:
    backgroundColor: "transparent"
    textColor: "{colors.newsprint}"
    rounded: "{rounded.none}"
    padding: "0.7rem 1rem 0.7rem 1.1rem"
    height: "4.25rem"
  tarja-line-hover:
    backgroundColor: "{colors.newsprint}"
    textColor: "{colors.ink}"
  chip-solid:
    backgroundColor: "{colors.newsprint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 1rem"
    height: "2.5rem"
  chip-solid-hover:
    backgroundColor: "{colors.flag}"
    textColor: "{colors.newsprint}"
  chip-line:
    backgroundColor: "transparent"
    textColor: "{colors.newsprint}"
    rounded: "{rounded.none}"
    padding: "0 1rem"
    height: "2.5rem"
  chip-line-hover:
    backgroundColor: "{colors.newsprint}"
    textColor: "{colors.ink}"
  door-paper:
    backgroundColor: "{colors.newsprint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "3.75rem"
  door-flag:
    backgroundColor: "{colors.flag}"
    textColor: "{colors.newsprint}"
    rounded: "{rounded.none}"
    height: "3.75rem"
  frame:
    backgroundColor: "{colors.newsprint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.65rem 0.65rem 0"
  headliner-card:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.newsprint}"
    rounded: "{rounded.none}"
    padding: "{spacing.plate}"
  act-card:
    backgroundColor: "{colors.newsprint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.plate}"
  door-card-home:
    backgroundColor: "{colors.tomato-deep}"
    textColor: "{colors.newsprint}"
    rounded: "{rounded.none}"
    padding: "{spacing.plate}"
  door-card-salon:
    backgroundColor: "{colors.flag}"
    textColor: "{colors.newsprint}"
    rounded: "{rounded.none}"
    padding: "{spacing.plate}"
  size-disc-letter:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.newsprint}"
    rounded: "{rounded.full}"
---

# Design System: La Preferitta Pizzaria

## Overview

**Creative North Star: "O Cartaz de Gala"**

A home da La Preferitta continua sendo um cartaz de baile do sudoeste do Paraná, mas agora de traje escuro: uma pizzaria chique. A parede é de tinta preta (`ink`) e nela ficam o cabeçalho, o hero, a ficha da atração principal, a seção das portas e o rodapé. Entre essas paredes correm folhas de papel jornal (`newsprint`) com grão impresso e uma folha verde-bandeira (`flag`) para os tamanhos. O vermelho deixou de ser o papel: sobra um vinho (`tomato-deep`) no cartão "Em casa", um tomate claro (`tomato-light`) como acento pequeno e o terço vermelho da faixa tricolor.

Os títulos são de uma Didone de alto contraste (Bodoni Moda), em caixa baixa e com itálico de acento; rótulos, navegação, botões e endereços usam uma grotesca ultracondensada em caixa alta e espacejada (Stint Ultra Condensed), escolhida pela usuária por lembrar o letreiro do logo. O Archivo fica quieto no texto corrido. Fotos reais entram como clichês com moldura de papel, levemente tortas, como se coladas à mão.

O movimento é longo, suave e simétrico: tudo desacelera numa curva única (`--ease-out`), entre 600 e 1600ms, e volta pelo mesmo caminho quando o cursor sai. O hero se anima ao carregar (linhas sobem de máscaras, fotos se revezam no quadro com aproximação lenta), e os links de âncora rolam a página com a mesma desaceleração. Este sistema substitui a identidade anterior (laranja/grafite, Fraunces/Manrope, sombras suaves); os tokens dela continuam em `src/styles.css` só para a rota legada `/design-system`.

**Key Characteristics:**
- Parede de tinta preta, folhas de papel jornal e uma folha verde; vermelho só como vinho, acento claro e fio tricolor.
- Didone (Bodoni Moda 500) para todo título; itálico em `tomato-light` como acento ("e tem").
- Grotesca ultracondensada (Stint Ultra Condensed) em caixa alta espacejada para rótulos, navegação, botões e endereços.
- Cantos vivos em tudo; os únicos círculos são pizzas, anéis de ícone, selos de letra e pontos do quadro.
- Movimento longo e simétrico numa curva só, 600–1600ms.
- Duas portas de peso igual, sempre juntas: Pedir agora e Como chegar.

## Colors

Uma parede de tinta, dois papéis e um vinho, todos em OKLCH (a fonte normativa do projeto), sem cinzas: tons secundários saem da opacidade do branco jornal ou da tinta.

### Primary
- **Verde-Bandeira** (`flag`, ≈ #225a35): o único papel colorido de área grande. Fundo da seção de tamanhos, do cartão "No salão", da placa tipográfica do Filé do Chef, da tarja e da porta móvel "Como chegar", e o preenchimento que sobe no chip "Pedir agora" no hover. Também é a cor de seleção de texto.
- **Verde Fundo** (`flag-deep`, ≈ #133f23): texto da tarja verde depois que o círculo de papel a preenche.

### Secondary
- **Vinho** (`tomato-deep`, ≈ #732125): só o cartão "Em casa" na seção das portas. É o único campo vermelho da página.
- **Tomate Claro** (`tomato-light`, ≈ #eaa48c): acento pequeno sobre tinta. O itálico "e tem" do hero, o hover dos links de navegação (cabeçalho, rodapé e menu móvel) e o sobretítulo da atração principal.
- **Tomate** (`tomato`, ≈ #aa3333): só o terço vermelho da faixa tricolor.

### Neutral
- **Tinta de Chave** (`ink`, ≈ #120f0d): a parede. Cabeçalho, hero, ficha da atração principal, seção das portas, rodapé, barra móvel, fundo do `html`; também texto sobre papel jornal, borda dos cartões de sabor (a 80%) e o preenchimento que cresce nas tarjas de papel. O `theme-color` do navegador é essa tinta (`#1a1714`).
- **Branco Jornal** (`newsprint`, ≈ #f6f3ec): papel das seções de sabores e mural, moldura dos clichês, texto sobre tinta, verde e vinho. Texto secundário usa o próprio branco com opacidade (60–85%) e fios a 12%.

### Named Rules
**The Parede Preta Rule.** A tinta é a cor dominante: hero, cabeçalho, ficha da atração principal, portas e rodapé são tinta chapada. As seções claras são papel jornal e só a de tamanhos é verde. Não há mais cota mínima de vermelho; a antiga regra do "terço tomate" está revogada.

**The Vinho Raro Rule.** O vermelho aparece em três lugares e só neles: o vinho do cartão "Em casa", o tomate claro como acento de texto pequeno sobre tinta, e o terço vermelho da faixa tricolor. Nunca como fundo de seção, botão ou título.

**The Duas Portas Rule.** "Pedir agora" e "Como chegar" aparecem juntas e do mesmo tamanho no cabeçalho, no hero, na seção das portas e na barra móvel. "Pedir agora" leva o tom mais claro ou sólido (papel), "Como chegar" leva o verde, ou o contorno quando o fundo já é verde ou o espaço é o cabeçalho.

**The Tinta Sem Cinza Rule.** Não há cinzas no sistema. Hierarquia de texto se faz com tamanho, face e opacidade do branco jornal (`/60`–`/85`) ou da tinta (`/70`–`/80`).

### Legado (descontinuado)
`--brand-orange`, `--primary-dark`, `--brand-orange-light`, `--brand-charcoal`, `--brand-deep`, `--brand-gray`, `--brand-green`, `--brand-red`, `--brand-ivory`, `--surface`, as variáveis shadcn (`--background`, `--primary`, `--card`, `--radius` etc.), as fontes `--font-display` / `--font-serif-label` (Fraunces) e `--font-sans` (Manrope), as utilidades `hero-shade`, `btn-liquid`, `image-zoom` e `nav-link` de `@utility`, e as sombras `--shadow-brand*`, `--shadow-subtle`, `--shadow-header` pertencem à identidade anterior. Sobrevivem só para a rota `/design-system` e não devem ser usadas em superfícies novas.

## Typography

**Display Font:** Bodoni Moda, Didone com tamanho óptico (6–96) e peso 400–600, redonda e itálica (com Didot) — token `--font-didone`
**Label Font:** Stint Ultra Condensed 400 (com Arial Narrow) — token `--font-label`
**Body Font:** Archivo 400–600 (com Helvetica Neue) — token `--font-body`

**Character:** Uma Didone de gala faz os nomes em caixa baixa, com o contraste de haste fina e grossa que um menu de restaurante chique pede; a condensada em caixa alta espacejada faz a voz de letreiro, a mesma do logo; o Archivo só serve frases de serviço.

### Hierarchy
- **Display** (Bodoni Moda 500, clamp 3.4–7.5rem, 1, -0.012em): "La Preferitta", a terceira linha do hero e a maior.
- **Display lead** (500, clamp 3.1–6.5rem, 1): "Tem pizza.", a primeira linha do hero.
- **Connective** (500 itálico, clamp 1.8–2.8rem, em `tomato-light`): o "e tem" entre as duas linhas do hero. É o único itálico de título.
- **Headline** (500, clamp 2.6–5.25rem, 1.02, -0.01em, `text-wrap: balance`): títulos de seção (`.section-title`), em caixa de frase.
- **Title door** (500, clamp 3–5.5rem, 1): "Em casa" e "No salão".
- **Title feature** (500, clamp 2.6–4.5rem, 1.02): nome da atração principal; a placa tipográfica usa a mesma voz (clamp 2.8–4.2rem).
- **Title** (500, 2.25rem no celular, 3rem a partir de 768px, 1.25): nomes dos demais sabores e o nome no rodapé.
- **Caption** (500 itálico, 1.2rem): legenda da foto no quadro do hero.
- **Label** (Stint 400, 1.55rem, 1.05, 0.06em, caixa alta): rótulo das tarjas. Compacto no celular em 1.3rem.
- **Label door** (1.3rem, 0.06em, caixa alta): portas da barra móvel.
- **Label nav** (1.2rem, 0.08em, caixa alta): links do cabeçalho e do rodapé.
- **Label chip** (1.15rem, 0.07em, caixa alta): chips do cabeçalho; o aviso "Ver no Instagram" do mural usa 1.1rem, 0.08em.
- **Label stamp** (0.95rem, 0.14em, caixa alta, branco a 70%): faixa de data do hero. O mesmo espacejamento largo vale para o sobretítulo da atração principal.
- **Linhas de apoio em label** (1.25–1.7rem, 0.05–0.12em): "Muito sabor. Muito recheio.", endereço do salão (caixa alta), cm e fatias dos tamanhos, @ do Instagram e endereço do rodapé (esses dois sem caixa alta).
- **Body** (Archivo 400, 1–1.125rem, 1.625): texto corrido curto, 34–60ch.
- **Note** (Archivo 500, 0.82rem, 80%): segunda linha das tarjas dizendo para onde a ação leva.

### Named Rules
**The Didone Só Titula Rule.** Bodoni Moda faz nomes e títulos, sempre em peso 500, caixa de frase e entrelinha 1–1.25. Nunca em rótulo, botão ou texto corrido; nunca em caixa alta.

**The Letreiro Rule.** Tudo que é ação, navegação, rótulo, dado ou endereço fala em Stint Ultra Condensed, em caixa alta com espacejamento entre 0.06em e 0.14em. Quanto menor o corpo, maior o espacejamento.

**The Um Itálico Rule.** O itálico em `tomato-light` é o acento do hero ("e tem"); a legenda do quadro é o único outro itálico. Não espalhar itálicos coloridos como enfeite.

## Layout

Folhas de largura total empilhadas sobre um contêiner de conteúdo de até 1536px (`max-w-screen-2xl`), com calha de 16px no celular e 32px a partir de 768px. O ritmo vertical das folhas é 64px no celular e 96px a partir de 768px.

O hero é tinta e usa grade de 12 colunas: título e ações em 7, quadro de fotos girado em 5, preenchendo a primeira dobra a partir de 1024px (`100svh` menos 7.5rem). No topo corre a faixa de data como a data de um cartaz: o dia da semana real, a cidade e "Salgadas & doces", separada do resto por um fio de branco a 12%; nunca uma promessa de horário.

A seção de sabores é papel jornal: a atração principal numa ficha de tinta de largura total (foto 5/12, texto 7/12), e os demais sabores em duas colunas com borda de tinta a 80%. Os tamanhos são desenhados em escala real sobre o verde: o diâmetro de cada disco é proporcional aos cm (25, 30, 35, 40) e as linhas de corte vêm do número de fatias; quatro colunas no desktop, duas no celular. O mural é uma parede de 2 colunas (3 a partir de 768px) com fotos 4:5 inclinadas entre −1.2° e 1.3°. As portas ficam sobre tinta chapada: dois cartões lado a lado separados por 1px, vinho ("Em casa") e verde ("No salão"), com respiro interno de 24/40/56px.

No celular, abaixo de 768px, uma barra fixa inferior com as duas portas aparece quando o hero sai da tela. Pontos de quebra: 640px, 768px, 1024px (padrão Tailwind).

## Elevation & Depth

O sistema é chapado: a profundidade vem do papel, não da luz. As folhas claras e verdes, o cartão vinho e o cartão verde recebem grão de papel impresso (ruído fractal a 12% em `multiply`); a tinta (hero, cabeçalho, ficha, seção das portas, rodapé) é lisa, sem grão. Em repouso, só projeta sombra o que está fisicamente colado: o quadro do hero, a foto da fachada, as fotos do mural e os discos de tamanho. Tarjas e cartões de sabor ganham sombra apenas quando sobem no hover. As sombras são longas, difusas, negativas no espalhamento e em preto neutro, nunca coloridas.

### Shadow Vocabulary
- **Quadro colado** (`box-shadow: 0 30px 60px -24px oklch(0 0 0 / .7), 0 2px 6px oklch(0 0 0 / .35)`): o quadro de fotos do hero.
- **Clichê simples** (`box-shadow: 0 16px 34px -14px oklch(0 0 0 / .6)`): foto da fachada com borda de papel de 0.45rem.
- **Lambe** (`box-shadow: 0 10px 22px -14px oklch(0 0 0 / .5)`, no hover `0 28px 44px -24px oklch(0 0 0 / .55)`): fotos do mural.
- **Disco** (`box-shadow: 0 16px 30px -14px oklch(0 0 0 / .55)`, no hover `0 24px 40px -16px oklch(0 0 0 / .6)`): pizzas desenhadas em escala.
- **Tarja erguida** (`box-shadow: 0 18px 32px -18px oklch(0 0 0 / .55)`): só no hover, com a tarja 2px acima.
- **Cartão erguido** (`box-shadow: 0 24px 40px -28px oklch(0.17 0.006 50 / .55)`): só no hover do cartão de sabor, 4px acima.

### Named Rules
**The Papel Colado Rule.** Em repouso só projeta sombra o que foi colado por cima (quadro, foto, disco). Tarjas e cartões são impressos no papel e ficam chapados até o hover erguê-los.

**The Tinta Lisa Rule.** A tinta nunca leva grão; o grão é do papel (jornal, verde e o vinho do "Em casa").

## Shapes

Cantos vivos (0px) em tudo o que é papel ou carimbo: folhas, tarjas, chips, cartões, fotos, barra móvel. Os únicos círculos (999px / 50%) são objetos redondos de verdade ou selos: as pizzas em escala, o anel do ícone nas tarjas, o selo de letra (P, M, G, GG) e os pontos do quadro do hero (o ativo se estica em pílula). Bordas são finas e sólidas: 1px nas tarjas, chips e cartões de sabor; molduras de papel de 0.4–0.65rem nas fotos; aro cor de massa de 4–8px nos discos. O quadro do hero gira 1.4°, a fachada −1.5° e as fotos do mural entre −1.2° e 1.3°, como coladas à mão; no hover todas se endireitam. A faixa tricolor (verde, branco, vermelho em terços iguais, 3px) fecha o cabeçalho e abre o rodapé.

## Components

### Buttons (Tarjas)
Carimbo reto de ação: um toque, uma porta.
- **Shape:** retângulo de cantos vivos (0px), borda de 1px, altura mínima 4.25rem (3.75rem na versão compacta do celular).
- **Estrutura:** anel de ícone circular de 2.25rem à esquerda, rótulo em Stint caixa alta (1.55rem, 0.06em), nota em Archivo 500 (0.82rem) dizendo para onde leva ("Delivery ou retirada", "Salão no Bairro Industrial") e seta diagonal a 50% à direita.
- **Tons:** papel (branco jornal, texto tinta) para "Pedir agora"; verde para "Como chegar"; contorno (transparente, borda de branco a 45%) para "Pedir agora" dentro da ficha de tinta. Sobre o cartão verde "No salão", "Como chegar" vira papel.
- **Hover / Focus:** um círculo de preenchimento cresce a partir da base, perto do ícone (`clip-path: circle()` de 0% a 150%, 900ms), o texto troca de cor em 600ms com 60ms de atraso, a tarja sobe 2px com sombra (700ms), o anel do ícone gira −12° e cresce 8% (800ms), a seta anda 3px na diagonal e acende. O rótulo rola para uma cópia de si mesmo (700ms). Tudo volta pelo mesmo caminho na saída. Foco visível com contorno de 2px em `currentColor`, afastado 4px. Ativo volta ao chão em 150ms.
- **Compacta (< 640px):** some o anel e a seta, rótulo em 1.3rem, nota em 0.75rem.

### Chips
- **Style:** ações do cabeçalho, cantos vivos, 2.5rem de altura, borda de 1px, Stint 1.15rem caixa alta a 0.07em, ícone de 0.95rem. "Pedir agora" é sólido (papel com texto tinta); "Como chegar" é contorno (borda de branco a 40%).
- **State:** no hover um preenchimento desce de cima como uma cortina (`clip-path: inset()`, 700ms): verde no chip sólido, papel no chip de contorno. O rótulo rola para a cópia.

### Cards / Containers
- **Corner Style:** cantos vivos (0px).
- **Ficha da atração principal:** tinta de largura total, foto à esquerda sem moldura, nome em Didone, ingredientes em Archivo com os toppings em Didone, tarja de contorno.
- **Cartões de sabor:** papel jornal com borda de tinta a 80% (1px); foto separada por fio igual; nome em Didone; ingredientes em Archivo. No hover sobem 4px com sombra (900ms) e a foto aproxima 5% (1600ms).
- **Placa tipográfica:** quando um sabor não tem foto oficial, a área da foto vira uma placa verde com grão, o ingrediente principal em Didone e o resto em Stint caixa alta. Nunca usar a foto de outro sabor.
- **Cartões das portas:** "Em casa" em vinho, "No salão" em verde, ambos com grão, título em Didone, endereço em Stint caixa alta; a foto da fachada entra como clichê girado no cartão verde.
- **Internal Padding:** 24px no celular, 40px a partir de 768px, 56px a partir de 1024px.

### Navigation
- **Cabeçalho:** fixo no topo, tinta lisa, 64px (72px a partir de 768px). À esquerda o logo sem fundo (`logo-mono.webp`, 56–64px), que gira −8° e cresce 5% no hover (900ms). Links em Stint 1.2rem caixa alta a 0.08em: o sublinhado de 1px se desenha da esquerda para a direita em 800ms e, na saída, recolhe para a direita; a cor vai para `tomato-light`. Os dois chips à direita. Termina na faixa tricolor de 3px.
- **Celular (< 1024px):** botão quadrado de 2.75rem com borda de branco a 40%; o menu abre por altura de grade (700ms) com links em Didone 2rem separados por fios de branco a 12%, que deslizam 0.5rem e ficam `tomato-light` no hover.
- **Links no texto:** sublinhado de 1px presente em repouso, que recolhe para a direita no hover (800ms) enquanto o texto fica verde.
- **Rolagem de âncora:** todo link `#` da página rola com desaceleração `easeOutQuint`, em 700–1600ms conforme a distância, parando abaixo do cabeçalho fixo (altura dele mais 12px). Roda do mouse ou toque cancela; ao chegar, a URL e o foco vão para a seção. Com movimento reduzido o salto é imediato.
- **Rodapé:** tinta lisa, faixa tricolor de 3px no topo, logo sem fundo (144–176px), nome em Didone, endereço em Stint, links de navegação à direita.

### Quadro do Hero (assinatura)
Um clichê de papel jornal (moldura de 0.65rem, sem moldura embaixo) girado 1.4°, com a foto em proporção 382:510. As fotos reais se revezam a cada 5.2s: cada uma entra em fusão de 1400ms (`--ease-soft`) e se aproxima lentamente de 112% para 100% em 7s. Abaixo da foto, uma legenda em Didone itálica que troca com a foto e pontos de controle circulares; o ponto ativo vira pílula de tinta. O revezamento pausa no hover, no foco, com a aba oculta e com movimento reduzido. Se `heroVideo` for preenchido em `src/data/brand.ts`, o quadro mostra o vídeo mudo em loop no lugar das fotos, sem legenda nem pontos.

### Entrada do Hero (assinatura de movimento)
As três linhas do título sobem de dentro de máscaras (1300ms, 140ms entre linhas), o bloco de apoio e as tarjas aparecem subindo 14px (1100ms, a partir de 620ms), e o quadro chega de 40px abaixo, girado 5°, até assentar (1500ms, a partir de 260ms).

### Tamanhos em Escala (assinatura)
Discos de papel com aro cor de massa, diâmetro de `cm / 40` do maior e linhas de corte em tinta pelo número de fatias, com o selo de letra em tinta no centro. No hover o disco gira uma fatia inteira (1400ms) e cresce 4%.

### Lambe do Mural
Foto 4:5 com moldura branca de 0.4rem, levemente inclinada. No hover se endireita e sobe 6px (1000ms), a foto aproxima 6% (1600ms) e surge de baixo o aviso "Ver no Instagram" em Stint sobre um véu de tinta. O último lambe é uma placa de tinta "Siga a Preferitta" em Didone.

### Barra de Portas (celular)
Duas metades iguais, papel ("Pedir agora") e verde ("Como chegar"), 3.75rem de altura, rótulo em Stint 1.3rem caixa alta. Sobe da borda inferior (700ms) quando o hero sai da tela e respeita a área segura do aparelho.

### Passadas de Entrada
Cada seção abaixo da dobra entra em até três passadas (150ms entre elas): cada camada vem 18px abaixo, com opacidade em 900ms e posição em 1200ms. Com movimento reduzido, sem JavaScript ou quando a seção já nasce visível, tudo aparece no lugar.

## Do's and Don'ts

### Do:
- **Do** usar a tinta (`ink`) como parede dominante: hero, cabeçalho, ficha da atração principal, portas e rodapé.
- **Do** limitar o vermelho ao vinho (`tomato-deep`) do "Em casa", ao acento `tomato-light` e ao terço da faixa tricolor.
- **Do** apresentar "Pedir agora" e "Como chegar" juntas e do mesmo tamanho em toda aparição.
- **Do** compor títulos em Bodoni Moda 500 (`--font-didone`), caixa de frase, com o itálico em `tomato-light` só como acento do hero.
- **Do** escrever rótulos, navegação, botões e endereços em Stint Ultra Condensed (`--font-label`) caixa alta, espacejada entre 0.06em e 0.14em.
- **Do** animar hovers com `--ease-out` (`cubic-bezier(.22,1,.36,1)`) entre 600 e 1600ms, com a transição no estado de repouso para que a saída seja simétrica.
- **Do** emoldurar fotos reais com papel e girá-las levemente (até 1.5°), endireitando no hover.
- **Do** aplicar o grão de papel sobre os campos jornal, verde e vinho, e deixar a tinta lisa.
- **Do** manter cantos vivos (0px); reservar o círculo para pizzas, anéis de ícone, selos de letra e pontos do quadro.
- **Do** usar a placa tipográfica verde quando um sabor não tem foto oficial.
- **Do** respeitar `prefers-reduced-motion`: sem revezamento, sem aproximação, rolagem imediata.

### Don't:
- **Don't** voltar a cobrir a tela de vermelho-tomate: a regra do "terço tomate" foi revogada pela usuária.
- **Don't** usar vermelho como fundo de seção, botão ou título.
- **Don't** usar Didone em rótulos, botões ou caixa alta, nem a condensada em títulos.
- **Don't** usar os tokens legados (`--brand-orange`, `--brand-charcoal`, `--brand-ivory`, Fraunces, Manrope, `--shadow-brand*`, `hero-shade`, `btn-liquid`, as variáveis shadcn) em superfícies novas; eles existem só para `/design-system`.
- **Don't** pôr a foto do hero sangrada atrás do título com véu escuro: a foto real fica no quadro emoldurado.
- **Don't** usar hovers curtos ou que só existem na entrada (sem transição de volta).
- **Don't** arredondar tarjas, chips, cartões ou fotos.
- **Don't** colocar sombra em repouso em folhas, tarjas, chips ou cartões.
- **Don't** pôr grão sobre a tinta.
- **Don't** usar sombra de texto ou passada fora de registro em títulos.
- **Don't** usar cinzas; hierarquia vem da opacidade do branco jornal ou da tinta.
- **Don't** usar a foto de um sabor para representar outro.
