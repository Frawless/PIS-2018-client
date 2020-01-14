import {Component, Input, OnInit} from '@angular/core';
import {ProductsService} from '../../../service/products.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../../model/product';
import {CartService} from '../../../service/cart.service';
import {Location} from '@angular/common';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
    product: Product;
    @Input() quantity = 1;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private productsService: ProductsService,
        private cartService: CartService,
        private _location: Location,
    ) {
    }

    ngOnInit() {
        this.getProduct();
    }

    getProduct(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.productsService.getProduct(id)
            .subscribe(product => this.product = product);
    }

    getImage(product: Product) {
        if (!product) {
            return;
        }
        if (product.image === '') {
            return;
        }
        return atob(product.image);
    }

    addToCart() {
        this.cartService.add(this.product, this.quantity);
    }

    backClicked() {
        this._location.back();
    }

    isValid() {
        if (!this.product) {
            return false;
        }
        if (this.quantity > this.product.totalAmount || this.quantity < 1) {
            return false;
        }
        return true;
    }
}
