import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ProductsService } from '../../service/products.service';
import {DomSanitizer} from '@angular/platform-browser';
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-shop-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[];

  constructor(
      private productsService: ProductsService,
      private domSanitizer: DomSanitizer,
      private cartService: CartService
  ) { }

  ngOnInit() {
      this.getProducts();
  }

  getProducts(): void {
      this.productsService.getProducts()
          .subscribe(products => this.products = products);
  }

  getImage(product: Product) {
      if (product.image === '') {
          return;
      }

      return this.domSanitizer.bypassSecurityTrustUrl(atob(product.image));
  }

    addToCart(product: Product) {
        this.cartService.add(product, 1);
    }
}
