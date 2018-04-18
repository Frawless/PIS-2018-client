import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CarsService} from "../../../service/cars.service";
import {Car} from "../../../model/car";
import {AlertService} from '../../../../_authentication/_services';

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
      private carsService: CarsService
  ) { }

  ngOnInit() {
    this.setTodayDate();
    this.car.dateAdd = this.todayDate;
  }

  add(): void {console.log(JSON.stringify(this.car));
      this.carsService.add(this.car)
          .subscribe(data => {
                    this.alertService.success('Auto \'' + this.car.type + '\' přidáno!');
                    this.reset();
                    },
                    error => {
                      this.alertService.error('Auto \'' + this.car.type + '\' nelze přidat!');
                  });
      //this.router.navigate(['/shop/admin/cars']);
  }

  reset(): void {
      this.car = new Car();
      this.car.dateAdd = this.todayDate;
  }

  private setTodayDate() {
      var now = new Date();
      var d = now.getDate();
      var m = now.getMonth();
      var y = now.getFullYear();
      var month = ['01','02','03','04','05','06','07','08','09','10','11','12'];
      this.todayDate = ""+ y +"-"+ month[m]  +"-"+ d;

  }

}
