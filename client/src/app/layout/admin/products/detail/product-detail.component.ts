import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ProductsService } from '../../../shop/products/service/products.service';
import { Product } from '../../../shop/products/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.getProduct();
  }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productsService.getProduct(id)
      .subscribe(product => this.product = product);
  }

  save(): void {
      this.productsService.update(this.product)
          .subscribe();
      this.router.navigate(['/shop/admin/products']);
  }

  delete(): void {
      this.productsService.delete(this.product)
          .subscribe();
      this.router.navigate(['/shop/admin/products']);
  }
}
