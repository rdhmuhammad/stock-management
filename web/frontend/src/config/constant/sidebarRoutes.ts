import React from "react";
import {LuChartArea, LuLayoutDashboard, LuSquareFunction} from "react-icons/lu";

export interface MenuItem{
    label: string;
    path: string;
    icon: React.ComponentType<{className?: string }>
}

export const SIDEBAR_ROUTES = () =>{
    const allRoutes : MenuItem[] = [
        {
            label: "Dashboard",
            path: "/dashboard",
            icon: LuLayoutDashboard
        },
        {
            label: "Indicator",
            path: "/indicator",
            icon: LuSquareFunction
        },
        {
            label: "Watchlist",
            path: "/watchlist",
            icon: LuChartArea
        },
    ]

    return allRoutes
}

