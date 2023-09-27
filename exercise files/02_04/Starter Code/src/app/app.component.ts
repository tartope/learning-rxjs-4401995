import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  inputTemperature = 0;
  originalTemperature = 0;
  displayTemperatureText = '';
  isCelsius = false;
  temperatureSubject$ = new Subject<number>();
  // Added this property to get rid of error in HTML template lines 29 and 38
  isTouched: boolean = true;

  ngOnInit() {
    // Subscribe to tempSubject
    this.temperatureSubject$.subscribe((temperature)=>{
      if(this.isCelsius){
        this.displayTemperatureText = temperature + "C";
      }else{
        this.displayTemperatureText = temperature + "F";
      }
      // Set inputTemp to be this updated temp value
      this.inputTemperature = temperature;
    })
  }

  setTemperature() {
    this.originalTemperature = this.inputTemperature;
    this.isCelsius = false;
    // Pass in temp to tempSubject
    this.temperatureSubject$.next(this.originalTemperature);
  }
2
  setInputTemperature(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.inputTemperature = parseInt(input);
  }

  convertToCelsius() {
    this.isCelsius = true;
    const celsiusTemperature = ((this.inputTemperature - 32) * 5) / 9;
    // Pass temp into tempSubject
    this.temperatureSubject$.next(celsiusTemperature);
  }

  convertToFahrenheit() {
    this.isCelsius = false;
    const fahrenheitTemperature = (this.inputTemperature * 9) / 5 + 32;
    // Pass temp into tempSubject
    this.temperatureSubject$.next(fahrenheitTemperature);
  }
}
