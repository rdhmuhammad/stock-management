import type {IIndicatorPagination} from "@/pages/indicator/types/IIndicatorPagination.ts";
import {useQuery} from "@tanstack/react-query";
import type {IBaseResponse} from "@/config/types/BaseResponse.ts";
import type {IBasePagination} from "@/config/types/BasePagination.ts";
import {IndicatorService} from "@/services/Indicator.ts";
import type {IndicatorDetailResponse} from "@/pages/indicator/types/IndicatorDetailResponse.ts";

interface IUseIndicator {
    filter: IIndicatorPagination
}

const useIndicator = ({filter}: IUseIndicator) => {

    const queryKey = ["indicator", {filter}]
    const {data, isLoading, isFetching} = useQuery<IBaseResponse<IBasePagination<IndicatorDetailResponse>>>({
        queryKey,
        queryFn: () => IndicatorService.getIndicatorPage({
            page: Math.max((filter.page ?? 1) - 1, 0), // 👈 fallback to 1
            size: filter.size,
            search: filter.search,
            category: filter.category,
            start_date: filter.start_date,
            end_date: filter.end_date,
            status: filter.status
        }),
        refetchInterval: false,
        refetchOnWindowFocus: false,
        enabled: true
    })

    return {
        data: data?.data?.values ?? [],
        isLoading,
        isFetching,
        isEmpty: data?.data?.isEmpty ?? false,
        totalData: data?.data?.element_total ?? 0,
    }

}

export default useIndicator;