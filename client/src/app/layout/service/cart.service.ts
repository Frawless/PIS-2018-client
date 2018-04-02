import {Injectable} from '@angular/core';
import {CartItem, ShoppingCart} from "../model/shopping-cat.model";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {Product} from "../model/product";
import {ProductsService} from "./products.service";

@Injectable()
export class CartService {
    private subscriptionObservable: Observable<ShoppingCart>;
    private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
    private products: Product[];

    constructor(
        private productsService: ProductsService
    ) {
        this.productsService.getProducts()
            .subscribe(products => this.products = products);

        this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
          this.subscribers.push(observer);
          observer.next(this.retrieve());
          return () => {
              this.subscribers = this.subscribers.filter((obs) => obs !== observer);
          };
        });
    }

    public get(): Observable<ShoppingCart> {
        return this.subscriptionObservable;
    }

    add(product: Product, quantity: number) {
        const cart = this.retrieve();
        let item = cart.items.find((p)=> p.product_id === product.id );
        if(item === undefined) {
            item = new CartItem();
            item.product_id = product.id;
            cart.items.push(item);
        }

        item.quantity += quantity;

        this.calculateCart(cart);
        this.save(cart);
        this.dispatch(cart);
    }

    private calculateCart(cart: ShoppingCart) {
        cart.itemsTotal = cart.items
            .map((item) => item.quantity * this.products.find((p) => p.id === item.product_id).price)
            .reduce((previous, current) => previous + current, 0);
    }

    private save(cart: ShoppingCart) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    private retrieve(): ShoppingCart {
      const cart = new ShoppingCart();
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
          cart.updateFrom(JSON.parse(storedCart));
      }

      return cart;
    }

    private dispatch(cart: ShoppingCart): void {
        this.subscribers
            .forEach((sub) => {
                try {
                    sub.next(cart);
                } catch (e) {
                    // we want all subscribers to get the update even if one errors.
                }
            });
    }

}
