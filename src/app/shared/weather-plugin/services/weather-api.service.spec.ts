import { TestBed } from '@angular/core/testing';
import { WeatherApiService } from './weather-api.service';
import {HttpClientModule} from '@angular/common/http';

describe('WeatherApiService', () => {
  let service: WeatherApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(WeatherApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
