import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { OrderService } from '../service/order.service';
import { Order } from '../order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  @Input() order: Order;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
  ) {}

  ngOnInit() {
      this.getOrder();
  }

    getOrder(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.orderService.getOrder(id)
            .subscribe(order => this.order = order);

        this.orderService.getUser(id)
            .subscribe(user => this.order.user = user);
    }

    save(): void {
        this.orderService.update(this.order)
            .subscribe();
        // this.router.navigate(['/shop/admin/orders']);
    }

    delete(): void {
        this.orderService.delete(this.order)
            .subscribe();
        this.router.navigate(['/shop/admin/orders']);
    }

    getOrderPrice(): number {
        var totalPrice = 0;

        this.order.items.forEach(element => {
            totalPrice += this.getItemsPrice(element);
        });


        return totalPrice;
    }

    getItemsPrice(items): number {
        return items.countOrdered * items.product.price;
    }
}
