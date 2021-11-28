import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {getForecast} from '../search';
import {Error, EventForecast} from '../model/model';

@Injectable({
  providedIn: 'any'
})
export class WeatherApiService {

  constructor(private http: HttpClient) {
  }

  getWeatherInfo(startDateTime: Date | null,
                 latitude?: number,
                 longitude?: number): Observable<EventForecast | null | Error> {
    if (latitude && longitude) {
      return this.http.get(`/weather?lat=${latitude}&lon=${longitude}`).pipe(
        map((response: any) => getForecast(startDateTime, response.properties.timeseries)),
        catchError(err => of({message: err.message}))
      );
    } else {
      return of({message: 'Invalid Longitude and Latitude'});
    }
  }
}
