export type TQuote = {
  id: string,
  marketCap: number
  name: string
  rank: number
  symbol: string
}

export interface IDataItem {
  quote: TQuote[],
  timestamp: string
}
