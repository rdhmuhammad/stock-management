import SummaryCard from "@/pages/dashboard/components/cards/SummaryCard.tsx";
import {type SummariesData, SUMMARY_DATAS} from "@/pages/dashboard/constants/Summaries.tsx";
import {useMemo} from "react";
import {OpenWatchlist} from "@/pages/dashboard/components/OpenWatchlist.tsx";
import {WinrateGraph} from "@/pages/dashboard/components/WinrateGraph.tsx";


const Dashboard: React.FC = () =>{

    const summaryData = useMemo(()=> SUMMARY_DATAS() as SummariesData[], [])

    return(
        <div className="h-full bg-gray-50 flex items-center justify-center flex-col">
            <div className="grow-1 grid grid-cols-3 gap-10 items-center">
                {
                    summaryData.map((data, idx)=>{
                        return (
                            <SummaryCard
                                key={idx}
                                title={data.title}
                                change={data.change}
                                total={data.total}
                                logo={data.logo}
                                colorLogo={data.colorLogo}
                            />
                        )
                    })
                }
            </div>
            <div className="grow-9 grid grid-flow-col gap-4 grid-cols-2 items-start w-full pr-4 pl-4">
                <div className="">
                    <OpenWatchlist/>
                </div>
                <div className="">
                    <WinrateGraph/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard