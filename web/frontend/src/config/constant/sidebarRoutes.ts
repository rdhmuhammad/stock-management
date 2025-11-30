import React from "react";
import {LuChartArea, LuLayoutDashboard, LuSquareFunction} from "react-icons/lu";
import {ROUTES} from "@/config/constant/ROUTES.ts";

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
            path: ROUTES.INDICATOR.ROOT,
            icon: LuSquareFunction
        },
        {
            label: "Watchlist",
            path: ROUTES.WATCHLIST.ROOT,
            icon: LuChartArea
        },
    ]

    return allRoutes
}

