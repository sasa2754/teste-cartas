"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
// import { CardApi } from "@/components/cardApi";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//     title: "Dragãozinho",
//     description: "Aprendizagem next com o dragãozinho",
// };

type CardInfo = {
    code: string,
    image: string,
    suit: string,
    value: string
}

const fetchClient = () => {
    const [character, setCharacter] = useState<any>();
    const [idDeck, setIdDeck] = useState("");
    const [cardList, setCardList] = useState<CardInfo[]>([]);

    useEffect(() => {
      const load = async () => {
        const res = await fetch("https://www.deckofcardsapi.com/api/deck/new/");
        const data = await res.json();
        setIdDeck(data.deck_id);
      };
      load();
    }, [])

    useEffect(() => {
        if (idDeck === "") return

        const load = async () => {
            const cardList = await fetch(`https://www.deckofcardsapi.com/api/deck/${idDeck}/draw/?count=52`);
            const data = await cardList.json();
            console.log(data);

            setCardList(data.cards);
        }
        load()
    }, [idDeck]) 
    

    return (
        <div className="flex items-center justify-center h-screen w-screen flex-col text-white p-5">
            <div className="text-white font-karla flex flex-row flex-wrap max-w-screen gap-5 items-center justify-center max-h-screen">
                <br /><br />
                <h1>Fetch Nativo sla oq</h1>
                <div className="flex flex-row gap-5 flex-wrap items-center justify-center">
                    {/* {character.map((item) => {
                        return (
                            <></>
                            // <CardApi key={item.id} nome={item.name} genero={item.gender} species={item.species} status={item.status} type={item.type} image={item.image}/>
                        )
                    })} */}

                    {cardList.map((item) => (
                        <>
                            <h1>{item.code}</h1>
                            <Image className="w-40" src={item.image} alt="carta" width={300} height={300} priority></Image>
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default fetchClient;