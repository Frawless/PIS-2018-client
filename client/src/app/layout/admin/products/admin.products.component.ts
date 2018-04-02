import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../model/product';


@Component({
  selector: 'app-products',
  templateUrl: './admin.products.component.html',
  styleUrls: ['./admin.products.component.scss']
})
export class AdminProductsComponent implements OnInit {

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
