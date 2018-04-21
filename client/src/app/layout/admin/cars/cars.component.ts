import {Component, OnInit, ViewChild} from '@angular/core';
import {CarsService} from '../../service/cars.service';
import {Car} from '../../model/car';
import {Globals} from '../../../globals';
import {MatSort, MatSortable, MatTableDataSource} from '@angular/material';

@Component({
    selector: 'app-cars',
    templateUrl: './cars.component.html',
    styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
   dataSource;
   displayedColumns = ['id', 'type', 'dateAdd'];

    cars: Car[];

    constructor(
        private carsService: CarsService,
        private globals: Globals
    ) {}

    ngOnInit() {
        this.getCars();
    }

    getCars(): void {
        this.carsService.getCars()
            .subscribe(cars => {
              this.cars = cars
              this.dataSource = new MatTableDataSource(cars);
              this.dataSource.sort = this.sort;
            });
    }
}
