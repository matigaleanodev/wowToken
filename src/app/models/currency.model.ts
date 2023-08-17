interface CurrencyValues {
    value_avg: number;
    value_sell: number;
    value_buy: number;
}

export interface ExchangeRates {
    oficial: CurrencyValues;
    blue: CurrencyValues;
    oficial_euro: CurrencyValues;
    blue_euro: CurrencyValues;
    last_update: string;
}

export interface TableRates {
    oficial: number;
    blue: number;
    last_update: string;
}