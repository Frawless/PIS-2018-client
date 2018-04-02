import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {CartItem, ShoppingCart} from "../../model/shopping-cat.model";
import {Subscription} from "rxjs/Subscription";
import {CartService} from "../../service/cart.service";
import {Product} from "../../model/product";
import {ProductsService} from "../../service/products.service";

interface ICartItemWithProduct extends CartItem {
    product: Product;
    totalCost: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit,OnDestroy {
    public cart: Observable<ShoppingCart>;
    public itemCount;
    public cartItems: ICartItemWithProduct[];
    public products: Product[];

    private cartSubscription: Subscription;
    constructor( private cartService: CartService,
                 private productsService: ProductsService) { }

    ngOnInit() {
        this.cart = this.cartService.get();

        this.cartSubscription = this.cart.subscribe((cart) => {
            this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
            this.productsService.getProducts()
                .subscribe(products => {
                    this.products = products;
                    this.cartItems = cart.items
                        .map((item) => {
                            const product = this.products.find((p) => p.id === item.product_id);
                            return {
                                ...item,
                                product,
                                totalCost: product.price * item.quantity };
                        });
                });
        });
    }

    public ngOnDestroy(): void {
        if (this.cartSubscription) {
            this.cartSubscription.unsubscribe();
        }
    }
}
