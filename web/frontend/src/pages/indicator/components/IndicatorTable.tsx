import type {IndicatorDetailResponse} from "@/pages/indicator/types/IndicatorDetailResponse.ts";
import React from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {ChartBar, ChartBarIcon, DollarSign, SquareFunction, Volume} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import moment from "moment";

interface IndicatorTableProps {
    data: IndicatorDetailResponse[];
}

const IndicatorTable: React.FC<IndicatorTableProps> = ({data}: IndicatorTableProps) => {
    const getCreatedDate = (createdDate: string)=>{
        const time = moment(createdDate).format("h:mm A");
        const date = moment(createdDate).format("DD MMMM YYYY");
        return(
            <>
                <p className="font-semibold text-gray-900">{time}</p>
                <p className="truncate">{date}</p>
            </>
        )
    }

    const getCategory = (category: string) => {
        switch (category) {
            case 'PRICE':
                return (
                    <div
                        className="bg-purple-100 rounded p-2 flex max-w-[100px] items-center gap-1 text-purple-800 rounded text-xs">
                        <DollarSign className="h-4 w-4"/>
                        Moving Price
                    </div>
                )
            case 'Volume':
                return (
                    <div
                        className="bg-purple-100 rounded p-2 flex max-w-[100px] items-center gap-1 text-purple-800 rounded text-xs">
                        <ChartBarIcon className="h-4 w-4"/>
                        {category}
                    </div>
                )
        }
    }

    console.log(data)

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="font-medium text-gray-500 h-12">TITLE</TableHead>
                        <TableHead className="font-medium text-gray-500 h-12">WEIGHT</TableHead>
                        <TableHead className="font-medium text-gray-500 h-12">STATUS</TableHead>
                        <TableHead className="font-medium text-gray-500 h-12">CATEGORY</TableHead>
                        <TableHead className="font-medium text-gray-500 h-12">CREATED AT</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data  && data?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} className='h-64'>
                                    <div className='flex flex-col items-center justify-center text-center py-12'>
                                        <div className='rounded-full bg-gray-100 p-6 mb-4'>
                                            <SquareFunction className='h-12 w-12 text-gray-400'/>
                                        </div>
                                        <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                                            No indicator found
                                        </h3>
                                        <p className='text-sm text-gray-500'>
                                            There are no indicator to display for the selected filters. Try adjusting
                                            your search criteria or date range.
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row, index) => (
                                <TableRow
                                    key={index}
                                    className="h-15">
                                    <TableCell className="py-4">
                                        <div className="font-medium">{row.name}</div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="text-sm">{`${row.weight} %`}</div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Badge
                                            variant="secondary"
                                            className={
                                                row.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }
                                        >
                                            {row.status ? "Active": "Inactive"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="font-medium">{getCategory(row?.category_name ?? "")}</div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        {getCreatedDate(row?.created_date ?? "")}
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default IndicatorTable