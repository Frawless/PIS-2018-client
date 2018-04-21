import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import { OrderService } from './service/order.service';
import { Order } from './order';
import {Location} from '@angular/common';
import {MatSort, MatSortable, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-orders',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
    dataSource;
    displayedColumns = ['id', 'createDate', 'exportDate', 'state', 'price'];

    orders: Order[];

    constructor(
        private orderService: OrderService,
        private _location: Location) { }

    ngOnInit() {
        this.getOrders();
    }

    getOrders(): void {
        this.orderService.getOrders()
            .subscribe(orders => {
            this.orders = orders;
            this.dataSource = new MatTableDataSource(orders);
            this.dataSource.sort = this.sort;
          });

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
