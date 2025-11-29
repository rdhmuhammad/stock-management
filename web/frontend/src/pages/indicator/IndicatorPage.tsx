import {CalendarIcon, Home, Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {useDebouncedCallback} from "use-debounce";
import CustomSelect, {type IDataCustomSelect} from "@/pages/indicator/components/CustomSelect.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {useCallback, useMemo, useState} from "react";
import {cn} from '@/lib/utils'
import type {IIndicatorPagination} from "@/pages/indicator/types/IIndicatorPagination.ts";
import moment from "moment"
import {Calendar} from "@/components/ui/calendar";
import CategorySelect from "./components/CategorySelect";
import {useCategory} from "./hooks/useCategory";
import {Button} from "@/components/ui/button";
import {IoMdAdd} from "react-icons/io";
import {CustomBreadcrumb} from "@/components/common/CustomBreadcrumb";
import BasePagination from "@/components/common/BasePagination.tsx";
import IndicatorTable from "@/pages/indicator/components/IndicatorTable.tsx";
import type {IndicatorDetailResponse} from "@/pages/indicator/types/IndicatorDetailResponse.ts";


const IndicatorPage: React.FC = () => {
    const [filter, setFilter] = useState<IIndicatorPagination>({
        page: 1,
        size: 10
    })

    const statusData: IDataCustomSelect[] = [
        {label: "Active", value: "true"},
        {label: "Non Active", value: "false"},
    ]

    const onSearchKeyword = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        // setFilter((prevState) => ({
        //     ...prevState,
        //     page: 1,
        //     search: e.target.value,
        // }))
    }, 300)

    const setStatus = (floorCode: string) => {
    }

    const activeStatus = useMemo(() =>
            statusData.find(item => Boolean(item.value).valueOf() === filter.status) ?? statusData[0],
        [statusData, filter.status]
    );

    const setDate = (type: "start" | "end", date?: Date) => {
    };


    //category section
    const {categoryData} = useCategory()

    const setCategoryCode = (categoryCode: string) => {
    }

    const activeCategory = useMemo(() =>
            categoryData.find(item => item.value === filter.category) ?? categoryData[0],
        [categoryData, filter.category]
    );

    const [, setCurrentPage] = useState<number>(1);
    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const [openStartDate, setOpenStartDate] = useState<boolean>(false)
    const [openEndDate, setOpenEndDate] = useState<boolean>(false)

    const BREADCRUMBITEM = [
        {label: "Home", href: "/dashboard", icon: <Home size={20}/>},
        {label: "Indicator", href: "/indicator"},
        {label: "Detail"},
    ]

    const transformedData = useMemo(() => {
        const data: IndicatorDetailResponse[] = [
            {code: "1", title: "MACD", weight: 1.4, percentage: 0.9, isEnable: true, categoryName: "PRICE"}
        ]
        return data
    }, [])


    return (
        <div className="h-full bg-gray-50 flex flex-col justify-start items-center gap-3">
            {/*<div className="flex self-end">*/}

            {/*</div>*/}
            <div className="grid grid-flow-col grid-cols-3 gap-4 pl-3">
                <div className="p-4">
                    <CustomBreadcrumb items={BREADCRUMBITEM}/>
                    <h1 className="text-xl font-bold text-gray-900 mt-4">{"Indicator"}</h1>

                </div>
                <div className="col-span-2 col-end-5 flex flex-row justify-end pr-4">
                    <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                            "h-[41px] cursor-pointer mt-3.5 bg-primary hover:bg-primary-bold text-white hover:text-white text-[14px] font-normal"
                        )}
                        // onClick={() => {
                        //     setSelectedFloor(null);
                        //     setIsDialogOpen(true);
                        // }}
                    >
                        <IoMdAdd className="me-1"/>

                        {"Add Indicator"}
                    </Button>
                </div>
                {/*// filter search*/}
                <div className="row-start-2 col-start-1 col-end-2 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>
                    <Input
                        type="search"
                        placeholder="Search"
                        className="pl-[34px] h-[38px] w-[384px] selection:bg-blue-200 selection:text-foreground"
                        onChange={onSearchKeyword}
                    />
                </div>

                {/*// filter date*/}
                <div className="col-start-3 col-end-4 flex justify-end items-center gap-2">
                    <Popover open={openStartDate} onOpenChange={setOpenStartDate}>
                        <PopoverTrigger>
                            <div
                                className={cn(
                                    "inline-flex h-[38px] w-[180px] items-center justify-start rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                                    !filter.dateStart && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                {filter.dateStart ? (
                                    moment(filter.dateStart).format("DD/MM/YYYY")
                                ) : (
                                    <span>{"Start date"}</span>
                                )}
                            </div>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={filter.dateStart ? moment(filter.dateStart).toDate() : undefined}
                                onSelect={(e) => {
                                    setDate("start", e)
                                    setOpenStartDate(false)
                                }}
                                disabled={(date) => {
                                    // Disable future dates if endDate is selected
                                    return filter.dateEnd ? date > moment(filter.dateEnd).toDate() : false;
                                }}
                                autoFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <span className="text-gray-500">to</span>
                    <Popover open={openEndDate} onOpenChange={setOpenEndDate}>
                        <PopoverTrigger>
                            <div
                                className={cn(
                                    "inline-flex h-[38px] w-[180px] items-center justify-start rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                                    !filter.dateEnd && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                {filter.dateEnd ? moment(filter.dateEnd).format("DD/MM/YYYY") :
                                    <span>{"End date"}</span>}
                            </div>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={filter.dateEnd ? moment(filter.dateEnd).toDate() : undefined}
                                onSelect={(e) => {
                                    setDate("end", e)
                                    setOpenEndDate(false)
                                }}
                                disabled={(date) => {
                                    // Disable past dates if startDate is selected
                                    return filter.dateStart ? date < moment(filter.dateStart).toDate() : false;
                                }}
                                autoFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/*filter */}
                <div className="row-start-2 col-start-2 col-end-3 flex flex-row gap-2">
                    <CustomSelect
                        classNameTrigger="w-[152px]"
                        datas={statusData}
                        onChange={(value) => setStatus(value)}
                        value={activeStatus}
                        placeholder="Select status"
                        style="checkbox"
                        emptyMessage="No status"
                    />
                    <CustomSelect
                        classNameTrigger="w-[152px]"
                        datas={statusData}
                        onChange={(value) => setStatus(value)}
                        value={activeStatus}
                        placeholder="Select status"
                        style="checkbox"
                        emptyMessage="No status"
                    />
                    <CategorySelect
                        classNameTrigger="w-[152px]"
                        datas={categoryData}
                        onChange={(value) => setCategoryCode(value)}
                        value={activeCategory}
                        placeholder="Select category"
                        emptyMessage="No Category"
                    />
                </div>
            </div>
            <div className="w-full px-11">
                <div className="relative">
                    {/*{isFetching && (*/}
                    {/*    <div*/}
                    {/*        className="absolute top-2 right-2 z-10 flex items-center gap-2 bg-white px-3 py-1.5 rounded-md shadow-sm border border-gray-200">*/}
                    {/*        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>*/}
                    {/*        <span className="text-xs text-gray-600">Updating...</span>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                    <IndicatorTable data={transformedData}/>
                </div>
                <BasePagination
                    currentPage={0}
                    totalItems={10}
                    itemsPerPage={10} onPageChange={handlePageChange}/>
            </div>
        </div>
    )
}

export default IndicatorPage