export interface SymbolInfo {
  symbol_code: string;
}

export interface ForecastInfo {
  summary: SymbolInfo;
  details?: unknown;
}

export interface Forecast {
  air_temperature: number;
  next_1_hours?: ForecastInfo;
  next_12_hours?: ForecastInfo;
  next_6_hours?: ForecastInfo;
}

export interface EventForecast {
  air_temperature: number;
  icon?: string;
}

export interface TimeForecast {
  time: string;
  forecast: Forecast;
}

export interface Error {
  message: string;
}
