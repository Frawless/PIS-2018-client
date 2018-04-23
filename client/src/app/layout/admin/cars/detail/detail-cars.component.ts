import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CarsService} from '../../../service/cars.service';
import {Car} from '../../../model/car';
import {Location} from '@angular/common';
import {Globals} from '../../../../globals';
import {AlertService} from '../../../../_authentication/_services';

@Component({
    selector: 'app-detail',
    templateUrl: './detail-cars.component.html',
    styleUrls: ['./detail-cars.component.scss']
})
export class CarsDetailComponent implements OnInit {
    @Input() car = new Car();

    constructor(private router: Router,
                private route: ActivatedRoute,
                private carsService: CarsService,
                private _location: Location,
                private alertService: AlertService,
                private globals: Globals
    ) {
    }

    ngOnInit() {
        this.getCar();
    }

    getCar(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.carsService.getCar(id)
            .subscribe(car => this.car = car);
    }

    save(): void {
        this.carsService.update(this.car)
            .subscribe( data => {
                    this.alertService.success('Auto \'' + this.car.type + '\' upraveno!');
                },
                error => {
                    this.alertService.error('Auto \'' + this.car.type + '\' nelze upravit!');
                });
    }

    delete(): void {
        this.carsService.delete(this.car)
            .subscribe( data => {
                    this.alertService.success('Auto \'' + this.car.type + '\' smazáno!');
                },
                error => {
                    this.alertService.error('Auto \'' + this.car.type + '\' nelze smazat!');
                });
        this._location.back();
    }

    backClicked() {
        this._location.back();
    }
}
