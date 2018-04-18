import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../../admin/orders/order';
import {ProductsService} from '../../service/products.service';
import {CartService} from '../../service/cart.service';
import {Observable} from 'rxjs/Observable';
import {CartItem, ShoppingCart} from '../../model/shopping-cat.model';
import {Product} from '../../model/product';
import {Subscription} from 'rxjs/Subscription';
import {AlertService, UserService} from '../../../_authentication/_services';

import * as jwtDecode from 'jwt-decode';
import {OrderService} from '../../admin/orders/service/order.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

interface ICartItemWithProduct extends CartItem {
    product: Product;
    totalCost: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
    @Input() order: Order = new Order(null, null, null, null, null, null); // = new Order(null,null,null,null,null,null,null,null,null,null);

    public cart: Observable<ShoppingCart>;
    public itemCount;
    public cartItems: ICartItemWithProduct[];
    public products: Product[];
    public todayDate;

    private cartSubscription: Subscription;

    constructor(
      private cartService: CartService,
      private productsService: ProductsService,
      private userService: UserService,
      private alertService: AlertService,
      private orderService: OrderService,
      private router: Router,
      private _location: Location,
    ) { }

    ngOnInit() {
      this.cart = this.cartService.get();
      this.setTodayDate();

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
                  this.order.items = cart.items
                      .map((item) => {
                          const product = this.products.find((p) => p.id === item.product_id);
                          return {
                              id: null,
                              countOrdered: item.quantity,
                              product: product,
                          };
                      });
              });
      });

      this.getOrder();
      this.order.exportDate = this.todayDate;
    }

    public ngOnDestroy(): void {
        if (this.cartSubscription) {
            this.cartSubscription.unsubscribe();
        }
    }

    private getOrder() {
        const token = localStorage.getItem('token');
        const userName = jwtDecode(token).sub;

        this.userService.getUser(userName)
            .subscribe(user => {
                    this.order.user = user;

                    if (user.address === null) {
                        user.address = new Object();
                        user.address.city = '';
                        user.address.streetName = '';
                        user.address.psc = '';
                    }

                    this.order.address = user.address;
                },
                error => {
                    this.alertService.error(error);
                });
    }

    getOrderPrice(order): number {
        let totalPrice = 0;

        if (order.items != null) {
            order.items.forEach(element => {
                totalPrice += this.getItemsPrice(element);
            });
        }

        return totalPrice;
    }

    getItemsPrice(items): number {
        return items.countOrdered * items.product.price;
    }

    send() {
        const minimalOrder = { ...this.order};
        // user
        delete minimalOrder.user.firstname;
        delete minimalOrder.user.lastname;
        delete minimalOrder.user.username;
        delete minimalOrder.user.phoneNumber;
        delete minimalOrder.user.email;
        delete minimalOrder.user.address;
        delete minimalOrder.user.role;
        delete minimalOrder.user.password;

        // product
        minimalOrder.items = minimalOrder.items
            .map( (item) => {
                const product = item.product;
                delete product.name;
                delete product.price;
                delete product.totalAmount;
                delete product.ingredients;
                delete product.image;
                return {
                    id: null,
                    countOrdered: item.countOrdered,
                    product: product
                };
            });

        minimalOrder.items.forEach((s) => {
            delete s.id;
        });

        // date
        minimalOrder.createDate = '2020-05-05';
        minimalOrder.state = 'DONE';

        this.orderService.addOrder(minimalOrder)
            .subscribe(
                data => {
                    this.cartService.empty();
                    this.router.navigate(['/shop/products']);
                    this.alertService.success('Objednávka odeslána!');
                },
                error => {
                    this.alertService.error('Ojednávku se nepodařilo odeslat!');
                    console.log(error);
                }
            );
    }

    backClicked() {
        this._location.back();
    }

    private setTodayDate() {
        let now = new Date();
        let d = now.getDate();
        let m = now.getMonth();
        let y = now.getFullYear();
        let month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        this.todayDate = '' + y + '-' + month[m]  + '-' + d;

    }

}
