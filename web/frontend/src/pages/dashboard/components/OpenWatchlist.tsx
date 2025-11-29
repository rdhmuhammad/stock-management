import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Table, TableCell, TableHead, TableHeader, TableRow, TableBody} from "@/components/ui/table.tsx";
import React, {useMemo} from "react";
import {OPEN_WATCHLIST, type OpenWatchlistItem} from "@/pages/dashboard/data/OpenWatchlist.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Badge} from "@/components/ui/badge.tsx";

export const OpenWatchlist: React.FC = () => {
    const watchlist = useMemo(() => OPEN_WATCHLIST() as OpenWatchlistItem[], [])

    const renderBadge = (type:string, value: string) =>{
        let color = 'bg-gray-100'
        if (type === 'ACTION'){
            switch (value){
                case 'SELL':
                    color = 'bg-red-400'
                    break
                case 'BUY':
                    color = 'bg-green-400'
                    break
                case 'HOLD':
                    color = 'bg-orange-400'
            }
        }else{
            switch (value){
                case 'OWNED':
                    color = 'bg-green-400'
                    break
                case 'NOT OWNED':
                    color = 'bg-orange-400'
                    break
            }
        }

        return(
            <Badge variant='default' className={`${color} text-gray-800 min-w-[60px]`}>
                {value}
            </Badge>
        )
    }

    return (
        <Card className='col-span-1'>
            <CardHeader className='grid grid-cols-2'>
                <div className='flex justify-start self-center'>
                    <CardTitle>Open Watchlist</CardTitle>
                </div>
                <div className='flex justify-end self-center'>
                    <Button variant='outline' size='default'>See all</Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table className='h-[300px]'>
                    <TableHeader>
                        <TableHead>Code</TableHead>
                        <TableHead>Current Price</TableHead>
                        <TableHead>Status Porto</TableHead>
                        <TableHead>Action Recommend</TableHead>
                    </TableHeader>
                    <TableBody>
                        {
                            watchlist.map((data, idx) => {
                                return (
                                    <TableRow key={idx}>
                                        <TableCell>{data.code}</TableCell>
                                        <TableCell>{data.currentPrice}</TableCell>
                                        <TableCell>{renderBadge('STATUS', data.statusPorto)}</TableCell>
                                        <TableCell>{renderBadge('ACTION', data.action)}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}