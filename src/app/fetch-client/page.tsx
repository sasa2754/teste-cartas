"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/card";

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
                <h1>Loading...</h1>
                <div className="flex flex-row gap-5 flex-wrap items-center justify-center">

                    {cardList.map((item) => (
                        <>
                            <Card code={item.code} suit={item.suit} image={item.image} value={item.value}/>
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default fetchClient;