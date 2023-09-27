import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const SNOWMAN_IMAGE = '..\\assets\\icons\\snowman image.jpg';
const SUN_IMAGE = '..\\assets\\icons\\sun.jpg';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  inputTemperature = 0;
  imageSrc = SUN_IMAGE;
  // Create temperature BehaviorSubject, give it a type number, and initialize the value to 72 degrees
  temperatureSubject$ = new BehaviorSubject<number>(72);

  ngOnInit() {
    // Subscribe to tempSubject and handle new data points
    this.temperatureSubject$.subscribe((temperature)=>{
      if(temperature >= 40){
        this.imageSrc = SUN_IMAGE;
      }else{
        this.imageSrc = SNOWMAN_IMAGE;
      }
    })
  }

  setTemperature() {
    // Pass in temp from user to tempSubject
    this.temperatureSubject$.next(this.inputTemperature);
  }

  setInputTemperature(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.inputTemperature = parseInt(input);
  }
}
