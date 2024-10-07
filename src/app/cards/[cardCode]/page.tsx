// src/app/cards/[cardCode]/page.tsx
import { Card } from "@/components/card";


import Image from "next/image";

type CardInfo = {
  code: string;
  image: string;
  suit: string;
  value: string;
};

const CardPage = async ({ params }: { params: { cardCode: string } }) => {
  const { cardCode } = params;

  try {
    // Faz a requisição para obter as informações da carta
    const res = await fetch(`https://www.deckofcardsapi.com/api/deck/new/draw/?count=52`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Falha ao obter a carta");
    }

    const data = await res.json();
    const card = data.cards.find((card: CardInfo) => card.code === cardCode);

    if (!card) {
      return <div>Carta não encontrada.</div>;
    }

    // Retorna a UI para a carta
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen text-white">
        <Card code={card.code} suit={card.suit} image={card.image} value={card.value}/>
      </div>
    );
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return <div>Erro ao carregar dados.</div>;
  }
};

export default CardPage;

export async function generateStaticParams() {
  // Fazendo a requisição para criar um novo deck
  const res = await fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
  const data = await res.json();
  const deckId = data.deck_id; // Pegando o ID do deck gerado

  // Fazendo a requisição para obter as cartas desse deck
  const resCards = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`);
  const dataCards = await resCards.json();

  // Retornando os códigos das cartas para gerar as páginas estáticas
  return dataCards.cards.map((card: CardInfo) => ({ cardCode: card.code }));
}
