import type {IIndicatorPagination} from "@/pages/indicator/types/IIndicatorPagination.ts";
import type {IBaseResponse} from "@/config/types/BaseResponse.ts";
import type {IBasePagination} from "@/config/types/BasePagination.ts";
import type {IndicatorDetailResponse} from "@/pages/indicator/types/IndicatorDetailResponse.ts";
import axios from "@/config/axios"
import {ENDPOINTS} from "@/config/constant/ENDPOINTS.ts";
import type {DropdownCategoryResponse} from "@/pages/indicator/types/DropdownCategoryResponse.tsx";

export const IndicatorService = {
    getIndicatorPage: async (params: IIndicatorPagination): Promise<IBaseResponse<IBasePagination<IndicatorDetailResponse>>> => {
        const response = await axios.get<IBaseResponse<IBasePagination<IndicatorDetailResponse>>>(ENDPOINTS.INDICATOR.PAGE, {params});
        return response.data
    },

    getCategoryDropdown: async (): Promise<IBaseResponse<DropdownCategoryResponse>> => {
        const response = await axios.get<IBaseResponse<DropdownCategoryResponse>>(ENDPOINTS.INDICATOR.CATEGORY_DROPDOWN);
        return response.data
    }
}