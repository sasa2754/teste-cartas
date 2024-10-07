import { ROUTES } from "@/constants/routes";
import Image from "next/image";

interface ICard {
    code: string,
    suit: string,
    image: string,
    value: string
}

export const Card = ({code, suit, image, value} : ICard) => {
    return (
        <div className="flex flex-col items-center justify-around">
            <h1 className="font-bold text-3xl">{code}</h1>
            <Image className="" src={image} alt="Carta" width={250} height={250} priority/>
            <div className="flex flex-row gap-3">
                <h3 className="text-xl">{suit}</h3>
                <h3 className="text-xl">{value}</h3>
            </div>
        </div>
    )
}