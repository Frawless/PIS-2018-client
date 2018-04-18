import {Component, OnChanges, OnInit} from '@angular/core';
import { OrderService } from './service/order.service';
import { Order } from './order';
import {Location} from '@angular/common';


@Component({
  selector: 'app-orders',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

    orders: Order[];

    constructor(
        private orderService: OrderService,
        private _location: Location) { }

    ngOnInit() {
        this.getOrders();
    }

    getOrders(): void {
        this.orderService.getOrders()
            .subscribe(orders => this.orders = orders);
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
}
