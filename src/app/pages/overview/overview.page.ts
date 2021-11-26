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

  constructor(private weatherService: WeatherService) { }

 async ngOnInit() {
    await this.currentPosition();
  }

  async currentPosition() {
    const data = await Geolocation.getCurrentPosition();
    console.log('data: ', data);
    this.entries.push({type: 'geo', data: data.coords, class: 'cold'});
    console.log(this.entries);
    this.getWeather(0).subscribe((res) => {
      console.log(res);
    });
  }

   getWeather(index) {
    const data = this.entries[index];
    return this.weatherService.getWeather(data);
  }

}
