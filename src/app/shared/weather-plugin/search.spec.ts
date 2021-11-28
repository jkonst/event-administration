import {getForecast} from './search';
import {data} from './weather-test-response.json';

describe('weather forecast search test', () => {

  it('should get a forecast object for start date: `Wed Nov 03 2021 16:12:51 GMT+0200`', () => {
    const date = new Date('Wed Nov 03 2021 16:12:51 GMT+0200 (Eastern European Standard Time)');
    const forecast = getForecast(date, data.properties.timeseries);
    expect(forecast?.air_temperature).toEqual(18.9);
  });

  it('should get a null forecast object for start date: `Wed Nov 03 2021 03:12:51 GMT+0200`', () => {
    const date = new Date('Wed Nov 03 2021 03:12:51 GMT+0200 (Eastern European Standard Time)');
    const forecast = getForecast(date, data.properties.timeseries);
    expect(forecast).toBeNull();
  });

  it('should get a forecast object for start date: `Wed Nov 12 2021 20:12:51 GMT+0200`', () => {
    const date = new Date('Wed Nov 12 2021 20:12:51 GMT+0200 (Eastern European Standard Time)');
    const forecast = getForecast(date, data.properties.timeseries);
    expect(forecast?.air_temperature).toEqual(8.2);
  });

  it('should get a null forecast object for start date: `Wed Nov 13 2021 09:12:51 GMT+0200`', () => {
    const date = new Date('Wed Nov 13 2021 09:12:51 GMT+0200 (Eastern European Standard Time)');
    const forecast = getForecast(date, data.properties.timeseries);
    expect(forecast).toBeNull();
  });

  it('should get a forecast object for start date: `Wed Nov 10 2021 20:12:51 GMT+0200`', () => {
    const date = new Date('Wed Nov 10 2021 20:12:51 GMT+0200 (Eastern European Standard Time)');
    const forecast = getForecast(date, data.properties.timeseries);
    expect(forecast?.air_temperature).toEqual(10.9);
  });

  it('should get a forecast object for start date: `Wed Nov 03 2021 19:31:51 GMT+0200`', () => {
    const date = new Date('Wed Nov 03 2021 19:31:51 GMT+0200 (Eastern European Standard Time)');
    const forecast = getForecast(date, data.properties.timeseries);
    expect(forecast?.air_temperature).toEqual(18.6);
  });

});
