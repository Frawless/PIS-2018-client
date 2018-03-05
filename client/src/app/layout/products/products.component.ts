import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../shop/products/products.service";
import { Product } from "../../shop/products/product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

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
