import {CalendarIcon, Home, Search, XIcon} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {useDebouncedCallback} from "use-debounce";
import CustomSelect, {type IDataCustomSelect} from "@/pages/indicator/components/CustomSelect.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {useRef, useState} from "react";
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
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/config/constant/ROUTES.ts";
import useIndicator from "@/pages/indicator/hooks/useIndicator.ts";


const IndicatorPage: React.FC = () => {
    const navigate = useNavigate();

    const [filter, setFilter] = useState<IIndicatorPagination>({
        page: 0,
        size: 10
    })

    const statusData: IDataCustomSelect[] = [
        {label: "Active", value: "true"},
        {label: "Non Active", value: "false"},
    ]

    const searchRef = useRef(null)
    const onSearchKeyword = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter((prevState) => ({
            ...prevState,
            page: 0,
            search: e.target.value,
        }))
    }, 300)

    const [activeStatus, setActiveStatus] = useState<{ label: string; value: string, color?: string } | undefined>();

    const setStatus = (status: string) => {
        const selected = statusData.find(data=> data.value === status)
        if (selected){
            setActiveStatus(selected)
        }
        setFilter((prevState) => ({
            ...prevState,
            status: status
        }))
    }


    const setDate = (type: "start" | "end", date?: Date) => {
        setFilter((prev) => {
            return {
                ...prev,
                page: 0,
                [type === "start" ? "start_date" : "end_date"]: date
                    ? moment(date)
                        [type === "start" ? "startOf" : "endOf"]("day")
                        .format("YYYY-MM-DD")
                    : undefined,
            }
        })
    };


    //category section
    const {category, categoryData, setDataCategory} = useCategory()

    const setCategoryCode = (categoryCode: string) => {
        console.log(categoryCode)
        setDataCategory(categoryCode)
        let cat = categoryCode ?? ""
        if (categoryCode === "-") cat = ""
        setFilter((prev) => {
            return {
                ...prev,
                category: cat// 👈 fallback
            }
        })
    }

    const handlePageChange = (page: number) => {
        setFilter((prev) => {
            return {
                ...prev,
                page: Math.max(page ?? 1, 1), // 👈 fallback
            }
        })
    };

    const [openStartDate, setOpenStartDate] = useState<boolean>(false)
    const [openEndDate, setOpenEndDate] = useState<boolean>(false)

    const BREADCRUMBITEM = [
        {label: "Home", href: ROUTES.DASHBOARD, icon: <Home size={20}/>},
        {label: "Indicator", href: ROUTES.INDICATOR.ROOT}
    ]

    const handleOnClearFilter = ()=>{
        setFilter({})
        setCategoryCode("-")
        setActiveStatus(undefined)
        if (searchRef.current){
            searchRef.current.value = ''
        }
    }

    const {
        data: indicatorData,
        isLoading,
        refetch,
        isEmpty,
        totalData
    } = useIndicator({filter});


    return (
        <div className="w-full h-full bg-gray-50 flex flex-col justify-start items-center">
            {/*<div className="flex self-end">*/}

            {/*</div>*/}
            <div className="grid grid-flow-col grid-cols-3 gap-4 w-full">
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
                        onClick={() => {
                            navigate(ROUTES.INDICATOR.ADD_NEW)
                        }}
                    >
                        <IoMdAdd className="me-1"/>

                        {"Add Indicator"}
                    </Button>
                </div>
                {/*// filter search*/}
                <div className="row-start-2 col-start-1 col-end-2 relative ml-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>
                    <Input
                        ref={searchRef}
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
                                    "inline-flex h-[38px] w-[180px] sm:w-[160px] items-center justify-start rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                                    !filter.start_date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                {filter.start_date ? (
                                    moment(filter.start_date).format("DD/MM/YYYY")
                                ) : (
                                    <span>{"Start date"}</span>
                                )}
                            </div>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={filter.start_date ? moment(filter.start_date).toDate() : undefined}
                                onSelect={(e) => {
                                    setDate("start", e)
                                    setOpenStartDate(false)
                                }}
                                disabled={(date) => {
                                    // Disable future dates if endDate is selected
                                    return filter.end_date ? date > moment(filter.end_date).toDate() : false;
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
                                    "inline-flex h-[38px] w-[180px] sm:w-[160px] items-center justify-start rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                                    !filter.end_date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                {filter.end_date ? moment(filter.end_date).format("DD/MM/YYYY") :
                                    <span>{"End date"}</span>}
                            </div>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={filter.end_date ? moment(filter.end_date).toDate() : undefined}
                                onSelect={(e) => {
                                    setDate("end", e)
                                    setOpenEndDate(false)
                                }}
                                disabled={(date) => {
                                    // Disable past dates if startDate is selected
                                    return filter.start_date ? date < moment(filter.start_date).toDate() : false;
                                }}
                                autoFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <Button size="icon" variant="ghost" onClick={handleOnClearFilter}>
                        <XIcon/>
                    </Button>
                </div>

                {/*filter */}
                <div className="row-start-2 col-start-2 col-end-3 flex flex-row gap-2 justify-center">
                    {/*<CustomSelect*/}
                    {/*    classNameTrigger="w-[152px]"*/}
                    {/*    datas={statusData}*/}
                    {/*    onChange={(value) => setStatus(value)}*/}
                    {/*    value={activeStatus}*/}
                    {/*    placeholder="Select status"*/}
                    {/*    style="checkbox"*/}
                    {/*    emptyMessage="No status"*/}
                    {/*/>*/}
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
                        value={category}
                        placeholder="Select category"
                        emptyMessage="No Category"
                    />
                </div>
                <div className="row-start-3 col-start-1 col-end-4 ml-4">
                    <div className="relative">
                        {isLoading && (
                            <div
                                className="absolute top-2 right-2 z-10 flex items-center gap-2 bg-white px-3 py-1.5 rounded-md shadow-sm border border-gray-200">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                <span className="text-xs text-gray-600">Updating...</span>
                            </div>
                        )}
                        <IndicatorTable data={indicatorData}/>
                    </div>
                    <BasePagination
                        currentPage={filter?.page ?? 1}
                        totalItems={totalData}
                        itemsPerPage={filter?.size ?? 10}
                        onPageChange={handlePageChange}/>
                </div>

            </div>
        </div>
    )
}

export default IndicatorPage