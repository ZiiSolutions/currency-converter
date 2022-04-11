export interface CurrencyConversionResponse {
  success: boolean;
  query: CurrencyConversionDetail;
  historical: string;
  date: string;
  result: number;
  error?: ResponseError;
}

export interface CurrencyConversionDetail {
  from: string;
  to: string;
  amount: string;
}

export interface CurrencySymbolResponse {
  success: boolean;
  symbols: CurrencySymbols;
}

export interface CurrencySymbols {
  [key: string]: string;
}

// API Error response schema
export interface ResponseError {
  code: number;
  type: string;
  info: string;
}
