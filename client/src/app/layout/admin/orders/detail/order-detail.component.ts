import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../service/order.service';
import {Order} from '../order';
import {Globals} from '../../../../globals';
import {Location} from '@angular/common';
import {AlertService} from '../../../../_authentication/_services';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
    @Input() order: Order;

    states = ['PENDING', 'ACCEPTED', 'DONE', 'IN_PROCESS', 'READY'];

    isAdminDetail = true;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private orderService: OrderService,
        private globals: Globals,
        private _location: Location,
        private alertService: AlertService,
    ) {
    }

    ngOnInit() {
        this.getOrderInfo();
    }

    getOrderInfo(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.orderService.getOrder(id)
            .subscribe(order => this.order = order);

        if (this.router.url.indexOf('user') > -1) {
            this.isAdminDetail = false;
            return;
        }

        this.orderService.getUser(id)
            .subscribe(user => this.order.user = user);


    }

    save(): void {
        if ( !this.isValid() )
        {
            this.alertService.error('Stav objednávký nelze změnít! Opravte prosím data.');
            return;
        }
        this.orderService.update(this.order)
            .subscribe(
                data => {
                    this.alertService.success('Stav objednávky změněn na \'' + this.order.state + '\'');
                },
                error => {
                    this.alertService.error('Stav objednávký nelze změnít!');
                }
            );
    }

    delete(): void {
        this.orderService.delete(this.order)
            .subscribe(
                data => {
                    this.alertService.success('Objednávka smazána');
                },
                error => {
                    this.alertService.error('Objednávku nelze smazat!');
                }
            );
        this._location.back();
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

        if (this.order.createDate > this.order.exportDate)
            return false;

        return true;
    }
}
