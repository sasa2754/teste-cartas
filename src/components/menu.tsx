import { ROUTES } from "@/constants/routes";
import Link from "next/link";

interface IMenu {
    op1: string;
    op2: string;
    op3: string;
    op4: string,
    op5: string,
    op6: string,
    op7: string,
}

export const Menu = ({op1, op2 ,op3, op4, op5, op6, op7} : IMenu) => {
    return (
        <nav className="text-white shadow-xl bg-stone-950 font-karla flex flex-wrap gap-3 items-center fixed justify-between w-full p-2">
            <h1 className="font-semibold">Dragãozinho</h1>
            <div className="flex gap-2 flex-wrap items-center">
                <Link href={ROUTES.home} className="cursor-pointer hover:text-neutral-300">{op1}</Link>
                <Link href={ROUTES.fetchClient} className="cursor-pointer hover:text-neutral-300">{op2}</Link>
                <Link href={ROUTES.axiosClient} className="cursor-pointer hover:text-neutral-300">{op3}</Link>
                <Link href={ROUTES.fetchServer} className="cursor-pointer hover:text-neutral-300">{op4}</Link>
            </div>
        </nav>
    )
}