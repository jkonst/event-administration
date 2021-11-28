import {Event, UNKNOWN_TEMP} from '../../events/model/event';
import {EventForecast} from '../weather-plugin/model/model';
import {Location} from '../../events/model/event';

export const dummyEvents: Event[] = [
  {
    id: '123eawe',
    title: 'my Sports Event',
    description: '',
    startDateTime: new Date('Wed Nov 15 2023 09:12:51 GMT+0200 (Eastern European Standard Time)'),
    endDateTime: new Date('Wed Nov 15 2023 11:12:51 GMT+0200 (Eastern European Standard Time)'),
    temperature: UNKNOWN_TEMP,
    location:  {
      name: 'Vienna',
      countryISO: 'AT',
      longitude: 16.3731,
      latitude: 48.2083
    }
  },
  {
    id: '123dawd',
    title: 'my English Event',
    description: '',
    startDateTime: new Date('Fri Nov 17 2023 09:12:51 GMT+0200 (Eastern European Standard Time)'),
    endDateTime: new Date('Fri Nov 17 2023 11:12:51 GMT+0200 (Eastern European Standard Time)'),
    temperature: UNKNOWN_TEMP
  },
  {
    id: '456dawd',
    title: 'my Dining Event',
    description: '',
    startDateTime: new Date('Fri Nov 05 2021 21:12:51 GMT+0200 (Eastern European Standard Time)'),
    endDateTime: new Date('Fri Nov 05 2021 22:12:51 GMT+0200 (Eastern European Standard Time)'),
    temperature: UNKNOWN_TEMP
  }
];

export const dummyForecast: EventForecast = {
  air_temperature: 8.9,
  icon: 'foggy'
};

export const dummyLocations: Location[] = [
  {
    name: 'Vienna',
    countryISO: 'AT',
    longitude: 16.3731,
    latitude: 48.2083
  },
  {
    name: 'Graz',
    countryISO: 'AT',
    longitude: 15.4409,
    latitude: 47.0749
  },
  {
    name: 'Paris',
    countryISO: 'FR',
    longitude: 2.3522,
    latitude: 48.8566
  }
];
