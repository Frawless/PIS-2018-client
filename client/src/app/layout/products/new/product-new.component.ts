import {Component, Input, OnInit} from '@angular/core';
import { Product } from '../product';
import { Router} from '@angular/router';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit {
    @Input() product = new Product();

    constructor(
        private router: Router,
        private productsService: ProductsService
    ) {}

  ngOnInit() { }

  add(): void {
     this.productsService.addProduct(this.product);
     this.router.navigate(['/admin/products']);
  }
}
