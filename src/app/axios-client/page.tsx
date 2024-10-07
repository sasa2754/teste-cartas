"use client"

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { api } from "@/constants/api";


interface IData {
    deck_id: string,
}

type CardInfo = {
    code: string,
    image: string,
    suit: string,
    value: string
}


const AxiosPage = () => {
    const [data, setData] = useState<any>([]);
    const [erro, setErro] = useState(false);
    const [erroMessage, setErroMessage] = useState<string>("Página não encontrada");
    const [page, setPage] = useState<string>("");
    const [idDeck, setIdDeck] = useState("");
    const [cardList, setCardList] = useState<CardInfo[]>([]);


    useEffect(() => {
        (async () => {
          try {
            // Primeira requisição para obter o deck
            const res = await api.get(`/deck/new/`);
            if (res) {
              setIdDeck(res.data.deck_id); // Atualiza o idDeck diretamente a partir da resposta da API
            }
          } catch (err) {
            console.log((err as Error).message);
          }
        })();
      }, []); // Executa apenas uma vez, ao montar o componente
      
      useEffect(() => {
        if (idDeck) {
          (async () => {
            try {
              // Segunda requisição para obter as cartas
              const cardListRes = await api.get(`/deck/${idDeck}/draw/?count=52`);
              setCardList(cardListRes.data.cards); // Atualiza o cardList
              console.log(cardList);
            } catch (err) {
              console.log((err as Error).message);
            }
          })();
        }
      }, [idDeck]); // Executa quando idDeck for atualizado
      
    

    return (
        <div className="text-white">
            {erro && <h5>Página não encontrada</h5>}
            <h1>Pagina com axios</h1>
            <div className="flex items-center justify-center h-screen w-screen flex-col text-white p-5">
                <div className="text-white font-karla flex flex-row flex-wrap max-w-screen gap-5 items-center justify-center max-h-screen">
                    <br /><br /><br />
                    {/* <input className="border-solid border-2 border-black rounded-md p-1 w-96 text-black mt-5" type="text" value={page} onChange={(e) => setPage(e.target.value)} placeholder="1/42"/> */}
                    <div className="flex flex-row gap-5 flex-wrap items-center justify-center">
                        {/* {data.map((item, index) => {
                            return (
                                <CardApi key={item.id} nome={item.name} genero={item.gender} species={item.species} status={item.status} type={item.type} image={item.image}/>
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

            
        </div>
    )
};

export default AxiosPage;