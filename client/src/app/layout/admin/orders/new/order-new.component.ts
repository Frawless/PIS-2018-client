import {Component, Input, OnInit} from '@angular/core';
import { Order } from '../order';
import { Router} from '@angular/router';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.scss']
})
export class OrderNewComponent implements OnInit {
    @Input() order: Order;

    constructor(
        private router: Router,
        private orderService: OrderService,
    ) {}

  ngOnInit() {

  }
}
