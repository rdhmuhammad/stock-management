import type {ICategoryResponse} from "../types/CategoryResponse"

export const IndicatorService = {
    getAllCategory: async (params?: string): Promise<ICategoryResponse> => {
        // const response = await axios.get<ICategoryResponse>(ENDPOINTS.MOVEMENT_TRACKING.CATEGORY.GET_ALL, {
        //     params: {
        //         search: params
        //     }
        // })

        // return response.data

        return new Promise((resolve, reject) => {
            resolve({
                code: 200,
                message: '',
                result: [
                    {
                        code: '1',
                        name: 'Volume',
                        color: '#fa8940'
                    }
                ]
            })
        })
    }
}