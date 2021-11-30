import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private APIKEY = '0011b2da109f1a0deefd06a7a3865ed3';
  private units = 'metric';

  constructor(private http: HttpClient) { }

  getWeather(data) {
    if (data.type === 'geo') {
      // eslint-disable-next-line max-len
      return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${data.data.latitude}&lon=${data.data.longitude}&appid=${this.APIKEY}&units=${this.units}`);
    } else {
      return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${data.data}&appid=${this.APIKEY}&units=${this.units}`);
    }
  }

  getForecast(data) {
    if (data.type === 'geo') {
      return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.data.latitude}&lon=${data.data.longitude}&appid=${this.APIKEY}&units=${this.units}`);
    } else {
      return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${data.data}&appid=${this.APIKEY}&units=${this.units}`);
    }
  }

  changeUnit() {
    return this.units = this.units === 'metric' ? 'imperial' : 'metric';
  }

  getWeatherIcon(icon) {
    return `http://openweathermap.org/img/w/${icon}.png`;
  }

  getUnits() {
    return this.units;
  }
}
