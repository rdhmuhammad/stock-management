export interface OpenWatchlistItem {
    code: string
    currentPrice: string
    statusPorto: string
    action: string
}

export const OPEN_WATCHLIST = () =>{
    const datas: OpenWatchlistItem[] = [
        {
            code: 'CDIA',
            currentPrice: 'Rp. 2010',
            statusPorto: 'OWNED',
            action: 'SELL'
        },
        {
            code: 'BSDE',
            currentPrice: 'Rp. 980',
            statusPorto: 'NOT OWNED',
            action: 'BUY'
        },
        {
            code: 'PJHB',
            currentPrice: 'Rp. 628',
            statusPorto: 'OWNED',
            action: 'HOLD'
        },
        {
            code: 'BSSR',
            currentPrice: 'Rp. 3.980',
            statusPorto: 'OWNED',
            action: 'SELL'
        },
    ]

    return datas
}