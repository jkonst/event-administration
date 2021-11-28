export interface Event {
  id: string;
  title: string;
  description: string;
  startDateTime: Date | null;
  endDateTime: Date | null;
  temperature: string;
  location?: Location;
  weatherIcon?: string;
}

export interface Location {
  name: string;
  countryISO: string;
  longitude: number;
  latitude: number;
}

export const UNKNOWN_TEMP = '--';

export enum EventCategory {
  PAST = 1,
  UPCOMING = 2
}

export const voidEvent: Event = {
  id: '',
  title: '',
  description: '',
  startDateTime: null,
  endDateTime: null,
  temperature: UNKNOWN_TEMP
};
