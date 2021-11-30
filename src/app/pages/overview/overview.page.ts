import { Component, OnInit } from '@angular/core';
import {Geolocation} from '@capacitor/geolocation';
import {WeatherService} from '../../services/weather.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {
  entries = [];
  units = this.weatherService.getUnits();
  unitString = 'درجه سانتی‌گراد';
  speedString = 'کیلومتر بر ساعت';
  configSlides = {
    freeMode: true,
    spaceBetween: 5,
    slidesPerView: 3.3
  }

  constructor(private weatherService: WeatherService) {
    this.currentPosition();
  }

 async ngOnInit() {
   // await this.currentPosition();
  }

  async currentPosition() {
    const data = await Geolocation.getCurrentPosition();
    console.log('data: ', data);
    this.entries.push({type: 'geo', data: data.coords, class: 'cold'});
    console.log(this.entries);
    this.getWeather(0).subscribe((res) => {
      this.entries[0].weather = res;
    }, error => {
      console.log('weather error: ', error);
    });
    this.getForecast(0).subscribe((forecast) => {
      this.entries[0].forecast = forecast;
    }, error => {
      console.log('forecast error: ', error);
    })
  }

   getWeather(index) {
    const data = this.entries[index];
    return this.weatherService.getWeather(data);
  }

  getForecast(index) {
    const data = this.entries[index];
    return this.weatherService.getForecast(data);
  }

  getWeatherIcon(icon) {
    return this.weatherService.getWeatherIcon(icon);
  }

  changeUnit() {
    this.weatherService.changeUnit();
    this.getWeather(0).subscribe((res) => {
      this.entries[0].weather = res;
      this.changeUnitString();
    }, error => {
      console.log(error);
    });
  }

  changeUnitString() {
    if (this.weatherService.getUnits() === 'metric') {
      return this.unitString = 'درجه سانتی‌گراد';
    } else {
      return this.unitString = 'درجه فارنهایت';
    }
  }

}
