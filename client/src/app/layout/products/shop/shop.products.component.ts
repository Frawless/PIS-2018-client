import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop.products.component.html',
  styleUrls: ['./shop.products.component.scss']
})
export class ShopProductsComponent implements OnInit {
  products: Product[];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
      this.getProducts();
  }

  getProducts(): void {
      this.productsService.getProducts()
          .subscribe(products => this.products = products);
  }
}
