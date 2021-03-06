import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CartItem, ShoppingCart} from '../../model/shopping-cat.model';
import {Subscription} from 'rxjs/Subscription';
import {CartService} from '../../service/cart.service';
import {Product} from '../../model/product';
import {ProductsService} from '../../service/products.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Globals} from '../../../globals';
import {Location} from '@angular/common';

interface ICartItemWithProduct extends CartItem {
    product: Product;
    totalCost: number;
}

@Component({
    selector: 'app-checkout',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
    public cart: Observable<ShoppingCart>;
    public itemCount;
    public cartItems: ICartItemWithProduct[];
    public products: Product[];

    private cartSubscription: Subscription;

    constructor(private cartService: CartService,
                private productsService: ProductsService,
                private domSanitizer: DomSanitizer,
                private globals: Globals,
                private _location: Location) {
    }

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
                                totalCost: product.price * item.quantity
                            };
                        });
                });
        });
    }

    public ngOnDestroy(): void {
        if (this.cartSubscription) {
            this.cartSubscription.unsubscribe();
        }
    }

    addToCart(product: Product, quantity: number) {
        this.cartService.set(product, quantity);
    }

    removeFromCart(product: Product) {
        this.cartService.remove(product);
    }

    getImage(product: Product) {
        if (product.image === '') {
            return;
        }

        return this.domSanitizer.bypassSecurityTrustUrl(atob(product.image));
    }

    backClicked() {
        this._location.back();
    }


    recomputeProductAmount(currentAmount, item) {
        if (currentAmount > item.product.totalAmount) {
            item.totalCost = item.product.price * item.product.totalAmount;
            item.quantity = item.product.totalAmount;
            return item.product.totalAmount;
        }
        //item.product.totalAmount = currentAmount;
        item.quantity = currentAmount;
        return currentAmount;
    }
}
