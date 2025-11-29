import {LuTrendingUp} from "react-icons/lu";
import {Card} from "@/components/ui/card.tsx";
import React from "react";

interface ISummaryCard {
    title: string
    change: string
    total: string
    logo: React.ComponentType<{ className?: string }>
    colorLogo: string
}

const SummaryCard: React.FC<ISumarryCard> = ({title, change, total, logo: Logo, colorLogo}: ISummaryCard) => {

    const getLogoClass = (color: string): string =>
        `row-span-2 rounded-[5px] shadow-md flex justify-center items-center m-[5px] ${color}`


    const getChangeClass = (change: string): string =>
        `font-bold text-sm ${change.includes('-') ? 'text-red-400': 'text-green-400'}`

    return (
        <Card className=' min-w-[320px] h-[100px] grid grid-flow-col grid-rows-2 p-[10px]'>
            <p className='col-span-1 text-lg font-bold flex self-end text-gray-700'>{title}</p>
            <span className='col-span-1 flex-row gap-1 flex self-start'>
                <p className='font-bold text-lg'>{total}</p>
                <p className={getChangeClass(change)}>{change}</p>
            </span>
            <div
                className={getLogoClass(colorLogo)}>
                <Logo className="w-8 h-8 text-white"/>
            </div>
        </Card>
    )
}

export default SummaryCard