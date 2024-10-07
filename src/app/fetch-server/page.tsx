import { Card } from "@/components/card";
import Image from "next/image";
import Link from "next/link";

// Definir tipos para os dados
type CardInfo = {
  code: string;
  image: string;
  suit: string;
  value: string;
};

// Componente assíncrono que busca os dados no lado do servidor
const FetchServerSide = async () => {
  try {
    // Primeira requisição para obter o deck
    const res = await fetch("https://www.deckofcardsapi.com/api/deck/new/", {
      cache: "no-store", // Evita cache, garantindo que sempre seja feita uma nova requisição
    });
    const data = await res.json();
    const idDeck = data.deck_id;

    // Segunda requisição para obter as cartas
    const cardListRes = await fetch(
      `https://www.deckofcardsapi.com/api/deck/${idDeck}/draw/?count=52`,
      {
        cache: "no-store", // Evita cache aqui também
      }
    );
    const cardData = await cardListRes.json();
    const cardList: CardInfo[] = cardData.cards;

    // Retorna a UI
    return (
      <div className="flex items-center justify-center h-screen w-screen flex-col text-white p-5">
        <div className="text-white font-karla flex flex-row flex-wrap max-w-screen gap-5 items-center justify-center max-h-screen">
          <br /><br />
          <h1>Loading...</h1>
          <div className="flex flex-row gap-5 flex-wrap items-center justify-center">
            {cardList.map((item) => (
              <div key={item.code}>
                <Link href={`/cards/${item.code}`}>
                    <Card code={item.code} suit={item.suit} image={item.image} value={item.value}/>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return <div>Erro ao carregar dados.</div>;
  }
};

export default FetchServerSide;

