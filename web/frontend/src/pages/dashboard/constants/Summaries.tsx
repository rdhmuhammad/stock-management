import React from "react";
import {LuTrendingDown, LuTrendingUp, LuTrophy} from "react-icons/lu";

export interface SummariesData {
    logo: React.ComponentType<{className?: string }>
    total: string
    change: string
    title: string
    colorLogo: string
}

export const SUMMARY_DATAS = () =>{
    const datas: SummariesData[] = [
        {
            logo: LuTrendingUp,
            total: "12",
            change: "-1.2%",
            title: "Matched Prediction",
            colorLogo: 'bg-linear-to-r from-green-500 to-cyan-500'
        },
        {
            logo: LuTrendingDown,
            total: "32",
            change: "+5.2%",
            title: "Wrong Prediction",
            colorLogo: 'bg-linear-to-r from-red-500 to-pink-500'
        },
        {
            logo: LuTrophy,
            total: "52%",
            change: "-1.2%",
            title: "Winrate Prediction",
            colorLogo: 'bg-linear-to-r from-cyan-500 to-blue-500'
        },
    ]

    return datas
}