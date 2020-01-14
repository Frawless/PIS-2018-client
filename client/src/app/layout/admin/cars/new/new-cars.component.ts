import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CarsService} from '../../../service/cars.service';
import {Car} from '../../../model/car';
import {AlertService} from '../../../../_authentication/_services';
import {Location} from '@angular/common';
import {Globals} from '../../../../globals';

@Component({
  selector: 'app-new',
  templateUrl: './new-cars.component.html',
  styleUrls: ['./new-cars.component.scss']
})
export class CarsNewComponent implements OnInit {
  @Input() car = new Car();
  public todayDate;

  constructor(
      private router: Router,
      private alertService: AlertService,
      private carsService: CarsService,
      private _location: Location,
      private globals: Globals
  ) { }

  ngOnInit() {
    this.setTodayDate();
    this.car.dateAdd = this.todayDate;
  }

  add(): void {
      this.carsService.add(this.car)
          .subscribe(data => {
                    this.alertService.success('Auto \'' + this.car.type + '\' přidáno!');
                    this.reset();
                    },
                    error => {
                      this.alertService.error('Auto \'' + this.car.type + '\' nelze přidat!');
                  });
  }

  reset(): void {
      this.car = new Car();
      this.car.dateAdd = this.todayDate;
  }

  private setTodayDate() {
      const now = new Date();
      const d = now.getDate();
      const m = now.getMonth();
      const y = now.getFullYear();
      const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
      this.todayDate = '' + y + '-' + month[m]  + '-' + d;

  }

    backClicked() {
        this._location.back();
    }

}
