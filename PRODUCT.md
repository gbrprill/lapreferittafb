# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Moradores de Francisco Beltrão (PR) decidindo onde comer pizza hoje à noite, quase sempre pelo celular: famílias e grupos de amigos escolhendo entre pedir em casa ou sair para comer. Chegam pelo Instagram, pelo Google ou por indicação e querem, em segundos, ver a pizza, entender o que é especial e agir (pedir ou ir).

## Product Purpose
Site institucional da La Preferitta Pizzaria: apresenta a experiência completa (rodízio, à la carte, salão, delivery e retirada, pizzas doces, carta de vinhos) e leva a três ações principais: reservar mesa (WhatsApp), pedir pelo cardápio online (WAbiz) e chegar ao salão. O WAbiz continua sendo o cardápio e canal de pedidos.

## Positioning
Farta e premium ao mesmo tempo: muito recheio, generosa, feita para dividir, e com sabores autorais da casa (Carne Seca Especial, Filé do Chef, pizzas doces) um degrau acima da média da cidade.

## Operating Context
- Pedido online: cardápio externo em https://lapreferittafb.wabiz.delivery/ (delivery e retirada).
- Salão físico: Avenida Júlio Assis Cavalheiro, 2808, Bairro Industrial, Francisco Beltrão — PR (link do Google: https://share.google/zdNL5OHfrXSkkcTDO). Fachada com letreiro iluminado, noite.
- Instagram oficial: @lapreferittafb.
- Tamanhos: P 25 cm/4 fatias, M 30 cm/8, G 35 cm/12, GG 40 cm/16.

## Capabilities and Constraints
- Stack: TanStack Start + React + Tailwind v4, hospedado na Vercel (lapreferittafb.vercel.app), repositório gbrprill/lapreferittafb.
- Dados variáveis centralizados em `src/data/site.ts` (telefone, links, horários, rodízio, vinhos, avaliações, FAQ, regras de reserva).
- Reserva: o site só pede disponibilidade pelo WhatsApp (46) 92001-9764 (confirmado como WhatsApp em 25/09/2026); a equipe confirma. Reserva não é obrigatória.
- Horários da casa (confirmados 25/09/2026): segunda fechado; terça a quinta 18h–22h30; sexta e sábado 18h–23h; domingo 18h–22h30. Delivery e retirada nos mesmos horários. O Google ainda mostra segunda aberta.
- Rodízio: sextas, sábados e domingos. À la carte em todos os dias de funcionamento.
- Pagamento: Pix, cartão de crédito, cartão de débito, dinheiro.
- Programa de fidelidade: regras não confirmadas; seção desligada por configuração.
- Não inventar: preços, depoimentos, faixa de preço, regras de fidelidade.

## Brand Commitments
- O logo (pizza laranja com fatia + faixa tricolor + "LA PREFERITTA / PIZZARIA") é obrigatório e não muda.
- O verde, branco e vermelho da faixa italiana precisam continuar presentes.
- Voz: português brasileiro direto, apetitoso, com orgulho do recheio ("Muito sabor. Muito recheio.").

## Evidence on Hand
Fotos reais: pizzas sobre a tábua (public/images/menu, 10 sabores), garrafas dos 7 vinhos da carta (public/images/vinhos), fachada à noite em alta (public/images/local.webp), vídeo do hero. Google: 4,6 de 5 com 18 avaliações (conferido em 25/09/2026). Ausentes: fotos do salão por dentro, rodízio sendo servido, clientes; depoimentos individuais; preços.

## Product Principles
1. A pizza real é a prova: foto de produto na frente de qualquer discurso.
2. Duas portas, mesmo peso: pedir agora e ir ao salão estão sempre a um toque.
3. Fartura com capricho: generosidade sem parecer popularesco, capricho sem parecer elitista.
4. Local e verdadeiro: Francisco Beltrão, endereço real, nada inventado.
