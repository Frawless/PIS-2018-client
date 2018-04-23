import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../service/order.service';
import {Order} from '../order';
import {Globals} from '../../../../globals';
import {Location} from '@angular/common';
import {AlertService} from '../../../../_authentication/_services';
import {CarsService} from "../../../service/cars.service";
import {Car} from "../../../model/car";

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
    @Input() order: Order;
    cars: Car[];

    states = ['PENDING', 'ACCEPTED', 'DONE', 'IN_PROCESS', 'READY'];

    isAdminDetail = true;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private orderService: OrderService,
        private globals: Globals,
        private _location: Location,
        private alertService: AlertService,
        private carsService: CarsService,
    ) {
    }

    ngOnInit() {
        this.getOrderInfo();
        if(this.isAdminDetail) this.getCars();
    }

    getOrderInfo(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.orderService.getOrder(id)
            .subscribe(order => {
                this.order = order;
                if(this.order.car == null){
                  this.order.car = {id: 0, dateAdd: null, type: ""}; }
              });

        if (this.router.url.indexOf('user') > -1) {
            this.isAdminDetail = false;
            return;
        }

        this.orderService.getUser(id)
            .subscribe(user => this.order.user = user);


    }

    getCars(): void {
        this.carsService.getCars()
            .subscribe(cars => this.cars = cars);
    }

    save(): void {
        if ( !this.isValid() )
        {
            this.alertService.error('Objednávku nelze upravit! Opravte prosím data.');
            return;
        }
        console.log(this.order);
        this.orderService.update(this.order)
            .subscribe(
                data => {
                    this.alertService.success('Objednávka upravena');
                },
                error => {
                    this.alertService.error('Objednávku nelze upravit!');
                }
            );
    }

    delete(): void {
        this.orderService.delete(this.order)
            .subscribe(
                data => {
                    this._location.back();
                    this.alertService.success('Objednávka smazána');
                },
                error => {
                    this.alertService.error('Objednávku nelze smazat!');
                }
            );

    }

    getOrderPrice(order): number {
        let totalPrice = 0;

        order.items.forEach(element => {
            totalPrice += this.getItemsPrice(element);
        });


        return totalPrice;
    }

    getItemsPrice(items): number {
        return items.countOrdered * items.product.price;
    }

    backClicked() {
        this._location.back();
    }

    protected isValid() {
        let exportDate = new Date( this.order.exportDate );
        let createDate = new Date( this.order.createDate );

        if ( createDate > exportDate )
            return false;

        return true;
    }
}
