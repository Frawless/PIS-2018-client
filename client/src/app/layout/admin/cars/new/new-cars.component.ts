import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CarsService} from "../service/cars.service";
import {Car} from "../car";

@Component({
  selector: 'app-new',
  templateUrl: './new-cars.component.html',
  styleUrls: ['./new-cars.component.scss']
})
export class CarsNewComponent implements OnInit {
  @Input() car = new Car();

  constructor(
      private router: Router,
      private carsService: CarsService
  ) { }

  ngOnInit() {
  }

  add(): void {this.car.id=null;console.log(JSON.stringify(this.car));
      this.carsService.add(this.car)
          .subscribe();
      this.router.navigate(['/shop/admin/cars']);
  }

}
