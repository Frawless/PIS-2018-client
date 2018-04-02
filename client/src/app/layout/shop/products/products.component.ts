import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ProductsService } from '../../service/products.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-shop-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[];

  constructor(
      private productsService: ProductsService,
      private domSanitizer: DomSanitizer
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
}
