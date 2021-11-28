import {EventForecast, Forecast, TimeForecast} from './model/model';

// longest period in hrs from earliest and latest forecast given a specific event start date
const HOURS_12 = 12;

export const getForecast = (dateTime: Date | null, timeSeries: any): EventForecast | null  => {
  const timeForecasts: TimeForecast[] = timeSeries.map((t: any) => ({
    time: t.time,
    forecast: {
      air_temperature: t.data.instant.details.air_temperature,
      next_1_hours: t.data.next_1_hours,
      next_12_hours: t.data.next_12_hours,
      next_6_hours: t.data.next_6_hours,
    }
  }));
  if (!timeForecasts || !dateTime) {
    return null;
  }
  const timesMap = constructMap(timeForecasts);
  const forecast = dateTimeSearch(dateTime, timesMap);
  return !forecast ? null : toEventForecast(forecast);
};

const toEventForecast = (forecast: Forecast): EventForecast => {
  const {next_1_hours, next_12_hours, next_6_hours} = forecast;
  let icon!: string;
  if (next_1_hours) {
    icon = next_1_hours.summary.symbol_code;
  } else if (next_6_hours) {
    icon = next_6_hours.summary.symbol_code;
  } else if (next_12_hours) {
    icon = next_12_hours.summary.symbol_code;
  }
  return {
    air_temperature: forecast.air_temperature,
    icon
  };
};

const dateTimeSearch = (dateTime: Date, timesMap: Map<string, Forecast>): Forecast | null | undefined => {
  const times: string[] = [...timesMap.keys()];
  const firstForecastTime = new Date(times[0]);
  const lastForecastTime = new Date(times[times.length - 1]);
  if (dateTime.getTime() <= firstForecastTime.getTime()) {
    if (getTimeDifferenceInHours(firstForecastTime, dateTime) > HOURS_12) {
      return null;
    } else {
      return timesMap.get(times[0]);
    }
  } else if (dateTime.getTime() >= lastForecastTime.getTime()) {
    if (getTimeDifferenceInHours(dateTime, lastForecastTime) > HOURS_12) {
      return null;
    } else {
      return timesMap.get(times[times.length - 1]);
    }
  } else { // dateTime exists between times[0] and times[times.length - 1]
    const dateTimeIdx = dateTimeBinarySearch(dateTime, times, 0, times.length - 1);
    return timesMap.get(times[dateTimeIdx]);
  }
};

const dateTimeBinarySearch = (dateTime: Date,
                              times: string[],
                              low: number,
                              high: number): number => {
  const middle = Math.ceil((low + high) / 2);
  if (low < high - 1) {
    if (getTimeDifferenceInHours(dateTime, new Date(times[middle])) > 0) {
      return dateTimeBinarySearch(dateTime, times, middle, high);
    } else if (getTimeDifferenceInHours(dateTime, new Date(times[middle])) < 0) {
      return dateTimeBinarySearch(dateTime, times, low, middle);
    } else { // dateTime is equal with the time on the middle index
      return middle;
    }
  } else { // dateTime is between low and high indices with no other index existing between them
    const diffLow = getTimeDifferenceInHours(dateTime, new Date(times[low]));
    const diffHigh = getTimeDifferenceInHours(new Date(times[high]), dateTime);
    return diffLow <= diffHigh ? low : high;
  }
};

const getTimeDifferenceInHours = (dateTime1: Date, dateTime2: Date): number => {
  const diff = dateTime1.getTime() - dateTime2.getTime();
  return diff / (1000 * 60 * 60);
};

const constructMap = (series: TimeForecast[]): Map<string, Forecast> => {
  return series.reduce((acc, cur) => {
    acc.set(cur.time, cur.forecast);
    return acc;
  }, new Map<string, Forecast>());
};
