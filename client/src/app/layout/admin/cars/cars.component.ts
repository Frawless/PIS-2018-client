import { Component, OnInit } from '@angular/core';
import { CarsService } from "./service/cars.service";
import { Car } from "./car";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  cars: Car[];

  constructor( private carsService: CarsService ) { }

  ngOnInit() {
      this.getCars();
  }

  getCars(): void {
      this.carsService.getCars()
          .subscribe(cars => this.cars = cars );
  }

}
