import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCart} from "../../model/shopping-cat.model";
import {CartService} from "../../service/cart.service";;
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
    public cart: Observable<ShoppingCart>;
    public itemCount;

    private cartSubscription: Subscription;

    constructor( private cartService: CartService ) { }

    ngOnInit() {
        this.cart = this.cartService.get();
        this.cartSubscription = this.cart.subscribe((cart) => {
            this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
        });
    }

    public ngOnDestroy(): void {
        if (this.cartSubscription) {
            this.cartSubscription.unsubscribe();
        }
    }
}
