import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../model/product';
import {MatSort, MatSortable, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-products',
  templateUrl: './admin.products.component.html',
  styleUrls: ['./admin.products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
    dataSource;
    displayedColumns = ['name', 'totalAmount', 'price'];

    products: Product[];

    constructor(private productsService: ProductsService) { }

    ngOnInit() {
        this.getProducts();
    }

    getProducts(): void {
        this.productsService.getProducts()
            .subscribe(products => {
              this.products = products;

              this.products.forEach(function (product) {
                    product.image = null;
              });

              this.dataSource = new MatTableDataSource(this.products);
              this.dataSource.sort = this.sort;
            });
    }

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
}
