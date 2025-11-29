import type {IndicatorDetailResponse} from "@/pages/indicator/types/IndicatorDetailResponse.ts";
import React from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {DollarSign, SquareFunction} from "lucide-react";
import {Badge} from "@/components/ui/badge";

interface IndicatorTableProps {
    data: IndicatorDetailResponse[];
}

const IndicatorTable: React.FC<IndicatorTableProps> = ({data}: IndicatorTableProps) => {

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
        }
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="font-medium text-gray-500 h-12">TITLE</TableHead>
                        <TableHead className="font-medium text-gray-500 h-12">WEIGHT</TableHead>
                        <TableHead className="font-medium text-gray-500 h-12">STATUS</TableHead>
                        <TableHead className="font-medium text-gray-500 h-12">CATEGORY</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data.length === 0 ? (
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
                                        <div className="font-medium">{row.title}</div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="text-sm">{`${row.weight} as ${row.percentage} %`}</div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Badge
                                            variant="secondary"
                                            className={
                                                row.isEnable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }
                                        >
                                            {row.isEnable ? "Active": "Inactive"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="font-medium">{getCategory(row.categoryName)}</div>
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